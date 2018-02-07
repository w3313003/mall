/*
 * @Author: ZhaoJie 
 * @Date: 2017-11-15 10:25:28 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-07 17:10:22
 */

<template>
<transition name='normal'>
    <div class='gooddetail-wrap'  @click='stop'>
        <div class='nav' ref='nav'>
            <div :class='{"active":index == 0}'  @click='getinfo'>商品信息</div>
            <div :class='{"active":index == 1}' @click='getDetail'>商品详情</div>
            <div :class='{"active":index == 2}' @click='getRating'>评价</div>
            <!-- <div class='svg-wrap'>
                <svg class="icon" aria-hidden="true">
                     <use xlink:href="#icon-gouwuche1"></use>
                </svg>
                <span>
                    {{cartLength}}
                </span>
            </div> -->
        </div>
        <div class='content' ref='content' >
            <swiper  class='scroll-wrap' :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <swiper-slide>
            <div class='scroll scroll-l' ref='scroll'>
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
                    <span>￥{{sourcegood.marketPrice}}元</span>
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
                <div class='choose' @click='setCurrentType'>
                <div>
                    选择颜色/尺码
                </div>
                <div class='s'>
                    <img v-if='!choosedType.specId' src="../.././assets/img/....png" alt="">
                    <span v-else>
                        {{choosedType.specName}}
                    </span>
                </div>
                </div>
                <div class='coupon'>
                    <div class='first'>
                        立即领红包
                    </div>
                    <div class='coupon-item' :key="index" v-for='(item,index) in couponList'
                    @click='receiveCoupon(item)'>
                        <div>
                            <span>
                                满{{item.fullAmount}}减{{item.money}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class='rating-block'>
                    <div class='title'>商品评价({{commentList.length}})</div>
                    <div v-if="commentList.length >= 1">
                        <div class='rating-nav'>
                            <div>全部({{commentList.length}})</div>
                            <div>好评({{goodRating}})</div>
                            <div>差评({{badRating}})</div>
                        </div>
                        <div class='rating-content'>
                            <div class='rating-item' v-for='(item,index) in commentList' :key="index" v-if='index === 0'>
                                <div class='r-header'>
                                    <div class='avatar'>
                                        <img :src="item.avatar" alt="">
                                    </div>
                                    <div class='username'>
                                        {{item.nickName}}
                                    </div>
                                </div>
                                <div class='info'>
                                    <div class='date'>
                                        {{item.updateDate}}
                                    </div>
                                    <div class='disc'>
                                        {{item.specName}}
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
                    </div>
                    <div  v-else style="font-size:.35rem;text-align:center;">
                        此商品暂无评论
                    </div>
                </div>
            </div>
            </div>
            </swiper-slide>
            <swiper-slide>
                <div class='scroll scroll-m' ref='scrollM'>
                 <div v-html="sourcegood.details" id='details' class="details">
                </div>
                <good-list :goodList='tests' @nowTrue='nowIsTrue'></good-list>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class='scroll scroll-r' ref='scrollR' :data='ratingList'>
                <div class='ratingblock'>
                      <div class='rating-nav'>
                            <div @click='getAllComment'>全部({{commentList.length}})</div>
                            <div @click='getGoodComment'>好评({{goodRating}})</div>
                            <div @click='getImageComment'>有图({{hasImage}})</div>
                        </div>
                        <div class='rating-detail'>
                            <div class='rating-item' v-for='(item,index) in ratingList' :key="index">
                                <div class='r-t'>
                                    <div class='r-header'>
                                        <div class='avatar'>
                                            <img :src="item.avatar" alt="">
                                        </div>
                                        <div class='username'>
                                            {{item.nickName}}
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
                                        <div class="img-wrap">
                                            <img style='width: 2.3333rem;height: 2.3333rem' v-for='(items,indexs) in item.img' :key="indexs" :src="items" alt="">
                                        </div>
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
                        </div>
                    </div>
                </div>
            </swiper-slide>
            </swiper>
        </div>
        <div class='bottom' ref='bottom'>
            <div class='l'>
                <!-- <div>
                    <svg class="icon kefu" aria-hidden="true">
                         <use xlink:href="#icon-kefu"></use>
                    </svg>
                    客服
                </div> -->
                <div @click='sellerDetail'>
                    <svg class="icon" aria-hidden="true" style="color: #19b5f9">
                         <use xlink:href="#icon-dianpu"></use>
                    </svg>
                    <p>进入店铺</p>
                </div>
                <div @click="collection" v-if="!sourcegood.cId">
                    <svg class="icon" aria-hidden="true" >
                         <use xlink:href="#icon-wodehuodong"></use>
                    </svg>
                    <p>收藏</p>
                </div>
                <div v-else>
                    <svg class="icon" aria-hidden="true" style="color :red">
                         <use xlink:href="#icon-wodehuodong"></use>
                    </svg>
                    <p>已收藏</p>
                </div>
            </div>
            <div class='m' @click='shopcartShow'>
                加入购物车
            </div>
            <div class='r' @click="toConfirm">
                立即购买    
            </div> 
        </div>   
        <confirm 
        v-if='confirm'
        @back='closeConfirm'
        :orderList='orderList'>
        </confirm> 
        <transition name='shopChoosing'>
            <shopChoosing 
            ref='shopcart' 
            v-if='choosing'
            :goodInfo='sourcegood'
            @close='closeShopCart'
            @appendTo='appendTo' 
            @add='add'
            @less='less'
            ></shopChoosing>
        </transition>

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
import { Toast } from 'mint-ui';
import { APPID } from 'common/util'
 
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
const USER_ID = '91e3acaa614f4c97a779426d61d1de9e';

export default {
  async created() {
        await this._getGoodInfo();
              this._getCoupon();
        this.choosedType = {};
        this.orderList = [];
  },
  async activated(){
        this.confirm = false;
        this.choosedType = {};
        await this._getWxConfig();
        await this._getGoodInfo();
        await this._getCoupon();
        this.orderList = [];
        this.$refs.mySwiper.swiper.slideTo(0)
  },
  computed: {
    ratingNum() {
      return this.commentList.length;
    },
    // type 1 好评
    goodRating() {
       return this.commentList.filter(v => {
          return v.type == 1;
      }).length;
    },
    badRating() {
      return this.commentList.filter(v => {
          return v.type != 1
      }).length
    },
    hasImage() {
      return this.commentList.filter(v => {
          return v.img.length != 0
      }).length
    },
    cartLength() {
      // return this.shopcartList.length
    },
    ...mapGetters(
        [
            "get_current_good", 
            "get_good_detailshow", 
            "shopcartList"
        ]
    )
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
        // this.$refs.scroll.refresh();
        // this.$refs.scrollR.refresh();
        // this.$refs.scrollM.refresh();
      }, 20);
    },
    // nav切换
    getinfo() {
        this.currentIndex = 0;
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
        this.ratingList = JSON.parse(JSON.stringify(this.commentList));
    },
    getGoodComment() {
        this.ratingList = JSON.parse(JSON.stringify(this.commentList));
        this.ratingList = this.commentList.filter(v => {
          return v.type === 1;
        });
    },
    getImageComment() {
        this.good = JSON.parse(JSON.stringify(this.sourcegood));
        this.ratingList = this.commentList.filter(v => {
          return v.img.length !== 0;
        });
    },
    stop(e) {
        e.stopPropagation();
    },
    setCurrentType() {
        this.choosing = true;
        this.appendToShopCart = false;
    },
    shopcartShow() {
        this.choosing = true;
        this.appendToShopCart = true;
    },
    closeShopCart(){
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
    appendTo(data) {
        let obj = {
            shopId : this.sourcegood.shopId,
            shopName: this.sourcegood.shopName,
            totalPrice : data.totalPrice,
            freight : Number(this.sourcegood.freight) || 0,
            goodsName : this.sourcegood.name,
            goodsNum : data.amount,
            goodsPrice : data.price, 
            goodsId : this.sourcegood.id,
            specId : data.specId,
            specName : data.choosedType,
            goodsImg : data.img
        };
        this.choosedType = obj;
        if(this.appendToShopCart === true) {
            const params = new URLSearchParams(),
                  { shopId, specId, specName, goodsId, goodsPrice, goodsNum } = obj;
            params.append('shoppingCart',JSON.stringify({ userId:userInfo.userid, shopId, specId, specName, goodsId, goodsPrice, goodsNum }))
            this.axios.post('/api/wsc/wscShoppingCart/saveShoppingCart',params).then(res => {
                if(res.data === '加入购物车商品成功') {
                    Toast('商品已成功加入购物车')
                } else {
                    Toast('该商品规格已在购物车内，请去购物车结算');
                }
            });
        }
    },
    sellerDetail(){
        this.$router.push({
            path: `/seller/${this.sourcegood.shopId}`
        })
    },
    collection() {
        let data = new URLSearchParams();
            data.append('userId',userInfo.userid);
            data.append('goodsId',this.sourcegood.id);
        this.axios.post('/api/wsc/user/goodsCollection',data).then(res => {
            if(res.data.message === '收藏商品成功') {
                Toast('收藏成功');
                this.$set(this.sourcegood,'cId',999);
                console.log()
            }
        })
    },
    toConfirm() {
        this.appendToShopCart = false;
        if(!this.choosedType.specId){
            this.setCurrentType();
            return;
        } else {
            const { goodsId, goodsName, goodsNum, shopName, goodsPrice, specId, goodsImg, specName } = this.choosedType;
            
            const goodsInfo = {
                    shopId : this.choosedType.shopId,
                    freight : this.choosedType.freight,
                    shopName : this.choosedType.shopName,
                    payPrice : this.choosedType.totalPrice + this.choosedType.freight,
                    orderGoods : [
                        {
                            goodsId,
                            goodsName,
                            goodsNum,
                            goodsPrice,
                            specId,
                            specName,
                            goodsImg,
                        }
                    ]
                  };
            this.orderList.push(goodsInfo);
            this.confirm = true;
        }
        
    },
    closeConfirm() {
        this.confirm = false;
        this.orderList = [];
    },
    getComment() {
      this.currentIndex = 2;
      this.$refs.mySwiper.swiper.slideTo(2);
    },
    // 领取红包
    receiveCoupon(item) {
        this.$router.push('/coupon')
    //   let data = new URLSearchParams();
    //   data.append("userId", userInfo.userid);
    //   data.append("redpacketId", item.id);
    //   this.axios.post("/api/redpacket/redEnvelope", data).then(res => {
    //     if (res.data.code === "success") {
    //         Toast("领取成功");
    //     } else if(res.data.msg === '已经领取该红包'){
    //         Toast("已经领取该红包");
    //     }
    //   });
    },
    _getGoodInfo() {
      let id = this.$route.params.id,
          data = new URLSearchParams();
          data.append("goodsId", id);
          data.append('userId',userInfo.userid);
        return this.axios.post(`/api/wsc/goods/getById`, data).then(res => {
            let price = res.data.obj.goodsPrices.map(v => {
                return Number(v.price);
            });
            this.sourcegood = res.data.obj;
            if(!this.sourcegood.discount) {
                this.$set(this.sourcegood,'discount',0)
            };
            this.maxPrice = Math.max(...price);
            this.minPrice = Math.min(...price);
            this.imgs = res.data.obj.imgShow.split("|");
            this.axios.get(`/api/goodsComment/goodsCommentList?gooodsId=${this.sourcegood.id}`).then(res => {
                if(!res.data.obj || !res.data.obj instanceof Array) return;
                res.data.obj.forEach((v => {
                    let img = [];
                    for(let i in v) {
                        if(/img/.exec(i)) {
                            img.push(v[i]);
                        }
                    };
                    if(v.praise >= 3) {
                        this.$set(v,'type',1)
                    } else {
                        this.$set(v,'type',0)
                    };
                    Object.defineProperty(v,'img',{
                        value: img,
                        writable: true,
                        enumerable: true
                    });
                }));
                this.commentList = res.data.obj;
                this.ratingList = JSON.parse(JSON.stringify(this.commentList));
                // this.$refs.scroll.refresh();
            })
        });
    },
    _getCoupon() {
        let id = this.sourcegood.shopId,
            data = new URLSearchParams();
        data.append('userId',userInfo.userid);
        data.append("shopId", id);
        return this.axios.post("/api/redpacket/getRedpacketList", data).then(res => {
                this.couponList = res.data.obj;
                // this.$refs.scroll.refresh();
                // this.$refs.scrollR.refresh();
                // this.$refs.scrollM.refresh();
        });
    },
    _getWxConfig() {
        let configUrl = location.href.split('#'),
            userId = userInfo.userId;
        let params = new URLSearchParams();
            params.append('url',configUrl);
            params.append('userId',userId);
        return this.axios.post(`/api/wsc/user/getJsSdk`,params).then(res => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: APPID, // 必填，公众号的唯一标识
                timestamp: res.data.obj.timestamp , // 必填，生成签名的时间戳
                nonceStr: res.data.obj.nonce, // 必填，生成签名的随机串
                signature: res.data.obj.signature,// 必填，签名，见附录1
                jsApiList: ['chooseWXPay'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                success(){
                    alert('confsig:ok')
                },
                error(){
                    alert('config:error')
                }
            });
           wx.ready(() => {
               console.log("i'm ready")
           });
        });
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
        //   this.$refs.scrollR.refresh();
        //   this.$refs.scrollM.refresh();
        //   this.$refs.scroll.refresh();
        }
      },
      soption: {
        pagination: ".swiper-pagination",
        paginationClickable: true
      },
      imgs: [],
      couponList: [],
      confirm:false,
      choosedType : {},
      orderList : [] ,
      appendToShopCart : false,
      commentList: [],
      ratingList: []
    };
  }
};
</script>

