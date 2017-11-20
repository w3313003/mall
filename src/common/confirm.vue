<template>
    <div class='confirm-wrap'>
        <div class='title'>
            确认订单
            <svg class="icon fenlei" aria-hidden="true">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='confirm-content'>
            <div class='address'>
                <div class='l'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-icon-yxj-address"></use>
                    </svg>
                </div>
                <div class="m">
                    <div>
                        <span>收货人：去去去</span>
                        <span>15687782523</span>    
                    </div>
                    <div>
                        收货地址:合肥合肥黄飞飞飞飞飞飞而发分
                    </div>
                </div>
                <div class='r'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class='detail'>
                <div class='header'>
                    <div class='sellername'>
                        <div>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-shangjia"></use>
                            </svg>
                            <span>墨刀旗舰店</span>   
                            </div>
                        <div class='type'>
                            等待买家付款
                        </div> 
                    </div>
                    <div class='goodinfo'>
                        <img src=".././assets/img/goodimg.png" alt="" />
                        <div class='text'>
                            <div class='g-title'>
                                单身快乐大胜靠德受打击as肯德基a阿达大厦的
                            </div>
                            <div class='g-type'>
                                颜色颜色颜色颜色颜色
                            </div>
                            <div class='g-price'>
                                <div>￥66.00</div>
                                <div>X1</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="price">
                    <div class='l'>
                        <div class='f'>运费(快递)</div>
                        <div>订单总价</div>
                    </div>
                    <div class="r">
                        <div class='f'>￥0.00</div>
                        <div>￥66.66</div>
                    </div>
                </div>
                <div class="item">
                    <div>
                        优惠券
                    </div>
                    <div>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>  
                </div>
                <div class="item">
                    <div>
                        实付款
                    </div>
                    <div class='price'>
                        ￥66.00
                    </div>
                </div>
                <div class="item">
                    <div>
                        买家留言
                    </div>
                    <div class='input-wrap'>
                        <input type="text" placeholder="选填">
                    </div>
                </div>
            </div>
        </div>
        <div class='bottom'>
            <div class='l'>
                合计:
                <span>￥66.00元</span>
            </div>
            <div class='r'>
                提交订单
            </div>
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.confirm-wrap
    width 100%
    height 100vh
    position fixed
    z-index 999
    background-color #e7e7e7
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
    .confirm-content
        flex 1
        overflow scroll
        .address
            margin-top 0.1333rem
            background #fff
            display flex
            box-sizing border-box
            padding 0.3333rem
            align-items center
            font-size 0.4rem
            color #666
            .m
                flex 1
                box-sizing border-box
                padding 0 .2rem 
                div:first-child
                    display flex
                    justify-content space-between
                    margin-bottom 0.1333rem
            .l,.r
                .icon
                    font-size 0.5rem
        .detail
            margin-top 0.1333rem
            background #Fff
            .header
                .sellername
                    box-sizing border-box
                    padding 0.2667rem
                    font-size 0.4rem
                    display flex
                    justify-content space-between
                    height 1.2rem
                    align-items center
                    div:first-child
                        .icon 
                            font-size .45rem
                    .type
                        font-size 0.3333rem
                        color #fc7ba6
                .goodinfo
                    background #f5f5f5
                    box-sizing border-box
                    display flex
                    padding .1rem 0.3333rem
                    img 
                        width 1.92rem
                        height 1.92rem
                        display block
                    .text
                        flex 1
                        padding-left 0.2rem
                        font-size 0.3333rem
                        display flex 
                        flex-direction column
                        justify-content space-between
                        .g-price    
                            display flex
                            justify-content space-between   

            .price
                display flex
                box-sizing border-box
                justify-content space-between
                height 1.3333rem
                align-items center
                padding 0 .2667rem  
                border-bottom 0.0133rem solid #e7e7e7
                div
                    font-size .333rem  
                    .f
                        color #666  
                        &:last-child
                            text-align right
                .l,.r
                    height 100%
                    display flex
                    flex-direction column
                    justify-content space-around
            .item
                height 1.2rem
                border-bottom 0.0133rem solid #e7e7e7
                box-sizing border-box
                padding .2667rem
                font-size 0.4rem
                display flex
                justify-content space-between
                align-items center
                .icon
                    font-size .4rem
                    color #666
                .price
                    color #fc7ba5
                .input-wrap
                    flex 1
                    input
                        width 100%
                        padding-left 0.2rem
                        font-size .4rem
    .bottom
        height 1.3333rem
        display flex
        background-color #fff
        font-size .4rem
        .l
            flex 1
            display flex
            align-items center
            box-sizing border-box
            padding 0.35rem
            span 
                color #fc7ba5
        .r
            flex 0 0 4rem
            color #fff
            background #fc7ba5
            display flex
            align-items center
            justify-content center
            
            
</style>
