<template>
    <div class='index-wrap'>
        <div class='search-wrap'>
        <div class='search-input'>
                <div class='s-svg'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </div>
                <div class='input-wrap'>
                    <input type='text' placeholder='搜索' @click='isSearching = true'>
                </div>
                </div> 
               
                <div class='msg'  v-if='isSearching'>
                     <div @click='isSearching = false'>
                        取消
                    </div>
                </div>
                <div v-else style='font-size:.5rem;color:#666'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingjia"></use>
                    </svg>
                </div>
        </div> 
        <transition name='searchList'>
            <div class='search-block' v-show='isSearching'>
                <div class='near'>
                    <div class='title'>
                        最近搜索
                    </div>
                    <div class='itemwrap'>
                        <div class="item">
                            第一个
                        </div>
                        <div class="item">
                            第一个
                        </div>
                        <div class="item">
                            第一个
                        </div>
                    </div>
                </div>
                <div class='history'>
                    <div class='title'>
                        热门搜索
                    </div>
                    <div class='itemwrap'>
                        <div class="item">
                            第一个
                        </div>
                        <div class="item">
                            第一个
                        </div>
                        <div class="item">
                            第一个
                        </div>
                    </div>
                </div>
            </div>  
        </transition>
        <scroll :data='fmaleitem' class='index-scroll' ref='scroll'>
            <div>
                <div class='swipe-wrap'>
                    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                        <swiper-slide v-for='(item,index) in banner' :key="index">
                            <img :src='item.banner' alt="">
                        </swiper-slide>
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
                <div class='horizontal-swiper' ref='hSwipe'>
                    <div class='hSwipe-wrap'>
                    <router-link tag='div' to='/coupon' class='h-wiper-item'>
                        <div class='icon'>
                            <div>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-icon-test"></use>
                                </svg>
                            </div>
                        </div>
                        <div class='txt'>红包区</div>
                    </router-link>
                    <router-link tag='div' to='/bargain' class='h-wiper-item'>
                        <div class='icon'>
                            <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-kanjia-"></use>
                            </svg>
                            </div>
                        </div>
                        <div class='txt'>砍价</div>
                    </router-link>
                    <router-link tag='div' to='/lover' class='h-wiper-item'>
                        <div class='icon'>
                            <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xin1"></use>
                            </svg>
                            </div>
                        </div>
                        <div class='txt'>情侣馆</div>
                    </router-link>
                    <router-link tag='div' to='/sales' class='h-wiper-item'>
                        <div class='icon'>
                            <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiaoyuan"></use>
                            </svg>
                            </div>
                        </div>
                        <div class='txt'>校园9.9</div>
                    </router-link>
                    <div class='h-wiper-item'>
                        <div class='icon'>
                            <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-hongbao"></use>
                            </svg>
                            </div>
                        </div>
                        <div class='txt'>哗哗哗</div>
                    </div>
                    </div>
                </div>
                <div class='line'></div>
                <div class='section index1'>
                    <router-link to='/dorm' tag='div' class='index-choose-wrap'>
                        <img src="../.././assets/img/item1.png" alt="">
                    </router-link>
                    <router-link to='/fashion' tag='div' class='index-choose-wrap'>
                        <img src="../.././assets/img/item2.png" alt="">
                    </router-link>
                </div>
                <div class='update'>
                    <div class='update-title'>
                        本期更新
                    </div>
                    <div class='update-content'>
                        <div class='nav'>
                            <div class='navitem' @click='ismale = true'>
                                <span :class='{"active":ismale}'>
                                    男生精选
                                </span>
                                
                            </div>
                            <div class="navitem" @click='ismale = false'>
                                <span :class='{"active":!ismale}'>女生精选</span>
                            </div>
                        </div>
                        <transition name='indexBox' mode='out-in'>
                        <div class='c-d-wrap' v-if='ismale'> 
                            <div class='c-d-banner'>
                                <img src="../.././assets/img/c-d-banner1.png" alt="">
                            </div>
                            <div class='h-show'>
                                <div class='showitem' v-for='(item,index) in maleitem' :key="index" v-if='index<5'>
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <span>￥{{item.price}}</span>
                                </div>
                            </div>
                            <div class='c-d-banner'>
                                <img src="../.././assets/img/c-d-banner1.png" alt="">
                            </div>
                            <div class='h-show'>
                                <div class='showitem' v-for='(item,index) in maleitem' :key="index" v-if='index>=5'>
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <span>￥{{item.price}}</span>
                                </div>
                                <div class='showitem last'>
                                    <router-link to='/' tag='div' class='box'>
                                        <div class='red'>
                                            查看全部
                                        </div>
                                        <div class='gray'>
                                            See more
                                        </div>
                                    </router-link> 
                                </div>
                            </div>
                        </div>
                        </transition>
                        <transition name='indexBox' mode='out-in'>
                        <div class='c-d-wrap' v-if='!ismale'> 
                            <div class='c-d-banner'>
                                <img src="../.././assets/img/c-d-banner2.png" alt="">
                            </div>
                            <div class='h-show'>
                                <div class='showitem' v-for='(item,index) in fmaleitem' :key="index" v-if='index<5'>
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <span>￥{{item.price}}</span>
                                </div>
                            </div>
                            <div class='c-d-banner'>
                                <img src="../.././assets/img/c-d-banner2.png" alt="">
                            </div>
                            <div class='h-show'>
                                <div class='showitem' v-for='(item,index) in fmaleitem' :key="index" v-if='index>=5'>
                                    <img src="../.././assets/img/good-item.png" alt="">
                                    <span>￥{{item.price}}</span>
                                </div>
                                <div class='showitem last'>
                                    <router-link to='/' tag='div' class='box'>
                                        <div class='red'>
                                            查看全部
                                        </div>
                                        <div class='gray'>
                                            See more
                                        </div>
                                    </router-link> 
                                </div>
                            </div>
                        </div>
                        </transition>
                    </div>
                </div>                
            </div>
        </scroll>
    </div>
