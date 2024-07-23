<script setup lang="ts">
import { nextTick, onMounted, Reactive, reactive, ref } from 'vue'
import { addOrUpdateTrademark, deleteTrademark, getTrademarkList } from '@/api/product/trademark'
import { Trademark, TrademarkDetail, TrademarkPageParams } from '@/api/product/trademark/type.ts'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, UploadProps } from 'element-plus'

// 列表总数量
const total = ref<number>(0)
// 表格数据
const tableData = ref<Trademark[]>([])
// 添加品牌对话框是否显示
const addTrademarkVisible = ref<boolean>(false)
const dialogRef = ref()

// 列表条件参数
const trademarkListParams: TrademarkPageParams = reactive({
  current: 1,
  size: 10,
})

// 品牌表单数据
const trademarkDetail: Reactive<TrademarkDetail> = reactive({
  logoUrl: '',
  tmName: ''
})

// 获取品牌列表数据
const fetchPageData = (page = trademarkListParams.current) => {
  // 确保 trademarkListParams 是响应式对象
  trademarkListParams.current = page
  getTrademarkList(trademarkListParams).then((res) => {
    total.value = res.data.total
    tableData.value = res.data.records
  })
}

// 处理分页器页码改变
const handleSizeChange = () => {
  fetchPageData()
}

// 点击页面添加品牌按钮
const clickAddTrademark = () => {
  addTrademarkVisible.value = true
  // 清楚旧数据
  trademarkDetail.tmName = ''
  trademarkDetail.logoUrl = ''
  trademarkDetail.id = undefined

  // 校验清除
  nextTick(() => {
    dialogRef.value.clearValidate('tmName');
    dialogRef.value.clearValidate('logoUrl');
  })
}

// 点击编辑品牌
const clickEditTrademark = (trademark: Trademark) => {
  addTrademarkVisible.value = true
  Object.assign(trademarkDetail, trademark)
  // 校验清除
  nextTick(() => {
    dialogRef.value.clearValidate('tmName');
    dialogRef.value.clearValidate('logoUrl');
  })
}

// 处理提交品牌表单
const handleSubmitTrademark = async () => {
  // 在发请求之前,要对于整个表单进行校验
  // 调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
  await dialogRef.value.validate()
  addOrUpdateTrademark(trademarkDetail).then(res => {
    console.log(res)
    // 关闭对话框
    addTrademarkVisible.value = false
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkDetail.id ? '修改品牌成功' : '添加品牌成功'
    })
  }).catch(err => {
    console.log(err)
    //添加品牌失败
    ElMessage({
      type: 'error',
      message: trademarkDetail.id ? '修改品牌失败' : '添加品牌失败'
    });
    //关闭对话框
    addTrademarkVisible.value = false;
  })
}

// 处理确认删除品牌
const handleRemoveTradeMark = (trademark: TrademarkDetail) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteTrademark(trademark).then(_res => {
    ElMessage({
      message: '删除品牌成功',
      type: 'success'
    })
    fetchPageData(tableData.value.length > 1 ? trademarkListParams.current : trademarkListParams.current - 1)
  }).catch(err => {
    ElMessage({
      type: 'error',
      message: `删除品牌失败, ${err.message}`,
    })
  })
}

//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  //要求:上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}

//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
  // uploadFile,
) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkDetail.logoUrl = response.data
  //图片上传成功,清除掉对应图片校验结果
  dialogRef.value.clearValidate('logoUrl')
}

// 品牌名称自定义校验器
const tmNameBlurValidator = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称必须大于等于两位数'))
  }
}

// 品牌LOGO图片的自定义校验规则校验
const logoUrlValidator = (_rule: any, value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    callBack();
  } else {
    callBack(new Error('LOGO图片务必上传'))
  }
}

// 表单校验规则
const rules = {
  tmName: [
    {required: true, trigger: 'blur', validator: tmNameBlurValidator }
  ],
  logoUrl: [
    { required: true, validator: logoUrlValidator }
  ]
}

// 组件挂载完毕钩子
onMounted(() => {
  // 1.获取品牌列表数据
  fetchPageData()
})

</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <el-button type="primary" icon="Plus" @click="clickAddTrademark">
            添加品牌
          </el-button>
        </div>
      </template>
      <el-table :data="tableData" border style="width: 100%; margin: 10px 0">
        <el-table-column header-align="center" prop="id" label="序号" width="80px" align="center" type="index" />
        <el-table-column header-align="center" prop="tmName" label="品牌名称" width="180" align="center" />
        <el-table-column header-align="center" prop="logoUrl" label="品牌LOGO">
          <template #default="{ row }">
            <div style="display: flex; justify-content: center; align-items: center;">
              <img :src="row.logoUrl" alt="Logo地址" style="width: 100px; height: 100px;" >
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="品牌操作" align="center">
          <template #="{ row }">
            <!--编辑按钮-->
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="clickEditTrademark(row)"
            ></el-button>
            <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                           @confirm='handleRemoveTradeMark(row)'>
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <!-- 分页器组件 -->
        <!--
          pagination
          ---v-model:current-page：设置当前分页器页码
          ---v-model:page-size:设置每一也展示数据条数
          ---page-sizes：每页显示个数选择器的选项设置
          ---background:背景颜色
          ---layout：分页器6个子组件布局的调整 "->"把后面的子组件顶到右侧
         -->
        <el-pagination
          v-model:current-page="trademarkListParams.current"
          v-model:page-size="trademarkListParams.size"
          :page-sizes="[10, 20, 50, 100]"
          size="large"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="fetchPageData"
        />
      </template>
    </el-card>

    <el-dialog v-model="addTrademarkVisible" :title="trademarkDetail.id ? '修改品牌' : '添加品牌'" width="500">
      <el-form :model="trademarkDetail" style="width: 80%" :rules="rules" ref="dialogRef">
        <el-form-item label="品牌名称: " label-width="100px" prop="tmName">
          <el-input v-model="trademarkDetail.tmName" autocomplete="off" placeholder="请输入品牌名称"/>
        </el-form-item>
        <el-form-item label="品牌LOGO: " label-width="100px" prop="logoUrl">
          <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkDetail.logoUrl"
              :src="trademarkDetail.logoUrl"
              class="avatar"
              alt="品牌图标"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addTrademarkVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmitTrademark">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
