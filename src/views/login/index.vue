<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { getDayPeriod } from '@/utils/dateUtil.ts'

const loginFormRef = ref()
const loginUser = reactive({
  username: 'admin',
  password: '111111',
})

// 登录密码自定义校验器
let passwordValidator = (_rule: any, value: string, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else if (value.length > 12) {
    callback(new Error('密码不能大于12位'))
  } else {
    callback()
  }
}

const loginRules = reactive({
  username: [
    {
      required: true, message: '请输入用户名', trigger: 'blur',
    },
  ],
  password: [
    {
      required: true, message: '请输入密码', trigger: 'change',
    },
    {
      validator: passwordValidator, trigger: 'change'
    }
  ],
})

const loading = ref(false)

const userStore = useUserStore()
const $router = useRouter()

// 登录操作
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginUser)
    await $router.push('/')
    ElNotification({
      title: `Hi~ ${getDayPeriod()}好`,
      message: '欢迎回来',
      type: 'success',
    })
  } catch (error) {
    ElNotification({
      title: '登录失败',
      message: (error as Error).message,
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginUser" :rules="loginRules" ref="loginFormRef">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginUser.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" v-model="loginUser.password" placeholder="请输入密码" type="password"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading class="login_btn" type="primary" @click="login(loginFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  .login_form {
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 40px;

    h1 {
      font-size: 40px;
      color: #fff;
    }

    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