</template>


<script>
import scroll from "common/scroll";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Bscroll from 'better-scroll'


export default {
  components: {
    scroll,
    swiper,
    swiperSlide
  },
  created(){
      this.axios.get('/api/getBaannerList').then(res => {
          console.log(res.data);
          res.data.forEach(v => {
                v.banner = `http://10.0.0.23:8181${v.banner}`
          });
          console.log(res.data);
          this.banner = res.data
      })
  },
  mounted() {
      this.$nextTick(() => {
          this._inithScroll();
          setTimeout(() => {
              this.$refs.scroll.refresh()
          },20)
      })
  },
  data() {
    return {
      banner:[],
      notNextTick: true,
      swiperOption:{
          pagination: '.swiper-pagination',
          paginationClickable: true,
      },
      ismale:true,
      maleitem:[{
          price:1111
      },{
          price:2222
      },{
          price:3333
      },{
          price:4444
      },{
          price:5555
      },{
          price:6666
      },{
          price:7777
      },{
          price:8888
      },{
          price:9999
      }],
      fmaleitem: [{
          price:'女'
      },{
          price:'女'
      },{
          price:'女'
      },{
          price:'女'
      },{
          price:'女'
      },{
          price:'女'
      },{
          price:'女'
      },{
          price:'女'
      },{
          price:'女'
      }],
      isSearching:false
    };
  },
  methods:{
      _inithScroll(){
          if(!this.scroll) {
              this.scroll = new Bscroll(this.$refs.hSwipe,{
                    click: true,
                    startX: 0,
                    scrollX: true
                })
          } else {
              this.scroll.refresh();
          }
      }
  }
};
</script>

<style lang="stylus" scoped>
@css{
    .indexBox-enter-active, .indexBox-leave-active {
        transition: opacity .5s
    }
    .indexBox-enter, .indexBox-leave-to {
        opacity: 0
    }
    .searchList-enter-active, .searchList-leave-active {
        transition: all .3s
    }
    .searchList-enter, .searchList-leave-to{
        transform :translate3d(0,100%,0)
    }
}

.block
    width 100%
    height 0.9333rem

.line
    width 100%
    height 0.1333rem
    background-color #e7e7e7
.search-block
    width 100%
    height 100%
    background #fff
    position fixed
    top 0.93rem
    left 0
    z-index 999
    border 1px solid #666
    box-sizing border-box
    padding 0.2667rem 0.3333rem
    .near   
        .title
            font-size .35rem
            color #989898
        .itemwrap
            margin 0.2667rem 0
            display flex
            flex-wrap wrap
            .item 
                height 0.6667rem
                box-sizing border-box
                line-height 0.6667rem
                border 0.0133rem solid #555
                border-radius 0.3333rem
                padding 0 .2rem
                margin-right  .3rem
    .history
        .title
            font-size .35rem
            color #989898
        .itemwrap
            margin 0.2667rem 0
            display flex
            flex-wrap wrap
            .item 
                height 0.6667rem
                box-sizing border-box
                line-height 0.6667rem
                border 0.0133rem solid #555
                border-radius 0.3333rem
                padding 0 .2rem
                margin-right  .3rem    
