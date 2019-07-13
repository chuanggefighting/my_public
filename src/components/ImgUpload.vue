<template>
  <div class="img-upload-box">
      <slot></slot>
      <input ref="upload_input" type="file" accept="image/*" capture="camera" name="file"
          v-show="false"
          @change="changeImg" /> 
  </div>
</template>
<script>
export default {
  props: {
    fileList: {
      type: Array,
      default: []
    }
  },
  methods: {
    // 
    /**
     * 父组件：<img-upload ref="imgUpload" :fileList="fileList" @updateFileList="updateFileList"></img-upload>
     * 调用子组件方法： this.$refs.imgUpload.input_click()
     * 
     */
    input_click(){
      // 模拟点击调用
      this.$refs.upload_input.click()
    },
    async changeImg(){
      let file = this.$refs.upload_input.files[0]
      if(!file) return

      const index = this.fileList.findIndex(item => item.name == file.name)
      if(index>-1) return

      let base64ImgData = await this.fileReader(file)

      // 根据原始图片大小判断是否需要压缩：size 是字节数，1MB = 1024KB，1KB = 1024字节
      if(file.size > this.max_size * 1024){
        this.compressImg(base64ImgData, file.name)
      }else{
        this.$emit("updateFileList", file, base64ImgData)
      }
    },
    // 获取用户拍照的图片信息
    fileReader (file) {
      let _this = this
      let reader = new FileReader()
      reader.readAsDataURL(file)
      // 监听读取操作结束
      return new Promise(resolve => reader.onloadend = () => { return resolve(reader.result) })
    },
    // 压缩图片
    compressImg(bdata, name){
        var _this = this
        var quality = 0.8;   // 压缩质量：0.1 时最小压缩
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        var img = new Image();
        img.src = bdata;
        img.onload = function(){
            canvas.width = _this.targetWidth;
            canvas.height = _this.targetWidth * (img.height / img.width);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 压缩后的 base64 图片
            var cdata = canvas.toDataURL("image/jpeg", quality);

            // 压缩率
            var oldImgLen = bdata.length;
            var newImgLen = cdata.length;
            var compresRadio = (((oldImgLen-newImgLen)/oldImgLen*100).toFixed(2))+'%';
            
            // 压缩后的文件格式
            let newFile = _this.dataURLtoFile(cdata, name);
            _this.$emit("updateList", newFile, cdata);
        }
    },
    // base64 转 file
    dataURLtoFile(dataurl, filename){
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }
  }
}
</script>
<style lang="scss">


</style>



