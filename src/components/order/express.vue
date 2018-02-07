<template>
    <div class="express">
        <div class='title'>
            订单详情
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="content">
            <div class="gooddetail">
                <img src="../../assets/img/good-item.png" alt="">
                <div class='info'>
                    <div class="ts">
                        运送中
                    </div>
                    <div class="m">
                        配送商:
                        <span>
                            {{expressInfo.logisticsName}}
                        </span>
                    </div>
                    <div class="b">
                        运单编号:
                        <span>
                            {{expressInfo.obj.number}}
                        </span>
                    </div>
                    <div class="btn" @click="confirm">
                        <div>
                            确认收货
                        </div>
                    </div>
                </div>
            </div>
            <div class="expressWrap">
                <div class="item" v-for="(v,i) of expressInfo.obj.list" :key="i">
                    <div class="icons" :class="{'active':i === 0}">
                        <div class="cycle"></div>
                        <div class="line"></div>
                    </div>
                    <div class="desc">
                        <div class="status">
                            {{v.status}}
                        </div>
                        <div class="time">
                            {{v.time}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data from 'common/express'
import { Toast } from 'mint-ui' 
export default {
    props:{
        expressInfo:{},
        orderId:''
    },
    created() {
        console.log(this.expressInfo)
    },
    methods:{
        back() {
            this.$emit('back');
        },
        confirm() {
            let data = new URLSearchParams();
                data.append('id',this.orderId);
            this.axios.post('/api/order/confirmReceipt',data).then(res => {
                if(res.data.code === '200') {
                    Toast('收货成功');
                    setTimeout(() => {
                        this.back();
                    },1000)
                }
            })
        }
    }
};
</script>

<style lang="stylus" scoped>
.express
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
    .content
        flex 1
        overflow hidden
        display flex
        flex-direction column
        .gooddetail
            display flex
            box-sizing border-box
            padding .3rem .2rem
            font-size .35rem
            flex 0 0 2.6667rem
            background #fff
            img
                display block
                flex 0 0 1.9333rem
                height 1.9333rem
            .info
                flex 1
                padding-left .2rem
                display flex
                flex-direction column
                justify-content space-between
                .b
                    display flex 
                .m
                    color #000
                .ts
                    padding 0
                    color #fc7aa5
                .btn    
                    div
                        display inline-block
                        padding .1rem .3rem
                        background #fc7aa5
                        border-radius 0.1333rem
                        color #fff
        .expressWrap
            height 100%
            overflow scroll 
            flex 1
            margin-top 10px
            background #fff
            padding .2rem .4rem
            box-sizing border-box
            .item
                display flex
                flex-wrap nowrap
                .icons
                    position relative
                    flex 0 0 0.4rem
                    .cycle
                        width 100%
                        height 0.4rem
                        box-sizing border-box
                        border-radius 50%
                        background #e7e7e7
                        border 0.0867rem solid rgba(160,160,160,.5)
                    .line
                        width 0.0667rem
                        height 100%
                        position relative
                        left 50%
                        height 100%
                        background #e7e7e7
                        transform translateX(-50%)
                    &.active
                        .cycle
                            background #fff
                            border 0.0867rem solid rgba(252,123,166,.9)
                        .line
                            background rgb(252,123,166)
                .desc
                    padding .1rem 0 .2rem .2rem
                    .status
                        font-size .3rem
                        line-height .45rem
                    .time
                        margin-top .15rem

    

</style>
