<template>
    <Icon class="wrap" scan @click="nativeScan">
      <input v-if="h5" type="file" accept="image/*" @change="h5Scan">
    </Icon>
  </template>
  <script>
  export default {
    name: 'HqScan',
    components: {
      HqIcon
    },
    props: {
      h5: {
        type: Boolean,
        default: () => false
      }
    },
    methods: {
      nativeScan () {
        if (!this.h5) {
          window.getBank().then(res => {
            this.report(JSON.parse(res))
          }).catch(console.error)
        }
      },
      // 读取并压缩，然后上传并识别图片
      h5Scan ($event) {
        const file = $event.target.files[0]
        let file = e.target.files[0];
        this.fileReader(file)
          .then(image => Promise.resolve(this.compress(file, img)))
          .then(img => Promise.all([this.recognition(img), this.upload(img)]))
          .then(this.merge)
          .then(this.report, toast)
      },
      upload (file) {
        return fetch(API.UPLOAD, { file }).then(({ url: [url] }) => {
          return Promise.resolve(url)
        }, this.reject)
      },
      recognition (image) {
        // OCR 识别：将图片信息发给后端即可
        return this.axios.post(API.OCR.BANK, { image }).then(({ data }) => {
          const code = data['rsp_code']
          if (code === '0000') {
            return Promise.resolve(data)
          } else if (code === '1111') {
            return Promise.reject(data['error_msg'])
          } else {
            return Promise.reject('银行卡识别失败')
          }
        })
      },
      merge ([info, cardImgUrl]) {
        toast('扫描成功')
        return Promise.resolve({ ...info, cardImgUrl })
      },
      reject (data) {
        return Promise.reject(data)
      },
      report (data) {
        this.$emit('scan', data)
      },
      toast(text){
        toast.show({ 
          width: '200px', 
          type: 'text',
          text
        })
      }
    }
  }
  </script>
  <style lang="less">
  .wrap {
    position: relative;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      -webkit-appearance: button;
      opacity: 0;
    }
  }
  </style>

  