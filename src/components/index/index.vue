<template>
    <div class='index-wrap'>
        <div class='search-wrap' ref='searchWrap'>
        <div class='search-input'>
                <div class='s-svg'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </div>
                <div class='input-wrap'>
                    <input type='text' 
                    placeholder='输入关键词按回车键进行搜索' 
                    v-model.trim="word" 
                    @keydown.enter="sendSearch" 
                    @click='goSearch'>
                </div>
                </div> 
                <div class='msg'  v-show='isSearching'>
                     <div @click='isSearching = false; word ="" '>
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
                <div class="searchList" v-if='word.length >= 1'>
                    <h5>搜索商品</h5>
                    <div v-if="searchGoodsList.length >= 1">
                        <div class="item" v-for='(item,index) in searchGoodsList' :key="index" @click="goToGoodsDetail(item)">
                            <span>
                                {{item.name}}
                            </span>
                        </div>
                    </div>
                    <div v-else>
                        暂无商品
                    </div>
                </div>
                <div v-else>
                    <div class='near'>
                        <div class='title'>
                            最近搜索
                        </div>
                        <div class='itemwrap' v-if='oldSearch.length > 0'>
                            <div  class="item" v-for='(item,index) in oldSearch' :key="index"
                                @click='search(item)'>
                                {{item.searchName}}
                            </div>
                            <div v-if='oldSearch.length < 1'>
                                暂无记录
                            </div>
                        </div>
                    </div>
                    <div class='history'>
                        <div class='title'>
                            热门搜索
                        </div>
                        <div class='itemwrap'>
                            <div class="item" v-for='(item,index) in hotSearch' :key="index">
                                {{item.searchName}}
                            </div>
                            <div v-if='hotSearch.length < 1'>
                                暂无记录
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </transition>
        <div class='index-scroll' ref='scroll'>
            <div>
                <div class='swipe-wrap' ref="swiper">
                    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
                        <swiper-slide v-for='(item,index) in banner' :key="index" @click.native='bannerAbout(item)'>
                            <img :src='item.banner' alt="">
                        </swiper-slide>
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
                <swiper :options='hOptions' class='n-h-s'>
                    <swiper-slide class='wrap'>
                    <router-link tag='div' @click.native="toCoupon" to='/coupon' class='h-wiper-item'>
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
                                <use xlink:href="#icon-Skiing"></use>
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
                                    <use xlink:href="#icon-dianying"></use>
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
                                    <use xlink:href="#icon-kouling"></use>
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
                                    <div class='c-d-banner' style="border-radius: .3rem;overflow:hidden">
                                        <img v-lazy="v.img" alt="" style="border-radius: .3rem;overflow:hidden" @click.stop="toAcDetail(v)">
                                    </div>
                                    <swiper :options='hOptions' class='h-show'>
                                        <swiper-slide class='showitem' v-for='(item,index) in v.goodsList' :key="index" @click.native='goToGoodsDetail(item)'>
                                            <img v-lazy="item.imgMain">
                                            <span>￥{{item.sellingPrice}}</span>
                                        </swiper-slide>
                                        <swiper-slide class='showitem last' @click.native="toAcDetail(v)">
                                            <div class='box'>
                                                    <div class='red'>
                                                        查看全部
                                                    </div>
                                                    <div class='gray'>
                                                        See more
                                                    </div>
                                            </div> 
                                        </swiper-slide>
                                    </swiper>
                                </div> 
                            </div>
                        </transition>
                        <transition name='indexBox' mode='out-in'>
                            <div class='c-d-wrap' v-if='!ismale'> 
                                <div class='act-item' v-for='(v,i) in fmaleitem' :key="i">
                                    <div class='c-d-banner' style="border-radius: .3rem;overflow:hidden">
                                        <img v-lazy="v.img" alt="" style="border-radius: .3rem;overflow:hidden" @click.stop="toAcDetail(v)">
                                    </div>
                                    <swiper :options='hOptions' class='h-show'>
                                        <swiper-slide class='showitem' v-for='(item,index) in v.goodsList' :key="index" @click.native='goToGoodsDetail(item)'>
                                            <img v-lazy="item.imgMain">
                                            <span>￥{{item.sellingPrice}}</span>
                                        </swiper-slide>
                                        <swiper-slide class='showitem last' @click.native="toAcDetail(v)">
                                            <div class='box'>
                                                    <div class='red'>
                                                        查看全部
                                                    </div>
                                                    <div class='gray'>
                                                        See more
                                                    </div>
                                            </div> 
                                        </swiper-slide>
                                    </swiper>
                                </div> 
                            </div>
                        </transition>
                    </div>
                </div>                
            </div>
        </div>

        
    </div>
