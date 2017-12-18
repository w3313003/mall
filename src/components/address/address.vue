<template>
    <transition name='fade' mode='out-in'>
        <div class='address'>
            <div class='title'>
                收货地址    
                    <svg class="icon fenlei" aria-hidden="true" @click='back'>
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
            </div>  
            <div class='content'>
                <scroll :data='addressList' class='scroll' v-if='addressList.length > 0'>
                    <div>
                        <div class='address-item' v-for='(item,index) in addressList' :key="index">
                            <div class='t'>
                                <div class='header'>
                                    <div>
                                        {{item.consignee}}
                                    </div>
                                    <div>
                                        {{item.phoneNum}}
                                    </div>
                                </div>
                                <div class='body'>
                                    {{item.address}}
                                </div>
                            </div>
                            <div class='b'>
                                <div class='radio' @click='defaultToggle(item)'>
                                    <img v-if='item.state == "0"' src='../.././assets/img/radio.png'>
                                    <img v-else src='../.././assets/img/hradio.png'>
                                    默认地址
                                </div>
                                <div class='btn-wrap'>
                                    <div class='btnedit' @click='editAddress(item,index)'>
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-bianji1"></use>
                                        </svg>
                                        编辑
                                    </div>
                                    <div class='btndelete' @click='deleteAddress(item)'>
                                        <svg class="icon fenlei" aria-hidden="true">
                                            <use xlink:href="#icon-lajitong"></use>
                                        </svg>
                                        删除
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <transition name='address'>
                        <e-address v-if='editing' 
                        :addressInfo='currentAddress'
                        :isNew='isnew'
                        @confirm='confirm'
                        @close='close'></e-address>
                    </transition>
                </scroll>
                <div v-else>
                    没有数据
                </div>
            </div>  
            <div class='bottom' @click='addNewAddress'>
                添加收货地址
            </div>
        </div>
    </transition>
</template>

<script>
import { userdata } from 'common/mock'
import scroll from 'common/scroll'
import { addressList } from 'common/util'
import eAddress from './editAddress'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default {
    data(){
        return {
            nickname:'',
            area:[],
            addressList:[],
            editing:false,
            currentAddress:{},
            currentIndex:0,
            isnew : true
        }
    },
    components:{
        scroll,
        eAddress
    },
    created(){
        this._getAddressList();
    },
    methods:{
        back(){
            this.$router.back();
        },
        editAddress(item,i){
            this.isnew = false;
            this.currentAddress = item;
            this.currentIndex = i;
            this.editing = true;
        },
        deleteAddress(item){
            MessageBox.confirm('确定执行此操作?', '提示').then(() => {
                let data = new URLSearchParams();
                    data.append('addressId',item.id);
                    this.axios.post('/api/wsc/user/deleteAddress',data).then(res => {
                        if(res.data.code === 'success'){
                            Toast('删除成功');
                            setTimeout(() => {
                                location.reload();
                            },1000)
                        }
            })
            });

            
        },
        defaultToggle(item){
            console.log(userInfo.userid);
            let data = new URLSearchParams();
            data.append('userId',userInfo.userid);
            data.append('addressId',item.id);
            this.axios.post('/api/wsc/user/updateAddressState',data).then(res => {
                if(res.data.code == 'success'){
                    Toast('修改默认地址成功');
                    this._getAddressList();
                } else {
                    Toast('修改失败！');
                    return false;
                }
            })
        },
        confirm(data){
            // if(data.default){
            //     for(let i of this.addressList){
            //         i.default = false
            //     }
            // };
            // if(this.new){
            //     this.new = false;
            //     this.addressList.push(data)
            // } else {
            //     this.addressList.splice(this.currentIndex,1,data);
            // }
            this.editing = false;
        },
        addNewAddress(){
            this.currentAddress = {};
            this.isNew = true;
            this.editing = true;
        },
        close(){
            this.editing = false
        },
        _getAddressList(){
            let data = new URLSearchParams();
            data.append('userId',userInfo.userid)
            this.axios.post('/api/wsc/user/userAddress',data).then(res => {
                res.data.obj.sort((a,b) => {
                    return Date.parse(new Date(a.createDate)) - Date.parse(new Date(b.createDate));
                });
                res.data.obj.forEach(v => {
                    if(v.state === '0') {
                        this.$set(v,'isDefault',true)
                    } else {
                        this.$set(v,'isDefault',false)
                    }
                });
                this.addressList = res.data.obj;
                console.log(this.addressList)
            })
        }
    },
    filters:{
        formatPhone(val){
            return new String(val).replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
        }
    }
}
</script>

<style lang='stylus' scoped>
.fade-enter-active,.fade-leave-active
    transition all .5s
.fade-enter
    transform scale(100%,0,0)
.fade-leave-to
    transform scale(-100%,0,0)

.address-enter-active,.address-leave-active
    transition all .5s
.address-enter,.adress-leave-to
    transform translate3d(100%,0,0)

.address
    width 100%
    height 100vh
    position fixed
    background #e7e7e7
    z-index 1000
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
    .bottom 
        height 1.2667rem
        line-height 1.2667rem
        color #fff
        background #fc7aa5
        font-size 0.4rem
        text-align center
    .content
        flex 1
        overflow hidden
        .scroll
            height 100%
            overflow hidden
            .address-item
                background-color #fff
                font-size 0.4rem
                border-bottom 0.0133rem solid #e7e7e7
                .t
                    box-sizing border-box
                    padding 0.4rem 0.2667rem
                    color #777
                    border-bottom 0.0133rem solid #e7e7e7
                    .header
                        height 0.5333rem
                        line-height 0.5333rem
                        display flex
                        justify-content space-between
                        margin-bottom 0.1333rem
                .b
                    height 1.2rem
                    display flex
                    box-sizing border-box
                    padding 0 0.2667rem
                    justify-content space-between   
                    .radio
                        display flex
                        align-items center
                        img
                            margin-right 0.2rem
                            height 0.5333rem
                            width 0.5333rem
                    .btn-wrap
                        width 4.2rem
                        display flex
                        div
                            color #fc7aa5
                            flex 1
                            display flex
                            align-items center
                            box-sizing border-box
                            padding 0 0.3rem
                            justify-content space-around
                            .icon
                                font-size 0.5rem

</style>
