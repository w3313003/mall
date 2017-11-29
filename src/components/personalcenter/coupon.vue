/*
 * @Author: ZhaoJie 
 * @Date: 2017-11-28 14:35:40 
 * @Last Modified by: 赵杰
 * @Last Modified time: 2017-11-28 15:06:43
 */
<template>
    <div class="coupon-wrap">
        <div class='title'>
            优惠券    
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
        </div> 
        <scroll class='scroll'>
            <ul>
                <li class='item'> 
                    <div class='l'>
                        <div class='t'>
                            <div class='price'>
                                ￥<span>30</span>.0元
                            </div>
                            <div class='seller_name'>
                                墨刀旗舰店
                            </div>
                        </div>
                        <div class='b'>
                            <div class='disc'>
                                满199-20元
                            </div>
                            <div class='date'>
                                2017-6-6到期
                            </div>
                        </div>
                    </div>
                    <div class='r'>
                        立即使用
                    </div>
                </li>
            </ul>
        </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'
export default {
    data(){
        return {
            
        }
    },
    components:{
        scroll
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.coupon-wrap
    position fixed
    top 0
    left 0
    background #e7e7e7
    z-index 999
    width 100vw
    height 100vh
    display flex
    flex-direction column
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        color #fff
        background #fc7aa5
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
    .scroll
        flex 1
        overflow hidden
        .item
            box-sizing border-box
            padding 0.6667rem 0.4rem
            background #fff
            display flex
            justify-content space-between
            align-items center
            font-size .4rem
            .l
                flex 1
                .t,.b
                    display flex
                    justify-content space-between
                .t
                    align-items flex-end
                .b
                    color #666
                    margin-top 0.2rem
                .price
                    color #fb291e
                    span 
                        font-size .55rem
                .seller_name
                    font-size .45rem
            .r
                width 2.8rem
                height 0.7333rem
                text-align center
                line-height 0.7333rem
                border-radius 0.3667rem
                background #fc7aa5
                color #fff
                margin-left 10vw
            
</style>
