<template>
    <div class='detail'>
        <div class='title'>
                退换货
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="gooddetail">
            <img :src="orderInfo.goodsImg" alt="">
            <div class='info'>
                <div class="ts">{{orderInfo.goodsName}}</div>
                <div class="m">
                    {{orderInfo.specName}}
                </div>
                <div class="b">
                    <span>￥
                        {{orderInfo.goodsPrice}}
                    </span>
                    <span>X
                        {{orderInfo.goodsNum}}
                    </span>
                </div>
            </div>
        </div>
        <div class="returnblock" v-if='orderInfo.state == 1'>
            <div class="item">
                <div>换货原因:</div>
                <div>{{orderInfo.remarks}}</div>
            </div>
        </div>
        <div class="returnblock" v-else>
            <div class="item">
                <div>退款原因:</div>
                <div>
                    {{orderInfo.remarks}}
                </div>
            </div>
            <div class='imgblock' v-if="imgs && imgs.length >= 1">
                <div>上传凭证</div>
                <div class='img'>
                    <img :src="v" alt="" v-for="(v,i) in imgs" :key="i">
                </div>
            </div>
        </div>
        <div class='seller-address'>
            <div class="item">商家地址:{{orderInfo.address}}</div>
            <div class="item">收货人:{{orderInfo.consignee}}</div>
            <div class="item">电话:
                {{orderInfo.tel}}
            </div>
        </div>
        <div class='t'>
            <div class='wx' v-if="orderInfo.wx">商家微信:{{orderInfo.wx}}</div>
            <div class="qq">商家qq:{{orderInfo.qq}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderInfo: {},
            imgs: []
        }
    },
    activated() {
        let id = this.$route.params.id;
        this.axios.get(`/api/wsc/user/getBackGoodsDetail?id=${id}`).then(res => {
            this.orderInfo = res.data.obj;
            if(this.orderInfo.proof1) {
                for(let i in this.orderInfo){
                    /proof/.exec(i) ? this.imgs.push(this.orderInfo[i]) : ''; 
                }
            };
        })
    },  
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="stylus" scoped>
.detail
    position fixed
    width 100vw
    height 100vh
    top 0
    left 0
    z-index 999
    background #e7e7e7
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
    .gooddetail
        display flex
        box-sizing border-box
        padding .15rem .2rem
        font-size .35rem
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
                justify-content space-between
            .m
                color #666
    .returnblock
        margin 0.1333rem 0
        background #ffffff
        .item
            display flex
            font-size .4rem
            box-sizing border-box
            padding .4rem .3rem
            border-bottom 0.0133rem solid #e7e7e7
            & > div:last-child 
                color #666
                margin-left 0.2rem
        .imgblock
            display block
            box-sizing border-box
            padding .4rem .3rem
            font-size .4rem
            .img
                display flex
                justify-content space-between
                margin-top 0.1333rem
                img
                    width 2.9333rem
                    height 2.1333rem
                    display block
    .seller-address
        margin 0.1333rem 0
        background #Fff
        .item 
            display flex
            font-size .35rem
            box-sizing border-box
            padding .2rem .3rem
    .t
        background #fff
        display flex
        box-sizing border-box
        padding .3rem
        font-size .35rem
        & > div
            flex 1
</style>
