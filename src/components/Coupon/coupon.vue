<template>
    <div class='coupon-wrap'>
        <div ref='scroll' class='scroll'>
            <div class='seller-wrap'>
                <div class='seller' v-for='(item,index) in couponList' :key="index">
                    <div class='img-wrap'>
                        <img :src="item.img" alt="" v-if='!item.shopImg'>
                        <img v-lazy='item.shopImg' alt="" v-else>
                    </div>
                    <div class='seller-content'>
                        <div class='l'>
                            <div class='title'>
                                {{item.shopName}}
                            </div>
                            <div class='content'>
                                <div class='price'>
                                    ￥<span>{{item.money}}</span>元
                                </div>
                                <div class='disc'>
                                    满{{item.fullAmount}}减{{item.money}}元
                                </div>
                            </div>
                        </div>
                        <div class='r'>
                            <div class='circle' ref='svgwrap'>
                                <div v-if='item.state == 2'>
                                    <div class='disc-data'>
                                        <div>已抢</div>
                                        {{item.pullNum/item.number | formatParent}}%
                                    </div>
                                    <svg ref='svg' width="1.3333rem" height="1.3333rem" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
                                        <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" 
                                        :stroke-dashoffset='(1 - (item.pullNum/item.number)) * dasharray' />
                                    </svg>
                                </div>
                                    <img v-if='item.state == 1' src='../.././assets/img/already.png' style='width:100%;height:100%' >
                            </div>
                            <div class='btn'>
                                <span v-if='item.state == 2' @click='receive(item)'>立即领取</span>
                                <span v-if='item.state == 1'>已领取</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>


<script>
import scroll from "common/scroll";
import { Toast } from "mint-ui";
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

export default {
  components: {
    scroll
  },
  filters: {
    formatParent(val) {
      return Math.round(val * 100);
    }
  },
  activated() {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let params = new URLSearchParams();
    params.append('userId',userInfo.userid)
    this.axios.post("/api/redpacket/getRedpacketList", params).then(res => {
      res.data.obj.forEach(v => {
        if (!v.shopName && v.type == 1) {
          this.$set(v, "shopName", "平台红包");
        }
      });
      this.couponList = res.data.obj;
    });
  },
  data() {
    return {
      dasharray: Math.PI * 100,
      couponList: []
    };
  },
  methods: {
    receive(item) {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let params = new URLSearchParams();
      params.append("userId", userInfo.userid);
      params.append("redpacketId", item.id);
      this.axios
        .post("/api/redpacket/redEnvelope", params)
        .then(res => {
          console.log(res.data.code);
          if (res.data.code === "success") {
            Toast("领取成功");
          }
        })
        .then(() => {
          this.axios
            .post("/api/redpacket/getRedpacketList", params)
            .then(res => {
              res.data.obj.forEach(v => {
                if (!v.shopName && v.type == 1) {
                  this.$set(v, "shopName", "平台红包");
                }
              });
              this.couponList = res.data.obj;
            });
        });
    }
  }
};
</script>

<style lang='stylus' scoped>
.coupon-wrap {
    position: fixed;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    z-index: 999;
    background: #e7e7e7;

    .scroll {
        height: 100%;
        overflow-x hidden;
        overflow-y scroll
        -webkit-overflow-scrolling: touch;

        .seller-wrap {
            box-sizing: border-box;
            padding: 0.2rem;

            .seller {
                width: 100%;
                height: 2.6667rem;
                box-sizing: border-box;
                padding: 0.1333rem;
                background-color: #fff;
                display: flex;
                margin-bottom: 0.1333rem;

                .img-wrap {
                    flex: 0 0 2.4rem;

                    img {
                        width: 100%;
                    }
                }

                .seller-content {
                    flex: 1;
                    display: flex;

                    .l {
                        flex: 0 0 4.5333rem;
                        box-sizing: border-box;
                        padding: 0.4rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .title {
                            font-size: 0.4rem;
                        }

                        .content {
                            display: flex;
                            font-size: 0.35rem;
                            color: #f44820;
                            flex-wrap: wrap;

                            .price {
                                margin-right: 0.2667rem;

                                span {
                                    font-size: 0.6667rem;
                                }
                            }

                            .disc {
                                text-align: basename;
                                display: flex;
                                align-items: flex-end;
                            }
                        }
                    }

                    .r {
                        flex: 1;
                        display: flex;
                        justify-content: space-around;
                        flex-direction: column;
                        align-items: center;
                        font-size: 0.35rem;

                        .btn {
                            width: 1.7333rem;
                            height: 0.5333rem;
                            border: 1px solid #666;
                            border-radius: 0.2667rem;
                            line-height: 0.5333rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}

circle {
    stroke-width: 8px;
    transform-origin: center;

    &.progress-background {
        transform: scale(0.9);
        stroke: #e7e7e7;
    }

    &.progress-bar {
        transform: scale(0.9) rotate(90deg);
        stroke: #f44820;
    }
}

.circle {
    position: relative;
    width: 1.3333rem;
    height: 1.3333rem;

    .disc-data {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 0.3rem;
    }
}
</style>
