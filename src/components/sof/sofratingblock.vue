<template>
    <div class='wrap'>
        <div class='item' v-for='(item,i) in commentList' :key="i">
            <div class='header'>
                <img :src="item.headImg" alt="">
                <div class='nickname'>
                    {{item.wscUserName}}
                </div>
                <div class='time'>
                    {{item.createDate}}
                </div>
            </div>
            <div class='content'>
                {{item.content}}
            </div>
            <div class='seller-rating'>
                <div class='r' v-if='item.list'>
                    <span>回复</span>
                </div>
                <div class='l'>
                    <div v-for='(items,index) in item.list' :key='index'>
                        {{items.wscUserName}}:{{items.content}}
                    </div>
                </div>
                <div class='btn' @click='choose(item)'>
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-pingjia"></use>
                    </svg>
                </div> 
            </div>
            
            <!-- <p class='iconwrap'>
               <svg class="icon fenlei" aria-hidden="true">
                    <use xlink:href="#icon-dianzan"></use>
                </svg>
                123             
            </p> -->
        </div>
    </div>
</template>

<script>
export default {
    props:{
        commentList:{
            type: Array,
            default(){
                return {}
            }
        }
    },
    mounted(){
        setTimeout(() => {
            console.log(this.commentList)
        },100);
    },
    methods : {
        choose(item){
            this.$emit('deepComment',item)
        }
    }
}
</script>

<style lang="stylus" scoped>
.btn
    position absolute
    bottom 0
    right 0
    .icon 
        font-size .5rem
        color #666

.wrap
    width 100%
    background #e7e7e7
    color #000
    .item
        box-sizing border-box
        padding 0.3333rem
        padding-bottom 0.2rem
        background #fff
        margin-bottom 0.1333rem
        .header
            display flex
            height 0.9333rem
            font-size 0.3333rem
            img
                width 0.9333rem
                height 0.9333rem
                border-radius 50%
            .nickname
                flex 1
                display flex
                align-items center
                margin-left 0.2rem
                color #000
            .time
                display flex
                align-items center
                color #777
        .content
            font-size 0.3333rem
            margin 0.2rem 0
            line-height 0.4rem
            text-align left
        .seller-rating
            display flex
            font-size 0.3333rem
            height auto
            margin-top .35rem
            position relative
            .r
                height 100%
                span
                    display block
                    width 1rem
                    height 0.4667rem
                    text-align center
                    line-height 0.4667rem
                    background #fc7aa5
                    color #ffffff
                    border-radius 0.1067rem
            .l
                margin-left 0.2rem
                flex 1
                padding-right .4rem
                div
                    font-size .35rem
                    margin-bottom .15rem
        .iconwrap
            margin-top 0.1333rem
            font-size: 0.4rem
            line-height 0.5333rem
            height 0.5333rem
            text-align left

</style>
