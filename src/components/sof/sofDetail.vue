<template>
    <div class='rd-wrap'>
        <div class='title'>
            <div class='l'>
                 <svg class="icon fenlei" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
            <div class='m'>
                详情
            </div>
            <div class='r' @click="toRelease">
                发布
            </div>
        </div>
        <div class='scroll'>
        <div class='middle'>
            <div class="banner">
                <img :src="info.img" alt="">
            </div>
            <div class="content">   
                <div class='c-title'>{{info.title}}</div>
                <div class='disc'>
                    <div class='headers'>
                        <img style='border-radius:50%' :src="info.headImg" alt="">
                        <div class='nickname'>
                            {{info.name}}
                        </div>
                        <div class='time'>
                            {{info.createDate}}
                        </div>
                    </div>
                </div>
                <div style="position: relative">
                    <div class='pages' ref="page" v-html='info.content'>
                        
                    </div>
                    <div class="mask" v-if="!allShow"></div>
                </div>
                <div class='hidden-btn' @click="getAll" v-if="!allShow">
                    查看更多
                    <div>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class='zan'>
                    <div @click='dianzan'>
                        <img src="../.././assets/img/zanicon.png" alt="">
                    </div>
                    <div class='list'>
                        <span v-for='(item,i) in zanList' :key="i" v-if='i <= 9'> 
                            {{item}}
                        </span>
                        <span v-if='zanList.length >= 10'>
                            等{{zanList.length}}人赞过
                        </span>
                    </div>
                </div>
            </div> 
                <div class='d-rating-block' v-show='allShow'>
                    <div class='d-r-title'>
                        评价({{this.commentList ? this.commentList.length : 0}})
                    </div>
                    <block 
                        :commentList='commentList'
                        @deepComment='deepComment'>
                    </block>
                </div>
            <div class='about-wrap'>
                <div class='about-title'>
                    相关话题
                </div>
                <div v-if="AboutTopic.length > 0" class='about-item' v-for="(v,i) of AboutTopic" :key="i" @click="toDetail(v)">
                    <div class='header'>
                        <img :src="v.userImg" alt="">
                        <div class='nickname'>
                            {{v.nickName}}
                        </div>
                        <div class='time'>
                            {{v.createDate}}
                        </div>
                    </div>
                    <div class='banner'>
                        <img :src="v.img" alt="">
                    </div>
                    <div class='heading'>
                        {{v.title}}
                    </div>
                    <div class='control'>
                        <!-- <div @click.stop='dianzans(v)'>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-dianzan"></use>
                            </svg>
                            {{v.zan}}
                        </div> -->
                        <div>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-duihuakuang"></use>
                            </svg>
                            {{v.com}}
                        </div>
                    </div>
                </div>
                <div v-show='AboutTopic.length < 1' class='empty'>
                    暂无相关话题
                </div>
            </div>
        </div>
        </div>
        <div class="bottom" v-if="!deepRating">
            <div class='input-wrap'>
                <input type="text" placeholder="快来评论吧" v-model.trim='commentContent'>
            </div>
            <div class='btn' @click='sendComment'>
                评论
            </div>
        </div>
        <div class="bottom" v-else>
            <div class='input-wrap'>
                <input type="text" :placeholder="commentName" v-model.trim='dcommentContent'>
            </div>
            <div class='btn' @click='sendComment'>
                回复
            </div>
            <div class='btn toggle' @click="deepRating = false">
                回到评论
            </div>
        </div>
    </div>
</template>

