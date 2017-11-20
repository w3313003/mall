<template>
    <div class='wrap'>
        <div class='item' v-for='item in 2' :key="item">
            <div class='header'>
                <img src="../.././assets/img/avatar.png" alt="">
                <div class='nickname'>壳斗马蒂</div>
                <div class='time'>20分钟前</div>
            </div>
            <div class='content'>
                壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂壳斗马蒂
            </div>
            <div class='seller-rating'>
                <div>
                    回复
                </div>
                <div>
                    满江红:肯德基富士康放假少会计法
                </div>
            </div>
            <p class='iconwrap'>
               <svg class="icon fenlei" aria-hidden="true">
                    <use xlink:href="#icon-dianzan"></use>
                </svg>
                123             
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        ratingList:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

.wrap
    width 100%
    background #e7e7e7
    color #000
    .item
        box-sizing border-box
        padding 0.3333rem
        padding-bottom 0.2rem
        background #fff
        margin-bottom 0.1333rem
        .header
            display flex
            height 0.9333rem
            font-size 0.3333rem
            img
                width 0.9333rem
                height 0.9333rem
            .nickname
                flex 1
                display flex
                align-items center
                margin-left 0.2rem
                color #000
            .time
                display flex
                align-items center
                color #777
        .content
            font-size 0.3333rem
            margin 0.2rem 0
            line-height 0.4rem
            text-align left
        .seller-rating
            display flex
            font-size 0.3333rem
            align-items center
            height auto
            div
                &:first-child
                    width 1rem
                    height 0.4667rem
                    text-align center
                    line-height 0.4667rem
                    background #fc7aa5
                    color #ffffff
                    border-radius 0.1067rem
                &:last-child
                    margin-left 0.2rem
        .iconwrap
            margin-top 0.1333rem
            font-size: 0.4rem
            line-height 0.5333rem
            height 0.5333rem
            text-align left

</style>
