
<template>
    <div class="refresh-wrap" 
        @touchstart="touchStart($event)" 
        @touchmove="touchMove($event)"
        @touchend="touchEnd($event)">

        <div class="pull-refresh">
            <slot name="pull-refresh">
                <div class="loading" v-if="pullUpState==1">
                    <img src="" alt="">
                    <span>{{stateTxt.loadingData}}</span>
                </div>
                <div class="no-more" v-if="pullUpState==2">
                    <span class="line"></span>
                    <span>{{stateTxt.noMoreData}}</span>
                    <span class="line"></span>
                </div>
            </slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>

/**
 * @desp https://blog.csdn.net/qq_20097569/article/details/82493256
 * @desp <v-refresh :pullUpState.sync="pullUpState" @updateList="updateList">
 * updateList(){   ajax 结果改变 pullUpState      }
 */

export default {
    name: "PullUpReload",
    data(){
        return {
          stateTxt: {
            loadingData: "刷新中 ...",
            noMoreData: "已更新全部内容"
          },
          startY: 0
        }
    },
    props: {
      dropDownState: {
        type: Number,
        default: 0
      }
    },
    methods: {
      touchStart(e){
        this.startY = e.targetTouches[0].pageY
      },
      touchMove(e){
        // 下拉
        if(this.dropDownState==0 &&  e.targetTouches[0].pageY > this.startY){

          let innerHeight = document.querySelector('.reload-wrap').clientHeight
          // 滚动条滚动时，距离顶部的距离
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          // 滚动条的总高度
          let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

          // 拉动的距离
          let distance = e.targetTouches[0].pageY - this.startY - scrollIsToTop
          this.top = Math.pow(distance, 0.8) + (this.dropDownState === 2 ? this.defaultOffset : 0)
          if (this.top >= this.defaultOffset) {
            this.dropDownState = 2
            e.preventDefault()
          } else {
            this.dropDownState = 1
            e.preventDefault()
          }


        }
      },
        
    }
}
</script>
 
<style lang="scss" scoped>
.refresh-wrap{
  .load-more{
      .loading, .no-more{
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .loading img{
          width: 60px;
          margin-right: 20px;
          animation: rotating 1s steps(12, end) infinite;
      }
      .no-more .line{
          display: inline-flex;
          width: 160px;
          height: 4px;
          background: #ddd;
          margin: 0 20px;
      }
  }
}
@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(1turn);
    }
}
</style>








