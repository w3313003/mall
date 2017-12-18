/*
 * @Author: ZhaoJie 
 * @Date: 2017-11-15 10:25:28 
 * @Last Modified by: 赵杰
 * @Last Modified time: 2017-12-15 11:56:17
 */

<template>
<transition name='normal'>
    <div class='gooddetail-wrap'  @click='stop'>
        <div class='nav' ref='nav'>
            <div :class='{"active":index == 0}'  @click='getinfo'>商品信息</div>
            <div :class='{"active":index == 1}' @click='getDetail'>商品详情</div>
            <div :class='{"active":index == 2}' @click='getRating'>评价</div>
            <div class='svg-wrap'>
                <svg class="icon" aria-hidden="true">
                     <use xlink:href="#icon-gouwuche1"></use>
                </svg>
                <span>
                    {{cartLength}}
                </span>
            </div>
        </div>
        <div class='content' ref='content' >
            <swiper  class='scroll-wrap' :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <swiper-slide>
            <scroll class='scroll scroll-l' ref='scroll' :data='sourcegood.goodsPrices'>
                <div>
                <div class='img-wrap'>
                    <swiper :options="soption" :not-next-tick="notNextTick" ref="swiper">
                        <swiper-slide v-for='(item,index) in imgs' :key="index">
                            <img v-lazy='item' alt="">
                        </swiper-slide>
                        
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
                <div class='title'>
                    {{sourcegood.name}}
                </div>
                <div class='module-price'>
                <div class='price' v-if='minPrice !== maxPrice'>
                    ￥<span>{{minPrice}}</span>元~￥<span>{{maxPrice}}</span>元
                </div>
                <div class="price" v-else>
                    ￥<span>{{minPrice}}</span>元
                </div>
                <div class='oldprice'>价格：
                    <span>￥{{sourcegood.marketPrice}}</span>
                </div>
                <div class='disc'>
                    <div class='yunfei'>
                        运费：{{sourcegood.freight === '' ? 0 : sourcegood.freight}}元
                    </div>
                    <div class='count'>
                        月销 {{sourcegood.xiaoshou_num}}件
                    </div>
                    <!-- <div class='place'>
                        {{sourcegood.place}}发货
                    </div> -->
                </div>
                </div>
                <div class='good-server'>
                    <div v-for='(item,index) in sourcegood.labels' :key="index">
                        {{item}}
                    </div>
                </div>
                <div class='box'></div>
                <div class='choose' @click='shopcartShow'>
                <div>
                    选择颜色/尺码
                </div>
                <div class='s'>
                    <img src="../.././assets/img/....png" alt="">
                </div>
                </div>
                <div class='coupon'>
                    <div class='first'>
                        立即领红包
                    </div>
                    <div class='coupon-item' :key="index" v-for='(item,index) in couponList'
                    @click='receiveCoupon(item)'>
                        <div>
                            满
                                {{item.fullAmount}}
                            减
                                {{item.money}}
                        </div>
                    </div>
                </div>
                <!-- <div class='rating-block'>
                <div class='title'>商品评价({{ratingNum}})</div>
                <div class='rating-nav'>
                    <div>全部({{ratingNum}})</div>
                    <div>好评({{goodRating}})</div>
                    <div>差评({{badRating}})</div>
                </div>
                <div class='rating-content'>
                    <div class='rating-item' v-for='(item,index) in sourcegood.ratingList' :key="index" v-if='index === 0'>
                        <div class='r-header'>
                            <div class='avatar'>
                                <img src="../.././assets/img/avatar.png" alt="">
                            </div>
                            <div class='username'>
                                {{item.username}}
                            </div>
                        </div>
                        <div class='info'>
                            <div class='date'>
                                {{item.date}}
                            </div>
                            <div class='disc'>
                                颜色:自由组合;尺码：175/M
                            </div>
                        </div>
                        <div class='r-content'>
                            {{item.content}}
                        </div>
                    </div>
                </div>
                <div class='r-btn' @click='getComment'>
                    查看更多评价
                </div>
                </div> -->
                </div>
            </scroll>
            </swiper-slide>
            <swiper-slide>
                <scroll class='scroll scroll-m' ref='scrollM' :data='sourcegood.goodsPrices'>
                 <div v-html="sourcegood.details" id='details' class="details">
                </div>
                <good-list :goodList='tests' @nowTrue='nowIsTrue'></good-list>
                </scroll>
            </swiper-slide>
            <swiper-slide>
                <scroll class='scroll scroll-r' ref='scrollR' :data='sourcegood.ratingList'>
                <div class='ratingblock'>
                      <!-- <div class='rating-nav'>
                            <div @click='getAllComment'>全部()</div>
                            <div @click='getGoodComment'>好评()</div>
                            <div @click='getImageComment'>有图()</div>
                        </div>
                        <div class='rating-detail'>
                            <div class='rating-item' v-for='(item,index) in good.ratingList' :key="index">
                                <div class='r-t'>
                                    <div class='r-header'>
                                        <div class='avatar'>
                                            <img src="../.././assets/img/avatar.png" alt="">
                                        </div>
                                        <div class='username'>
                                            <p>{{item.username}}</p>
                                            <div class='date'>
                                                {{item.date}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class='info'>
                                        <div class='date'>
                                            {{item.date}}
                                        </div>
                                        <div class='disc'>
                                            颜色:自由组合;尺码：175/M
                                        </div>
                                    </div>
                                    <div class='r-content'>
                                        {{item.content}}
                                        <img v-for='(items,indexs) in item.img' :key="indexs" :src="items" alt="">
                                    </div>
                                </div>
                                <div class='seller-Reply' v-if='item.sellerReply'>
                                    <div>
                                        <span>[掌柜回复]</span>
                                        <span>{{item.sellerReply.date}}</span>
                                    </div>
                                    <div>
                                        {{item.sellerReply.content}}
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </scroll>
            </swiper-slide>
            </swiper>
        </div>
        <div class='bottom' ref='bottom'>
            <div class='l'>
                <div>
                    <svg class="icon kefu" aria-hidden="true">
                         <use xlink:href="#icon-kefu"></use>
                    </svg>
                    客服
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                         <use xlink:href="#icon-dianpu"></use>
                    </svg>
                    进入店铺
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                         <use xlink:href="#icon-wodehuodong"></use>
                    </svg>
                    收藏
                </div>
            </div>
            <div class='m' @click='shopcartShow'>
                加入购物车
            </div>
            <div class='r'>
                立即购买    
            </div> 
        </div>       
        <confirm v-if='false'></confirm> 
        <shopChoosing 
        ref='shopcart' :goodInfo='sourcegood'
        @appendTo='appendTo' 
        @add='add'
        @less='less'
        v-if='choosing'></shopChoosing> 
    </div>
    </transition>

</template>

<script>
import scroll from "common/scroll";
// import { obj } from 'common/util'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import goodList from "common/goodList";
import shopChoosing from "common/shopChoosing";
import confirm from "common/confirm";
import good from "common/mock";
import wx from "weixin-js-sdk";
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

export default {
  async created() {
    await this._getGoodInfo();
    this._getCoupon();
  },
  async activated(){
      await this._getGoodInfo();
        this._getCoupon();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let el = document.getElementById("details").childNodes[0];
        el.style.fontSize = ".3rem";
        let elList = [...el.getElementsByTagName("*")];
        for (let i of elList) {
          i.style.height = "auto";
          i.style.width = 'auto';
          i.style.lineHeight = ".5rem";
        }
        console.log(elList);
      }, 203);
    });
  },
  computed: {
    ratingNum() {
      return this.sourcegood.ratingList.length;
    },
    // type 1 好评
    goodRating() {
      //  return this.sourcegood.ratingList.filter(v => {
      //     return v.type == 1;
      // }).length;
    },
    badRating() {
      // return this.sourcegood.ratingList.filter(v => {
      //     return v.type != 1
      // }).length
    },
    hasImage() {
      // return this.sourcegood.ratingList.filter(v => {
      //     return v.img.length != 0
      // }).length
    },
    cartLength() {
      // return this.shopcartList.length
    },
    ...mapGetters(["get_current_good", "get_good_detailshow", "shopcartList"])
  },
  components: {
    scroll,
    goodList,
    shopChoosing,
    confirm
  },
  methods: {
    calcheight() {
      let tH = this.$refs.nav.offsetHeight,
        bH = this.$refs.bottom.offsetHeight,
        wh = window.innerHeight;
      this.$refs.content.style.height = wh - tH - bH + "px";
    },
    nowIsTrue() {
      this.$refs.mySwiper.swiper.slideTo(0);
      this.index = 0;
      this.refresh();
    },
    // 商品信息更新（以弃用)
    refresh() {
      this.sourcegood = this.get_current_good;
      this.size = this.sourcegood.size[0];
      this.color = this.sourcegood.color[0];
      this.good = JSON.parse(JSON.stringify(this.sourcegood));
      setTimeout(() => {
        console.log("update");
        this.calcheight();
        this.tests = moocgoodList;
        this.$refs.scroll.refresh();
        this.$refs.scrollR.refresh();
        this.$refs.scrollM.refresh();
      }, 20);
    },
    // nav切换
    getinfo() {
      this.currentIndex = 0;
      console.log(this.$refs.mySwiper.swiper.slideTo);
      this.$refs.mySwiper.swiper.slideTo(0);
    },
    getDetail() {
      this.currentIndex = 1;
      this.$refs.mySwiper.swiper.slideTo(1);
    },
    getRating() {
      this.currentIndex = 2;
      this.$refs.mySwiper.swiper.slideTo(2);
    },
    // 评价过滤
    getAllComment() {
      this.good = JSON.parse(JSON.stringify(this.sourcegood));
    },
    getGoodComment() {
      this.good = JSON.parse(JSON.stringify(this.sourcegood));
      this.good.ratingList = this.good.ratingList.filter(v => {
        return v.type === 1;
      });
    },
    getImageComment() {
      this.good = JSON.parse(JSON.stringify(this.sourcegood));
      this.good.ratingList = this.good.ratingList.filter(v => {
        return v.img.length !== 0;
      });
    },
    stop(e) {
      e.stopPropagation();
    },
    shopcartShow() {
      this.choosing = true;
      setTimeout(() => {
        this.$refs.shopcart.choosing = true;
      }, 20);
    },
    shopclose() {
      this.choosing = false;
    },
    add() {
    //   this.sourcegood.amount++;
    },
    less() {
      if (this.sourcegood == 1) return;
      this.sourcegood.amount--;
    },
    backs() {
      this.choosing = false;
      this.back(false);
    },
    appendTo() {},
    getComment() {
      this.currentIndex = 2;
      this.$refs.mySwiper.swiper.slideTo(2);
    },
    receiveCoupon(item) {
      let data = new URLSearchParams();
      data.append("userId", userInfo.userid);
      data.append("redpacketId", item.id);
      this.axios.post("/api/redpacket/redEnvelope", data).then(res => {
        if (res.data.code === "success") {
            Toast("领取成功");
        } else if(res.data.message === '已经领取该红包'){
            Toast("已经领取该红包");
        }
      });
    },
    _getGoodInfo() {
      let id = this.$route.params.id,
        data = new URLSearchParams();
      data.append("goodsId", id);
      this.axios.post(`/api/wsc/goods/getById`, data).then(res => {
        let price = res.data.obj.goodsPrices.map(v => {
          return Number(v.price);
        });
        this.sourcegood = res.data.obj;
        this.maxPrice = Math.max(...price);
        this.minPrice = Math.min(...price);
        this.imgs = res.data.obj.imgShow.split("|");
      });
    },
    _getCoupon() {
      let id = this.sourcegood.shopId,
            data = new URLSearchParams();
      data.append('userId',userInfo.userid);
      data.append("shopId", id);
      this.axios.post("/api/redpacket/getRedpacketList", data).then(res => {
        if (res.data.code !== "success") throw new Error("接口获取失败");
        this.couponList = res.data.obj;
      });
    },
    _scrollRefresh(){
        console.log(this.$refs)
    },
    ...mapMutations({
      back: "SET_GOODDETAIL_SHOW",
      append: "ADD_SHOPCART"
    })
  },
  watch: {
    get_good_detailshow() {
      this.refresh();
    }
  },
  data() {
    return {
      tests: [],
      sourcegood: {},
      good: {},
      maxPrice: 0,
      minPrice: 0,
      index: 0,
      notNextTick: true,
      rAll: true,
      choosing: false,
      rGood: false,
      rBad: false,
      swiperOption: {
        preventClicks: true,
        onSlideChangeEnd: s => {
          this.index = s.activeIndex;
          this.$refs.scrollR.refresh();
          this.$refs.scrollM.refresh();
          this.$refs.scroll.refresh();
        }
      },
      soption: {
        pagination: ".swiper-pagination",
        paginationClickable: true
      },
      imgs: [],
      couponList: []
    };
  }
};
</script>

