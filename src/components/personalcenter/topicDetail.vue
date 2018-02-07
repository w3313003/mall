<template>
    <div class="topicD-wrap">
        <div class="title">
            话题详情    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class="content">
            <div class="banner">
                <img :src="info.img" alt="">
            </div>
            <div class="titles">
                {{info.title}}
            </div>
            <div class="innerContent" ref="content" v-html="info.content">

            </div>
        </div>
        <div class="bottom">
            <div @click="toComment">
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingjia"></use>
                    </svg>
                    {{info.com}}
                </p>
            </div>
            <div @click="showZan">
                <p>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dianzan1"></use>
                    </svg>
                    {{info.zan}}
                </p>
            </div>
        </div>
        <transition name="zan">
            <div class="mask" v-show="zanShow" @click="zanShow = false">
                <div class="zanList">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dianzan1"></use>
                    </svg>
                    <span v-for="(_,n) of zanList" :key="n">
                        {{_}}
                    </span>等{{zanList.length}}人觉得很赞
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default {
    data() {
        return {
            info: {},
            zanList: [],
            zanShow: false
        }
    },
    mounted() {
        
    },
    activated() {
        let data = new URLSearchParams();
            data.append('id',this.$route.params.id);
        this.axios.get(`/api/tata/getZanName?tataId=${this.$route.params.id}`).then(res => {
            if(res.data.code === 'success' && res.data.obj){
                this.zanList = res.data.obj;
            }
        });
        this.axios.post('/api/wsc/user/getMyTopics',data).then(res => {
            this.info = res.data.obj[0];
        });
        this.$nextTick(() => {
            setTimeout(() => {
                [...this.$refs.content.getElementsByTagName('img')].forEach(el => {
                    el.style.maxWidth = '100%'
                })
            },200)
        });
    },
    methods: {
        back() {
            this.$router.back();
        },
        toComment() {
            if(this.info.com === 0) {
                Toast('暂无评论');
                return false;
            };
            this.$router.push({
                path: `/topic/comment/${this.$route.params.id}`
            })
        },
        showZan() {
            if(this.zanList.length < 1) {
                Toast('暂无用户点赞');
                return;
            }
            this.zanShow = true;
        }
    }
}
</script>

<style lang="stylus" scoped>
.topicD-wrap
    width 100%
    height 100vh
    position fixed
    background #fff
    overflow hidden
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
        overflow-x hidden
        overflow-y scroll
        .banner
            height 4rem
            img 
                width 100%
                height 100%
        .titles
            font-size .4rem
            text-align center
            margin .15rem 0
        .innerContent
            box-sizing border-box
            padding .2rem
            img
                max-width 100%

    .bottom
        height 1.3333rem
        border-top 0.0133rem solid #e7e7e7
        display flex
        div
            flex 1
            display flex
            height 100%
            border-right 0.0267rem solid #e7e7e7
            justify-content center
            align-items center
            .icon 
                font-size .4rem
            &:last-child
                border 0

.mask
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    background rgba(0,0,0,.5)
    .zanList
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        background #fff
        width 95%
        margin 0 auto
        box-sizing border-box
        padding .2rem

.zan-enter-active,.zan-leave-active
    transition all .5s
.zan-enter,.zan-leave-to
    opacity 0
    transform scale(0)
</style>
