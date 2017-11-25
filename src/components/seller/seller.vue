<template>
    <div class='seller'>
        <div class='header'>
            <div class='background'>
                <img src="../.././assets/img/goodimg.png" alt="">
            </div>
            <div class='seller-logo'>
                <img src="../.././assets/img/goodimg.png" alt="">
            </div>
            <div class='seller-name'>
                <div class='t'>
                    墨刀专营店
                </div>
                <div class='b'>
                    1999人已收藏
                </div>
            </div>
            <div class='seller-collection'>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <span>收藏</span>
            </div>
        </div>
        <div class="nav">
            <div class='item'>
                <div class='icon-wrap'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-baozhuanhuan"></use>
                    </svg>
                </div>
                <div class='title'>全部商品</div>
            </div>
            <div class='item'>
                <div class='icon-wrap'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-liwu"></use>
                    </svg>
                </div>
                <div class='title'>新品上架</div>
            </div>
            <router-link to='/seller/types' class='item' tag='div'>
                <div class='icon-wrap'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-fenlei"></use>
                    </svg>
                </div>
                <div class='title'>分类</div>
            </router-link>
        </div>
        <div class='gooditem'>
            <div class='title'>
                商家推荐
            </div>
            <div class='item'>
                 <goodList :goodList='goodList'></goodList>
            </div>
        </div>
    </div>
</template>

<script>
import goodList from 'common/goodList'
import { moocgoodList } from 'common/util.js'

export default {
    components:{
        goodList
    },
    created(){
        this.goodList = moocgoodList;
    }
}
</script>

<style lang="stylus" scoped>
.seller
    display flex
    position fixed 
    z-index 999
    top 0 
    height 0
    width 100vw
    height 100vh
    flex-direction column
    background #e7e7e7
    display flex
    flex-direction column
    .header
        width 100%
        height 200px
        overflow hidden
        position relative
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
        display flex
        width 100%
        justify-content space-around
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
        margin-top 0.1333rem
        background #fff
        flex 1
        overflow scroll
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
</style>