<style lang="stylus" scoped>

.scroll {
    height: 100%;
    overflow: hidden;
}

.scroll-wrap {
    height: 100%;
    overflow: hidden;
}

.gooddetail-wrap {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #Fff;
    z-index: 1000;
    display: flex;
    flex-direction: column;

    .nav {
        height: 1.2rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        font-size: 0.4rem;
        border-top: 2px solid #e7e7e7;
        border-bottom: 2px solid #e7e7e7;

        & > div {
            height: 100%;
            line-height: 1.2rem;
            position: relative;
            width: 100%;
            text-align: center;
            border-right: 0.0267rem solid #e7e7e7;
            transition: all 0.1s;

            &:last-child {
                border: none;
            }

            &.active, &.before {
                color: #fc7aa5;

                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    height: 0.0267rem;
                    top: 0;
                    width: 100%;
                    background-color: #fc7aa5;
                }
            }
        }

        .svg-wrap {
            .icon {
                font-size: 0.5rem;
            }
        }
    }

    .content {
        height: 100%;
        overflow: hidden;
        background-color: #e7e7e7;
        flex: 1;
        position: relative;

        .back {
            width: 0.5333rem;
            height: 0.5333rem !important;
            background-color: #fff;
            position: absolute;
            top: 0.5333rem;
            left: 0.5333rem;
            z-index: 99999;
        }

        .img-wrap {
            width: 100%;
            height: 10rem;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }

            & > div {
                height: 100%;
            }
        }

        .title {
            box-sizing: border-box;
            padding: 0.1333rem;
            font-size: 0.4rem;
            line-height: 0.45rem;
            background: #fff;
        }

        .module-price {
            box-sizing: border-box;
            padding: 0.1333rem;
            color: #989898;
            font-size: 0.3333rem;
            background: #fff;

            .price {
                color: #FF0036;

                span {
                    font-size: 0.4667rem;
                }
            }

            .oldprice {
                margin: 0.2rem 0;

                span {
                    text-decoration: line-through;
                }
            }

            .disc {
                display: flex;
                justify-content: space-between;
                margin: 0.2rem 0;
            }
        }

        .good-server {
            background: #fff;
            display: flex;
            width: 100%;
            border-top: 0.0133rem solid #e7e7e7;
            height: 1rem;
            justify-content: space-around;
            font-size: 0.3333rem;
            align-items: center;
        }

        .choose {
            background: #fff;
            height: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0.2rem;
            font-size: 0.4rem;

            .s {
                width: 0.6667rem;

                img {
                    width: 100%;
                }
            }
        }

        .coupon {
            background: #fff;
            font-size: 0.4rem;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-items: center;
            font-size: 0.4rem;
            border-top: 0.0267rem solid #e7e7e7;
            border-bottom: 0.0267rem solid #e7e7e7;

            div {
                width: 33%;
                height: 0.6667rem;
                line-height: 0.6667rem;

                &.first {
                    text-indent: 0.4rem;
                }

                &.coupon-item {
                    color: #fc7ba6;
                    font-size: 0.3333rem;
                    text-align: center;
                    margin: 0.15rem 0;

                    div {
                        display: inline-block;
                        text-align: center;
                        border: 1px solid #fc7ba6;
                        width: 2.6667rem;
                        border-radius: 0.3333rem;
                    }
                }
            }
        }

        .rating-block {
            background: #fff;
            box-sizing: border-box;
            padding: 0.1rem;

            .rating-nav {
                display: flex;
                width: 100%;
                height: 0.6667rem;
                font-size: 0.4rem;
                height: 0.9333rem;
                align-items: center;
                justify-content: space-around;
                margin: 0.2rem 0;

                div {
                    width: 2.6667rem;
                    text-align: center;
                    background: #ffe2cf;
                    height: 0.6667rem;
                    line-height: 0.6667rem;
                    font-size: 0.3333rem;
                    border-radius: 0.333rem;
                }
            }

            .r-btn {
                width: 3.2933rem;
                height: 0.6667rem;
                margin: 0 auto 0.4rem;
                line-height: 0.6667rem;
                text-align: center;
                font-size: 0.3333rem;
                color: #fc7aa5;
                border: 0.0133rem solid #fc7aa5;
                border-radius: 0.333rem;
            }
        }
    }

    .bottom {
        background: #fff;
        width: 100%;
        height: 1.3333rem;
        display: flex;
        border-top: 0.0133rem solid #e7e7e7;

        .l {
            flex: 0 0 5.0667rem;
            display: flex;

            div {
                flex: 1;
                color: #5a5a5a;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                font-size: 0.3333rem;
                box-sizing: border-box;
                padding: 0.15rem 0;
                border-right: 1px solid #e7e7e7;

                .icon {
                    font-size: 0.5333rem;

                    &.kefu {
                        color: #19b5f9;
                    }
                }
            }
        }

        .r, .m {
            flex: 1;
            font-size: 0.3467rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .m {
            background-color: #fcb17b;
            color: #fff;
        }

        .r {
            background-color: #fc7ba6;
            color: #fff;
        }
    }
}

