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
               
                <div class='msg'  v-show='isSearching'>
                     <div @click='isSearching = false'>
                        取消
                    </div>
                </div>
                <div v-if='!isSearching' style='font-size:.5rem;color:#666'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingjia"></use>
                    </svg>
                </div>
        </div> 
        <transition name='searchList'>
            <div class='search-block' v-if='isSearching'>
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
        <scroll :data='maleitem' class='index-scroll' ref='scroll'>
            <div>
                <div class='swipe-wrap'>
                    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                        <swiper-slide v-for='(item,index) in banner' :key="index">
                            <img :src='item.banner' alt="">
                        </swiper-slide>
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
                <swiper :options='hOptions' class='n-h-s'>
                    <swiper-slide class='wrap'>
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
                    </swiper-slide>
                    <swiper-slide class='wrap'>
                    <router-link tag='div' to='/bargain' class='h-wiper-item' ref='items'>
                        <div class='icon'>
                            <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-kanjia-"></use>
                            </svg>
                            </div>
                        </div>
                        <div class='txt'>砍价</div>
                    </router-link>
                    </swiper-slide>
                    <swiper-slide class='wrap'>
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
                    </swiper-slide>
                    <swiper-slide class='wrap'>
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
                    </swiper-slide>
                    <swiper-slide class='wrap'>
                    <router-link tag='div' to='/hyh' class='h-wiper-item'>
                        <div class='icon'>
                            <div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiaoyuan"></use>
                            </svg>
                            </div>
                        </div>
                        <div class='txt'>滑一滑</div>
                    </router-link>
                    </swiper-slide>
                    <swiper-slide class='wrap'>
                        <router-link tag='div' to='/movie' class='h-wiper-item'>
                            <div class='icon'>
                                <div>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xiaoyuan"></use>
                                </svg>
                                </div>
                            </div>
                            <div class='txt'>微电影</div>
                        </router-link>
                    </swiper-slide>
                    <swiper-slide class='wrap'>
                        <router-link tag='div' to='/tkl' class='h-wiper-item'>
                            <div class='icon'>
                                <div>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xiaoyuan"></use>
                                </svg>
                                </div>
                            </div>
                            <div class='txt'>淘口令</div>
                        </router-link>
                    </swiper-slide>
                </swiper>
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
                            <div class='navitem' data-type='1' @click='toggle(1)'>
                                <span :class='{"active":ismale}'>
                                    男生精选
                                </span>
                            </div>
                            <div class="navitem" date-type='2' @click='toggle(2)'>
                                <span :class='{"active":!ismale}'>女生精选</span>
                            </div>
                        </div>
                        <transition name='indexBox' mode='out-in'>
                            <div class='c-d-wrap' v-if='ismale'>
                                <div class='act-item' v-for='(v,i) in maleitem' :key="i">
                                    <div class='c-d-banner'>
                                        <img v-lazy="v.img" alt="">
                                    </div>
                                    <swiper :options='hOptions' class='h-show'>
                                        <swiper-slide class='showitem' v-for='(item,index) in v.goodsList' :key="index" @click.native='goToGoodsDetail(item)'>
                                            <img v-lazy="item.imgMain">
                                            <span>￥{{item.sellingPrice}}</span>
                                        </swiper-slide>
                                        <swiper-slide class='showitem last'>
                                            <router-link to='/' tag='div' class='box'>
                                                    <div class='red'>
                                                        查看全部
                                                    </div>
                                                    <div class='gray'>
                                                        See more
                                                    </div>
                                            </router-link> 
                                        </swiper-slide>
                                    </swiper>
                                </div> 
                            </div>
                        </transition>
                        <transition name='indexBox' mode='out-in'>
                            <div class='c-d-wrap' v-if='!ismale'> 
                                <div class='c-d-wrap'>
                                    <div class='act-item' v-for='(v,i) in fmaleitem' :key="i">
                                        <div class='c-d-banner'>
                                            <img v-lazy="v.img" alt="">
                                        </div>
                                        <swiper :options='hOptions' class='h-show'>
                                            <swiper-slide class='showitem' v-for='(item,index) in v.goodsList' :key="index">
                                                <img v-lazy="item.imgMain">
                                                <span>￥{{item.sellingPrice}}</span>
                                            </swiper-slide>
                                            <swiper-slide class='showitem last'>
                                                <router-link to='/' tag='div' class='box'>
                                                <div class='red'>
                                                    查看全部
                                                </div>
                                                <div class='gray'>
                                                    See more
                                                </div>
                                                </router-link> 
                                                </swiper-slide>
                                        </swiper>
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
    activated(){
        this.$refs.scroll.refresh()
    },
    created(){
        this.axios.get('/api/index/getBaannerList?type=1').then(res => {
            this.banner = res.data.obj;
        });
        this.axios.get('/api/index/getProGoodsList?type=0').then(res => {
            if(res.data.code !== 'success') return false;
            this.maleitem = res.data.obj.filter(v => {
                return v.goodsList && v.goodsList.length > 0    
            });
        });
        this.axios.get('/api/index/getProGoodsList?type=1').then(res => {
            if(res.data.code !== 'success') return false;
            this.fmaleitem = res.data.obj.filter(v => {
                return v.goodsList && v.goodsList.length > 0
            })
        });
    },
    methods:{
        _formatProGoodsList(arr){
            let map = {};
            arr.forEach(v => {
                const key = v.pro_id;
                if(!map[key]) {
                    map[key] = {
                        pro_id:key,
                        items:[],
                    }
                };
            });
            let _arr = Object.values(map).map(v => {
                    return v;
            });
            _arr.forEach(v => {
                for(let i of arr){
                    if(i.pro_id == v.pro_id){
                        v.items.push(i);
                    }
                }
            });
        },
        goToGoodsDetail(item){
            this.$router.push({
                path:`/good/${item.id}`
            })
        },
        toggle(i){
            setTimeout(() => {
                 this.$refs.scroll.refresh();
            },700)
            if(i == 1){
                this.ismale = true;
            } else if(i == 2) {
                this.ismale = false;                
            };
            
        }
    },
    data() {
      return {
        banner:[],
        notNextTick: true,
        swiperOption:{
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop:true,
            autoplay:2000
        },
        hOptions:{
            slidesPerView:'auto',
            direction:'horizontal',
        },
        ismale:true,
        maleitem:[],
        fmaleitem: [],
        isSearching:false
      };
    },
};
</script>

