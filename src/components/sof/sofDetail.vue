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
            <div class='r'>
                发布
            </div>
        </div>
        <scroll class='scroll' :data='commentList'>
        <div class='middle'>
            <div class="banner">
                <img src="../.././assets/img/banner.png" alt="">
            </div>
            <div class="content">   
                <div class='c-title'>{{info.title}}</div>
                <div class='disc'>
                    <div class='headers'>
                        <img src="../.././assets/img/avatar.png" alt="">
                        <div class='nickname'>壳斗马蒂</div>
                        <div class='time'>20分钟前</div>
                    </div>
                </div>
                <div class='page' v-html='info.content'>
                </div>
                <div class='hidden-btn'>
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
                <div class='page'></div>
            </div> 
             <div class='d-rating-block'>
                    <div class='d-r-title'>
                        评价({{this.commentList ? this.commentList.length : 0}})
                    </div>
                    <block :commentList='commentList'
                            @deepComment='deepComment'></block>
                </div>
            <div class='about-wrap'>
                <div class='about-title'>
                    相关话题
                </div>
                <div class='about-item'>
                    <div class='header'>
                        <img src="../.././assets/img/avatar.png" alt="">
                        <div class='nickname'>壳斗马蒂</div>
                        <div class='time'>20分钟前</div>
                    </div>
                    <div class='banner'>
                        <img src="../.././assets/img/f_banner.png" alt="">
                    </div>
                    <div class='heading'>这里有一个标题</div>
                    <div class='control'>
                        <div>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-dianzan"></use>
                            </svg>
                            9999
                        </div>
                        <div>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-duihuakuang"></use>
                            </svg>
                            989
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </scroll>
        <div class="bottom">
            <div class='input-wrap'>
                <input type="text" placeholder="快来评论吧" v-model.trim='commentContent'>
            </div>
            <div class='btn' @click='sendComment'>
                评价
            </div>
        </div>
    </div>
</template>

<script>
import block from "./sofratingblock";
import scroll from "common/scroll";
import { Toast } from 'mint-ui'

export default {
  created() {
    this._getMsg();
  },
  mounted(){
      this.$nextTick(() => {
          this.isFirst = false;
      })
  },
  activated() {
    if(!this.isFirst){
        this._getMsg();
        console.log("active");
    }
  },
  components: {
    block,
    scroll
  },
  data() {
    return {
      userId: "",
      zanList: [],
      info: [],
      commentList: [],
      commentContent: "",
      isFirst:true
    };
  },
  methods: {
    async _getMsg() {
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(this.userInfo)
        this.id = this.$route.params.id;
        /**
        * 获取详情信息
        */
          let data = new URLSearchParams();
          data.append("tataId", this.id);
          this.axios.post(`/api/tata/tataDetail`, data).then(res => {
                    this.info = res.data.obj;
          });
        /**
        * 点赞列表
        */
          await this.axios.post("/api/tata/getZanName", data).then(res => {
                this.zanList = res.data.obj;
          });
        /**
        * 评论列表
        */
          this.axios.post("/api/tata/commentList", data).then(res => {
            if (res.data.obj) {
              this.commentList = res.data.obj;
                console.log(this.commentList)
            }
          });
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
            this.zanList = [];
            Toast('已经点赞')
        }
      });
    },
    sendComment() {
        if(this.commentContent.length < 5){
            Toast('评论内容不得少于5字');
            this.commentContent = '';
            return;
        }
      let content = this.commentContent,
        data = new URLSearchParams();
      data.append("tataId", this.id);
      data.append("content", content);
      data.append("userId", this.userInfo.userid);
      this.axios.post("/api/tata/addComment", data).then(res => {
          console.log(res.data)
      });
    },
    deepComment(item){
        let data = new URLSearchParams(),
            content = this.commentContent,
            parent = item.id;
        data.append("tataId", this.id);
        data.append("content", this.commentContent);
        data.append("userId", this.userInfo.id);
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

        .header {
            display: flex;
            height: 0.9333rem;
            font-size: 0.3333rem;

            img {
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
    height: 100vh;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;

    .title {
        height: 1.2rem;
        display: flex;
        background: #fc7aa5;
        color: #fff;
        font-size: 0.4rem;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.4rem;

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
        flex: 1;
        overflow: hidden;
        background: #e7e7e7;

        .middle {
            .banner {
                width: 100%;

                img {
                    width: 100%;
                }
            }

            .content {
                background: #fff;
                flex: 1;
                box-sizing: border-box;
                padding: 0.1rem 0.2rem 0rem;

                .c-title {
                    font-size: 0.3333rem;
                    line-height: 0.45rem;
                    text-align: center;
                    margin: 0.1rem 0;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .page {
                    font-size: 0.3rem;
                    line-height: 0.35rem;
                    word-break: break-all;
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
