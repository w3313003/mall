/*
 * @Author: ZhaoJie 
 * @Date: 2017-11-21 16:55:21 
 * @Last Modified by: 赵杰
 * @Last Modified time: 2017-12-25 17:55:21
 */

<template>
    <transition name='mask'>
        <div class='mask' v-show='choosing' @click='close'>
        <transition name='choosing'>
            <div class='choosetype' v-show='choosing' @click.stop='cancelBubble'>
                <div class='header'>
                    <div class='img-wrap'>
                        <!-- <img :src='img' alt=""> -->
                        <img v-lazy='goodInfo.imgMain' alt="">
                    </div>
                    <div class='disc'>
                        <div class='price'>
                            ￥<span>{{totalPrice}}</span>
                        </div>
                        <div class='Allcount'>
                            库存 : {{goodStock}}
                        </div>
                        <div class='currenttype'>
                            已选: 
                            <span v-if='otherType.length <= 1'>
                                <i v-for='(value,key,index) in choosed' :key="index"  >
                                    {{key}}:{{value.cn}}
                                </i>
                            </span>
                            <span v-else>请选择{{otherType}}</span> 
                        </div>
                        <div class='cancel' @click='close'>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-quxiao"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class='block choose_block1' v-for='(value,key,index) in typeMap' :key="index">
                    <div class='title'>{{key}}:</div>
                    <div class='detail-type'>
                        <div class='item' :class='{"active": choosed[items.type] && choosed[items.type]["index"] == indexs }' @click.stop='choose(items,indexs)' v-for='(items,indexs) in value' :key="indexs">
                           <span>
                               {{items.name}}    
                            </span> 
                        </div>  
                    </div>
                </div>
                <div class='count'>
                    <div>
                        购买数量
                    </div>
                    <div class='control'>
                        <div @click='less'>
                            <svg class="icon indexicon" aria-hidden="true">
                                <use xlink:href="#icon-iconjian"></use>
                            </svg>
                        </div>
                        <div>
                            <input type="text" disabled v-model='amount' maxlength='3'>
                        </div>
                        <div @click='add'>
                            <svg class="icon indexicon" aria-hidden="true">
                                <use xlink:href="#icon-jiahao"></use>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class='confirm_btn' @click='appendToShopCart'>
                    确定
                </div>
            </div>
        </transition>  
        </div>
    </transition>
</template>

<script>
/**
  * 取数组差集
  * @arguments Array 
  */
