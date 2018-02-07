<template>
    <div class='sof-wrap'>
        <div class="title">
            他她圈    
            <!-- <svg class="icon fenlei" aria-hidden="true">
                <use xlink:href="#icon-jiantou"></use>
            </svg> -->
        </div>
        <div class="scroll" ref="scroll" >
            <div class='content'>
                <div class='banner'>
                    <img :src="banner" alt="">
                </div>
                <div class='item' @click='gotoDetail(item)' v-for='(item,index) in list' :key="index">
                    <div class='header'>
                        <img style="border-radius:50%" :src="item.headImg" alt="">
                        <div class='nickname'>
                            {{item.name}}
                        </div>
                        <div class='time'>{{item.createDate}}</div>
                    </div>
                    <div class='banner'>
                        <img :src="item.img" alt="">
                    </div>
                    <div class='heading'>{{item.title}}</div>
                    <div class='control' v-if="item.isZan !== '1'">
                        <div @click.stop='zan(item)' >
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-dianzan"></use>
                            </svg>
                            {{item.zan}}
                        </div>
                        <div @click.stop='false'>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-duihuakuang"></use>
                            </svg>
                            {{item.com}}
                        </div>
                    </div>
                    <div class='control' v-else>
                        <div @click.stop='zan(item)' >
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-dianzan-copy"></use>
                            </svg>
                            {{item.zan}}
                        </div>
                        <div @click.stop='false'>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-duihuakuang"></use>
                            </svg>
                            {{item.com}}
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:1.1333rem;width: 100%"></div>
        </div>
    </div>
</template>

<script>
import scroll from "common/scroll";
import { Toast } from 'mint-ui';
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
export default {
    created() {
        this.axios.get('/api/index/getBaannerList?type=3').then(res => {
            this.banner = res.data.obj[0].banner
        })
    },
  activated() {
    this.axios.get(`/api/tata/tataList?userId=${userInfo.userid}`).then(res => {
      this.list = res.data.obj;
    });
  },
  data() {
    return {
      list: [],
      banner:''
    };
  },
  methods: {
    gotoComment(item) {
      this.$router.push({
        path: `/sof/comment/${item.id}`
      });
    },
    gotoDetail(item) {
      this.$router.push({
        path: `/sof/detail/${item.id}`
      });
    },
    zan(item) {
        let data = new URLSearchParams();
        const tataid = item.id,
              userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        data.append("tataId", tataid);
        data.append("userId", userInfo.userid);
        this.axios.post("/api/tata/getZanName", data).then(res => {
          if (res.data.message == "成功") {
            this.zanList = res.data.obj;
            Toast('点赞成功');
            this.$set(item, 'isZan', '888')
            this.axios.get(`/api/tata/tataList?userId=${userInfo.userid}`).then(res => {
                this.list = res.data.obj;
            });
          } else {
              Toast('已经点赞')
          }
        });
    }
  },
  components: {
    scroll
  }
};
</script>
<style lang="stylus" scoped>
.sof-wrap {
    position absolute
    height: 90%;
    width 100%
    overflow: hidden;
    .title {
        width: 100%;
        top 0
        height: 1.1333rem;
        line-height: 1.1333rem;
        background: #fff;
        color: #fc7aa5;
        text-align: center;
        font-size: 0.4rem;
        position absolute
        z-index 2
        border-bottom: 0.0133rem solid #e7e7e7;

        .icon {
            width: 0.5333rem;
            height: 0.5333rem;
            position: absolute;
            left: 0.3rem;
            top: 50%;
            transform: translateY(-50%) rotate(180deg);
            font-size: 0.4rem;
        }
    }

    .scroll {
        margin 1.1333rem 0
        height 100%
        overflow-x hidden
        overflow-y: scroll;
        background: #e7e7e7;
        -webkit-overflow-scrolling: touch;
        .content {
            & > .banner {
                width: 100%;

                & > img {
                    width: 100%;
                }
            }

            .item {
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
    }
}

.banner
    img 
        width 100%
        height 100%
</style>