<style lang="stylus" scoped>

.shopChoosing-enter-active,.shopChoosing-leave-active
    transition all .5s
.shopChoosing-enter,.shopChoosing-leave-to
    transform translateY(100%)    

.scroll {
    height: 100%;
    overflow: scroll;
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
    height: 100%;
    background-color: #Fff;
    z-index: 1000;
    .nav {
        height: 1.2rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        font-size: 0.4rem;
        border-top: 2px solid #e7e7e7;
        border-bottom: 2px solid #e7e7e7;
        position absolute
        top 0
        z-index 2
        background #fff
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
        position: relative;
        box-sizing border-box 
        padding 1.2rem 0 1.3rem
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
                padding-left: .2rem
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
                    width: auto;
                    font-size:0;
                    text-align: center;
                    margin: 0.15rem 0;
                    margin-left : .55rem;

                    div {
                        font-size: 0.3333rem;
                        text-align: left;
                        display: inline-block;
                        border: 1px solid #fc7ba6;
                        width: auto;
                        padding: 0 .1rem;
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
        position absolute
        z-index 99999
        bottom 0
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
            .img-wrap{
                display flex
                flex-wrap wrap
                img {
                    width 1.3333rem 
                    height 1.3333rem
                    overflow hidden
                    margin-right 0.2rem
                }
            }
        }
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
