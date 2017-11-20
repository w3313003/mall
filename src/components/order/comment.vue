<template>
    <div class='comment-wrap'>
                <input type="file" @change='upload' ref='files' hidden >
        <div class='title'>
            订单评价    
            <svg class="icon" aria-hidden="true" @click="close">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="content">
            <div class='textarea'>
                <textarea v-model.trim='content' placeholder="请输入评论内容">
                </textarea>
                <div class="count">
                    {{contentLength}}/200
                </div>
            </div>
            <div class='img-wrap'>
                <div class='control' @click='fileclick'>
                     <svg class="icon fenlei" aria-hidden="true">
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
            <div class='option-wrap'>
                <div class='option'>
                    <div>描述相符</div>
                    <div  class='star'>
                         <svg class="icon" :class='{"active": discPoint >= index}' aria-hidden="true" v-for='(item,index) in 5' :key="index" @click='discription(index)'>
                            <use xlink:href="#icon-xingzhuang60kaobei2"></use>
                        </svg>
                    </div>
                </div>
                <div class='option'>
                    <div>服务态度</div>
                    <div class='star'>
                         <svg class="icon" aria-hidden="true" :class='{"active": serversPonit >= index}' v-for='(item,index) in 5' :data-index='index' :key="index" @click='servers(index)'>
                            <use xlink:href="#icon-xingzhuang60kaobei2"></use>
                        </svg>
                    </div>
                </div>
                <div class='option'>
                    <div>物流服务</div>
                    <div  class='star'>
                         <svg class="icon" aria-hidden="true" :class='{"active": expressPonit >= index}' v-for='(item,index) in 5' :data-index='index' :key="index" @click='express(index)'>
                            <use xlink:href="#icon-xingzhuang60kaobei2"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class='l'>
                <img src="../.././assets/img/radio.png" v-if='anonymous' alt="">
                <img src="../.././assets/img/hradio.png" v-else alt="">
                <div  @click='anonymous=!anonymous'>匿名评价</div>
            </div>
            <div class='r' @click='close'>
                发表评价    
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            content:'',
            discPoint:-1,
            serversPonit:-1,
            expressPonit:-1,
            anonymous:true,
            imgs:[]
        }
    },
    computed:{
        contentLength(){
            return this.content.length
        }
    },
    methods:{
        discription(index){
            this.discPoint = index;
        },
        servers(index){
            this.serversPonit = index;
        },
        express(index){
            this.expressPonit = index;
        },
        close(){
            let data = {
                imgs:this.imgs,
                content : this.content,
                discPoint : this.discPoint,
                serversPonit : this.serversPonit,
                expressPonit : this.expressPonit,
                isanonymous:this.anonymous
            }
            this.$emit('close',data)
        },
        fileclick(){
            this.$refs.files.click();
        },
        upload(e){
            console.log(this.$refs.files.files);
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
            console.log(this.imgs)
        },
        deleteImg(index){
            this.imgs.splice(index,1)
        }
    }
}
</script>

<style lang="stylus" scoped>
.comment-wrap
    width 100%
    height 100vh
    position fixed
    left 0 
    top 0
    background #e7e7e7
    display flex
    flex-direction column
    .title,.bottom
        width 100%
        flex 0 0 1.1333rem
        color #fff
        background #fc7aa5
        text-align center
        font-size 0.4rem
        line-height 1.1333rem
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
            .count
                position absolute
                bottom 0.1333rem
                right 0.1333rem
                color #666
            textarea
                font-size .4rem
                height 100%
                width 100%
        .img-wrap
            box-sizing border-box
            background #Fff
            display flex
            padding .2rem
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
        .option-wrap
            background #fff
            box-sizing border-box
            padding .2rem .2rem .2rem .4rem
            .option
                display flex
                font-size .4rem
                padding 0.2667rem 0
                align-items center
                .star
                    margin-left .2rem
                    .icon   
                        color #d7d7d7
                        font-size .5rem
                        margin 0 0.2rem
                        &.active
                            color #fc7aa5
            
    .bottom
        height 1.2rem
        display flex
        background #fff
        .l
            flex 1
            display flex
            padding-left 0.2667rem
            font-size .35rem
            color #000
            align-items center
            img
                width 0.5333rem
                height 0.5333rem
            div
                margin-left 0.2rem
        .r
            width 3.4667rem
            background #fc7aa5  
            color #fff
            font-size .35rem
</style>