.search-wrap
    height 0.93rem
    overflow hidden
    background-color rgba(0,0,0,.1)
    display flex
    box-sizing border-box
    padding  0 .3rem
    align-items center
    justify-content space-around

.msg
    height 0.8rem
    z-index 99
    top 0.1333rem
    right 3%
    flex 0 0 1.5333rem
    display flex
    align-items center
    justify-content center
    font-size 0.34rem
    color #fff
    border-radius 0.1333rem
    background #fc7aa5
.search-input
    height 0.6667rem
    flex 1
    top 0.1333rem
    left 5%
    background #fff
    z-index 99
    border 1px solid #e7e7e7
    border-radius 0.333rem
    display flex
    font-size 0.4rem
    overflow hidden
    margin-right 15px
    .input-wrap
        flex 1
        input
            width 100%
            height 100%
            font-size 0.4rem
    .s-svg
        text-align center
        flex 0 0 0.8rem
        line-height 0.6667rem
        .icon 
            color #666

.index-wrap
    height 90vh
    width:100%
    display flex
    flex-direction column
    .index-scroll
        flex 1
        height 100%
        overflow hidden
        .swipe-wrap
            width 100vw
            overflow hidden 
            img 
                width 100%
        .horizontal-swiper
            height 2.8rem
            width : 100%
            overflow hidden
            .hSwipe-wrap
                height 2.8rem
                width 11rem
                overflow hidden
                display flex
                .h-wiper-item
                    display flex
                    flex-direction column
                    justify-content space-around
                    flex 0 0 1.3333rem 
                    margin 0 0.4667rem
                    &:nth-child(1) .icon
                        background #ff7c7b
                        color #fff
                    &:nth-child(2) .icon
                        background #5bc994
                        color #fff
                    &:nth-child(3) .icon
                        background #f78db7
                        color #fff
                    &:nth-child(4) .icon
                        background #f89a67
                        color #fff
                .icon
                    width 100%
                    height 1.3333rem
                    border-radius 50%
                    div 
                        width 50%
                        margin 0 auto
                .txt
                    text-align center
                    font-size 0.3333rem

.index1
    width 100%
    display flex
    box-sizing border-box
    padding 0.1333rem
    justify-content space-between
    .index-choose-wrap
        width 4.8rem 
        img 
            width 100%

.update
    .update-title
        text-align center
        background-color #f3f3f3
        font-size 0.4rem
        padding 0.2rem 0
        font-weight 500
    .update-content
        .nav
            height 1.1467rem
            display flex
            border-bottom 0.0133rem solid #f3f3f3
            .navitem
                width 50%
                align-self center
                text-align center
                span
                    display inline-block
                    height 1.1467rem
                    line-height 1.1467rem
                    font-size 0.4rem
                    transition all .5s
                    &.active
                        color #fc7aa5
                        border-bottom 1px solid #fc7aa5

.c-d-wrap
    box-sizing border-box
    padding 0.1333rem
    .c-d-banner
        width 100%
        border-radius 5px
        overflow hidden
        position relative
        &:before
            width 0.5333rem
            height 0.5333rem
            content ''
            background #ffffff
            position absolute
            left 50%
            transform translateX(-50%) rotate(45deg) 
            bottom -0.2667rem           
        img 
            width 100%
    .h-show
        display flex
        justify-content space-between
        text-align center
        font-size: 0.3333rem;
        margin 0.1333rem 0
        .showitem
            width 1.8rem
            height 2.3067rem
            display flex 
            flex-direction column
            justify-content space-between
            &.last
                justify-content center
            .box
                height 1.8rem
                border 1px solid #e7e7e7
                border-radius 5px
                display flex
                flex-direction column
                justify-content center
                .red
                    color #f55f3c
                    display inline-block
                    margin 0 0.1333rem
                    padding-bottom 0.2rem
                    border-bottom 0.0133rem solid #b8b8b8
                .gray
                    padding-top 0.2rem
            img
                width 100%
</style>
