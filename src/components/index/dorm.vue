<template>
    <div class='dorm-wrap'>
        <div class='title'>
            寝室装饰    
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>  
        <div class='video-wrap'>
            <video controls :src="videoSrc"></video>
        </div>
        <div class='banner'>
            <img src="../.././assets/img/d-banner.png" alt="">
        </div>
        <div class='slogan'>
            有你搭配
        </div>
        <div class='content'>
            <nav>
                <div :class='{"active":currentIndex == 0}' data-index='0' @click='toggleNav'>寝室换肤</div>
                <div :class='{"active":currentIndex == 1}' data-index='1' @click='toggleNav'>寝室饰物</div>
                <div :class='{"active":currentIndex == 2}' data-index='2' @click='toggleNav'>床上搭配</div>
                <div :class='{"active":currentIndex == 3}' data-index='3' @click='toggleNav'>居寝日用</div>
            </nav>
            <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide>
                    <goodList :goodList='goodLists'>
                    </goodList>    
                </swiper-slide>
                <swiper-slide>
                    <goodList :goodList='goodLists'>
                    </goodList>    
                </swiper-slide>
                <swiper-slide>
                    <goodList :goodList='goodLists'>
                    </goodList>    
                </swiper-slide>
                <swiper-slide>
                    <goodList :goodList='goodLists'>
                    </goodList>    
                </swiper-slide>
            </swiper>
        </div>
    </div>    
</template>

<script>
import goodList from 'common/goodList'
import { moocgoodList} from 'common/util'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components:{
        goodList,
        swiper,
        swiperSlide
    },
    created(){
        this.axios.get('/api/getBedRoomVideo').then(res => {
            console.log(res.data.obj)
            this.videoSrc = res.data.obj[0].bedroomVideo = `http://10.0.0.22:8181${res.data.obj[0].bedroomVideo}`;
            console.log(this.videoSrc)
        })
    },
    methods:{
        toggleNav(e){
            const index = e.currentTarget.dataset.index;
            this.currentIndex = index;
            this.$refs.mySwiper.swiper.slideTo(index)
        },
        back(){
            this.$router.back();
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
            currentIndex:0
        }
    }
}
</script>

<style lang="stylus" scoped>
.dorm-wrap
    width 100%
    height 90vh
    overflow scroll
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        background #fff
        color #fc7aa5
        text-align center
        font-size 0.4rem
        position relative
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
        height 4rem
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
</style>
