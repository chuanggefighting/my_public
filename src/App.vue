<template>
  <div id="app">
    <div id="nav">
      <router-link to="/product-buy">产品购买</router-link>
      <router-link to="/payment">理赔申请</router-link>

      <router-link :to="{ path: '/info-service', query: { activeRoute: '/amendment' } }">修改/补录</router-link>
      <router-link :to="{ path: '/info-service', query: { activeRoute: '/cancelation' } }">取消服务</router-link>
      <router-link :to="{ path: '/info-service', query: { activeRoute: '/claimNo' }  }">理赔资料上传</router-link>
      <router-link :to="{ path: '/info-service', query: { activeRoute: '/policy-detail' }  }">保单详情</router-link>
    </div>
    <loading-view v-if="LOADING.status > 0" :status="LOADING.status" :errorMsg="LOADING.msg"></loading-view>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import LoadingView from './components/LoadingView'
export default {
  data () {
    return {
    }
  },
  computed:{
    ...mapState([
        'LOADING'
    ])
  },
  methods: {
  },
  components: {
    LoadingView
  },
  // 刷新网页后 vuex 的state 数据丢失的解决方案
  created(){
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }

    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>


<style lang="less">
@import "./assets/css/reset.css";
@import "./assets/css/public.less";
@import '~vux/src/styles/index.less';

body{
  font-size: 28px;
  background: #fbfbfb;
}
#nav {
  padding: 30px;
  a {
    font-size: 30px;
    font-weight: bold;
    color: #2c3e50;
    margin-right: 20px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>

