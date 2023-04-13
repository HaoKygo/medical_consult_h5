<script setup lang="ts">
import CarImg from '@/assets/car.png'
import StartImg from '@/assets/start.png'
import EndImg from '@/assets/end.png'
import type { Express } from '@/types/medicine'
import { getMedicineOrderLogistics } from '@/api/medicine'
import { ref, shallowRef, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AMapLoader from '@amap/amap-jsapi-loader'

// 高德地图 JS API 2.0 需要配置安全密钥jscode
window._AMapSecurityConfig = {
  securityJsCode: '4228aa62180dd04201fdae7fff6af64a'
}
const router = useRouter()
const route = useRoute()
// 获取物流信息和初始化map
const express = ref<Express>()
const map = shallowRef()
onMounted(async () => {
  const res = await getMedicineOrderLogistics(route.params.id as string)
  express.value = res

  // 初始化Map
  AMapLoader.load({
    key: '314c37dde81ee68ef862995da22f8d1b', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then((AMap) => {
    map.value = new AMap.Map(
      'map', // 设置地图容器id
      {
        zoom: 12, // 初始化地图级别
        mapStyle: 'amap://styles/whitesmoke' // 设置地图样式
      }
    )

    // 使用AMap.Driving插件
    AMap.plugin('AMap.Driving', () => {
      // 构造路线导航类
      const driving = new AMap.Driving({
        map: map.value, // 指定轨迹显示地图实例
        showTraffic: false, // 关闭交通状况
        hideMarkers: true // 关闭路线规划默认 marker 标记
      })

      // 起始坐标
      const start = express.value?.logisticsInfo.pop()
      // 结束坐标
      const end = express.value?.logisticsInfo.shift()
      // 途径坐标点
      // const road = express.value?.logisticsInfo.map((item) => [
      //   item.longitude,
      //   item.latitude
      // ])

      // 自定义 marker 标记
      const startMarker = new AMap.Marker({
        icon: StartImg, //设置自定义图片
        position: [start?.longitude, start?.latitude] // 图片显示的坐标位置
      })
      const endMarker = new AMap.Marker({
        icon: EndImg,
        position: [end?.longitude, end?.latitude]
      })
      map.value.add(startMarker)
      map.value.add(endMarker)

      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        new AMap.LngLat(start?.longitude, start?.latitude),
        new AMap.LngLat(end?.longitude, end?.latitude),
        function (status: string, result: object) {
          // 未出错时，result即是对应的路线规划方案
          if (status === 'complete') {
            // 绘制运输中货车的当前位置
            const carMarker = new AMap.Marker({
              icon: CarImg,
              position: [
                express.value?.currentLocationInfo.longitude,
                express.value?.currentLocationInfo.latitude
              ],
              anchor: 'center' // 设置基于坐标点显示的位置
            })
            map.value.add(carMarker)
            // 3s后，定位到货车，放大地图
            setTimeout(() => {
              map.value.setFitView([carMarker])
              map.value.setZoom(5)
            }, 3000)
          }
          console.log(result)
        }
      )
    })
  })
})
</script>

<template>
  <div class="order-logistics-page">
    <div id="map">
      <div class="title">
        <van-icon name="arrow-left" @click="router.back()"></van-icon>
        <span>{{ express?.statusValue }}</span>
        <van-icon name="service"></van-icon>
      </div>
      <div class="current">
        <p class="status">
          {{ express?.statusValue }}--预计{{ express?.estimatedTime }}送达
        </p>
        <p class="predict">
          <span>{{ express?.name }}</span>
          <span>{{ express?.awbNo }}</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="log in express?.list" :key="log.id">
          <p class="status" v-if="log.statusValue">{{ log.statusValue }}</p>
          <p class="content">{{ log.content }}</p>
          <p class="time">{{ log.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-logistics-page {
  --van-step-icon-size: 18px;
  --van-step-circle-size: 10px;
  #map {
    height: 450px;
    background-color: var(--mc-bg);
    overflow: hidden;
    position: relative;
    .title {
      box-sizing: border-box;
      box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
      background-color: #fff;
      width: 355px;
      height: 44px;
      border-radius: 4px;
      padding: 0 15px;
      position: absolute;
      left: 10px;
      top: 10px;
      display: flex;
      align-items: center;
      font-size: 16px;
      z-index: 999;
      > span {
        flex: 1;
        text-align: center;
      }
      .van-icon {
        font-size: 18px;
        color: #666;
        &:last-child {
          color: var(--mc-primary);
        }
      }
    }
    .current {
      box-sizing: border-box;
      box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
      background-color: #fff;
      width: 355px;
      height: 80px;
      padding: 15px;
      border-radius: 4px;
      position: absolute;
      left: 10px;
      bottom: 10px;
      z-index: 999;
      .status {
        font-size: 15px;
        line-height: 26px;
      }
      .predict {
        font-size: 13px;
        color: var(--mc-tip);
        margin-top: 5px;
        > span {
          padding-right: 10px;
        }
      }
    }
  }
  .van-steps {
    :deep(.van-step) {
      &::after {
        display: none;
      }
    }
    .status {
      font-size: 15px;
      color: var(--mc-text3);
      margin-bottom: 4px;
    }
    .content {
      font-size: 13px;
      color: var(--mc-tip);
      margin-bottom: 4px;
    }
    .time {
      font-size: 13px;
      color: var(--mc-tag);
    }
  }
}
</style>
