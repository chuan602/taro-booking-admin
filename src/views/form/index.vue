<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="250px">
      <el-form-item label="提前截止订票时长(min)">
        <el-input-number
          v-model="form.beforeBookingDeadlineTime"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="车票过期延迟时长(min)">
        <el-input-number
          v-model="form.ticketInvalidDelayTime"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="车票过期扣除积分（分）">
        <el-input-number
          v-model="form.invalidTicketPunishIntegral"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="积分满分值（分）">
        <el-input-number
          v-model="form.fullIntegral"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="乘务员可提前上客时长（分）">
        <el-input-number
          v-model="form.scannerEndAdvanceTime"
          :min="0"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapState, mapMutations } = createNamespacedHelpers('form')

export default {
  data() {
    const deadline = this.$store.state.form.deadline
    const punish = this.$store.state.form.punish
    const full = this.$store.state.form.full
    const delay = this.$store.state.form.delay
    const advance = this.$store.state.form.advance
    return {
      form: {
        beforeBookingDeadlineTime: deadline,
        ticketInvalidDelayTime: delay,
        invalidTicketPunishIntegral: punish,
        fullIntegral: full,
        scannerEndAdvanceTime: advance
      }
    }
  },
  methods: {
    onSubmit() {
      const config = {
        deadline: this.form.beforeBookingDeadlineTime,
        delay: this.form.ticketInvalidDelayTime,
        punish: this.form.invalidTicketPunishIntegral,
        full: this.form.fullIntegral,
        advance: this.form.scannerEndAdvanceTime
      }
      this.setConfiguration(config)
        .then(res => this.$message({
          message: '提交成功！配置生效！',
          type: 'success'
        }))
        .catch(() => {
          this.$message({
            message: '提交失败！请重新再试！',
            type: 'error'
          })
          this.onReset()
        })
    },
    onReset() {
      this.form.beforeBookingDeadlineTime = this.deadline
      this.form.invalidTicketPunishIntegral = this.punish
      this.form.ticketInvalidDelayTime = this.delay
      this.form.fullIntegral = this.full
      this.form.scannerEndAdvanceTime = this.advance
    },
    ...mapMutations([
      'GET_CONFIGURATIONS',
      'SET_FORMITEM'
    ]),
    ...mapActions([
      'getConfigurations',
      'setConfiguration'
    ])
  },
  computed: {
    ...mapState([
      'deadline',
      'delay',
      'punish',
      'full',
      'advance'
    ])
  },
  beforeMount() {
    this.getConfigurations()
      .then(({ deadline, delay, punish, full, advance }) => {
        this.form.beforeBookingDeadlineTime = deadline
        this.form.invalidTicketPunishIntegral = punish
        this.form.ticketInvalidDelayTime = delay
        this.form.fullIntegral = full
        this.form.scannerEndAdvanceTime = advance
      })
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