.rating-content {
    box-sizing: border-box;
    padding: 0.2rem;

    .rating-item {
        font-size: 0.3333rem;

        .r-header {
            display: flex;
            align-items: center;

            .avatar {
                width: 0.88rem;
                height: 0.88rem;
                border-radius: 0.44rem;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .username {
                font-size: 0.4rem;
                margin-left: 0.3333rem;
            }
        }

        .r-content {
            height: 0.6667rem;
            overflow: hidden;
        }

        .info {
            display: flex;
            font-size: 0.3333rem;
            height: 0.9333rem;
            line-height: 0.9333rem;
            color: #777;

            .disc {
                margin-left: 0.2667rem;
            }
        }
    }
}

.scroll-r {
    .ratingblock {
        background: #fff;

        .rating-nav {
            display: flex;
            width: 100%;
            height: 0.6667rem;
            font-size: 0.4rem;
            height: 0.9333rem;
            align-items: center;
            justify-content: space-around;
            border-bottom: 0.0133rem solid #e7e7e7;
            padding: 0.1333rem;

            div {
                width: 2.6667rem;
                text-align: center;
                background: #ffe2cf;
                height: 0.6667rem;
                line-height: 0.6667rem;
                font-size: 0.3333rem;
                border-radius: 0.333rem;
            }
        }

        .rating-detail {
            .rating-item {
                font-size: 0.3333rem;
                margin: 0.1333rem;
                border-bottom: 0.0267rem solid #e5e5e5;
                padding-bottom: 0.2667rem;

                .r-t {
                    box-sizing: border-box;
                    padding: 0.1rem 0.3rem;

                    .r-header {
                        display: flex;
                        align-items: center;

                        .avatar {
                            width: 0.88rem;
                            height: 0.88rem;
                            border-radius: 0.44rem;
                            overflow: hidden;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .username {
                            font-size: 0.4rem;
                            margin-left: 0.3333rem;
                            flex: 1;
                            display: flex;
                            justify-content: space-between;

                            .date {
                                color: #666;
                                font-size: 0.3333rem;
                            }
                        }
                    }

                    .r-content {
                        img {
                            display: inline- block;
                            margin: 0.1333rem;
                        }
                    }

                    .info {
                        display: flex;
                        font-size: 0.3333rem;
                        height: 0.9333rem;
                        line-height: 0.9333rem;
                        color: #777;

                        .disc {
                            margin-left: 0.2667rem;
                        }
                    }
                }

                .seller-Reply {
                    background-color: #f5f5f5;
                    box-sizing: border-box;
                    padding: 0.1rem 0.3rem;

                    div:first-child {
                        margin: 0.1333rem 0;
                        display: flex;
                        justify-content: space-between;

                        span:last-child {
                            color: #666;
                        }
                    }

                    div:last-child {
                        margin-bottom: 0.1333rem;

                        img {
                            width: 2rem;
                        }
                    }
                }
            }
        }
    }
}

.box {
    height: 10px;
    background: #e7e7e7;
    width: 100%;
}

@css {
    .normal-enter-active, .normal-leave-active{
        transition:all .5s;
    }
    .normal-enter,.normal-leave-to{
        transform:translate3d(100%,0,0);
        opacity:0
    }
    .mask{
        width : 100vw;
        height : 100vh;
        position:fixed;
        top:0;
        left:0;
        background-color : rgba(0,0,0,.3);
        z-index : 1002;
    }
}
</style>
