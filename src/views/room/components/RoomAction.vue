<script setup lang="ts">
import type { Image } from '@/types/consult'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { uploadImage } from '@/api/consult'
import { showLoadingToast } from 'vant'
import { ref } from 'vue'

defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', image: Image): void
}>()
// 发送的消息
const text = ref('')
// 发送消息
const sendText = () => {
  emit('send-text', text.value)
  text.value = ''
}
// 发送图片
const sendImage: UploaderAfterRead = async (data) => {
  // 排除多图上传数组情况
  if (Array.isArray(data)) {
    return
  }
  // 排除不存在的情况
  if (!data.file) {
    return
  }
  const toast = showLoadingToast({
    message: '正在上传',
    duration: 0 // 设置为0不会自动关闭
  })
  try {
    const res = await uploadImage(data.file)
    emit('send-image', res)
  } catch (error) {
    console.log(error)
  } finally {
    // 关闭提示
    toast.close()
  }
}
</script>

<template>
  <div class="room-action">
    <van-field
      v-model="text"
      @keyup.enter="sendText"
      :disabled="disabled"
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
    ></van-field>
    <van-uploader :after-read="sendImage" :disabled="disabled" :preview-image="false">
      <McIcon name="consult-img"></McIcon>
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 16px;
  z-index: 1;
  .input {
    background-color: var(--mc-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .mc-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
