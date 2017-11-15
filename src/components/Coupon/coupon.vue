<template>
    <div class='coupon-wrap'>
        <scroll :data='sellerList' class='scroll'>
            <div class='seller-wrap'>
                <div class='seller' v-for='(item,index) in sellerList' :key="index">
                    <div class='img-wrap'>
                        <img src="../.././assets/img/seller-logo1.png" alt="">
                    </div>
                    <div class='seller-content'>
                        <div class='l'>
                            <div class='title'>
                                {{item.name}}
                            </div>
                            <div class='content'>
                                <div class='price'>
                                    ￥<span>{{item.Amount}}</span>元
                                </div>
                                <div class='disc'>
                                    {{item.disc}}
                                </div>
                            </div>
                        </div>
                        <div class='r'>
                            <div class='circle' ref='svgwrap'>
                                <div class='disc-data'>
                                    <div>已抢</div>
                                    {{item.Aused/item.totalCount | formatParent}}%
                                </div>
                                <svg ref='svg' width="1.3333rem" height="1.3333rem" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
                                    <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" 
                                    :stroke-dashoffset='(1 - (item.Aused/item.totalCount)) * dasharray' />
                                </svg>
                            </div>
                            <div class='btn'>立即领取</div>
                        </div>
                    </div>
                </div>
            </div>
        </scroll>  
    </div>
</template>


<script>
import scroll from "common/scroll";

export default {
    components:{
        scroll
    },
    filters:{
        formatParent(val) {
            return val * 100;
        }
    },
    mounted(){
        this.$nextTick(() => {
        })
    },
    data(){
        return {
            dasharray: Math.PI * 100,
            sellerList:[
            {
                name:'adidas官方旗舰店',
                totalCount:10,
                Aused:2,
                Amount:20,
                disc:'满100-20',
                Already:false
            },
            {
                name:'亚瑟士官方旗舰店',
                totalCount:10,
                Aused:2,
                Amount:20,
                disc:'满100-20',
                Already:false
            },
            {
                name:'耐克官方旗舰店',
                totalCount:10,
                Aused:9,
                Amount:30,
                disc:'满100-30',
                Already:false
            },
            {
                name:'耐克官方旗舰店',
                totalCount:10,
                Aused:9,
                Amount:30,
                disc:'满100-30',
                Already:true
            },
            {
                name:'耐克官方旗舰店',
                totalCount:10,
                Aused:9,
                Amount:30,
                disc:'满100-30',
                Already:true
            },
            {
                name:'耐克官方旗舰店',
                totalCount:10,
                Aused:9,
                Amount:30,
                disc:'满100-30',
                Already:true
            },
            {
                name:'耐克官方旗舰店',
                totalCount:10,
                Aused:9,
                Amount:30,
                disc:'满100-30',
                Already:false
            }],
        }
    },
    methods:{
    }
}
</script>

<style lang='stylus' scoped>
.coupon-wrap
    position fixed
    height 100vh
    width  100%
    overflow hidden
    z-index 999
    background #e7e7e7
    .scroll
        height 100%
        overflow hidden
        .seller-wrap
            box-sizing border-box
            padding 0.2rem
            .seller
                width 100%
                height 2.6667rem
                box-sizing border-box
                padding 0.1333rem
                background-color #fff
                display flex
                margin-bottom 0.1333rem
                .img-wrap 
                    flex 0 0 2.4rem
                    img 
                        width 100%
                .seller-content
                    flex 1
                    display flex
                    .l
                        flex 0 0 4.5333rem
                        box-sizing border-box
                        padding 0.4rem
                        display flex
                        flex-direction column
                        justify-content space-between
                        .title
                            font-size 0.4rem
                        .content
                            display flex
                            font-size 0.35rem
                            color #f44820
                            .price
                                span 
                                    font-size 0.6667rem
                            .disc
                                text-align basename
                                margin-left 0.2667rem
 
                    .r
                        flex 1
                        display flex
                        justify-content space-around
                        flex-direction column
                        align-items center
                        font-size: 0.35rem;
                        .btn
                            width 1.7333rem
                            height 0.5333rem
                            border 1px solid #666
                            border-radius 0.2667rem
                            line-height 0.5333rem
                            text-align center

  circle
    stroke-width: 8px
    transform-origin: center
    &.progress-background
      transform: scale(0.9)
      stroke: #e7e7e7
    &.progress-bar
      transform: scale(0.9) rotate(90deg)
      stroke: #f44820

.circle
    position relative
    width 1.3333rem 
    height 1.3333rem
    .disc-data
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        

</style>
