<template>
    <div class='shopcart-wrap'>
        <div class='Ttitle'>
            购物车
        </div>
        <div class='scroll' ref='scroll'>
            <div>
            <div class='goods'>
                <div v-if="goodList.length > 0"  class='gooditem' v-for='(allitem,allindex) in goodList' :key="allindex">
                    <div class='header'>
                        <div class='radio' @click='chooseall(allitem)'>
                            <img v-if='allitem.allclick' src='../.././assets/img/radio.png'>
                            <img v-else src='../.././assets/img/hradio.png'>
                        </div>
                        <div class='sellername'>
                            <svg class="icon fenlei" aria-hidden="true">
                                <use xlink:href="#icon-shangjia"></use>
                            </svg>
                            <span>{{allitem.title}}</span>    
                        </div>
                        <div class='control'>
                            <span @click='editGood(allitem)' v-if='!allitem.editing'>编辑</span>
                            <span v-else @click='editend(allitem)'>完成</span>
                        </div>
                    </div>
                    <transition name='fade'>
                        <div class='content'>
                            <div class='gooditem-item' v-for='(item,index) in allitem.items' :key="index">
                                <div class='itemradio' @click='choosegood(allitem,item)'>
                                    <img v-if='item.isclick' src='../.././assets/img/radio.png'>
                                    <img v-else src='../.././assets/img/hradio.png'>
                                </div>
                                <div class='item-detail'>
                                    <div class='img-wrap'>
                                        <img v-lazy="item.goodsImg" alt="">
                                    </div>
                                    <div class='item-content' v-if='!item.editing'>
                                        <div class='title'>
                                            {{item.goodsName}}
                                        </div>
                                        <div class='type'>
                                            {{item.specName}}
                                        </div>
                                        <div class='price'>
                                            <div>￥<span>{{item.goodsPrice}}</span>
                                            </div>
                                            <div>x{{item.goodsNum}}</div>
                                        </div>
                                    </div>
                                    <div class='item-content edit' v-else>
                                        <div class='edit-wrap'>
                                            <div class='edit-control'>
                                                <div class='btn' @click='less(item)'>
                                                    <svg class="icon indexicon" aria-hidden="true">
                                                        <use xlink:href="#icon-iconjian"></use>
                                                    </svg>
                                                </div>
                                                <div class='input-wrap'>
                                                    <p  v-html="item.goodsNum"></p>
                                                    <!-- <input type="number" v-model='item.goodsNum' maxlength='3'> -->
                                                </div>
                                                <div class='btn' @click='add(item)'>
                                                    <svg class="icon indexicon" aria-hidden="true">
                                                        <use xlink:href="#icon-jiahao"></use>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class='choosesing' @click='reChoose(item)'>
                                                <div class='currenttype'>
                                                    <div>
                                                        {{item.specName}}
                                                    </div>
                                                </div>
                                                <div class='control-icon'>
                                                    <svg class="icon indexicon" aria-hidden="true">
                                                        <use xlink:href="#icon-jiantou"></use>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class='delete' @click='deleteitem(allitem,item,index)'>
                                            删除
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="empty" v-if='goodList.length < 1'>
                    <div class='empty-content'>
                        <img src='../../assets/img/empty.gif'/> 
                        <p class='desc'> 
                            你的购物车空空如也
                        </p>
                        <div class='btn' @click='goIndex'>
                            去逛逛
                        </div> 
                    </div> 
                </div>
            </div>                
                <div class='recommend'>
                    <div class='title'>
                        猜你喜欢
                    </div> 
                    <div class='content'>
                        <goodLists 
                        :goodList='recommend'
                         @getTodetail='getTodetail'></goodLists>
                    </div>
                </div>
            </div>
            
        </div>
        <div class='bottom-block'>
            <div class='allbtn' @click='chooseAll'>
                <div class='radio'>
                    <img v-if='All_choose' src='../.././assets/img/radio.png'>
                    <img v-else src='../.././assets/img/hradio.png'>
                    <span>全选</span>
                </div>
            </div>
            <div class='totalprice'>
                合计:<span>￥{{ AllTotalPrice }}</span>
            </div>
            <div class='resultbtn' @click='submit'>
                结算({{choosingGoods.length}})
            </div> 
        </div>
        <shopChoosing
            ref='shopcart' 
            :goodInfo='currentgood.wscGoos' 
            :goodsNum='currentgood.goodsNum'
            v-if='ischoosing'
            @chooseColor='chooseColor'
            @chooseSize='chooseSize'
            @appendTo='editFinish'
            @close='close'>
        </shopChoosing>
        <confirm
            v-if='confirm'
            @back='closeConfirm'
            :orderList='orderList'
            :isShopCart='true'
        />
    </div>
