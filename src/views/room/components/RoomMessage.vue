<script setup lang="ts">
import type { Message } from '@/types/room'
import type { Image } from '@/types/consult'
import type { Prescription } from '@/types/room'
import EvaluateCard from './EvaluateCard.vue'
import { ConsultTime, MsgType, PrescriptionStatus } from '@/enums'
import { flagOptions, timeOptions } from '@/api/constants'
import { showFailToast, showImagePreview } from 'vant'
import { useUserStore } from '@/stores'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { useShowPrescription } from '@/hooks'

const userStore = useUserStore()
defineProps<{
  messageList: Message[]
}>()

// 格式化时间方法
const formatTime = (time: string) => dayjs(time).format('HH:mm')

// 查看处方hook
const { showPrescription } = useShowPrescription()

// 预览病情补充图片
const previewImage = (pictures?: Image[]) => {
  if (pictures && pictures.length) {
    showImagePreview(pictures.map((pic) => pic.url))
  }
}

// 发送或收到的图片加载成功后，执行一次页面滚动到最后
const loadSuccess = () => {
  window.scrollTo(0, document.body.scrollHeight)
}

// 获取患病时间label信息
const getIllnessTimeText = (time: ConsultTime) => {
  return timeOptions.find((item) => item.value === time)?.label
}
// 获取是否就诊label信息
const getConsultFlagText = (flag: number) => {
  return flagOptions.find((item) => item.value === flag)?.label
}

// 购买药品
const router = useRouter()
const buyMedicine = (prescription: Prescription) => {
  if (prescription) {
    // 处方失效：提示即可
    if (prescription.status === PrescriptionStatus.Invalid) {
      return showFailToast('处方已失效')
    }
    // 如果处方订单没有付款：去药品预支付页面
    if (prescription.status === PrescriptionStatus.NotPay) {
      return router.push(`/medicine/pay?id=${prescription.id}`)
    }
    // 如果处方订单付款了：去药品订单详情页
    if (prescription.status === PrescriptionStatus.Payed) {
      return router.push(`/medicine/${prescription.orderId}`)
    }
  }
}
</script>

