<template>
  <div class="app-container">
    <h3>导入班车数据</h3>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div>
      <el-button :loading="submitLoading" size="medium " type="primary" @click="handleSubmit" :disabled="!tableData.length">
        确认导入
      </el-button>
    </div>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" :formatter="dateFormat" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import dayjs from 'dayjs'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('excel')

export default {
  name: 'UploadTicketExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      submitLoading: false
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '上传的文件不能大于1M',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      console.log('results', results)
      console.log('header', header)
      // fix xlsx date and time bug
      results.forEach(item => {
        item.depart_time = dayjs(item.depart_time).subtract(5, 'minute').format('HH:mm:ss')
        item.depart_date = dayjs(item.depart_date).add(1, 'day').format('YYYY-MM-DD')
      })
      console.log('tableData', results)
      this.tableData = results
      this.tableHeader = header
    },
    dateFormat(row, column, cellValue, index) {
      return cellValue
    },
    handleSubmit() {
      if (!this.tableData.length) {
        this.$message({
          message: '当前没有数据可导入',
          type: 'warning'
        })
        return
      }
      this.submitLoading = true
      this.submitTicketData(this.tableData)
        .then(res => {
          this.$message({
            message: '数据导入成功！',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            message: '数据导入失败！',
            type: 'error'
          })
        })
        .finally(() => {
          this.submitLoading = false
          this.tableData = []
          this.tableHeader = []
        })
    },
    ...mapActions([
      'submitTicketData'
    ])
  }
}
</script>
<style scoped>
  h3{
    line-height: 1.6;
    border-left: 5px solid #409EFF;
    padding-left: 10px;
  }
</style>