<script>
import block from "./sofratingblock";
import scroll from "common/scroll";
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default {
  created() {
    this.id = this.$route.params.id;
    this._getMsg(this.id);
  },
  mounted(){
      this.$nextTick(() => {
          this.isFirst = false;
      })
  },
  activated() {
    if(!this.isFirst){
        this._getMsg(this.id);
    };
  },
  components: {
    block,
    scroll
  },
  data() {
    return {
      id:'',
      userId: "",
      zanList: [],
      info: [],
      commentList: [],
      commentContent: "",
      dcommentContent: '',
      isFirst:true,
      deepRating: false,
      currentParentId:'',
      AboutTopic: [],
      newId:'',
      commentName:'',
      allShow: false
    };
  },
  methods: {
    async _getMsg(id) {
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        /**
        * 获取详情信息
        */
          let data = new URLSearchParams();
          data.append("tataId", id);
          this.axios.post(`/api/tata/tataDetail`, data).then(res => {
                    this.info = res.data.obj;
          });
        /**
        * 点赞列表
        */
          await this.axios.post("/api/tata/getZanName", data).then(res => {
                if(res.data.obj) {
                    this.zanList = res.data.obj;
                } else {
                    this.zanList = []
                }
                
          });
        /**
        * 评论列表
        */
          this.axios.post("/api/tata/commentList", data).then(res => {
            if (res.data.obj) {
              this.commentList = res.data.obj.sort((a,b) => {
                  return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
              });
            }
          });
          /** 
          * 相关话题
          */
          this.axios.get(`/api/tata/getChildTataList?tataId=${this.$route.params.id}`).then(res => {
              if(res.data.obj) {
                  this.AboutTopic = res.data.obj;
              } else {
                  this.AboutTopic = [];
              }
          })
    },
    back() {
      this.$router.back();
    },
    dianzan() {
      let data = new URLSearchParams();
      const tataid = this.$route.params.id,
            userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      data.append("tataId", tataid);
      data.append("userId", userInfo.userid);
      this.axios.post("/api/tata/getZanName", data).then(res => {
        if (res.data.message == "成功") {
          this.zanList = res.data.obj;
          Toast('点赞成功')
        } else {
            Toast('已经点赞')
        }
      });
    },
    dianzans(v) {
      let data = new URLSearchParams();
        const tataid = v.id,
              userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        data.append("tataId", tataid);
        data.append("userId", userInfo.userid);
        this.axios.post("/api/tata/getZanName", data).then(res => {
          if (res.data.code == "success") {
            Toast('点赞成功');
            this.axios.get(`/api/tata/getChildTataList?tataId=${this.$route.params.id}`).then(res => {
              if(res.data.code === 'success' && res.data.obj instanceof Array) {
                  this.AboutTopic = res.data.obj;
              } else {
                  this.AboutTopic = [];
              }
            })
          } else {
              Toast('已经点过赞了')
          }
        });
    },
    getAll() {
        this.allShow = true;
        console.log(this.$refs.page)
        this.$refs.page.style.height = 'auto'
    },
    sendComment() {
        if(this.deepRating){
            if(this.dcommentContent.length < 1){
                Toast('评论内容不得少于1字');
                this.commentContent = '';
                return;
            }
            let data = new URLSearchParams();
                data.append("tataId", this.id);
                data.append("content", this.dcommentContent);
                data.append("userId", userInfo.userid);
                data.append('parent',this.currentParentId);
            this.axios.post("/api/tata/addComment", data).then(res => {
                if(res.data.code === 'success') {
                    Toast('评论成功');
                    this.deepRating = false;
                    this.dcommentContent = ''
                    setTimeout(() => {
                        this.commentList = res.data.obj;
                    },1000)
                }
            });

        } else {
            if(this.commentContent.length < 1){
                Toast('评论内容不得少于1字');
                this.commentContent = '';
                return;
            }
            let data = new URLSearchParams();
                data.append("tataId", this.id);
                data.append("content", this.commentContent);
                data.append("userId", userInfo.userid);
            this.axios.post("/api/tata/addComment", data).then(res => {
                if(res.data.code === 'success') {
                    Toast('评论成功');
                    this.deepRating = false;
                    this.commentContent = '';
                    setTimeout(() => {
                        this.commentList = res.data.obj;
                    },1000)
                }
            });
        }
    },
    toRelease() {
        this.$router.push({
            path: `/sof/release/${this.$route.params.id}`
        })
    },
    deepComment(item){
        console.log(item);
        this.dcommentContent = '';
        this.deepRating = true;
        this.currentParentId = item.id;
        this.commentName = `回复${item.wscUserName}`
    },
    toDetail(item){
        this.newId = item.id;
        this.$router.push({
            path: `/sof/detail/${item.id}`
        });
    },
  },
  watch: {
      $route() {
          this._getMsg(this.newId);
          location.reload();
      },
      commentContent(val) {
          if(val.indexOf(':') === -1) {
              this.deepComment = false;
          }
      }
  }
};
</script>

<style lang="stylus" scoped>
.zan {
    display: flex;
    padding: 0.15rem 0;

    img {
        width: 0.48rem;
        height: 0.48rem;
    }

    .list {
        font-size: 0.35rem;
        margin-left: 0.3rem;

        span {
            display: inline-block;
            margin: 0 0.15rem 0.15rem;
            color: #666;
        }
    }
}

