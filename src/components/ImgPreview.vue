
<template>
  <div class="img-preview" v-if="PREVIEWER">
     <img :src="PREVIEWER" alt="" @click="closeView">
  </div>
</template>
<script>
/**
 * main.js
 * Vue.directive('previewer', {
    bind(el, binding, vnode){
      el.addEventListener("click", function(){
        store.commit('showPreview', binding.value)
      })
    }
  })

  v-previewer="base64Url"
 */

import {mapState} from 'vuex'
export default {
  name: "preview",
  computed:{
    ...mapState([
        'PREVIEWER'
    ])
  },
  methods: {
    closeView(){
      this.$store.commit('hidePreview')
    }
  },
}
</script>
<style lang="scss">
.img-preview{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  background: #000;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 100%;
    height: auto;
    max-height: 100%;
  }
}

</style>




