<template>
    <div class='detail'>
        <input type='file' hidden ref='files' @change='upload'>
        <div class='title'>
                退换货
            <svg class="icon fenlei" aria-hidden="true" @click='back'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='content'>
            <div class="gooddetail">
                <img :src="orderInfo.goodsImg" alt="">
                <div class='info'>
                    <div class="ts">{{orderInfo.goodsName}}</div>
                    <div class="m">{{orderInfo.specName}}</div>
                    <div class="b">
                        <span>￥{{orderInfo.goodsPrice}}</span>
                        <span>X
                            {{orderInfo.goodsNum}}
                        </span>
                    </div>
                </div>
            </div>
            <div class='item' v-if="!isExchange" style='margin-top:0.1333rem'>
                <div>退款原因</div>
                <input type="text" placeholder="请输入退款原因" v-model.trim="returnWord">
            </div>
            <div class='img-wrap' v-if="!isExchange">
                <div class='control' @click='fileclick'>
                     <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiahao"></use>
                    </svg>
                </div>
                <div class='imgblock' v-for='(item,index) in imgs' :key="index">
                    <img :src="item" alt="">
                    <div class='close' @click='deleteImg(index)'>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="returnblock" v-if="isExchange">
                <div class='choose'>
                    <div @click="chooseType = true">
                        选择颜色/尺码
                    </div>
                    <div class='s' v-if="currentType.length < 1" >
                        <img src="../.././assets/img/....png" alt="">
                    </div>
                    <div v-else>
                        {{currentType}}
                    </div>
                </div>
                <div class='item' style='margin-top:0.1333rem'>
                    <div>换货原因</div>
                    <input type="text" v-model="changeWord" placeholder="请输入换货原因">
                </div>  
            </div>
            <div class='seller-address'>
                <div class="item">商家地址:{{orderInfo.address}}</div>
                <div class="item">收货人:{{orderInfo.consignee}}</div>
                <div class="item">电话:{{orderInfo.tel}}</div>
            </div>
            <div class='t'>
                <div class='wx' v-if="orderInfo.wx">商家微信:{{orderInfo.wx}}</div>
                <div class="qq">商家qq:{{orderInfo.qq}}</div>
            </div>
        </div>
        <shopChoosing v-if='chooseType'
            :goodInfo='orderInfo.wscGoods'
            @appendTo='appendTo' 
            @close='chooseType = false'
        >
        </shopChoosing>    
        <div class='bottom' @click='send'>
            提交
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import shopChoosing from 'common/shopChoosing'


