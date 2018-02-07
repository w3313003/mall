<template>
    <div class='lover-wrap'>
        <div class='swipe-wrap' ref='swipe'>
            <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide v-for='(item,i) of banner' :key="i">
                    <img :src='item.banner' alt="">
                </swiper-slide>
            </swiper>
        </div>
        <div class='scroll' ref='scroll'>
            <goodList :goodList='goodList' @getTodetail='getTodetail'></goodList>
        </div>  
    </div>
</template>

<script>
import scroll from 'common/scroll'
import goodList from 'common/goodList'
import { moocgoodList } from 'common/util.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components:{
        scroll,
        goodList
    },
    created() {
        this.axios.get('/api/index/getBaannerList?type=2').then(res => {
            this.banner = res.data.obj;
        })
    },
    activated(){
        this.axios.get('/api/activity/getActivityList?type=2').then(res => {
            this.goodList = res.data.obj;
        })
    },
    methods:{
        calcheight(){
            const wHeight = window.innerHeight,
                  ah = this.$refs.swipe.offsetHeight;
            this.$refs.scroll.$el.style.height = (wHeight - ah) + 'px'
        },
        getTodetail(item){
            this.$router.push({
                path: `/good_all/${item.id}`
            })
        }
    }, 
    mounted(){
        this.$nextTick(() => {
            setTimeout(() => {
                this.calcheight();
            },20)
            
        });
    },
    data(){
        return {
            goodList:[],
            notNextTick: true,
            swiperOption:{
                pagination: '.swiper-pagination',
                paginationClickable: true,
            },
            banner: []
        }
    }
}
</script>

<style lang="stylus" scoped>
.lover-wrap
    position fixed
    height 100%
    width 100%
    overflow hidden
    z-index 999
    background-color #fff
    .swipe-wrap
        position absolute
        width 100%
        height: 4.2rem;
        img 
            width 100%
            height 100%
    .scroll
        margin-top 4.2rem;
        height 100%
        overflow-x hidden;
        overflow-y scroll
        -webkit-overflow-scrolling: touch;


.swiper-slide
    height 100%

</style>