</template>


<script>
import scroll from 'common/scroll'
import shopChoosing from 'common/shopChoosing'
import goodLists from 'common/goodList'
import confirm from "common/confirm";
import { moocgoodList } from 'common/util'
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

export default {
    data(){
        return {
            goodList:[],
            currentgood:{},
            ischoosing:false,
            currentColor:'',
            currentSize:'',
            choosedGoods:[],
            orderList:[],
            confirm:false,
            recommend: []
        }
    },
    components:{
        scroll,
        shopChoosing,
        goodLists,
        confirm
    },
    activated(){
        this.confirm = false;
        let data = new URLSearchParams();
            data.append('userId',userInfo.userid);
        this.axios.post('/api/wsc/wscShoppingCart/getShoppingCartList',data).then(res => {
            if(res.data.obj) {
                this.goodList = res.data.obj;
                this.goodList = this._initshopList(this.goodList)
            };
        });
        this.axios.get('/api/wsc/goods/youLike').then(res => {
            this.recommend = res.data.obj
        })
    },
    methods:{
        close(){
            this.ischoosing = false;
        },
        _initshopList(arr){
            let map = {};
            arr.forEach(v => {
                this.$set(v,'isclick',true);
                this.$set(v,'editing',false)
                const key = v.shopName;
                if(!map[key]) {
                    map[key] = {
                        title:v.shopName,
                        items:[],
                        allclick : true,
                        editing:false
                    }
                };
            });
            let _arr = Object.values(map).map(v => {
                return v;
            });
            _arr.forEach(v => {
                for(let i of arr){
                    if(i.shopName === v.title) {
                        v.items.push(i);
                    }
                }
            });
            _arr.forEach(v => {
                v.items.forEach(_ => {
                    Object.defineProperty(_,'freight',{
                        value: _.wscGoos.freight || 0,
                        writable: true,
                        enumerable: true 
                    })
                })
            });
            return _arr;
        },
        choosegood(a,b){
            b.isclick = !b.isclick;
            let sign = a.items.every(v => {
                return v.isclick == true;
            });
            sign === true ? a.allclick = true : a.allclick = false;
        },
        chooseall(item) {
            item.allclick = !item.allclick;
            for(let i of item.items){
                item.allclick === true ? i.isclick = true : i.isclick = false
            }
        },
        editGood(item){
            item.editing = true;
            item.items.forEach(v => {
                v.editing = true
            })
        },
        goIndex() {
            this.$router.push({
                path: '/index'
            })
        },
        // Shopadd(){
        //     console.log(this.currentgood)
        //     this.currentgood.goodsNum++
        // },
        // Shopless(){
        //     if(this.currentgood.amount == 1) return;
        //     this.currentgood.goodsNum--
        // },
        chooseColor(item){
            this.currentColor = item;
        },
        chooseSize(item){
            this.currentSize = item
        },
        less(item){
            if(item.goodsNum <= 1) return;
            item.goodsNum--;
        },
        add(item){
            if(item.goodsNum >= item.stock) {
                Toast('超出最大购买限制');
                return;
            }
            item.goodsNum++
        },
        reChoose(item){
            this.ischoosing = true;
            this.currentgood = item;
        },
        // 接收规格组件回调
        editFinish(data){
            this.currentgood.goodsPrice = +data.price;
            this.currentgood.stock = data.stock;
            this.currentgood.specName = data.choosedType;
            this.currentgood.goodsNum = data.amount;
            this.currentgood.specId = data.specId;
            this.ischoosing = false;
        },
        editend(item){
            let arr = item.items.filter(v => {
                return v.isclick
            });
            let objs = {
                userId : userInfo.userid,
                shoppingCartList:[]
            };
            arr.forEach(v => {
                let obj = {
                    id: v.id,
                    goodsNum: v.goodsNum,
                    specId: v.specId,
                    specName: v.specName,
                    goodsPrice: v.goodsPrice
                };
                objs.shoppingCartList.push(obj)
            });
            let params = new URLSearchParams();
                params.append('cartList',JSON.stringify(objs));
            this.axios.post('/api/wsc/wscShoppingCart/updateCartGoods',params).then(res => {
                this.goodList = this._initshopList(res.data);
            })
            item.editing = false;
            item.items.forEach(v => {
                v.editing = false
            });
        },
        deleteitem(a,b,i,ai){
            let params = new URLSearchParams();
                params.append('userId',userInfo.userid);
                params.append('cartId',b.id);
            this.axios.post('/api/wsc/wscShoppingCart/deleteCartGoods',params).then(res => {
                if(!res.data.obj) {
                    this.goodList = [];
                    return;
                };
                this.goodList = this._initshopList(res.data.obj);
                Toast('删除成功');
            })
        },
        submit(){
            if(this.choosingGoods.length < 1) {
                Toast('至少选择一件商品')
                return false;
            };
            let _arr = [],
                _map = {};
            // 抽取商家集合
            this.choosingGoods.forEach(v => {
                const key = v.shopId;
                if(!_map[key]) {
                    _map[key] = {
                        shopId: key,
                        shopName:v.shopName,
                        payPrice: '',
                        freight: '',
                        orderGoods: []
                    }
                }
            });
            let arr = Object.values(_map);
            arr.forEach(v => {
                for(let i of this.choosingGoods) {
                    if(i.shopId === v.shopId) {
                        let obj = {
                            id: i.id,
                            goodsId: i.goodsId,
                            goodsName: i.goodsName,
                            goodsNum: i.goodsNum,
                            goodsPrice: i.goodsPrice,
                            specId: i.specId,
                            specName: i.specName,
                            goodsImg: i.goodsImg,
                            freight:i.freight
                        }
                        v.orderGoods.push(obj)
                    }
                }
            });
            arr.forEach(v => {
                let price = 0,
                    freight = 0;
                for(let i of v.orderGoods){
                    price += i.goodsPrice * i.goodsNum;
                    freight += Number(i.freight);
                };
                v.goodsPrice  = price;
                v.payPrice = price + freight;
                v.freight = freight;
            });
            this.orderList = arr;
            this.confirm = true;
        },
        closeConfirm(){
            this.confirm = false;
        },
        getTodetail(item){
            this.$router.push({
                path: `/good_all/${item.id}`
            })
        },
        chooseAll(){
            if(this.All_choose) {
                this.goodList.forEach(v => {
                    v.allclick = false;
                    for(let i of v.items){
                        i.isclick = false;
                    }
                })
            } else {
                this.goodList.forEach(v => {
                    v.allclick = true;
                    for(let i of v.items){
                        i.isclick = true;
                    }
                })
            }
            
        }
    },
    watch:{
        // goodList:{
        //     handler(){
        //         setTimeout(() => {
        //             this.goodList.forEach((v,i) => {
        //                 if(v.items.length < 1){
        //                     this.goodList.splice(i,1)
        //                 };
        //             })
        //         },20)
                
        //     },
        //     deep:true
        // }
    },
    computed:{
        AllTotalPrice(){
            let money = 0;
            this.goodList.forEach(v => {
                for(let i of v.items) {
                    if(i.isclick === false){
                        continue;
                    } else {
                        money += i.goodsPrice * i.goodsNum
                    }
                }
            });
            return money.toFixed(2);
        },
        totalFreight(){
            let money = 0;
            this.goodList.forEach(v => {
                for(let i of v.items) {
                    if(!i.isclick){
                        continue;
                    } else {
                        money += i.freight;
                    }
                }
            });
            return money;
        },
        All_choose(){
            return this.goodList.every(v => {
                return v.allclick  === true
            })
        },
        choosingGoods(){
            let arr = [];
            this.goodList.forEach(v => {
                for(let i of v.items){
                    i.isclick == true ? arr.push(i) : ''
                }
            });
            return arr;
        },
    }
}
</script>


