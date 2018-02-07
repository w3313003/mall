<template>
    <div class="tkl-wrap">
        <div class="title">
            淘口令    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="scroll">
            <div class="good-wrap">
                <div class='gooditem' v-for="(v,i) of goodsList" :key="i" @click="getDetail(v)">
                    <div class='img-wrap'>
                        <img :src='v.mianImg'>
                    </div>
                    <div class='content'>
                        <div class='titles'>
                           <img src='../../assets/img/taobao.png'>
                           <i>
                               {{v.goodsName}}
                           </i>
                        </div>
                        <div class="price">
                            <div class="l">
                                ￥<span>
                                    {{v.goodsPrice}}
                                </span>元
                            </div>
                            <div class="r">
                                券后价
                                {{v.afterPrice}}
                                元
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import scroll from 'common/scroll'
export default {
    components:{
        scroll
    },
    data() {
        return {
            goodsList: []
        }
    },
    activated() {
        this.axios.get('/api/wsc/tao/getTaoList').then(res => {
            this.goodsList = res.data.obj;
        })
    },
    methods:{
        back() {
            this.$router.back();
        },
        getDetail(item) {
            this.$router.push({
                path: `/tkl/${item.id}`
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.tkl-wrap
    height: 90%;
    position absolute
    width 100%
    overflow: hidden;
    .title
        width: 100%;
        height: 1.1333rem;
        line-height: 1.1333rem;
        background: #fff;
        color: #fc7aa5;
        text-align: center;
        font-size: 0.4rem;
        position: absolute;
        z-index 9999
        border-bottom: 0.0133rem solid #e7e7e7;
        top 0
        z-index 2
        .icon   
            width: 0.5333rem;
            height: 0.5333rem;
            position: absolute;
            left: 0.3rem;
            top: 50%;
            transform: translateY(-50%) rotate(180deg);
            font-size: 0.4rem;
    .good-wrap
        box-sizing border-box
        padding 0.2667rem
        display flex
        flex-wrap wrap
        justify-content space-between
        .gooditem
            flex 0 0 4.5333rem
            overflow hidden
            margin-bottom 0.2rem
            &:nth-child(2n)
                margin-right 0
            .img-wrap
                width 100%
                height 4.5333rem
                border-radius 0.1333rem
                img 
                    width 100%
                    border-radius .25rem 
                    height 100%
            .content
                margin-top 0.2rem
                .titles
                    width 100%
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    vertical-align middle
                    font-size .35rem
                    margin-bottom 0.2rem
                    display flex
                    align-items center
                    img 
                        width 0.4rem
                        vertical-align text-top
                        height 0.4rem
                        margin-right .15rem
                    i 
                        display block
                        flex 1
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
                .price
                    display flex
                    justify-content space-between
                    color #ef2b2a
                    span 
                        font-size .4rem
                    .r
                        padding 0.0667rem 0.1333rem
                        border-radius 0.1333rem
                        border 0.075vmax solid #ef2b2a

.scroll
    height 100%
    box-sizing border-box
    padding-top 1.1333rem
    overflow-x hidden;
    overflow-y scroll
    -webkit-overflow-scrolling: touch;


</style>
