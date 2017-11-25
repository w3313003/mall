<template>
    <div class='lover-wrap'>
        <div class='swipe-wrap' ref='swipe'>
            <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                <swiper-slide>
                    <img src='../.././assets/img/banner.png' alt="">
                </swiper-slide>
                <swiper-slide>
                    <img src='../.././assets/img/banner.png' alt="">
                </swiper-slide>
                <swiper-slide>
                    <img src='../.././assets/img/banner.png' alt="">
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <scroll class='scroll' ref='scroll' :data='goodList'>
            <goodList :goodList='goodList' @getTodetail='getTodetail'></goodList>
        </scroll>  
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
    created(){
        this.axios.get('/api/activity/getActivityList?type=2').then(res => {
            res.data.obj.forEach(v => {
                v.imgMain = `http://10.0.0.22:8181${v.imgMain}`
            });
            this.goodList = res.data.obj
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
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.lover-wrap
    position fixed
    height 100vh
    width  100%
    overflow hidden
    z-index 999
    background-color #fff
    display flex
    flex-direction column
    .swipe-wrap
        width 100%
        img 
            width 100%
    .scroll
        flex 1
        height 100%
        overflow hidden
</style>
