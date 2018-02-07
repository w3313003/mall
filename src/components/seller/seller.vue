<template>
    <div class='seller'>
        <div class='header' @click="detailShow = true" v-if='!detailShow'>
            <div class='background'>
                <img :src="sellerInfo.logo" alt="">
            </div>
            <div class='seller-logo'>
                <img :src="sellerInfo.logo" alt="">
            </div>
            <div class='seller-name'>
                <div class='t'>
                    {{sellerInfo.shopName}}
                </div>
                <div class='b'>
                    {{sellerInfo.num}}人已收藏
                </div>
            </div>
            <div class='seller-collection' v-if="!isCollect" @click.stop="collection">
                <svg class="icon" aria-hidden="true" style="color:#fff">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <span>收藏</span>
            </div>
            <div class='seller-collection' v-else>
                <svg class="icon" aria-hidden="true" style="color:red" >
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <span>已收藏</span>
            </div>
        </div>
        <div class="nav">
            <div class='item' @click="toAll">
                <div class='icon-wrap'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-baozhuanhuan"></use>
                    </svg>
                </div>
                <div class='title'>全部商品</div>
            </div>
            <div class='item' @click="toNew">
                <div class='icon-wrap'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-liwu"></use>
                    </svg>
                </div>
                <div class='title'>新品上架</div>
            </div>
            <div class='item' @click="toType">
                <div class='icon-wrap'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-fenlei"></use>
                    </svg>
                </div>
                <div class='title'>分类</div>
            </div>
        </div>
        <div class='gooditem'>
            <div class='title'>
                商家推荐
            </div>
            <div class='item'>
                 <goodList :goodList='recommendList'></goodList>
                 <div style='height:1.2rem'></div>
            </div>
        </div>
        <transition name='toDetail'>
            <Deatil v-if='detailShow' @back='detailShow = false' :info='sellerInfo' :shopId='$route.params.id'></Deatil>
        </transition>
    </div>
</template>

<script>
import goodList from 'common/goodList'
import { moocgoodList } from 'common/util.js'
import Deatil from './detail'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default {
    components:{
        goodList,
        Deatil
    },
    created(){
        this.goodList = moocgoodList;
    },
    data(){
        return {
            sellerInfo: {},
            isCollect: false,
            recommendList: [],
            detailShow:false
        }
    },
    activated(){
        let shopId = this.$route.params.id;
        let data = new URLSearchParams();
            data.append('shopId',shopId);
            data.append('userId',userInfo.userid);
        this.axios.get(`/api/shop/shopIndex?shopId=${shopId}`).then(res => {
            this.sellerInfo = res.data.obj
        });
        this.axios.post('/api/shop/shopIsCollection',data).then(res => {
            this.isCollect = res.data.message === '未收藏' ? false : true
        });
        this.axios.post('/api/waresClass/getYourLike',data).then(res => {
            this.recommendList = res.data.obj
        })
    },
    methods:{
        collection() {
            let data = new URLSearchParams();
                data.append('userId',userInfo.userid);
                data.append('shopId',this.$route.params.id);
            this.axios.post('/api/wsc/user/shopCollection',data).then(res => {
                if(res.data.message === '收藏商品成功') {
                    this.isCollect = true;
                }
            })
        },
        toType() {
            this.$router.push({
                path: `/seller/${this.$route.params.id}/types`
            })
        },
        toAll() {
            this.$router.push({
                path: `/seller/${this.$route.params.id}/all`
            })
        },
        toNew() {
            this.$router.push({
                path: `/seller/${this.$route.params.id}/new`
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.seller
    position fixed 
    z-index 999
    top 0 
    height 0
    width 100%
    height 100%
    flex-direction column
    background #e7e7e7
    overflow hidden
    .header
        width 100%
        height 2.6rem
        overflow hidden
        position absolute
        top 0
        z-index 2000
        box-sizing border-box
        padding 0.3333rem
        display flex
        color #fff
        align-items center
        .background
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            -webkit-filter: blur(10px);
            filter: blur(10px)
            img
                width 100%
                height 100%
        .seller-logo
            width 2rem
            height 2rem
            img
                width 100%
                height 100%
        .seller-name
            flex 1
            display flex
            flex-direction column
            justify-content space-around
            padding .3rem .3rem
            align-self stretch 
            .t
                font-size .4rem
        .seller-collection
            font-size .35rem
            display flex
            align-items center
            .icon
                font-size .5rem
                color #f92811
                padding-right .1rem
    .nav
        height 2.2667rem
        background #fff
        position absolute
        top 2.6rem
        display flex
        width 100%
        justify-content space-around
        z-index 2000
        .item
            display flex
            flex-direction column
            justify-content space-around
            align-items center
            flex 0 0 2rem
            padding .2rem 0
            .icon-wrap
                width 1.0667rem
                height 1.0667rem
                color #fff
                border-radius 50%
                background #fc7aa5
                display flex
                justify-content center
                align-items center
                font-size .5rem
            .title
                font-size .35rem
    .gooditem
        height 100%
        box-sizing border-box
        padding-top 5rem
        background #fff
        overflow hidden
        .title
            height 1.2rem
            font-size .35rem
            line-height 1.2rem
            padding-left .4rem
            position relative
            &:before
                content ''
                position absolute
                left 0
                top 50%
                transform translateY(-50%)
                height .4rem
                width 0.0667rem
                background #fc7aa5
        .item
            height 100%
            overflow scroll
            -webkit-overflow-scrolling: touch;

.toDetail-enter-active,.toDetail-leave-active
    transition all .5s
.toDetail-enter,.toDetail-leave-to
    transform translate3d(100%,0,0)
</style>
