<script setup lang="ts">
import { ConsultType } from '@/enums'
import type { KnowledgeType } from '@/types/home'
import KnowledgeList from './components/KnowledgeList.vue'
import RecommendDoctor from './components/RecommendDoctor.vue'
import { ref } from 'vue'
import { useConsultStore } from '@/stores'

// 激活的tab序号
const active = ref<KnowledgeType>('recommend')

const consultStore = useConsultStore()
</script>

<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="wrap">
        <h1>医疗问诊</h1>
        <div class="search">
          <McIcon name="home-search"></McIcon> 搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="home-nav">
      <van-row>
        <van-col span="8">
          <RouterLink to="/" class="nav">
            <McIcon name="home-doctor"></McIcon>
            <p class="title">问医生</p>
            <p class="desc">按科室问医生</p>
          </RouterLink>
        </van-col>
        <van-col span="8">
          <RouterLink
            to="/consult/fast"
            @click="consultStore.setConsultType(ConsultType.Fast)"
            class="nav"
          >
            <McIcon name="home-graphic"></McIcon>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </RouterLink>
        </van-col>
        <van-col span="8">
          <RouterLink to="/" class="nav">
            <McIcon name="home-prescribe"></McIcon>
            <p class="title">开药问诊</p>
            <p class="desc">线上买药更方便</p>
          </RouterLink>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <RouterLink to="/" class="nav min">
            <McIcon name="home-order"></McIcon>
            <p class="title">药品订单</p>
          </RouterLink>
        </van-col>
        <van-col span="6">
          <RouterLink to="/" class="nav min">
            <McIcon name="home-docs"></McIcon>
            <p class="title">健康档案</p>
          </RouterLink>
        </van-col>
        <van-col span="6">
          <RouterLink to="/" class="nav min">
            <McIcon name="home-rp"></McIcon>
            <p class="title">我的处方</p>
          </RouterLink>
        </van-col>
        <van-col span="6">
          <RouterLink to="/" class="nav min">
            <McIcon name="home-find"></McIcon>
            <p class="title">疾病查询</p>
          </RouterLink>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="home-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="ad" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="ad" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 知识列表：关注，推荐，减脂，饮食 -->
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注" name="like">
        <RecommendDoctor></RecommendDoctor>
        <KnowledgeList type="like"></KnowledgeList>
      </van-tab>
      <van-tab title="推荐" name="recommend">
        <KnowledgeList type="recommend"></KnowledgeList>
      </van-tab>
      <van-tab title="减脂" name="fatReduction">
        <KnowledgeList type="fatReduction"></KnowledgeList>
      </van-tab>
      <van-tab title="饮食" name="food">
        <KnowledgeList type="food"></KnowledgeList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
}
.home-header {
  height: 100px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  .wrap {
    position: relative;
    padding: 0 15px;
    > h1 {
      font-size: 18px;
      line-height: 1;
      color: #fff;
      font-weight: 400;
      padding: 20px 0;
      padding-left: 5px;
    }
    .search {
      height: 40px;
      border-radius: 20px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.82);
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: var(--mc-dark);
      font-size: 13px;
      .mc-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
}
.home-nav {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .mc-icon {
      font-size: 48px;
    }
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--mc-text1);
    }
    .desc {
      font-size: 11px;
      color: var(--mc-tag);
      margin-top: 2px;
    }
    &.min {
      .mc-icon {
        font-size: 30px;
      }
      .title {
        font-size: 12px;
        color: var(--mc-text2);
        font-weight: 400;
      }
    }
  }
}
.home-banner {
  padding: 10px 15px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
