<script setup lang="ts">
import type { Message, FormerMessages, EvaluateDoc } from '@/types/room'
import type { ConsultOrderDetail, Image } from '@/types/consult'
import RoomStatus from './components/RoomStatus.vue'
import RoomMessage from './components/RoomMessage.vue'
import RoomAction from './components/RoomAction.vue'
import { nextTick, onMounted, onUnmounted, ref, provide } from 'vue'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { io, type Socket } from 'socket.io-client'
import { baseURL } from '@/utils/request'
import { MsgType, OrderType } from '@/enums'
import { getConsultOrderDetail } from '@/api/consult'

const userStore = useUserStore()
const route = useRoute()

// 消息列表
const messageList = ref<Message[]>([])
// 发送消息
const sendText = (text: string) => {
  // 发送信息需要数据：发送人、收消息人、消息类型、消息内容
  socket.emit('sendChatMsg', {
    from: userStore.user?.id, // 发送人
    to: consultOrderDetail.value?.docInfo?.id, // 收信息的医生
    msgType: MsgType.MsgText, //消息类型
    msg: { content: text } // 消息内容
  })
}
// 发送图片
const sendImage = (image: Image) => {
  socket.emit('sendChatMsg', {
    from: userStore.user?.id,
    to: consultOrderDetail.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: image }
  })
}

// 获取订单详情
const consultOrderDetail = ref<ConsultOrderDetail>()
onMounted(async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consultOrderDetail.value = res
})
// 评价成功，修改评价消息状态和数据，切换卡片展示
const completeEva = (score: number) => {
  // 获取评价信息数据
  const message = messageList.value.find((m) => m.msgType === MsgType.CardNotEva)
  if (message) {
    // if (message.msg) {
    //   if (message.msg.evaluateDoc) {
    //     message.msg.evaluateDoc = { ...message.msg.evaluateDoc, score }
    //   }
    // }
    message.msg.evaluateDoc = { score } as EvaluateDoc
    message.msgType = MsgType.CardEva
  }
}
// 注入订单详情
provide('consultOrderDetail', consultOrderDetail)
// 注入评价完成函数
provide('completeEva', completeEva)

// 创建聊天websocket链接
let socket: Socket
onUnmounted(() => {
  socket.close()
})
onMounted(() => {
  // 创建socket.io实例
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${userStore.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    // 成功建立连接
    console.log('connect')
  })

  socket.on('error', () => {
    // 错误异常消息
    console.log('error')
  })

  socket.on('disconnect', () => {
    // 已经断开链接
    console.log('disconnect')
  })

  // 聊天记录
  socket.on('chatMsgList', async ({ data }: { data: FormerMessages[] }) => {
    // 准备转换常规消息列表
    const arr: Message[] = []
    data.forEach((item) => {
      // 处理消息时间
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      // 其他消息
      arr.push(...item.items)
    })
    // 添加到列表
    messageList.value.push(...arr)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })

  // 接收消息
  socket.on('receiveChatMsg', async (msg) => {
    messageList.value.push(msg)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })

  // 监听医生订单状态变更，更新订单状态（必须）
  socket.on('statusChange', async () => {
    const res = await getConsultOrderDetail(route.query.orderId as string)
    consultOrderDetail.value = res
    console.log('订单状态更新了', consultOrderDetail.value)
  })
})
</script>

<template>
  <div class="room-page">
    <McNavBar middleTitle="医生问诊室"></McNavBar>
    <!-- 问诊状态 -->
    <RoomStatus
      :status="consultOrderDetail?.status"
      :countdown="consultOrderDetail?.countdown"
    ></RoomStatus>
    <!-- 问诊聊天消息列表 -->
    <RoomMessage :messageList="messageList"></RoomMessage>
    <!-- 底部操作栏：发送信息 -->
    <RoomAction
      :disabled="consultOrderDetail?.status !== OrderType.ConsultChat"
      @send-text="sendText"
      @send-image="sendImage"
    ></RoomAction>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  box-sizing: border-box;
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  background-color: var(--mc-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
