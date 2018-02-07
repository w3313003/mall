<template>
    <div class='dorm-wrap'>
        <div class='title'>
            寝室装饰    
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>  
        <div class="wrap">
            <div class='video-wrap'>
                <videoPlayer
                    class="video vjs-big-play-centered"
                    :options="videoInfo"
                />
            </div>
            <div class='banner' @click="goTop">
                <img src="../.././assets/img/d-banner.png" alt="">
            </div>
            <div class='slogan'>
                有你搭配
            </div>
            <div class='content'>
                <nav>
                    <div :class='{"active":currentIndex == i}' :data-index='i' @click='toggleNav' v-for="(v,i) in b_List" :key="i">
                        {{v.areaName}}
                    </div>
                </nav>
                <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                    <swiper-slide v-for="(v,i) of b_List" :key="i">
                        <div v-if="v.goosList">
                            <goodList :goodList='v.goosList'>
                            </goodList>    
                        </div>
                        <div v-else class="empty"> 
                            <div class='empty-content'>
                        <img src='../../assets/img/empty.gif'/> 
                        <p class='desc'> 
                            你的购物车空空如也
                        </p>
                        <div class='btn' @click='goIndex'>
                            去逛逛
                        </div> 
                    </div> 
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <transition name="fade">
                <dType v-if="getTop" :goods='t_Info'
                @back='getTop = false'>
                </dType>
            </transition>
            
        </div>
    </div>    
</template>

<script>
import goodList from 'common/goodList'
import { moocgoodList} from 'common/util'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import dType from './dormType'
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";


export default {
    components:{
        goodList,
        swiper,
        swiperSlide,
        dType,
        videoPlayer
    },
    created() {
        this.axios.get('/api/bedroomDecoration/getBedRoomVideo').then(res => {
            this.videoInfo =  {
                playsinline: true,
                x5Playsinline:true,
                webkitPlaysinline: true,
                muted: false,
                language: "zh",
                controls: true,
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                preload: "auto",
                "vjs-big-play-centered": true,
                sources: [
                  {
                    type: "video/mp4",
                    src: res.data.obj[0].bedroomVideo
                  }
                ],
                poster: res.data.obj[0].img
            }
        });
        this.axios.get('/api/bedroomDecoration/getZoneNavBar').then(res =>  {
            res.data.obj.forEach(v => {
                v.statu != 0 ? this.b_List.push(v) : this.t_Info = v; 
            });
        });
    },
    methods:{
        toggleNav(e){
            const index = e.currentTarget.dataset.index;
            this.currentIndex = index;
            this.$refs.mySwiper.swiper.slideTo(index)
        },
        back() {
            this.$router.back();
        },
        goTop() {
            this.$router.push('/dorm/top')
        },
        goIndex() {
            this.$router.push('/index');
        }
    },
    data(){
        return {
            videoSrc:'',
            goodLists: moocgoodList,
            notNextTick: true,
            swiperOption:{
                paginationClickable: true,
                onSlideChangeEnd:s => {
                    this.currentIndex = s.activeIndex;
                }
            },
            currentIndex:0,
            goodsList:[],
            b_List:[],
            t_Info:{},
            getTop: false,
            videoInfo:{}
        }
    }
}
</script>

<style lang="stylus" scoped>
.dorm-wrap
    width 100%
    height 90%
    overflow hidden
    position absolute
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        background #fff
        color #fc7aa5
        text-align center
        font-size 0.4rem
        position absolute
        top 0
        z-index 2
        width 100%
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
    .video-wrap
        width 100%
        overflow hidden
        video 
            width 100%
            height 100%
    .banner
        box-sizing border-box
        padding 0.3333rem
        img
            width 100%
            height 4rem
            display block
            border-radius 0.2rem
    .slogan
        background #e7e7e7
        height 0.8rem
        line-height 0.8rem
        text-align center
        color #a4a4a4
        font-size 0.35rem
        position relative
        &:before,&:after
            content ''
            position absolute
            height 0.0267rem
            background-color #a4a4a4
            width 35vw
            top 50%
            transform translateY(-50%)
        &:before
            left 0.2rem
        &:after
            right 0.2rem
    .content
        nav
            display flex
            height 1.2rem
            align-items center
            font-size 0.4rem
            justify-content space-around
            border-bottom 0.0133rem solid #e7e7e7
            & > div
                height 100%
                display flex
                align-items center
                &.active
                    color #fc7aa5
                    border-bottom 0.0133rem solid #fc7aa5

.wrap
    overflow scroll
    height 100%
    box-sizing border-box
    padding-top 1.1333rem
    -webkit-overflow-scrolling: touch;

.tips
    font-size .45rem
    text-align center
    margin  0.2667rem auto

.fade-enter-active,.fade-leave-active
    transition all .5s
.fade-enter,.fade-leave-to
    transform  translate3d(100%,0,0)
    opacity  0

.empty
    width 100%
    height 8rem
    background #e7e7e7
    position relative
    .empty-content
        position absolute
        width 3.8rem
        left 50%
        top 50%
        text-align center
        transform translate(-50%,-50%)
        img
            width 100%
            height 2.5rem
        .desc
            color #989898
            font-size .35rem
            margin .2rem 0
        .btn
            width 75%
            font-size .35rem
            text-align center
            display inline-block
            padding .15rem 0
            background #fc7aa5
            color #fff
            border-radius 0.625rem

</style>