.about-wrap {
    background: #ffffff;
    margin-top: 0.1333rem;
    margin-bottom: .3rem;
    .about-title {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.4rem;
        position: relative;
        padding-left: 0.2rem;
        border-bottom: 0.0133rem solid #e7e7e7;

        &:before {
            content: '';
            height: 0.4rem;
            width: 0.0667rem;
            background: #fc7aa5;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .about-item {
        box-sizing: border-box;
        padding: 0.3333rem;
        background: #fff;
        margin-bottom: 0.1333rem;
        border-bottom: 0.0133rem solid #e7e7e7
        .header {
            display: flex;
            height: 0.9333rem;
            font-size: 0.3333rem;

            img {
                border-radius 50%
                width: 0.9333rem;
                height: 0.9333rem;
            }

            .nickname {
                flex: 1;
                display: flex;
                align-items: center;
                margin-left: 0.2rem;
            }

            .time {
                display: flex;
                align-items: center;
                color: #777;
            }
        }

        .banner {
            width: 100%;
            height: 4.6667rem;
            margin: 0.2rem 0;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .heading {
            font-weight: 500;
            font-size: 0.4rem;
            height: 0.8rem;
            line-height: 0.8rem;
        }

        .control {
            display: flex;

            div {
                width: 1.6rem;
                display: flex;
                align-items: center;
                font-size: 0.3333rem;
                color: #777;

                .icon {
                    font-size: 0.5rem;
                    margin-right: 0.1333rem;
                }
            }
        }

        &:first-child {
            margin: 0;
        }
    }
}

.d-rating-block {
    background: #fff;
    margin-top: 0.1333rem;

    .d-r-title {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.4rem;
        position: relative;
        padding-left: 0.2rem;
        border-bottom: 0.0133rem solid #e7e7e7;

        &:before {
            content: '';
            height: 0.4rem;
            width: 0.0667rem;
            background: #fc7aa5;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

.headers {
    display: flex;
    height: 0.9333rem;
    font-size: 0.3333rem;
    margin: 0.3rem 0;

    img {
        width: 0.9333rem;
        height: 0.9333rem;
    }

    .nickname {
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
        color: #000;
        font-size: 0.3333rem;
    }

    .time {
        display: flex;
        align-items: center;
        color: #777;
        font-size: 0.3333rem;
    }
}

.rd-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background: #fff;
    position absolute
    overflow hidden
    .title {
        height: 1.2rem;
        display: flex;
        background: #fc7aa5;
        color: #fff;
        font-size: 0.4rem;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.4rem;
        position absolute
        width 100%
        z-index 2
        .icon {
            font-size: 0.5rem;
        }

        .m {
            flex: 1;
            text-align: center;
        }

        .l {
            font-size: 0.4rem;
            transform: rotate(180deg);
        }
    }

    .scroll {
        overflow: scroll;
        background: #e7e7e7;
        height 100%
        box-sizing border-box
        padding 1.1333rem 0
        -webkit-overflow-scrolling: touch;
        .middle {
            .banner {
                width: 100%;
                height: 4.6667rem;
                margin: 0.2rem 0;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .content {
                background: #fff;
                flex: 1;
                box-sizing: border-box;
                padding: 0.1rem 0.2rem 0rem;

                .c-title {
                    font-size: 0.5rem;
                    padding .1rem 0
                    text-align: center;
                    margin: 0.1rem 0;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .pages {
                    font-size: 0.3rem;
                    line-height: 0.35rem;
                    word-break: break-all;
                    p {
                        color:red
                    }
                }

                .hidden-btn {
                    text-align: center;
                    font-size: 0.3rem;
                    margin: 0.1333rem 0 0;
                    color: #666;

                    .icon {
                        transform: rotate(90deg);
                        font-size: 0.4rem;
                    }
                }
            }
        }
    }
}

.bottom {
    height: 1.3333rem;
    border-top: 0.0133rem solid #666;
    box-sizing: border-box;
    padding: 0.2rem 0.3333rem;
    display: flex;
    justify-content: space-between;
    background #fff
    position absolute
    bottom 0
    width 100%
    z-index 2 
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
        border 1px solid #fc7aa5
        color: #fff;
        font-size: 0.45rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5vw;
        border-radius: 0.2rem;
        &.toggle{
            font-size .25rem
            flex 0 0 auto;
            padding 0 .15rem
            margin-left .15rem
            background-color: #fff;
            color #666
            border 1px solid #666
        }
    }
}

.toggle {
    font-size: .2rem
}

.mask
    height .3rem
    position absolute
    width 100%
    background #fff
    top 2.8rem
    left 0
    filter: blur(8px);
.empty
    text-align center
    padding .2rem 0
    font-size .35rem
</style>
