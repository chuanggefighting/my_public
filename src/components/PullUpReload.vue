<template>
  <div ref="wrap" class="load-more-wrap">
    <slot></slot>
    <div class="load-more">
      <slot name="load-more">
        <div class="loading" v-if="pullUpState == 1">
          <van-loading type="spinner" color="#fff" size="15px">努力加载中...</van-loading>
        </div>
        <div class="no-more" v-if="pullUpState == 2">
          <span class="line"></span>
          <span>我是有底线的</span>
          <span class="line"></span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * @desp https://blog.csdn.net/qq_20097569/article/details/82493256
 * @desp <v-reload :pullUpState.sync="pullUpState" @updateList="updatePlyList">
 * updateList(){   ajax 结果改变 pullUpState      }
 */

import { throttle } from "@/assets/js/tool";
export default {
  name: "PullUpReload",
  data() {
    return {
      startY: 0
    };
  },
  props: {
    pullUpState: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleScroll: throttle(handleScroll)
  },
  mounted() {
    window.addEventListener("touchmove", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("touchmove", this.handleScroll);
  }
};

function handleScroll() {
  // 滚动条滚动时距离顶部的距离
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 滚动条的总高度
  var scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  // 滚动条到底部的条件
  // console.log(
  //   "scrollTop:",
  //   scrollTop,
  //   "innerHeight:",
  //   window.innerHeight,
  //   "scrollHeight:",
  //   scrollHeight
  // );
  if (
    scrollTop + window.innerHeight + 10 >= scrollHeight &&
    this.pullUpState == 0
  ) {
    this.$emit("update:pullUpState", 1);
    setTimeout(() => {
      this.$emit("updateList");
    }, 800);
  }
}
</script>
 
<style lang="less">
.load-more-wrap {
  .load-more {
    margin-top: 30px;
    font-size: 12px;
    margin-bottom: 40px;
    .van-loading {
      text-align: center;
    }
    .no-more {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #eee;
      .line {
        display: inline-flex;
        width: 22vw;
        height: 1px;
        background: #ddd;
        margin: 0 20px;
      }
    }
  }
}
</style>

