<template>
    <div class='confirm-wrap'>
        <div class='title'>
            确认订单
            <svg class="icon fenlei" aria-hidden="true" @click="back">
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <!-- 地址选择 -->
        <transition name='address'>
            <div class="mask" @click="chooseAddress = false"  v-if='chooseAddress'>
                <div class="address-wrap">
                    <div class='address' v-for="(item,index) in addressList" :key="index" @click.stop="chooseCurrentAddress(item)">
                        <div class='l'>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-icon-yxj-address"></use>
                            </svg>
                        </div>
                        <div class="m">
                            <div>
                                <span>收货人：{{item.consignee}}</span>
                                <span>{{item.phoneNum}}</span>    
                            </div>
                            <div>
                                收货地址:{{item.address}}
                            </div>
                        </div>
                        <div class='r'>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-jiantou"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <scroll class='confirm-content' :data='orderList'>
            <div >
                <div class='address' @click.stop="addressShow">
                    <div class='l'>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-icon-yxj-address"></use>
                        </svg>
                    </div>
                    <div class="m">
                        <div>
                            <span>收货人：{{currentAddress.consignee}}</span>
                            <span>{{currentAddress.phoneNum}}</span>    
                        </div>
                        <div>
                            收货地址:{{currentAddress.address}}
                        </div>
                    </div>
                    <div class='r'>
                        <svg class="icon fenlei" aria-hidden="true">
                            <use xlink:href="#icon-jiantou"></use>
                        </svg>
                    </div>
                </div>
                <div class='detail'>
                    <div class='header'>
                        <div class="seller-item" v-for='(item,index) in orderList' :key="index">
                            <div class='sellername'>
                                <div>
                                    <svg class="icon fenlei" aria-hidden="true">
                                        <use xlink:href="#icon-shangjia"></use>
                                    </svg>
                                    <span>{{item.shopName}}</span>   
                                    </div>
                                <div class='type'>
                                    等待买家付款
                                </div> 
                            </div>
                            <div class='goodinfo' v-for='(v,i) in item.orderGoods' :key="i">
                                <img :src="v.goodsImg" alt="" />
                                <div class='text'>
                                    <div class='g-title'>
                                        {{v.goodsName}}
                                    </div>
                                    <div class='g-type'>
                                        {{v.specName}}
                                    </div>
                                    <div class='g-price'>
                                        <div>￥{{v.goodsPrice}}</div>
                                        <div>X{{v.goodsNum}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="price">
                        <div class='l'>
                            <div class='f'>运费(快递)</div>
                            <div>订单总价</div>
                        </div>
                        <div class="r">
                            <div class='f' style="text-align:right">￥{{ _totalFreight.toFixed(2) }}</div>
                            <div>￥{{totalMoney.toFixed(2)}}</div>
                        </div>
                    </div>
                    <div class="item" @click="c_couponShow">
                        <div>
                            优惠券
                        </div>
                        <div v-if="couponList.length > 0">
                            满 <span>{{currentRedPack.fullAmount}}元</span> 减 <span>{{currentRedPack.money || 0}}元</span>
                        </div>  
                        <div v-else>
                            暂无可用优惠券
                        </div>
                    </div>
                    <div class="item">
                        <div>
                            实付款
                        </div>
                        <div class='price'>
                            ￥{{_totalPrice.toFixed(2)}}
                        </div>
                    </div>
                    <div class="item">
                        <div>
                            买家留言
                        </div>
                        <div class='input-wrap'>
                            <input type="text" v-model.trim="msg" placeholder="选填">
                        </div>
                    </div>
                </div>
            </div>
        </scroll>
        <div class='bottom'>
            <div class='l'>
                合计:
                <span>￥{{_totalPrice.toFixed(2)}}元</span>
            </div>
            <div class='r' @click="sendOrder">
                提交订单
            </div>
        </div>
        <transition name='coupon'>
            <div class="couponMask" @click="c_coupon = false" v-if='c_coupon'>
                <div class="coupon">
                    <div v-for='(item,index) of couponList' :key="index" class="item" @click.stop='chooseCoupon(item)'>
                        <span>
                           满 <span>{{item.fullAmount}}元</span> 减 <span>{{item.money}}元</span>
                        </span>
                    </div>
                </div>
            </div>
        </transition>
        <Address v-if='noAddress' 
        :isADefault='true'
        :isNew = 'true'
        @close='noAddress = false'
        @success='setAddress'>
        </Address>
        <success 
            v-if="success"
            :address='currentAddress.address'
            :consignee='currentAddress.consignee'
            :totalMoney='_totalPrice'
        />
    </div>
</template>

<script>
import wx from "weixin-js-sdk";
import scroll from 'common/scroll';
import Address from '../components/address/editAddress';
import success from 'common/success';
import { Toast } from 'mint-ui';
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

export default {
  props: {
    orderList: {
        type: Array,
        default: () => []
    },
    isShopCart:{
        type: Boolean,
        default : false
    }
  },
  components:{
      scroll,
      Address,
      success
  },
  data() {
    return {
      addressList: [],
      currentAddress: {},
      msg: "",
      redpacketMoney: 0 , 
      chooseAddress : false,
      couponList:[],
      currentRedPack:{},
      c_coupon:false,
      noAddress: false,
      success: false
    };
  },
  async created() {
        this.success = false;
    await this._getAddressList();
          this._calculateTotalMoney();
          this._getMyCoupon();
  },
  computed: {
    _totalFreight() {
      let freight = 0;
      this.orderList.forEach(v => {
        freight += Number(v.freight);
      });
      return freight;
    },
    totalMoney() {
        let price = 0;
        this.orderList.forEach(v => {
            price += v.payPrice;
        });
        return price
    },
    _totalPrice() {
      let price = 0;
      this.orderList.forEach(v => {
        price += v.payPrice;
      });
      if(this.currentRedPack) {
            let tPrice = price - this.currentRedPack.money <= 0 ? 0.01 : price - this.currentRedPack.money
            return tPrice;
      } else {
          return price
      }
     
    }
  },
  filter: {
    formatMoney(val) {
      return Number(val).toFixed(2);
    }
  },
  methods: {
    back() {
      this.$emit("back");
    },
    addressShow() {
        if(this.addressList < 1) return;
        this.chooseAddress = true;
    },
    setAddress() {
        this._getAddressList().then(() => {
            this.noAddress = false;
        });

    },
    sendOrder() {
        if(!this.currentAddress.id) {
            Toast('请先选择收货地址');
            return;
        };
      let obj = {
      };
      if(this.currentRedPack){
          if(this.currentRedPack.redpacketType === '2') {
            obj = {
                    money: this._totalPrice,
                    redpacketMoney:this.currentRedPack.money,
                    redpacketId: this.currentRedPack.id,
                    redpacketShopId: this.currentRedPack.shopId,
                    redpacketType: this.currentRedPack.redpacketType,
                    addressId: this.currentAddress.id,
                    userId: userInfo.userid,
                    orderList: this.orderList,
                    memberMessage: this.msg
                }
          } else {
                obj = {
                    money: this._totalPrice,
                    redpacketMoney:this.currentRedPack.money,
                    redpacketId: this.currentRedPack.id,
                    redpacketType: this.currentRedPack.redpacketType,
                    addressId: this.currentAddress.id,
                    userId: userInfo.userid,
                    orderList: this.orderList,
                    memberMessage: this.msg
                }
          }
      } else {
          obj = {
            money: this._totalPrice,
            addressId: this.currentAddress.id,
            userId: userInfo.userid,
            orderList: this.orderList,
            memberMessage: this.msg
          }
      }
      let params = new URLSearchParams();
          params.append("orderInfo", JSON.stringify(obj));
      this.axios
        .post("/api/order/saveOrder", params)
        .then(async res => {
            if (!res.data.success) throw new Error("请求失败");
            this.orderIds = res.data.obj;
            if(this.isShopCart){
                let arr = [];
                  this.orderList.forEach(v => {
                      v.orderGoods.forEach(_ => {
                          arr.push(_.id)
                      })
                });
                let ids = new URLSearchParams();
                ids.append('ids',arr.join(',')) 
                return this.axios.post('/api/wsc/wscShoppingCart/updateCartType', ids);
            }
        })
        .then(res => {
            let data = new URLSearchParams();
            data.append("userId", userInfo.userid);
            data.append("orderIds", this.orderIds);
            data.append("money", obj.money);
            data.append("url", location.href);
            this.axios.post("/api/order/payOrder", data).then(res => {
            alert("开始支付");
            wx.chooseWXPay({
                          timestamp: res.data.obj.timestamp,
                          nonceStr: res.data.obj.nonce,
                          package: res.data.obj.packageName,
                          signType: res.data.obj.signType,
                          paySign: res.data.obj.signature,
                          success: () => {
                                var param = new URLSearchParams();
                                param.append("payId", res.data.obj.payId);
                                this.axios.post("/api/order/paySuccess", param).then(res => {
                                    alert("状态修改成功");
                                    this.success = true
                                });
                          },
                          cancel: () => {
                            var param = new URLSearchParams();
                                param.append("payId", res.data.obj.payId);
                                alert("取消");
                            }
                        });
          });
        });
    },
    chooseCoupon(item) {
        this.currentRedPack = item;
        this.c_coupon = false;
    },
    chooseCurrentAddress(item) {
        console.log(this.addressList);
        if(this.addressList.length < 1) return;
        this.currentAddress = item;
        this.chooseAddress = false;
        Toast('地址修改成功');
    },
    _calculateTotalMoney() {
      let money = 0;
      this.orderList.forEach(v => {
        money += v.payPrice;
      });
    },
    async _getMyCoupon(){
        await this._getMycoupon();
        this.currentRedPack = this.couponList[0];
        console.log(this.currentRedPack)
    },
    _getMycoupon() {
        let totalMoney = 0;
        this.orderList.forEach(v => {
            let goodsId = [],
                money = 0;
            v.orderGoods.forEach(fuck => {
                goodsId.push(fuck.goodsId);
                money += fuck.goodsNum  *  fuck.goodsPrice;
                totalMoney += fuck.goodsNum  *  fuck.goodsPrice;;
            });
            let data = new URLSearchParams();
                data.append('userId',userInfo.userid);
                data.append('goodsIds',goodsId.join(','));
                data.append('money',money);
            this.axios.post("/api/redpacket/getOrderRedpackets", data).then(res => {
                if(res.data.code !== '200') throw new Error('error');
                if(!res.data.obj) return;
                this.couponList.push(...res.data.obj)
            });
        });
        let params = new URLSearchParams();
            params.append('money',totalMoney);
            params.append('userId',userInfo.userid);
        return this.axios.post('/api/redpacket/getOrderRedpackets',params).then(res => {
             if(!res.data.obj) return;
             this.couponList.push(...res.data.obj)
        })
    },
    c_couponShow(){
        if(this.couponList.length < 1) {
            return false;
            console.log(this.couponList)
        }
        this.c_coupon = true;
    },
    _getAddressList() {
      let data = new URLSearchParams();
      data.append("userId", userInfo.userid);
      return this.axios.post("/api/wsc/user/userAddress", data).then(res => {
        if (res.data.code !== "success") throw new Error("地址获取失败");
        if(!res.data.obj){
            Toast('没有收货地址');
            setTimeout(() => {
                this.noAddress = true;
            },1000)
        } else {
            this.addressList = res.data.obj;
        for (let i of this.addressList) {
            if (i.state === "0") {
                this.currentAddress = i;
                break;
            }
        };
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.couponMask
    width 100%
    height 100%
    position fixed
    left 0 
    top 0
    background rgba(0,0,0,.5)
    z-index 9998
    .coupon
        width 80%
        position fixed
        left 50%
        top 50%
        transform translate(-50%,-50%)
        max-height 80vh
        overflow-y scroll
        .item
            background #fff
            text-align center
            padding 0.3rem 0
            font-size .35rem


.mask
    width 100%
    height 100%
    position fixed
    left 0 
    top 0
    background rgba(0,0,0,.5)
    z-index 99999

.address-wrap
    width 100%
    position fixed
    left 50%
    top 50%
    transform translate(-50%,-50%)
    max-height 80vh
    overflow-y scroll
    .address {
            margin-top: 0.1333rem;
            background: #fff;
            display: flex;
            box-sizing: border-box;
            padding: 0.3333rem;
            align-items: center;
            font-size: 0.4rem;
            color: #666;

            .m {
                flex: 1;
                box-sizing: border-box;
                padding: 0 0.2rem;
                font-size .35rem
                word-break break-all

                div:first-child {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.1333rem;
                }
            }

            .l, .r {
                .icon {
                    font-size: 0.5rem;
                }
            }
        }

.address-enter-active,.address-leave-active
    transition all .5s
.address-enter, .address-leave-to
    opacity 0
    transform rotateY(180deg)

.coupon-enter-active,.coupon-leave-active
    transition all .5s
.coupon-enter, .coupon-leave-to
    opacity 0
    transform scale(0)

.confirm-wrap {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 999;
    background-color: #e7e7e7;
    display: flex;
    flex-direction: column;

    .title {
        width: 100%;
        height: 1.1333rem;
        line-height: 1.1333rem;
        color: #fff;
        background: #fc7aa5;
        text-align: center;
        font-size: 0.4rem;
        position: relative;

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

    .confirm-content {
        flex: 1;
        overflow: scroll;

        .address {
            margin-top: 0.1333rem;
            background: #fff;
            display: flex;
            box-sizing: border-box;
            padding: 0.3333rem;
            align-items: center;
            font-size: 0.4rem;
            color: #666;

            .m {
                flex: 1;
                box-sizing: border-box;
                padding: 0 0.2rem;
                font-size .35rem
                word-break break-all

                div:first-child {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.1333rem;
                }
            }

            .l, .r {
                .icon {
                    font-size: 0.5rem;
                }
            }
        }

        .detail {
            margin-top: 0.1333rem;
            background: #Fff;

            .header {
                .sellername {
                    box-sizing: border-box;
                    padding: 0.2667rem;
                    font-size: 0.4rem;
                    display: flex;
                    justify-content: space-between;
                    height: 1.2rem;
                    align-items: center;

                    div:first-child {
                        .icon {
                            font-size: 0.45rem;
                        }
                    }

                    .type {
                        font-size: 0.3333rem;
                        color: #fc7ba6;
                    }
                }

                .goodinfo {
                    background: #f5f5f5;
                    box-sizing: border-box;
                    display: flex;
                    padding: 0.1rem 0.3333rem;
                    margin 0.1rem 0
                    img {
                        width: 1.92rem;
                        height: 1.92rem;
                        display: block;
                    }

                    .text {
                        flex: 1;
                        padding-left: 0.2rem;
                        font-size: 0.3333rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .g-price {
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
            }

            .price {
                display: flex;
                box-sizing: border-box;
                justify-content: space-between;
                height: 1.3333rem;
                align-items: center;
                padding: 0 0.2667rem;
                border-bottom: 0.0133rem solid #e7e7e7;

                div {
                    font-size: 0.333rem;

                    .f {
                        color: #666;

                        &:last-child {
                            text-align: right;
                        }
                    }
                }

                .l, .r {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
            }

            .item {
                height: 1.2rem;
                border-bottom: 0.0133rem solid #e7e7e7;
                box-sizing: border-box;
                padding: 0.2667rem;
                font-size: 0.4rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .icon {
                    font-size: 0.4rem;
                    color: #666;
                }

                .price {
                    color: #fc7ba5;
                }

                .input-wrap {
                    flex: 1;

                    input {
                        width: 100%;
                        padding-left: 0.2rem;
                        font-size: 0.4rem;
                    }
                }
            }
        }
    }

    .bottom {
        height: 1.3333rem;
        display: flex;
        background-color: #fff;
        font-size: 0.4rem;

        .l {
            flex: 1;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0.35rem;

            span {
                color: #fc7ba5;
            }
        }

        .r {
            flex: 0 0 4rem;
            color: #fff;
            background: #fc7ba5;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
