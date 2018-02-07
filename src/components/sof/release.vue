<template>
    <div class='feed-wrap'>
         <div class='title'>
            子话题发布    
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
        </div> 
        <div class='contents'>
            <div v-if="mainImg.length >= 1">
                <div class='imgblock'>
                    <img :src='mainImg' alt="">
                    <div class='close' @click='deleteMainImg'>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div v-else class="zhutu">
                主图
            </div>
            <div class='textarea'>
                <input type="text" v-model.trim="title" placeholder="标题" class="input">
                <div>
                    <div class="editorWrap">
                        <quillEditor
                            ref="myTextEditor"
                            v-model="content"
                            :options="editorOption"

                        />
                    </div>
                    <div class='control' @click="fileclick">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jiahao"></use>
                        </svg>
                    </div>
                </div>
            <transition name="wrap">
                <div class="corpWrap" v-show="cutting">
                    <div class="cropper">
                        <VueCropper
                            ref="cropper"
                            :img='currentImg'
                            :autoCrop='true'
                            :autoCropWidth='300'	
                            :autoCropHeight='300'
                        />  
                        <div class="btnWrap">
                            <div class="btn" @click="setImgMain">设为主图</div>
                            <div class="btn">添加图片</div>
                            <!-- <div class="btn">取消选择</div> -->
                            <div class="btn" @click="endCut">收起</div>
                        </div>
                    </div>
                </div>
            </transition>  
            </div>
            <div :key='i' v-for='(v, i) of imgs'>
                <img :src="v" alt="">
            </div>
            <div class="test" v-html='test'></div>
        </div>
        <div class='bottom' @click="send">
            提交
        </div>
        <input type="file" @change='upload' ref='files' hidden >
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import VueCropper from 'vue-cropper'
import { quillEditor } from 'vue-quill-editor'


const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default {
    components: {
        VueCropper,
        quillEditor
    },
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
            if(this.content.length >= 200) {
                Toast('超出字符限制');
                return false;
            }
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
                that.currentImg = this.result;
                that.cutting = true;
            };
        },
        deleteImg(index){
            this.imgs.splice(index,1)
        },
        send() {
            this.test = this.$refs.myTextEditor.quill.getContents().ops[0].insert;
            let str = '';
            this.test.split('\n').forEach((v) => {
                console.log(v)
                str += `<p>${v}</p>`;
            });
            str = `<p>${str}</p>`
            if(!this.mainImg) {
                Toast('请上传主图');
                return
            };
            if(this.title.length < 1) {
                Toast('请添加标题');
                return;
            };
            Indicator.open({
              text: '加载中...',
              spinnerType: 'double-bounce'
            });
            let params = new URLSearchParams();
                params.append('tataId',this.$route.params.id);
                params.append('userId',userInfo.userid);
                params.append('title',this.title);
                params.append('img',this.mainImg);
                params.append('content',str);
            this.axios.post('/api/tata/addChildTata',params).then(res => {
                if(res.data.code === 'success') {
                    Indicator.close();
                    Toast('发布成功');
                    setTimeout(() => {
                        this.$router.replace('/sof');
                    },1000);
                }
            });
        },
        deleteMainImg() {
            this.mainImg = '';
        },
        setImgMain() {
            this.$refs.cropper.startCrop();
            this.$refs.cropper.getCropData(data => {
              this.mainImg = data;
            });
            this.cutting = false
        },
        getfile() {
            let pic = this.myCroppa.generateDataUrl('image/jpeg', 0.8);
            this.imgs.push(pic)
        },
        endCut() {
            this.cutting = false;
            this.currentImg = '';
        }
    },
    data(){
        return {
            content: '',
            imgs: [],
            test: '',
            title: '',
            myCroppa: {},
            currentImg:'',
            mainImg: '',
            cutting: false,
            editorOption: {
                modules:{
                    toolbar: [
                      
                    ],
                }
            }
        }
    },

};
</script>

<style lang="stylus" scoped>
@import './editor.css';

.feed-wrap
    width 100%
    height 100%
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
        position absolute
        width 100%
        z-index 2
        .icon
            width 0.5333rem
            height 0.5333rem
            position absolute
            left 0.3rem
            top 50%
            transform translateY(-50%) rotate(180deg)
            font-size 0.4rem
    .contents
        height 100%
        overflow scroll
        box-sizing border-box
        padding 1.2rem 0
        .textarea
            box-sizing border-box
            padding .2rem
            display flex
            overflow hidden
            flex-direction column
            background #fff
            border-bottom 0.0267rem solid #e7e7e7
            position relative
            textarea
                font-size .35rem
                height 4rem
                width 100%
                box-sizing border-box
                margin-top .15rem
                padding .15rem
                border 0.0267rem solid #e7e7e7
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
                width 100%
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
        position absolute
        bottom 0
        z-index 2
        width 100%
.input
    font-size .35rem
    width 100%
    padding 0rem 0 .1rem
    border-bottom 1px solid #e7e7e7
.imgblock
    margin .2rem
    width 95%
    position relative
    img
        max-width 100%
        display block
        margin auto
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
.zhutu
    padding .2rem
    font-size .35rem
    background #fff
    border-bottom 0.0133rem solid #e7e7e7

.control
    width 1.7333rem
    height 1.7333rem
    border 0.0133rem dashed rgba(0, 0, 0, 0.08)
    display flex
    justify-content center
    align-items center
    margin .15rem 0
    .icon 
        font-size .9rem
        color rgba(0, 0, 0, 0.3)
.cropper
    width 100%
    height 50vh
    position fixed
    left 50%
    top 20%
    transform translate(-50%,0)
    background #fff
.btnWrap
    display flex
    padding .15rem 0
    justify-content space-around
    background #fff
    .btn
        padding .15rem
        font-size .35rem
        border-radius 10px
        color #fff
        &:first-child
            background #1890ff
        &:nth-child(2)
            background #f5222d
            display none
        // &:nth-child(3)
        //     background #f5222d
        &:last-child
            color #000
            border 1px solid #666
.corpWrap
    position fixed
    width 100%
    height 100vh
    background rgba(0,0,0,.5)
    left 0
    top 0
.editorWrap
    min-height 4rem
.wrap-enter-active,.wrap-leave-active
    transition all .5s
    transform  scale(1)
.wrap-leave-to,.wrap-active
    transform  scale(0)
</style>
