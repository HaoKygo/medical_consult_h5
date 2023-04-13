<script setup lang="ts">
import type { Knowledge } from '@/types/home'
import { useFollow } from '@/hooks'

defineProps<{
  knowledge: Knowledge
}>()

// 关注按钮点击hook
const { isFollowLoading, follow } = useFollow('knowledge')
</script>

<template>
  <div class="knowledge-card van-hairline-bottom">
    <div class="head">
      <van-image round class="avatar" :src="knowledge.creatorAvatar"></van-image>
      <div class="info">
        <p class="name">{{ knowledge.creatorName }}</p>
        <p class="depart van-ellipsis">
          {{ knowledge.creatorHospatalName }} {{ knowledge.creatorDep }}
          {{ knowledge.creatorTitles }}
        </p>
      </div>
      <van-button
        :loading="isFollowLoading"
        @click="follow(knowledge)"
        class="btn"
        size="small"
        round
      >
        {{ knowledge.likeFlag === 1 ? '已关注' : '+ 关注' }}
      </van-button>
    </div>
    <div class="body">
      <h3 class="title van-ellipsis">{{ knowledge.title }}</h3>
      <p class="tag">
        <span v-for="(tag, i) in knowledge.topics" :key="i"># {{ tag }}</span>
      </p>
      <p class="intro van-multi-ellipsis--l2" v-html="knowledge.content"></p>
      <div class="imgs">
        <van-image
          v-for="(url, i) in knowledge.coverUrl"
          :key="i"
          :src="url"
          fit="cover"
        ></van-image>
      </div>
      <p class="logs">
        <span>
          {{ knowledge.collectionNumber > 0 ? `${knowledge.collectionNumber} 收藏` : '' }}
        </span>
        <span>
          {{ knowledge.commentNumber > 0 ? `${knowledge.commentNumber} 评论` : '' }}
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-card {
  padding: 20px 0 16px;
  .head {
    display: flex;
    align-items: center;
    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }
    .info {
      width: 226px;
      padding-right: 10px;
      .name {
        color: var(--mc-text2);
      }
      .depart {
        color: var(--mc-tip);
        font-size: 12px;
      }
    }
    .btn {
      padding: 0 12px;
      border-color: var(--mc-primary);
      color: var(--mc-primary);
      height: 28px;
      width: 72px;
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: 400;
    }
    .tag {
      margin-top: 6px;
      > span {
        color: var(--mc-primary);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--mc-text3);
      ::v-deep() {
        img {
          display: none;
        }
      }
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
      &.large {
        .van-image {
          width: 185px;
          height: 125px;
        }
      }
    }
    .logs {
      margin-top: 10px;
      > span {
        color: var(--mc-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
