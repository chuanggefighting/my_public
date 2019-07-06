
<template>
    <div class="reload-wrap" @touchstart="touchStart($event)" @touchmove="touchMove($event)">
        <slot></slot>
        <div class="load-more">
            <slot name="load-more">
              <div class="loading" v-if="pullUpState==1">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=" alt="Loading ....">
                <span>{{stateTxt.loadingData}}</span>
              </div>
              <div class="no-more" v-if="pullUpState==2">
                <span class="line"></span>
                <span>{{stateTxt.noMoreData}}</span>
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

export default {
    name: "PullUpReload",
    data(){
        return {
          stateTxt: {
            loadingData: "加载中 ...",
            noMoreData: "我是有底线的"
          },
          startY: 0
        }
    },
    props: {
      pullUpState: {
        type: Number,
        default: 0
      }
    },
    methods: {
      touchStart(e){
        this.startY = e.targetTouches[0].pageY
      },
      touchMove(e){
        if(this.pullUpState==0 && e.targetTouches[0].pageY < this.startY){
          let innerHeight = document.querySelector('.reload-wrap').clientHeight
          // 变量scrollTop是滚动条滚动时，距离顶部的距离
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          // 变量scrollHeight是滚动条的总高度
          let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

          if(scrollTop + scrollHeight >= innerHeight){
            this.$emit("update:pullUpState", 1)
            setTimeout(() => {
              this.$emit("updateList")
            }, 800)
          }

        }
      },
        
    }
}
</script>
 
<style lang="scss" scoped>
.reload-wrap{
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

