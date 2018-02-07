<template>
    <div class="comment">
        <div class="title">
            我的话题    
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <scroll class="scroll" :data='commentList'>
            <div>
                <div class="item" v-for="(v,i) of commentList" :key="i">
                    <div class="top" @click="recomment(v)">
                        <div class="avatar">
                            <img :src="v.headImg" alt="">
                        </div>
                        <div class="textContent">
                            <div class="t">
                                <div>
                                    {{v.wscUserName}}
                                </div>
                                <div class="time">
                                    {{v.createDate}}
                                </div>
                            </div>
                            <div class="text">
                                {{v.content}}
                            </div>
                        </div>
                    </div>
                    <div class="i-bottom" v-if="v.list">
                            <div>
                                <span class="tips">回复:</span>
                            </div>
                            <div>
                                <div v-for="(item,index) of v.list" class="items" :key="index">
                                    <span>
                                        {{item.wscUserName}}:
                                    </span>
                                    <span>
                                        {{item.content}}
                                    </span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </scroll>
        <div class="bottom">
            <div class='input-wrap'>
                <input type="text" :placeholder="tips" v-model.trim='commentContent'>
            </div>
            <div class='btn' @click='sendComment'>
                评价
            </div>
        </div>
    </div>
</template>

<script>
import scroll from 'common/scroll';
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default {
    data() {
        return {
            commentList: [],
            commentContent: '',
            tips: '选择用户评论',
            currentPerson: {}
        }
    },
    components: {
        scroll
    },
    activated() {
        this.axios.get(`/api/tata/commentList?tataId=${this.$route.params.id}`).then(res => {
            this.commentList = res.data.obj
        })
    },
    methods: {
        back() {
            this.$router.back();
        },
        sendComment() {
            if(!this.currentPerson.id) {
                return false;
            };
            if(this.commentContent.length <= 5) {
                Toast('评论内容不得少于5个字符');
                return;
            }
            let data = new URLSearchParams();
                data.append("tataId", this.$route.params.id);
                data.append("content", this.commentContent);
                data.append("userId", userInfo.userid);
                data.append('parent',this.currentPerson.id);
            this.axios.post("/api/tata/addComment", data).then(res => {
                if(res.data.code === 'success') {
                    Toast('评论成功');
                    setTimeout(() => {
                        this.commentList = res.data.obj;
                    },1000)
                }
            });
        },
        recomment(item) {
            if(this.currentPerson.id && item.id === this.currentPerson.id) {
                return;
            }
            this.currentPerson = item;
            this.commentContent = '';
            this.tips = `回复:${item.wscUserName}`
        }
    }
}
</script>

<style lang="stylus" scoped>
.comment
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
        flex 1
        overflow hidden
        .item
            box-sizing border-box
            background #fff
            padding .15rem
            .top    
                display flex
                .avatar
                    flex 0 0 1.0667rem
                    img 
                        width 100%
                        height 1.0667rem
                        border-radius 50%
                .textContent    
                    flex 1
                    padding-left 0.2rem
                    .t
                        display flex
                        font-size .4rem
                        justify-content space-between
                        margin .2rem 0
                        align-items center
                        .time
                            font-size .3rem
                            color #989898
                    .text
                        font-size .45rem
            .i-bottom
                margin-top .2rem
                display flex
                .tips
                    display inline-block
                    color #Fff
                    background #fc7aa5
                    font-size .35rem
                    padding .06rem
                    border-radius 0.0933rem
                .items
                    padding .15rem
                    padding-top 0


.bottom {
    height: 1.3333rem;
    border-top: 0.0133rem solid #666;
    box-sizing: border-box;
    padding: 0.2rem 0.3333rem;
    display: flex;
    justify-content: space-between;

    .input-wrap {
        flex: 1;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.2rem;
        border-radius: 0.1333rem;

        input {
            background: transparent;
            font-size: 0.4rem;
        }
    }

    .btn {
        flex: 0 0 1.8933rem;
        background-color: #fc7aa5;
        color: #fff;
        font-size: 0.45rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5vw;
        border-radius: 0.2rem;
    }
}
</style>