<style lang="stylus" scoped>
.shopcart-wrap
    position absolute
    height 90%
    width 100%
    overflow hidden
    background #e7e7e7
    display flex
    flex-direction column
    .Ttitle
        width 100%
        height 1.1333rem
        line-height 1.1333rem
        color #fff
        background #fc7aa5
        text-align center
        font-size 0.4rem
        position absolute
        top 0
    .scroll
        height 100%
        overflow-x hidden
        overflow-y scroll
        -webkit-overflow-scrolling: touch;
        margin 1.1333rem 0
        .gooditem
            background #ffffff
            margin-bottom 0.1333rem
            .header
                box-sizing border-box
                padding 0.2rem 0.3333rem
                font-size 0.4rem
                display flex
                border-bottom 0.0133rem solid #e7e7e7
                align-items center
                .radio
                    width 0.5333rem
                    height 0.5333rem 
                    border-radius 50%
                    overflow hidden
                    margin-right 0.1333rem
                    img
                        width 100%
                        height 100%
                .sellername
                    flex 1
                    display flex
                    align-items center
                    .icon 
                        font-size 0.55rem
                    span
                        margin-left 0.1333rem
            .content
                .gooditem-item
                    box-sizing border-box
                    padding 0.2667rem 0.3333rem
                    padding-right 0
                    display flex
                    align-items center
                    border-bottom 1px solid #e7e7e7
                    .itemradio
                        width 0.5333rem
                        height 0.5333rem 
                        border-radius 50%
                        margin-right 0.1333rem
                        img
                            width 100%
                            height 100%
                    .item-detail
                        display flex
                        flex 1
                        .img-wrap
                            width 2.1333rem
                            height 2.1333rem
                            img 
                                width 100%
                                height 100%
                        .item-content
                            flex 1
                            font-size 0.3333rem
                            padding-left 0.2rem
                            display flex
                            flex-direction column
                            justify-content space-between
                            padding-right 0.2667rem
                            .title
                                font-size 0.3333rem
                                height 0.6667rem
                                overflow hidden
                            .price
                                display flex
                                justify-content space-between
                                color #f22712
                                span 
                                    font-size 0.4667rem
                                div:last-child
                                    color #989898
                            .type
                                color #9e9e9e
                            &.edit
                                flex-direction row
                                position relative
                                padding-right 0
                        .edit-wrap
                            flex 1
                            box-sizing border-box
                            padding 0 0.2rem
                            display flex
                            flex-direction column
                            justify-content space-between
                            .edit-control
                                display flex
                                justify-content space-around
                                .btn
                                    flex 0 0 0.8rem
                                    height 0.8rem
                                    border 0.0133rem solid #e7e7e7
                                    line-height 0.8rem
                                    text-align center
                                .input-wrap 
                                    flex 1
                                    box-sizing border-box
                                    padding 0 0.1333rem
                                    overflow hidden
                                    display flex
                                    font-size .4rem
                                    border 1px solid #E7E7E7
                                    margin 0 .1rem
                                    align-items center
                                    justify-content center
                                    input 
                                        border 1px solid #E7E7E7
                                        display block
                                        text-align center
                                        font-size 0.4rem
                                        width 100%
                                        height 100%
                            .choosesing
                                display flex
                                width 100%
                                border 0.0133rem solid #e7e7e7
                                box-sizing border-box
                                padding 0.1333rem
                                justify-content space-between
                                align-items center
                                .control-icon
                                    width 0.5333rem
                                    height 0.5333rem
                                    transform rotateZ(90deg)
                                    text-align center
                                    line-height 0.5333rem
                                    font-size 0.4667rem
                        .delete 
                            font-size 0.4rem
                            display flex
                            align-items center
                            position relative
                            width 1.2rem
                            justify-content center
                            background #f02735
                            color #fff