<template>
  <div class="room-message">
    <template
      v-for="{
        msgType,
        msg,
        id = undefined,
        from,
        to,
        createTime,
        fromAvatar
      } in messageList"
      :key="id"
    >
      <!-- 病情描述 -->
      <div class="msg msg-illness" v-if="msgType === MsgType.CardPatient && msg">
        <div class="patient van-hairline--bottom" v-if="msg.consultRecord">
          <p>
            {{ msg.consultRecord.patientInfo.name }}
            {{ msg.consultRecord.patientInfo.genderValue }}
            {{ msg.consultRecord.patientInfo.age }}岁
          </p>
          <p>
            {{ getIllnessTimeText(msg.consultRecord.illnessTime) }} |
            {{ getConsultFlagText(msg.consultRecord.consultFlag) }}
          </p>
        </div>
        <van-row v-if="msg.consultRecord">
          <van-col span="6">病情描述</van-col>
          <van-col span="18">{{ msg.consultRecord.illnessDesc }}</van-col>
          <van-col span="6">图片</van-col>
          <van-col span="18" @click="previewImage(msg.consultRecord?.pictures)">
            点击查看
          </van-col>
        </van-row>
      </div>
      <!-- 温馨提示 -->
      <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip && msg">
        <div class="content">
          <span class="title">温馨提示：</span>
          <span>{{ msg.content }}</span>
        </div>
      </div>
      <!-- 通用通知 -->
      <div class="msg msg-tip" v-if="msgType === MsgType.Notify && msg">
        <div class="content">
          <span>{{ msg.content }}</span>
        </div>
      </div>
      <!-- 发送文字 -->
      <div
        class="msg msg-to"
        v-if="msgType === MsgType.MsgText && msg && userStore.user?.id === from"
      >
        <div class="content">
          <div class="time" v-if="createTime">{{ formatTime(createTime) }}</div>
          <div class="text">{{ msg.content }}</div>
        </div>
        <van-image :src="userStore.user?.avatar"></van-image>
      </div>
      <!-- 发送图片 -->
      <div
        class="msg msg-to"
        v-if="msgType === MsgType.MsgImage && msg && userStore.user?.id === from"
      >
        <div class="content">
          <div class="time" v-if="createTime">{{ formatTime(createTime as string) }}</div>
          <van-image @load="loadSuccess" fit="contain" :src="msg?.picture?.url" />
        </div>
        <van-image fit="contain" :src="userStore.user?.avatar" />
      </div>
      <!-- 接收文字 -->
      <div
        class="msg msg-from"
        v-if="msgType === MsgType.MsgText && msg && userStore.user?.id !== from"
      >
        <van-image :src="fromAvatar" />
        <div class="content">
          <div class="time" v-if="createTime">{{ formatTime(createTime) }}</div>
          <div class="text">{{ msg.content }}</div>
        </div>
      </div>
      <!-- 接收图片 -->
      <div
        class="msg msg-from"
        v-if="msgType === MsgType.MsgImage && msg && userStore.user?.id === to"
      >
        <van-image :src="fromAvatar" />
        <div class="content">
          <div class="time" v-if="createTime">{{ formatTime(createTime) }}</div>
          <van-image @load="loadSuccess" fit="contain" :src="msg?.picture?.url" />
        </div>
      </div>
      <!-- 处方消息 -->
      <div
        class="msg msg-recipe"
        v-if="msgType === MsgType.CardPrescription && msg?.prescription"
      >
        <div class="content">
          <div class="head van-hairline--bottom">
            <div class="head-title">
              <h3>电子处方</h3>
              <p @click="showPrescription(msg.prescription?.id)">
                原始处方 <van-icon name="arrow"></van-icon>
              </p>
            </div>
            <p>
              {{ msg.prescription.name }}
              {{ msg.prescription.genderValue }}
              {{ msg.prescription.age }}岁
              {{ msg.prescription.diagnosis }}
            </p>
            <p>开方时间：{{ msg.prescription.createTime }}</p>
          </div>
          <div class="body van-hairline--bottom">
            <div
              class="body-item"
              v-for="medicine in msg.prescription.medicines"
              :key="medicine.id"
            >
              <div class="drug">
                <p>{{ medicine.name }} {{ medicine.specs }}</p>
                <p>{{ medicine.usageDosag }}</p>
              </div>
              <div class="count">x{{ medicine.quantity }}</div>
            </div>
          </div>
          <div class="foot">
            <span @click="buyMedicine(msg.prescription as Prescription)">购买药品</span>
          </div>
        </div>
      </div>
      <!-- 订单取消 -->
      <div
        class="msg msg-tip msg-tip-cancel"
        v-if="msgType === MsgType.NotifyCancel && msg"
      >
        <div class="content">
          <span>{{ msg.content }}</span>
        </div>
      </div>
      <!-- 医生评价 -->
      <div
        class="msg"
        v-if="(msgType === MsgType.CardEva || msgType === MsgType.CardNotEva) && msg"
      >
        <EvaluateCard :evaluateDoctor="msg.evaluateDoc"></EvaluateCard>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.msg {
  display: flex;
  padding: 15px;
  &-illness {
    display: block;
    margin: 15px;
    border-radius: 8px;
    font-size: 12px;
    background-color: #fff;
    .patient {
      padding-bottom: 15px;
      margin-bottom: 15px;
      > p {
        &:first-child {
          font-size: 16px;
        }
        &:last-child {
          margin-top: 5px;
          color: var(--mc-tip);
        }
      }
    }
    .van-col {
      &:nth-child(-n + 2) {
        margin-bottom: 5px;
      }
      &:nth-child(2n) {
        color: var(--mc-tip);
      }
    }
  }
  &-tip {
    justify-content: center;
    font-size: 12px;
    .content {
      height: 34px;
      line-height: 34px;
      max-width: 100%;
      padding: 0 16px;
      border-radius: 16px;
      background-color: #fff;
      font-size: 12px;
      color: var(--mc-tip);
      .title {
        color: var(--mc-primary);
      }
    }
    &-cancel {
      .content {
        background-color: #ededed;
      }
    }
  }
  // 患者消息+图片
  &-to {
    justify-content: end;
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--mc-tip);
        text-align: right;
        margin-bottom: 5px;
      }
      .text {
        position: relative;
        padding: 15px;
        border-radius: 8px;
        background-color: var(--mc-primary);
        font-size: 15px;
        color: #fff;
        &::before {
          content: '';
          position: absolute;
          right: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          background-color: var(--mc-primary);
          border-top-right-radius: 13px 3px;
        }
        &::after {
          content: '';
          position: absolute;
          right: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          background-color: var(--mc-bg);
          border-top-left-radius: 13px 13px;
        }
      }
      .van-image {
        max-height: 160px;
        max-width: 160px;
        border-radius: 8px;
        border: 1px solid var(--mc-line);
        overflow: hidden;
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 13px;
    }
  }
  // 医生消息+图片
  &-from {
    .content {
      max-width: 240px;
      min-width: 52px;
      .time {
        color: var(--mc-tip);
        margin-bottom: 5px;
      }
      .text {
        position: relative;
        padding: 15px;
        border-radius: 8px;
        background-color: #fff;
        font-size: 15px;
        color: var(--mc-text3);
        &::before {
          content: '';
          position: absolute;
          left: -13px;
          top: 10px;
          width: 13px;
          height: 16px;
          border-top-left-radius: 13px 3px;
          background-color: #fff;
        }
        &::after {
          content: '';
          position: absolute;
          left: -13px;
          top: 13px;
          width: 13px;
          height: 13px;
          border-top-right-radius: 13px 13px;
          background-color: var(--mc-bg);
        }
      }
      .van-image {
        max-width: 160px;
        max-height: 160px;
        border-radius: 8px;
        border: 1px solid var(--mc-line);
        overflow: hidden;
      }
    }
    > .van-image {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 13px;
    }
  }
  &-recipe {
    padding: 15px;
    .content {
      flex: 1;
      border-radius: 8px;
      overflow: hidden;
      background-color: #fff;
      font-size: 12px;
      color: var(--mc-tip);
      .head {
        padding: 15px;
        &-title {
          display: flex;
          justify-content: space-between;
          > h3 {
            font-weight: 400;
            font-size: 16px;
            color: var(--mc-text1);
          }
        }
        p {
          margin-top: 5px;
        }
      }
      .body {
        padding: 15px 15px 15px 15px;
        &-item {
          display: flex;
          margin-top: 15px;
          .drug {
            flex: 1;
            > p {
              &:first-child {
                margin-bottom: 5px;
                font-size: 14px;
                color: var(--mc-text1);
              }
            }
          }
          .count {
            color: var(--mc-text1);
          }
        }
      }
      .foot {
        height: 42px;
        line-height: 42px;
        text-align: center;
        // background-color: var(--mc-plain);
        font-size: 16px;
        color: var(--mc-primary);
      }
    }
  }
}
</style>
