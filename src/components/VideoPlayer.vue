<template>
  <div class="video-player">
    <video
      ref="video"
      autoplay
      preload
      disablePictureInPicture
      controlslist="nodownload nofullscreen"
      playsinline
      webkit-playsinline
      x5-video-player-type="h5"
      @play="isPaused = false"
      @pause="isPaused = true"
      @contextmenu="handleContext"
      @fullscreenchange="handleFullScreenChange"
    ></video>
    <img 
      width="60" 
      src="images/icon-play.png" 
      @click="playVideo" 
      class="{'shown': isPaused}" />
    <video-control v-if="video" :video="video" />
  </div>
</template>
<script>
import VideoControl from "@/components/Controls.vue";
export default {
  name: "video-player",
  components: { VideoControl },
  data() {
    return {
      video: null,
      isPaused: true,
      curIndex: 0,
      videoList: []
    };
  },
  methods: {
    playVideo(e) {
      let video = this.$refs.video;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    handleContext(e) {
      e.preventDefault();
    },
    onTap,
    handleFullScreenChange,
  },
  created(){
    this.getVideoUrl(0)
  },
  mounted() {
    this.onTap(this.$refs.video, this.playVideo);
    this.video = this.$refs.video;
    this.video.addEventListener("ended", () => {
      if (this.curIndex < this.videoList.length - 1) {
        this.curIndex++;
        this.$refs.video.src = res.value;
        this.$refs.video.play();
      }
    });
  }
}
function onTap(el, callback) {
  let touchStarted = false;
  el.addEventListener('touchstart', function (e) {
    touchStarted = true;
    setTimeout(() => {
      touchStarted = false
    }, 500)
  })
  el.addEventListener('touchmove', function (e) {
    touchStarted = false
  })
  el.addEventListener('touchend', function (e) {
    if (touchStarted) {
      callback(e)
    }
  })
}
</script>
<style lang="scss">
.video-player {
  position: relative;
  video {
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: #243c70;
    object-fit: fill;
  }
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    &.shown {
      opacity: 1;
    }
  }
}
</style>