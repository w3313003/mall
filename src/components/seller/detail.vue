<template>
    <div class="seller">
        <div class="title">
            店铺简介        
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="content">
            <div class='header'>
                <div class='background'>
                    <img :src="info.logo" alt="">
                </div>
                <div class='seller-logo'>
                    <img :src="info.logo" alt="">
                </div>
                <div class='seller-name'>
                    <div class='t'>
                        {{info.shopName}}
                    </div>
                    <div class='b'>
                        {{info.num}}人已收藏
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="l">
                   好评率
                </div>
                <div class="r">
                    {{this.goodRate}}
                </div>
            </div>
            <div class="item">
                <div class="l">
                   开店时间
                </div>
                <div class="r">
                    {{this.info.createDate}}
                </div>
            </div>
            <div class="item">
                <div class="l">
                   描述相符
                </div>
                <div class="r">
                    {{this.service.describeResult}}
                </div>
            </div>
            <div class="item">
                <div class="l">
                   服务态度
                </div>
                <div class="r">
                    {{this.service.attitudeResult}}
                </div>
            </div>
            <div class="item">
                <div class="l">
                   物流服务
                </div>
                <div class="r">
                    {{this.service.logisticsResult}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        info: {
            type: Object,
            default:() => {}
        },
        shopId: ''
    },
    data() {
        return {
            goodRate: '',
            service: {}
        }
    },
    created() {
        let data = new URLSearchParams();
            data.append('shopId',this.shopId)
        this.axios.post('/api/shop/serviceScore',data).then(res => {
            this.service = res.data.obj
        }),
        this.axios.post('/api/shop/shopPraiseRate',data).then(res => {
            this.goodRate = res.data.obj
        })
    },
    methods: {
        back() {
            this.$emit('back');
        }
    }
}
</script>

<style lang="stylus" scoped>
.seller
    width 100%
    height 100%
    position fixed
    background #e7e7e7
    z-index 999999999999
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
    .item
        background #fff
        font-size .4rem
        box-sizing border-box
        padding .3rem
        padding-left .5rem
        display flex    
        border-bottom 1px solid #e7e7e7
        &:nth-child(3)
            margin-bottom .2rem
        .l
            flex 0 0 1.6rem
        .r
            flex 1
            padding-left .5rem
</style>