.bottom-block
    display flex
    background-color #ffffff
    height 1.1333rem
    width 100%
    box-sizing border-box
    font-size 0.35rem
    border-top 0.0267rem solid #e7e7e7
    position absolute
    bottom 0
    .allbtn
        width 2.1333rem
        height 100%
        display flex
        align-items center
        justify-content space-around
        .radio
            display flex
            align-items center
            span 
                margin-left 0.1333rem
            img
                width 0.5333rem
                height 0.5333rem
    .totalprice
        flex 1
        display flex
        justify-content flex-end
        box-sizing border-box
        padding 0 0.2rem
        font-size: 0.35rem
        align-items center
        span 
            color #fc7aa5
    .resultbtn
        width 160px
        height 100%
        display flex
        align-items center
        background-color #fc7aa5
        color #fff
        justify-content center
        padding 0 0.3rem


.fade-enter-active,.fade-leave-active   
    transition all .5s
.fade-enter,.fade-leave-to
    opacity 1

.recommend
    margin-bottom 3vh
    .title
        height 1.2rem
        background #fff
        font-size 0.4rem
        line-height 1.2rem
        padding-left 0.5333rem
        position relative
        &:before
            content : ''
            width 0.1333rem
            height 0.4rem
            position absolute
            left 0
            top 50%
            transform translateY(-50%)
            background #fc7aa5
    .content
        padding 0.1rem

.empty
    width 100%
    height 8rem
    background #e7e7e7
    position relative
    .empty-content
        position absolute
        width 3.8rem
        left 50%
        top 50%
        text-align center
        transform translate(-50%,-50%)
        img
            width 100%
            height 2.5rem
        .desc
            color #989898
            font-size .35rem
            margin .2rem 0
        .btn
            width 75%
            font-size .35rem
            text-align center
            display inline-block
            padding .15rem 0
            background #fc7aa5
            color #fff
            border-radius 0.625rem
</style>
