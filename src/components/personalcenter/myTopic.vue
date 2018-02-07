<template>
    <div class="topic-wrap">
        <div class="title">
            我的话题    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <scroll ref="scroll" class="scroll" :data='topicList'>
            <div>
                <div v-if="topicList.length > 0">
                    <div class="item" v-for="(item,i) of topicList" :key="i" @click="getDetail(item)">
                        <div class="time">
                            {{item.updateDate}}
                        </div>
                        <div class="img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="titles">

                        </div>
                        <div class="icon-wrap">
                            <div>
                                <svg class="icon fenlei" aria-hidden="true">
                                    <use xlink:href="#icon-pingjia"></use>
                                </svg>
                                {{item.com}}
                            </div>
                            <div>
                                <svg class="icon fenlei" aria-hidden="true">
                                    <use xlink:href="#icon-dianzan"></use>
                                </svg>
                                {{item.zan}}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="tips">
                    暂无话题
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from 'common/scroll'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default {
    activated() {
        let data = new URLSearchParams();
            data.append('userId',userInfo.userid);
        this.axios.post('/api/wsc/user/getMyTopics',data).then(res => {
            if(res.data.code === 'success' && res.data.obj) {
                this.topicList = res.data.obj;
            }
        })
    },
    components: {
        scroll
    },
    data() {
        return {
            topicList: []
        }
    },
    methods: {
        back() {
            this.$router.back();
        },
        getDetail(item) {
            this.$router.push({
                path: `/topic/${item.id}`
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.topic-wrap
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
    .scroll
        overflow hidden
        flex 1
        .item
            box-sizing border-box
            overflow hidden
            padding .2rem
            padding-bottom 0
            margin-bottom .2rem
            font-size .35rem
            background #fff
            .img
                width 100%
                height 4rem;
                margin .2rem 0
                img
                    width 100%
                    height 100%
            .icon-wrap
                display: flex;
                margin-bottom .2rem
                div 
                    width: 1.6rem;
                    display: flex;
                    align-items: center;
                    font-size: 0.3333rem;
                    color: #777;
                    .icon 
                        font-size: 0.5rem;
                        margin-right: 0.1333rem;


.tips
    margin .2rem
    text-align center
    font-size .4rem
</style>
