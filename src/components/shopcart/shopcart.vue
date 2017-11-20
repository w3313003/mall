<template>
    <div class='shopcart-wrap'>
        <div class='Ttitle'>
            购物车
        </div>
        <scroll class='scroll' :data='goodList'>
            <div>
                <div  class='gooditem' v-for='(allitem,allindex) in goodList' :key="allindex">
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
                                        <img src="../.././assets/img/good-item.png" alt="">
                                    </div>
                                    <div class='item-content' v-if='!item.editing'>
                                        <div class='title'>
                                            2017夏季新款贝壳头板鞋2017夏季新款贝壳头板鞋2017夏季新款贝壳头板鞋
                                        </div>
                                        <div class='type'>
                                            {{item.currenttype}}
                                        </div>
                                        <div class='price'>
                                            <div>￥<span>{{item.price * item.amount}}</span>
                                            </div>
                                            <div>x{{item.amount}}</div>
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
                                                    <input type="text" v-model='item.amount' maxlength='3'>
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
                                                        {{item.currenttype}}
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
                <div class='recommend'>
                    <div class='title'>
                        猜你喜欢
                    </div> 
                    <div class='content'>
                        <goodLists :goodList='recommend'
                         @getTodetail='getTodetail'   ></goodLists>
                    </div>
                </div>
            </div>
        </scroll>
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
                结算 ({{choosingGoods.length}})
            </div> 
        </div>
        <shopChoosing 
        ref='shopcart' 
        :goodInfo='currentgood' 
        v-if='ischoosing'
        @add='Shopadd'
        @less='Shopless'
        @chooseColor='chooseColor'
        @chooseSize='chooseSize'
        @appendTo='editFinish'
        ></shopChoosing>
    </div>
</template>


<script>
import { shopList } from 'common/util'
import scroll from 'common/scroll'
import shopChoosing from 'common/shopChoosing'
import goodLists from 'common/goodList'
import { moocgoodList } from 'common/util'

export default {
    data(){
        return {
            goodList:[],
            currentgood:{},
            ischoosing:false,
            currentColor:'',
            currentSize:''
        }
    },
    components:{
      scroll,
      shopChoosing,
      goodLists
    },
    created(){
        this.recommend = moocgoodList
        this.goodList = this._initshopList();
    },
    methods:{
        _initshopList(){
            let map = {};
            shopList.forEach(v => {
                this.$set(v,'isclick',true);
                this.$set(v,'editing',false)
                const key = v.sellername;
                if(!map[key]) {
                    map[key] = {
                        title:v.sellername,
                        items:[],
                        allclick : true,
                        editing:false
                    }
                };
            });
            return Object.values(map).map(v => {
                return v;
            }).forEach(v => {
                for(let i of shopList){
                    if(i.sellername === v.title) {
                        v.items.push(i)
                    }
                }
            });
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
        Shopadd(){
            this.currentgood.amount++
        },
        Shopless(){
            if(this.currentgood.amount == 1) return;
            this.currentgood.amount--
        },
        chooseColor(item){
            this.currentColor = item;
        },
        chooseSize(item){
            this.currentSize = item
        },
        less(item){
            if(item.amount == 1) return;
            item.amount--
        },
        add(item){
            item.amount++
        },
        reChoose(item){
            this.ischoosing = true;
            this.currentgood = item;
            setTimeout(() => {
                this.$refs.shopcart.choosing = true;
            },20)
        },
        editFinish(){
            this.ischoosing = false;
            let str = `颜色:${this.currentColor},尺码:${this.currentSize}`
            this.currentgood.currenttype = str;
        },
        editend(item){
            item.editing = false;
            item.items.forEach(v => {
                v.editing = false
            });
        },
        deleteitem(a,b,i,ai){
            a.items.splice(i,1)
        },
        submit(){
            console.log(this.choosingGoods)
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
        goodList:{
            handler(){
                this.goodList.forEach((v,i) => {
                    if(v.items.length < 1){
                        this.goodList.splice(i,1)
                    };
                })
            },
            deep:true
        }
    },
    computed:{
        AllTotalPrice(){
            let money = 0;
            this.goodList.forEach(v => {
                for(let i of v.items) {
                    if(i.isclick === false){
                        continue;
                    } else {
                        money += i.price * i.amount + i.freight;
                    }
                }
            });
            return money
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
    height 90vh
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
    .scroll
        flex 1
        height 100%
        overflow hidden
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
                                    width 0.8rem
                                    height 0.8rem
                                    border 0.0133rem solid #e7e7e7
                                    line-height 0.8rem
                                    text-align center
                                .input-wrap 
                                    flex 1
                                    box-sizing border-box
                                    padding 0 0.1333rem
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
    box-sizing border-box
    font-size 0.35rem
    border-top 0.0267rem solid #e7e7e7
    align-items center
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
</style>
