<template>
   <div>
    <div id="test-swiper">
      <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
      </div>
      <div class="indicator">
        <slot name="indicator">
          <div v-for="(item, index) in slideCount"
               class="indi-item"
               :class="{active: index === currentIndex-1}"
               :key="index"></div><--key是为了防止复用不刷新-->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "test",
    props: {
      interval: {//定时器默认值
        type: Number,
        default: 3000,
      },
      animDuration: {//动画持续时间
        type: Number,
        default: 300,
      },
      moveRatio: {//移动到图片的多少进行翻页
        type: Number,
        default: 0.25
      },
      showIndicator: {//是否显示小圆点
        type: Boolean,
        default: true
      }
    },
    data: function (){
      return {
        slideCount: 0,//元素个数
        totalWidth: 0,//swiper的宽度
        swiperStyle: {},//swiper样式
        currentIndex: 1,//当前index
        scrolling: false,//是否在滚动
      }
    },
    mounted: function (){
      setTimeout(() => {
        this.handleDom();
        this.startTimer();
      },100)
    },
    methods: {
      setTransform: function (position){
        this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px,0,0)`;
      },
      handleDom: function (){
        let swiperEl = document.querySelector('.swiper');
        let slideEls = swiperEl.getElementsByClassName('slide');
        this.slideCount = slideEls.length;
        if(this.slideCount > 1){
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneFirst, slideEls[0]);
          swiperEl.appendChild(cloneLast);
          this.totalWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;
        }
        this.setTransform(-this.totalWidth);
      },
      touchStart: function (e){
        if(this.scrolling) return;
        this.stopTimer();
        this.startX = e.touches[0].pageX;
      },
      touchMove: function (e){
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;
        this.setTransform(moveDistance);
      },
      touchEnd: function (){
        let currentMove = Math.abs(this.distance);//绝对值
        if(this.distance === 0) {
          return
        }else if(this.distance > 0 && currentMove >this.totalWidth * this.moveRatio) {
          this.currentIndex--;
        }else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
          this.currentIndex++;
        }
        this.setTransform(-this.currentIndex * this.totalWidth)
      },
      startTimer: function (){
        this.playTimer = window.setInterval(() => {
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer: function (){
        window.clearTimeout(this.playTimer);
      },
      scrollContent: function (currentPosition) {
        this.scrolling = true;
        this.swiperStyle.transform = `transform `+ this.animDuration + 'ms';
        this.setTransform(currentPosition);
        this.checkPosition();
        this.scrolling = false;//防止滚动时拖动
      },
      checkPosition: function (){
        window.setTimeout(() => {
          this.swiperStyle.transition = '0ms';
          if(this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }else if(this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          //this.$emit('transitionEnd', this.currentIndex - 1);//个人觉得这一行无用
        },this.animDuration)//等待一个动画完成的时间再check
      }
    }
  }
</script>

<style scoped>
  #test-swiper{
    overflow: hidden;
    position: relative;
  }

  .swiper{
    display: flex;
  }

  .indicator{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }

</style>
