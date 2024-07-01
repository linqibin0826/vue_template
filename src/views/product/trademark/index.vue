<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getTrademarkList } from '@/api/product/trademark'
import { Trademark, TrademarkPageParams } from '@/api/product/trademark/type.ts'

// 列表条件参数
let trademarkListParams: TrademarkPageParams = reactive({
  current: 1,
  size: 10,
})
// 列表总数量
let total = ref<number>(0)
// 表格数据
let tableData = ref<Trademark[]>([])

// 获取品牌列表数据
const fetchPageData = (page = trademarkListParams.current) => {
  // 确保 trademarkListParams 是响应式对象
  trademarkListParams.current = page
  getTrademarkList(trademarkListParams).then((res) => {
    total.value = res.data.total
    tableData.value = res.data.records
  })
}
// 组件挂载完毕钩子
onMounted(() => {
  // 1.获取品牌列表数据
  fetchPageData()
})

const handleSizeChange = () => {
  fetchPageData()
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-button type="primary" icon="Plus">
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
      <el-table-column header-align="center" label="操作" />
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
</template>

<style scoped lang="scss">

</style>
