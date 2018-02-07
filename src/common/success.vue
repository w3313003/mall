<template>
    <div class='success-wrap'>
        <div class="header">
            <div class="title">
                付款成功
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
            <div class="content">
                <p>付款成功</p>
                <p>您的包裹整装待发</p>
            </div>
        </div>
        <div class='msg'>
            <div class='order-info'>
                <p>收件人:{{consignee}}</p>
                <p>地址:{{address}}</p>
                <p>实付款:￥{{totalMoney}}</p>
            </div>
            <div class='btn' @click="toOrder">查看订单</div>
            <div class='tips'>
                {{tips}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        consignee: {
            type: String,
            default :''
        },
        address: {
            type: String,
            default: ''
        },
        totalMoney: ''
    },
    created() {
        console.log(this.consignee)
    },
    data() {
        return {
            tips: '1233',
        }
    },
    methods:{
        back(){
            this.$router.push({
                path: '/index'
            })
        },
        toOrder() {
            this.$router.push({
                path:'/order'
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.success-wrap
    width 100%
    height 100vh
    overflow hidden
    z-index 99999
    position fixed
    left 0 
    top 0
    background #ffffff
    .header
        height 4.0667rem
        width 100%
        background: #fc7aa5
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
        .content
            flex 1
            color #fff
            font-size .4rem
            padding 0.8rem 0
            display flex
            flex-direction column
            justify-content space-around
            p
                margin-left 0.2667rem
    .msg
        box-sizing border-box
        padding 0.3333rem
        .order-info
            font-size 0.4rem
            p
                margin 0.2rem 0
        .btn
            width 4.1333rem 
            height 0.8rem
            color #fc7ba6
            border 0.0133rem solid #fc7ba6
            font-size 0.4rem
            text-align center
            line-height 0.8rem
            margin 0.4rem auto
            border-radius 0.4rem
        .tips
            color #b2b2b2
            font-size 0.3333rem
            line-height 0.4rem



</style>