<style lang="stylus" scoped>
.swiper-slide
    height 4.4rem!important

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
    position absolute
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
            height 4.4rem
            overflow hidden 
            .swiper-wrapper
                width 100%
                img 
                    width 100%
                    height 100%
        .n-h-s
            height 2.8rem
            width : 100vw
            overflow: hidden
            .wrap
                width 1.3333rem 
                margin 0 0.4667rem
                &:nth-child(1) 
                    .icon
                        background #ff7c7b
                        color #fff                        
                &:nth-child(2) 
                    .icon
                        background #5bc994
                        color #fff
                &:nth-child(3) 
                    .icon
                        background #f78db7
                        color #fff
                &:nth-child(4) 
                    .icon
                        background #f89a67
                        color #fff
                &:nth-child(5) 
                    .icon
                        background #bb67f8
                        color #fff
                &:nth-child(6) 
                    .icon
                        background #e3c734
                        color #fff
                &:nth-child(7) 
                    .icon
                        background #34b1e3
                        color #fff
                .h-wiper-item
                    width 1.3333rem 
                    height 2.8rem
                    display flex 
                    flex-direction column 
                    box-sizing border-box
                    padding .2rem 0
                    justify-content space-around
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
        margin 0.2667rem 0
        .showitem
            font-size: 0.3333rem;
            width 1.8rem
            height 2.3067rem !important
            margin-right 0.2rem
            display flex 
            flex-direction column
            text-align center
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
