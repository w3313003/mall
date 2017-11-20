<template>
    <div class='sof-wrap'>
        <div class="title">
            评价    
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='content'>
            <block></block>
        </div>
        <div class='bottom'>
            <div class='input-wrap'>
                <input type="text" placeholder="快来评论吧">
            </div>
            <div class='btn'>
                发送
            </div>
        </div>
    </div>
</template>

<script>
import block from './sofratingblock'
export default {
    methods:{
        back(){
            this.$router.back();
        }
    },
    components:{
        block
    }

}   
</script>

<style lang="stylus" scoped>
.sof-wrap
    width 100%
    position fixed
    left 0
    top 0
    height 100vh
    background #e7e7e7
    z-index 999
    display flex
    flex-direction column
    .title
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        background #fc7aa5
        color #ffffff
        text-align center
        font-size 0.4rem
        position relative
        border-bottom 0.0133rem solid #e7e7e7
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
        overflow scroll
    .bottom
        width 100%
        background #fff
        height 1.3333rem
        box-sizing border-box
        padding 0.2rem 0.3067rem
        display flex
        .btn
            width 1.8667rem
            height 100%
            background #fc7aa5
            color #fff
            font-size 0.4rem
            display flex
            justify-content center
            align-items center
            border-radius 0.2rem
            margin-left 0.2rem
        .input-wrap
            flex 1
            background #e7e7e7
            box-sizing border-box
            padding 0.2rem
            border-radius 0.2rem
            input 
                width 100%
                height 100%
                display block
                font-size 0.4rem
                background #e7e7e7
                

</style>
