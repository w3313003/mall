<template>
    <div class="types">
        <div class='title'>
            商品分类    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>  
        <div class='item' @click="toAll">
            <div>
                全部商品
            </div>
            <svg class="icon fenlei" aria-hidden="true">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='type' v-for="(v,i) of typeList" :key="i" @click='toType(v)'>
            <div class="item">
                <div>
                    {{v.commoditytype}}
                </div>
                <div class='btn'>
                    查看全部
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    data (){
        return {
            typeList: []
        }
    },
    activated() {
        this.axios.get(`/api/shop/shopCommoditytype?shopId=${this.$route.params.id}`).then(res => {
            console.log(res.data);
            this.typeList = res.data.obj
        })
    },
    methods:{
        back() {
            this.$router.back();
        },
        toAll() {
            this.$router.push({
                path: `/seller/${this.$route.params.id}/all`
            })
        },
        toType(item) {
            this.$router.push({
                path: `/seller/${item.id}/type`,
                query:{
                    type:item.commoditytype
                }
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
.types
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    z-index 9999
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
    .item
        height 90px
        display flex
        box-sizing border-box
        padding .35rem
        position relative
        background #fff
        align-items center
        justify-content space-between
        font-size .4rem
        &:before
            content ''
            position absolute
            left 0
            top 50%
            transform translateY(-50%)
            height .4rem
            width 0.0667rem
            background #fc7aa5
        .icon 
            font-size .5rem
        .btn
            font-size .3rem
            color #fc7aa5
            letter-spacing 2px
    .type
        margin-top 0.1333rem
        background #fff
        .detail
            display flex
            flex-wrap wrap
            border-top 0.0133rem solid #666
            & > div
                flex 0 0 50%
                text-align center
                height 1.2rem
                line-height 1.2rem
                box-sizing border-box
                font-size .35rem
                border 0.0133rem solid #666
                border-top 0
                border-left 0
                &:nth-child(2n)
                    border-left 0

                

</style>
