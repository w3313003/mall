<template>
    <div class='feed-wrap'>
         <div class='title'>
            意见反馈    
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
        </div> 
        <div class='content'>
            <div class='textarea'>
                <textarea v-model.trim='content' @keyup='change'>
                </textarea>
                <div class="count">
                    {{contentLength}}/200
                </div>
            </div>
            <div class='img-wrap'>
                <div class='control' @click='fileclick'>
                     <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiahao"></use>
                    </svg>
                </div>
                <div class='imgblock' v-for='(item,index) in imgs' :key="index">
                    <img :src='item' alt="">
                    <div class='close' @click='deleteImg(index)'>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class='bottom'>
            提交
        </div>
        <input type="file" @change='upload' ref='files' hidden >
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    computed:{
        contentLength(){
            return this.content.length
        }
    },
    methods:{
        back(){
            this.$router.back()
        },
        change(){
            console.log(this.content)
        },
        fileclick(){
            this.$refs.files.click();
        },
        upload(){
            let file =  this.$refs.files.files[0],
            that = this,
            reg = /^image/gi;
            if (!reg.test(file.type)) {
              Toast("文件类型错误");
              return;
            };
            if(file.size > 2000000){
                Toast('文件尺寸过大');
                return ;
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                if(that.imgs.length > 2){
                    Toast('最多上传三张图片');
                    return; 
                }
                that.imgs.push(this.result)
            };
        },
        deleteImg(index){
            this.imgs.splice(index,1)
        }
    },
    data(){
        return {
            content:'',
            imgs:[]
        }
    },

};
</script>

<style lang="stylus" scoped>
.feed-wrap
    width 100%
    height 100vh
    position fixed
    background #e7e7e7
    z-index 1000
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
        .textarea
            box-sizing border-box
            height 4rem
            padding .2rem
            background #fff
            border-bottom 0.0267rem solid #e7e7e7
            position relative
            textarea
                font-size .4rem
                height 100%
                width 100%
            .count
                position absolute
                bottom 0.1333rem
                right 0.1333rem
                color #666
        .img-wrap
            box-sizing border-box
            background #Fff
            padding .2rem
            display flex
            flex-wrap wrap
            .control
                width 1.7333rem
                height 1.7333rem
                border 0.0133rem dashed rgba(0, 0, 0, 0.08)
                display flex
                justify-content center
                align-items center
                .icon 
                    font-size .9rem
                    color rgba(0, 0, 0, 0.3)
            .imgblock
                margin 0 .2rem
                position relative
                img
                    width 1.7333rem
                    height 1.7333rem
                .close
                    position absolute
                    right -0.1333rem
                    top -0.1333rem
                    background #fff
                    border-radius 60%   
                    z-index 999
                    .icon 
                        font-size .5rem
                        color red

    .bottom
        height 1.2rem
        text-align center
        font-size .4rem
        line-height 1.2rem
        background #fc7aa5
        color #fff
</style>
