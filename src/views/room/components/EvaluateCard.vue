<script setup lang="ts">
import type { EvaluateDoc } from '@/types/room'
import type { ConsultOrderDetail } from '@/types/consult'
import type { Ref } from 'vue'
import { computed, inject, ref } from 'vue'
import { evaluateConsultOrder } from '@/api/consult'
import { showFailToast } from 'vant'

defineProps<{
  // 接收评价数据：存在说明评价过，相反没有
  evaluateDoctor?: EvaluateDoc
}>()

// 接受注入订单详情
const consultOrderDetail = inject<Ref<ConsultOrderDetail>>('consultOrderDetail')
// 接受注入评价完成函数
const completeEva = inject<(score: number) => void>('completeEva')

// 评价分数
const score = ref(0)
// 是否匿名评价
const anonymousFlag = ref(false)
// 评价内容
const content = ref('')
// 判断提交按钮是否可用
const disabled = computed(() => !score.value || !content.value)
// 提交评价
const onSubmit = async () => {
  if (!score.value) {
    return showFailToast('请选择评分')
  }
  if (!content.value) {
    return showFailToast('请输入评价')
  }
  if (!consultOrderDetail?.value) {
    return showFailToast('未找到订单')
  }
  if (consultOrderDetail.value.docInfo?.id) {
    await evaluateConsultOrder({
      docId: consultOrderDetail.value.docInfo.id,
      orderId: consultOrderDetail.value.id,
      score: score.value,
      content: content.value,
      anonymousFlag: anonymousFlag.value ? 1 : 0
    })
  }
  // 修改消息：评价请求成功，改成已评价
  completeEva && completeEva(score.value)
}
</script>

<template>
  <!-- 已经评价过 -->
  <div class="evaluate-card" v-if="evaluateDoctor">
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate
      :modelValue="evaluateDoctor.score"
      size="7vw"
      gutter="3vw"
      color="#fadb14"
      voidIcon="star"
      void-color="rgba(0, 0, 0, 0.04)"
    ></van-rate>
  </div>
  <!-- 还未评价 -->
  <div class="evaluate-card" v-else>
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate
      v-model="score"
      size="7vw"
      gutter="3vw"
      color="#fadb14"
      voidIcon="star"
      void-color="rgba(0, 0, 0, 0.04)"
    ></van-rate>
    <van-field
      v-model="content"
      type="textarea"
      maxlength="150"
      showWordLimit
      rows="3"
      placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
    ></van-field>
    <div class="footer">
      <van-checkbox v-model="anonymousFlag">匿名评价</van-checkbox>
      <van-button
        :disabled="disabled"
        @click="onSubmit"
        type="primary"
        size="small"
        round
      >
        提交评价
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.evaluate-card {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  text-align: center;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    color: var(--mc-tip);
    margin-bottom: 15px;
  }
  .van-field {
    background-color: var(--mc-bg);
    border-radius: 8px;
    margin: 15px 0;
  }
  .footer {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ::v-deep() {
      .van-checkbox {
        .van-icon {
          font-size: 11px;
        }
        &__label {
          font-size: 12px;
          color: var(--mc-tip);
        }
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background-color: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
