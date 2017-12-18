<template>
    <div class='edit-address'>
        <div class='title'>
            收货地址    
            <svg class="icon fenlei" aria-hidden="true" @click='close'>
                <use xlink:href="#icon-jiantou"></use>
            </svg>
        </div>
        <div class='list'>
            <div class='item'>
                <div class='key'>
                    收货人
                </div>
                <div class='value'>
                    <input type="text" v-model='addressInfo.consignee' placeholder="请输入收货人姓名">
                </div>
            </div>
            <div class='item'>
                <div class='key'>
                    联系号码
                </div>
                <div class='value'>
                    <input type="number" v-model='addressInfo.phoneNum' placeholder="请输入手机号码" maxlength="11" >
                </div>
            </div>
            <div class='item'>
                <div class='key'>
                    所在地区
                </div>
                <div class='value' @click="showPicker">
                    <div v-if='currentArea == ""'>
                    请选择
                    <svg class="icon fenlei" aria-hidden="true">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                    </div>
                    <div v-else>
                    <span>
                        {{ currentArea }}
                    </span>
                    </div>
                </div>
            </div>
            <div class='item'>
                <textarea name="" id="" placeholder="请输入详细地址" v-model.trim='DetailAdress'>

                </textarea>
            </div>
            <div class='item'>
                <div class='key'>设为默认地址</div>
                <div class='value' style="transform: scale(0.9);">
                    <mt-switch v-model='addressInfo.isDefault'>

                    </mt-switch>
                </div>
            </div>
        </div>
            <city-picker @select="handleSelect(arguments)" :data="area" :selected-index="startIndex"
              ref="picker"></city-picker>
        <div class='bottom' @click='confirm'>
            保存
        </div>
    </div>
</template>

<script>
import { provinceList,cityList,areaList } from 'common/util'
import cityPicker from 'common/city-picker'
import { Switch } from 'mint-ui'
import { Toast } from 'mint-ui'
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  export default {
    name: '',
    components: {
      cityPicker,
      'mt-switch': Switch
    },
    created(){
        console.log(this.addressInfo)
    },
    props: {
        addressInfo:{
            type:Object,
            default() {
                return {}
            }
        },
        isNew:{
            type : Boolean,
            default : false
        }
    },
    computed : {
    },
    data () {
      return {
          area:[provinceList, cityList, areaList],
          startIndex:[0, 0, 0],
          carea:'',
          DetailAdress:'',
          isDefault:true
      }
    },
    computed:{
        currentArea(){
            if(this.carea == '' || !this.carea){
                return ''
            } else {
                let str = '';
                for (let i of this.carea){
                    str += `${i},`
                };
                return str.substring(0,str.length - 1);
            }
        }
    },
    created() {
    },
    methods: {
        showPicker(){
            this.$refs.picker.show();
        },
        handleSelect(arg){
            this.carea = [...arg[2]];
        },
        confirm(){
            let reg = /^1[3|4|5|7|8|9]\d{9}/;
            if(!reg.test(this.addressInfo.phoneNum)){
                Toast('手机号码格式错误');
                return false;
            };
            if(!this.addressInfo.consignee || this.addressInfo.consignee.length <= 1){
                Toast('请输入收货人姓名');
                return false;
            }
            if(this.DetailAdress.length < 5){
                Toast('详细地址最少需要5个字符');
                return false;
            };
            if(!this.currentArea || this.currentArea.length < 10){
                Toast('请选择所在地区');
                return false;
            };
            
            let data = {
                consignee  : this.addressInfo.consignee,
                phoneNum : this.addressInfo.phoneNum,
                address :`${this.currentArea}${this.DetailAdress}`.replace(/\,/g,''),
                state : this.addressInfo.isDefault ? '0' : '1',
                Id:this.addressInfo.id
            };
            if(this.isNew){
                let params = new URLSearchParams();
                params.append('consignee',this.addressInfo.consignee);
                params.append('phoneNum',this.addressInfo.phoneNum);
                params.append('address',`${this.currentArea}${this.DetailAdress}`.replace(/\,/g,''));
                params.append('state',this.addressInfo.isDefault ? '0' : '1');
                params.append('userId',userInfo.userid);
                this.axios.post('/api/wsc/user/editAddress',params).then(res => {
                    if(res.data.code === 'success'){
                        Toast('修改成功');
                        setTimeout(() => {
                            location.reload();
                        },1000)
                    }
                })
            } else {
                let params = new URLSearchParams();
                params.append('consignee',this.addressInfo.consignee);
                params.append('phoneNum',this.addressInfo.phoneNum);
                params.append('address',`${this.currentArea}${this.DetailAdress}`.replace(/\,/g,''));
                params.append('state',this.addressInfo.isDefault ? '0' : '1');
                params.append('Id',this.addressInfo.id);
                params.append('userId',userInfo.userid);
                this.axios.post('/api/wsc/user/editAddress',params).then(res => {
                    if(res.data.code === 'success'){
                        Toast('修改成功');
                        setTimeout(() => {
                            location.reload();
                        },1000)
                    }
                })
            }
            console.log(data)
            // this.$emit('confirm',data);
        },
        close(){
            this.$emit('close')
        }
    },
    mounted(){
      this.$nextTick(() => { 
      });
    }
  }
</script>

<style lang="stylus" scoped>
.edit-address
    width 100%
    height 100vh
    position fixed
    left 0 
    top 0
    background #e7e7e7
    .title,.bottom
        width 100%
        height 1.1333rem
        color #fff
        background #fc7aa5
        text-align center
        font-size 0.4rem
        line-height 1.1333rem
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
        position fixed
        bottom 0
    .list
        .item
            display flex
            font-size 0.4rem
            height 1.2667rem
            align-items center
            background #fff
            box-sizing border-box
            padding 0 0.3rem
            border-bottom 1px solid #e7e7e7
            .value
                input
                    font-size 0.4rem
                    margin-left 0.1333rem
            .key
                width 1.8rem
            &:nth-child(3)
                justify-content space-between
                .value
                    color #979797
            &:nth-child(4)
                height 2.8rem
                padding 0.4667rem
                textarea
                    font-size 0.4rem
                    width 100%
                    height 100%
            &:last-child
                .key 
                    flex 1
                justify-content space-between
                margin-top 0.1333rem
    .pickwrap
        background-color #fff
        height 0.8rem
</style>
