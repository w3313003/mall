<template>
    <div class='good-wrap'>
        <div v-for='(item,index) in goodList' :key="index" class='gooditem' @click='getTodetail(item)'>
                <div class='img-wrap'>
                    <img v-lazy="item.imgMain" alt="">
                </div>
                <div class='content'>
                    <div class='title'>
                        {{item.keyword}}
                    </div>
                    <div class='price-detail'>
                        <div class='price'>
                            ￥
                            <span>{{item.sellingPrice}}</span>
                        </div>
                        <div class='oldprice'>
                            ￥{{item.marketPrice}}
                        </div>
                        <div class='acount'>
                            月销{{item.count}}件
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<style lang="stylus" scoped>
.good-wrap
    box-sizing border-box
    padding 0.2rem
    display flex
    justify-content space-between
    flex-wrap wrap
    .gooditem
        width 4.5333rem
        background #fff
        margin-bottom 0.2rem
        border-radius 5px
        overflow hidden
        .img-wrap
            width 100%
            height 5.3333rem
            overflow hidden
            border-radius 10px
            img 
                width 100%
                height 100%
    .content
        font-size 0.3333rem
        margin 0.1333rem 0
        .title
            height 0.7rem
            overflow hidden
            line-height 0.36rem
        .price-detail
            display flex
            justify-content space-between
            margin 0.1333rem 0
            .price
                color #f02b2b
                span 
                    font-size 0.4667rem
            .oldprice
                color #989898
                text-decoration: line-through;
                display flex
                align-items flex-end
            .acount
                color #989898
                display flex
                align-items flex-end
</style>

<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    props:{
        goodList:{
            type : Array,
            default(){
                return []
            }
        }
    },
    computed:{
        ...mapGetters([
            'get_good_detailshow'
        ])
    },
    methods:{
        getTodetail(item){
            this.$emit('getTodetail',item);
        }
    }
}
</script>