function diffSet() {
    let arr = [];
    [...arguments].reduce((q, c) => {
        if (!q instanceof Array) {
            throw new Error('参数必须是数组');
            return;
        };
        let _arr = [...new Set(q)],
            _nextarr = [...new Set(c)];
        _arr.forEach(v => {
            _nextarr.includes(v) ? '' : arr.push(v)
        });
        _nextarr.forEach(v => {
            _arr.includes(v) ? '' : arr.push(v)
        });
    });
    return [...new Set(arr)];
}
import { Toast } from 'mint-ui'
export default {
    props:{
        goodInfo:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    computed:{
        totalPrice(){
            return this.goodsPrice * this.amount;
        }
    },
    watch:{
        // 动态价格计算
        choosed:{
            handler(){
                let typeArr = Object.keys(this.typeMap),
                    choosedArr = Object.keys(this.choosed),
                    typeLength =typeArr.length,
                    choosedLength = choosedArr.length;
                if(typeLength > choosedLength){
                    this.otherType = diffSet(typeArr,choosedArr)[0];
                } else if (typeLength  == choosedLength) {
                    this.otherType = '';
                    let arr = [];
                    Object.values(this.choosed).forEach(v => {
                        arr.push(v.id)
                    });
                    const queryStr = arr.join(','),
                          reverseQueryStr = arr.reverse().join(',');
                    this.goodInfo.goodsPrices.forEach(v => {
                        if(v.specChileId === queryStr || v.specChileId === reverseQueryStr){
                            this.goodsPrice = v.price;
                            this.goodStock= v.stock;
                            this.specChileId = v.specChileId
                        };
                    })
                }
            },
            deep:true
        }
    },
    data(){
        return {
            choosing:false,
            typeMap : {},
            amount : 1,
            choosed: {} ,
            otherType:'',
            goodsPrice:0,
            goodStock:0 ,
            specChileId: 0
        }
    },
    created(){
        console.log(this.goodInfo)
        this.currentType = this.goodInfo.goodsPrices[0].specChileId.split(',');
        this._formatGoodsTypeList(this.goodInfo);
    },
    methods:{
        _formatGoodsTypeList(arr){
            arr.specs.forEach(v => {
                v.specChiles.forEach(item => {
                    const key = v.name;
                    if(!this.typeMap[key]){
                        this.typeMap[key] = [];
                    }
                    this.typeMap[key].push({
                        id : item.id,
                        name: item.name,
                        type:key
                    });
                });
            });
        },
        close(){
           this.choosing = false
        },
        less(){
            if(this.amount <= 1){
                Toast('最少购买一件');
                return;
            };
            this.amount --;
            this.$emit('less')
        },
        add(){
            if(this.amount >= this.goodStock ){
                Toast('已超出最大购买限制');
                return ;
            };
            this.amount++;
            this.$emit('add');
        },
        choose(item,index){
            const key = item.type;
            this.$set(this.choosed,`${key}`,{
                cn : item.name,
                id : item.id,
                index : index
            });
            console.log(this.choosed)
        },
        appendToShopCart(){
            let choosedTypeCount = Object.keys(this.choosed).length,
                originTypeCount = this.goodInfo.specs.length;
            if(choosedTypeCount < originTypeCount){
                Toast('规格选择错误，请重试');
                return;
            };
            let str = ''
            for(let i in this.choosed){
                str +=`${i}:${this.choosed[i].cn},`;
            };
            let data = {
                totalPrice : this.totalPrice,
                stock : this.goodStock,
                price : this.goodsPrice,
                amount : this.amount,
                choosedType: str.slice(0,-1),
                specId:this.specChileId,
                img : this.goodInfo.imgMain
            };            
            this.$emit('appendTo',data);
            this.close();
        },
        cancelBubble(e){
            e.stopPropagation();
        }
    }
}
</script>

<style lang="stylus" scoped>
@css{
    .choosing-enter-active,.choosing-leave-active{
        transition:all .5s;
    }
    .choosing-enter,.choosing-leave-to{
        transform:translate3d(0,100%,0) rotateX(-100deg);
        // opacity:0
    }
    .mask-enter-active,.mask-leave-active{
        transition:all .5s;
    }
    .mask-enter,.mask-leave-to{
        opacity : 0;
    }
}


.mask
    width : 100vw;
    height : 100vh;
    position:fixed;
    top:0;
    left:0;
    background-color : rgba(0,0,0,.3);
    z-index : 1002;
    .choosetype
        position fixed
        left 0 
        bottom 0
        width 100%
        background #fff
        z-index 1002
        .header
            display flex
            position relative
            box-sizing border-box
            padding 0.2rem 0.5333rem 0
            .img-wrap
                width 2.8rem
                height 2.8rem
                display flex
                justify-content center
                background #e8e8e8
                align-items center
                transform translateY(-0.6667rem)
                img
                    display block
                    width 2.5333rem 
                    height 2.5333rem
            .disc
                flex 1
                margin-left 0.3333rem
                position relative
                .cancel
                    position absolute
                    width 0.8rem
                    height 0.8rem
                    font-size 0.8rem
                    right 0.1333rem
                    top 0   
                .price  
                    font-size 0.3333rem
                    margin-top 0.15rem
                    color #ea250b
                    span
                        font-size 0.4rem
                .currenttype,.Allcount
                    color #989898
                    font-size 0.35rem
                    margin 0.4rem 0
        .block  
            font-size: 0.35rem;
            box-sizing border-box
            padding 0 0.4667rem
            margin 0.2667rem 0
            .title
                margin 0 0 0.2667rem 0
            .detail-type
                display flex
                flex-wrap wrap
                width 100%
                .item
                    flex 0 0 30%
                    justify-content flex-start
                    height 0.6667rem
                    background #e4e4e4
                    color #989898
                    line-height 0.6667rem
                    text-align center
                    margin 0.3067rem 0.2rem 0.3067rem 0
                    border-radius 0.333rem
                    &.active
                        background #fc7aa5
                        color #fff
        .count
            display flex
            justify-content space-between
            box-sizing: border-box;
            padding: 0 0.4667rem;
            font-size: 0.35rem;
            align-items center
            margin 0.4rem 0
            .control
                display flex
                flex 0 0 2.9333rem
                justify-content space-between
                & > div
                    width 0.88rem
                    height 0.88rem
                    background #e4e4e4
                    font-size 0.35rem
                    display flex
                    justify-content center
                    align-items center
                    &:nth-child(2)
                        input
                            display block
                            background #e4e4e4
                            width 100%
                            height 100%
                            font-size 0.5rem
                            text-align center
                    .icon 
                        font-size 0.2667rem
        .confirm_btn
            width 100%
            height 1.0667rem
            line-height 1.0667rem
            text-align center
            color #fff
            background #fc7aa5
            font-size 0.4rem
            letter-spacing 0.0267rem


</style>
