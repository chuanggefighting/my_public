
<template>
    <div class="loading-container" v-if="LOADING.status > 0" >
        <!-- 遮罩层下方内容禁止滑动 @touchmove.prevent -->
        <div class="mask" :class="{ 'darkBg': LOADING.status > 1}" @touchmove.prevent></div>
        <template v-if="LOADING.status === 1">
            <div class="loading-box content">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=" alt="">
                <!-- <p>{{loadText}}</p> -->
            </div>
        </template>
        <template v-if="LOADING.status === 2">
            <div class="error-box content">
                <div class="main" v-if="LOADING.msg">
                    <img src="../assets/images/loading/error-other.png" alt="">
                    <p v-text="LOADING.msg"></p>
                    <button @click="closeDialog">关闭</button>
                </div>
                <div class="main" v-else>
                    <img src="../assets/images/loading/error-wifi.png" alt="">
                    <p v-text="errorText"></p>
                    <button @click="closeDialog">关闭</button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "loadingView",
  data(){
    return {
      loadText: "正在加载中",
      errorText: "亲！请检查网络配置"
    }
  },
  computed:{
    ...mapState([
      'LOADING'
    ])
    },
    methods: {
      closeDialog(){
        this.$store.commit('hideLoad')
      }
  }
}
</script>
 
<style lang="scss" scoped>
.loading-container{
    position: relative;
    text-align: center;
    .mask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99999;
        background-color: rgba(255, 255, 255, .6);
        &.darkBg{
            background-color: rgba(0, 0, 0, .4);
        }
    }
    .content{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: .3s;
        z-index: 999999;
        text-align: center;
    }
    .loading-box {
        img{
            width: 120px;
            margin-bottom: 20px;
            animation: rotating 1s steps(12, end) infinite;
        }
        p{
            color: #999;
        }
    }
    .error-box{
        width: 480px;
        overflow: hidden;
        border-radius: 18px;
        background-color: #fff;
        backface-visibility: hidden;
        img{
            width: 480px;
        }
        p{
            font-size: 28px;
            color: #666;
            margin: 30px;
        }
        button{
            width: 280px;
            height: 90px;
            border-radius: 48px;
            line-height: 90px;
            background: #5694D1;
            color: #fff;
            border: 0;
            font-weight: bold;
            font-size: 36px;
            margin-bottom: 40px;
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


