<template>
    <transition name='fade' mode='out-in'>
        <div class='pcenter'>
            <div class='title'>
                修改昵称    
                    <svg class="icon fenlei" aria-hidden="true" @click='close'>
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
            </div>  
            <div class='content'>
                <div class='wrap'>
                    <div class='l'>
                        昵称
                    </div>
                    <div class="r">
                        <input type="text" placeholder="请输入昵称" v-model='nickname'>
                    </div>
                </div>
                <div class='btn' @click='save'>
                    保存
                </div>
            </div>  
        </div>
    </transition>
</template>

<script>
import { userdata } from 'common/mock'
import { area } from 'common/util'

export default {
    props:{
        userInfo:{
            type : Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            nickname:''
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        editnickname(){
            
        },
        save(){
            this.$emit('revise',this.nickname)
        }
    },
    filters:{
        formatPhone(val){
            return new String(val).replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
        }
    }
}
</script>

<style lang='stylus' scoped>
.fade-enter-active,..fade-leave-active
    transition all .5s
.fade-enter
    transform scale(100%,0,0)
.fade-leave-to
    transform scale(-100%,0,0)

.pcenter
    width 100%
    height 100vh
    position fixed
    background #e7e7e7
    z-index 1000
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
        .wrap
            display flex
            background-color #ffffff
            font-size 0.4rem
            height  1.0667rem
            align-items center
            padding 0 0.4rem
            .l
                width 1.0667rem
                height 100%
                display flex
                align-items center
            .r 
                flex 1
                input 
                    font-size 0.4rem
        .btn
            width 95%
            margin 0 auto
            border-radius 20px
            background-color #fc7ba6
            color #fff
            height 1.0667rem
            line-height 1.0667rem
            text-align center
            font-size 0.4rem
            margin-top 0.2rem 
</style>