const user = JSON.parse(sessionStorage.getItem('userInfo'));
console.log(user)
export default {
    props: {
        orderInfo: {
            type: Object,
            default:() => {}
        },
        orderId:'',
        isExchange:{
            type: Boolean,
            default: false,
        }
    },
    components:{
        shopChoosing
    },
    created() {
        console.log(this.orderInfo)
    },
    methods:{
        back(){
            this.$emit('close')
        },
        fileclick(){
            this.$refs.files.click();
        },
        upload(){
            let file =  this.$refs.files.files[0],
            that = this,
            reg = /^image/gi;
            if (!reg.test(file.type)) {
              Toast("文件类型错误");
              return;
            };
            if(file.size > 2000000){
                Toast('文件尺寸过大');
                return ;
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                if(that.imgs.length > 2){
                    Toast('最多上传三张图片');
                    return; 
                }
                that.imgs.push(this.result)
            };
        },
        deleteImg(index){
            this.imgs.splice(index,1)
        },
        appendTo(data){
            console.log(data);
            this.changeInfo = data;
            this.currentType = data.choosedType;
            this.currentNums = data.amount;
        },
        send() {
            const { shopName, payType, goodsName,goodsId, goodsNum, goodsPrice, goodsImg, specName, shopId, payPrice, kjPrice, redpacketMoney, redpacketType, redpacketId, freight, payDate, addressId, logisticsId, orderNum } = this.orderInfo;
            let obj = {
                oldOrderId: this.orderId,
                memberCode: user.userid,
                state:  this.isExchange ? '1' : '2',
                shopId, 
                payPrice, 
                kjPrice, 
                redpacketMoney, 
                redpacketType, 
                redpacketId, 
                freight, 
                payDate, 
                addressId, 
                logistics: logisticsId, 
                orderNum,
                proof1: this.imgs[0],
                proof2: this.imgs[1],
                proof3: this.imgs[2],
                payType,
                wscBackOrderGoods:{
                }
             };
            if(this.isExchange) {
                let data = {
                    shopId,
                    shopName, 
                    goodsId, 
                    goodsNum: this.currentNums, 
                    goodsPrice, 
                    goodsImg, 
                    specName: this.currentType,
                    goodsName
                };
                obj.remarks = this.changeWord;
                obj.wscBackOrderGoods = data;
                let params = new URLSearchParams();
                    params.append('backOrderInfo',JSON.stringify(obj));
                this.axios.post('/api/wsc/user/saveBackGoods',params).then(res => {
                    if(res.data.msg === '请求成功'){
                        Toast('提交成功');
                        setTimeout(() => {
                            this.back();
                        },1000)
                    }
                }) ;
            } else {
                let data = {
                    shopId,
                    shopName, 
                    goodsId, 
                    goodsNum, 
                    goodsPrice, 
                    goodsImg, 
                    specName,
                    goodsName
                };
                obj.remarks = this.returnWord;
                obj.wscBackOrderGoods = data;
                let params = new URLSearchParams();
                    params.append('backOrderInfo',JSON.stringify(obj));
                this.axios.post('/api/wsc/user/saveBackGoods',params).then(res => {
                    if(res.data.msg === '请求成功'){
                        Toast('提交成功');
                        setTimeout(() => {
                            this.back();
                        },1000)
                    }
                });
            }
        }
    },
    data(){
        return {
            imgs:[],
            returnWord:'',
            changeWord:'',
            chooseType: false,
            currentType: '',
            currentNums: 0
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    flex 1
.choose
    background #fff
    height 1.2rem
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    padding 0.4rem .3rem
    font-size 0.4rem
    border-bottom 0.0133rem solid #e7e7e7
    .s
        width 0.6667rem
        img
            width 100%


.detail
    position fixed
    width 100vw
    height 100vh
    top 0
    left 0
    z-index 999
    background #e7e7e7
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
    .gooddetail
        display flex
        box-sizing border-box
        padding .15rem .2rem
        font-size .35rem
        background #fff
        img
            display block
            flex 0 0 1.9333rem
            height 1.9333rem
        .info
            flex 1
            padding-left .2rem
            display flex
            flex-direction column
            justify-content space-between
            .b
                display flex 
                justify-content space-between
            .m
                color #666
            .ts
                padding 0
    .item
        display flex
        font-size .4rem
        box-sizing border-box
        padding .4rem .3rem
        background #fff
        border-bottom 0.0133rem solid #e7e7e7
        input 
            font-size .4rem
            flex 1
            padding-left .2rem
    .img-wrap
        box-sizing border-box
        background #Fff
        padding .2rem
        display flex
        flex-wrap wrap
        .control
            width 1.7333rem
            height 1.7333rem
            border 0.0133rem dashed rgba(0, 0, 0, 0.08)
            display flex
            justify-content center
            align-items center
            .icon 
                font-size .9rem
                color rgba(0, 0, 0, 0.3)
        .imgblock
            margin 0 .2rem
            position relative
            img
                width 1.7333rem
                height 1.7333rem
            .close
                position absolute
                right -0.1333rem
                top -0.1333rem
                background #fff
                border-radius 60%   
                z-index 999
                .icon 
                    font-size .5rem
                    color red
    .returnblock
        margin 0.1333rem 0
        background #ffffff
        .item
            display flex
            font-size .4rem
            box-sizing border-box
            padding .4rem .3rem
            border-bottom 0.0133rem solid #e7e7e7
            & > div:last-child 
                color #666
                margin-left 0.2rem
        .imgblock
            display block
            box-sizing border-box
            padding .4rem .3rem
            font-size .4rem
            .img
                display flex
                justify-content space-between
                margin-top 0.1333rem
                img
                    width 2.9333rem
                    height 2.1333rem
                    display block
    .seller-address
        margin 0.1333rem 0
        background #Fff
        .item 
            display flex
            font-size .35rem
            box-sizing border-box
            padding .2rem .3rem
    .t
        background #fff
        display flex
        box-sizing border-box
        padding .3rem
        font-size .35rem
        & > div
            flex 1

.bottom
    height 1.2rem
    color #fff
    background #fc7aa5
    text-align center
    line-height 1.2rem
    font-size .4rem
</style>