</template>


<script>

// import scroll from "common/scroll";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import Bscroll from 'better-scroll'
import { throttle } from 'common/util'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

export default {
    components: {
      swiper,
      swiperSlide
    },
    activated() {   
        this.isSearching = false;
        this.axios.get('/api/wsc/goods/deleteSearch?id=05ed238c271e491c91e89f302b261aba')
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
        this._getSearchList();
        this.acDetailShow = false;
        this.carlOpcity()
    },
    methods:{
        carlOpcity() {
            this.$refs.scroll.addEventListener('scroll',e => {
                const parcent = e.target.scrollTop/this.$refs.swiper.clientHeight;
                if(e.target.scrollTop > this.$refs.swiper.clientHeight) {
                    this.$refs.searchWrap.style.opacity = `1`;
                    this.$refs.searchWrap.style.background = `rgba(255,255,255,1)`;
                    return;
                }
                if(parcent > 0.6) return;
                this.$refs.searchWrap.style.opacity = `${0.5+parcent}`
                this.$refs.searchWrap.style.background = `rgba(255,255,255,${0.4+parcent})`
            })
        },
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
            if(i == 1){
                this.ismale = true;
            } else if(i == 2) {
                this.ismale = false;                
            };
        },
        bannerAbout(item) {
            if(item.proId) {
                let obj = [...this.maleitem,...this.fmaleitem].find(v => {
                    return v.id === item.proId;
                });
                if(obj) {
                    this.$router.push(`/acDetail/${item.proId}`)
                    // this.currentAcList = obj.goodsList;
                    // this.acDetailShow = true;
                }
            };
        },
        toAcDetail(item) {
            this.$router.push(`/acDetail/${item.id}`)
            // this.currentAcList = item.goodsList
            // this.acDetailShow = true;
        },  
        sendSearch() {
            this.sendsearch()
        },
        search(item){
            this.word = item.searchName;
            this.sendsearch();
        },
        sendsearch(){
            if(this.word.length < 1) return;
            let data = new URLSearchParams();
                data.append('name',this.word);
                data.append('userId',userInfo.userid)
            this.axios.post('/api/wsc/goods/searchGoods',data).then(res => {
                if(res.data.code === 'error'){
                    this.searchGoodsList = [];
                } else {
                    this.searchGoodsList = res.data.obj
                }
            })
        },
        toCoupon() {
            this.$router.push('/coupon');
        },
        goSearch() {
            this.$router.push('/search');
        },
        openSearch(){
            this.isSearching = true;
            this.word = '';
            this._getSearchList();
        },
        _getSearchList(){
            let data = new URLSearchParams();
                data.append('userId',userInfo.userid)
            this.axios.post(`/api/wsc/goods/searchList`,data).then(res => {
                this.hotSearch = res.data.obj.topSearch;
                this.oldSearch = res.data.obj.latelySeanch;
            })
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
            autoplay: 3000
        },
        hOptions:{
            slidesPerView:'auto',
            direction:'horizontal',
        },
        ismale:true,
        maleitem:[],
        fmaleitem: [],
        isSearching:false,
        word:'',
        searchGoodsList:[],
        hotSearch:[],
        oldSearch:[],
        acDetailShow: false,
        currentAcList: []
      };
    },
};
</script>

<style lang="stylus" scoped>
.searchList
    h5
        font-size .4rem 
        text-align center
        margin-bottom 10px
    .item
        font-size .35rem
        margin .2rem 0;
        text-align center


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
    overflow scroll
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
                min-width 0.6rem
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
                min-width 0.8rem
                text-align center
.search-wrap
    height 0.93rem
    overflow hidden
    background-color rgba(0,0,0,.1)
    display flex
    box-sizing border-box
    padding  0 .3rem
    align-items center
    justify-content space-around
    position fixed
    width 100%
    top 0
    left 0
    z-index 9999
    opacity 0.5

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
    align-items center
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
    position fixed
    height 90%
    width:100%
    .index-scroll
        height 100%
        overflow-y scroll
        overflow-x hidden
        -webkit-overflow-scrolling: touch;
        .swipe-wrap
            width 100vw
            // height 4.4rem
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
        // height 4rem
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
            // height 100%
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
                height 1.8rem

.Tin-enter-active,.Tin-leave-active
    transition all .5s
.Tin-enter,.Tin-leave-to
    transform translate3d(100%,0,0)
</style>
