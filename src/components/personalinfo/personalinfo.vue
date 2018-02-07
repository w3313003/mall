<template>
    <transition name='fade' mode='out-in'>
    <div class='pcenter'>
        <div class='title'>
            个人中心    
                <svg class="icon fenlei" aria-hidden="true" @click='back'>
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
        </div>  
        <div class='content'>
            <div class='item first'>
                <div class='item-title'>
                    头像
                </div>
                <div class='avatar-wrap'>
                    <img :src='userInfo.avatar'>
                </div>
            </div>
            <div class='item' >
                <div class='item-title'>
                    昵称
                </div>
                <div class='item-value'>
                    {{ userInfo.nickName }}
                </div>
            </div>
            <div class='item'>
                <div class='item-title'>
                    性别
                </div>
                <div class='item-value' @click="chooseSex">
                    {{userInfo.sex}}
                </div>
            </div>
            <div class='item'>
                <div class='item-title'>
                    电话
                </div>
                <div class='item-value' @click='changePhone'>
                    {{ userInfo.phoneNum || '请输入号码' }}
                </div>
            </div>
            <div class='item' @click='address'>
                <div class='item-title'>
                    收货地址
                </div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiantou"></use>
                </svg>
            </div>
        </div>
        <div class='mask' v-if='editing'>
            <nickname :data='userInfo'
            @revise='revise'
            @close='editing = false'>
            </nickname>   
        </div> 
            <Actionsheet
        :actions="sexList"
        v-model="sexShow">
    </Actionsheet>

    </div>

    </transition>
</template>

<script>
import { area } from "common/util";
import nickname from "common/nickname";
import { MessageBox } from "mint-ui";
import { Toast , Actionsheet} from "mint-ui";
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
export default {
  components: {
    nickname,
    Actionsheet
  },
  data() {
    return {
      userInfo: {},
      editing: false,
      sexList:[
          {
             name : '男',
             method: () => {
                let data = new URLSearchParams();
                    data.append('id',userInfo.userid);
                    data.append('sex','1');
                this.axios.post('/api/wsc/user/updateUserInfo',data).then(res => {
                    let obj = {
                                userid: res.data.id,
                                openid: res.data.openid,
                                nickName: res.data.nikeName,
                                avatar: res.data.img,
                                sex: res.data.sex === '1' ? '男' : '女'
                            };
                        this.userInfo = obj;
                        sessionStorage.setItem('userInfo',JSON.stringify(obj));
                        Toast('修改成功');
                })
             }
          },
          {
              name : '女',
              method: () => {
                let data = new URLSearchParams();
                    data.append('id',userInfo.userid);
                    data.append('sex','2');
                this.axios.post('/api/wsc/user/updateUserInfo',data).then(res => {
                    let obj = {
                                userid: res.data.id,
                                openid: res.data.openid,
                                nickName: res.data.nikeName,
                                avatar: res.data.img,
                                sex: res.data.sex === '1' ? '男' : '女'
                            };
                        this.userInfo = obj;
                        sessionStorage.setItem('userInfo',JSON.stringify(obj));
                        Toast('修改成功');
                     });
             }
          }
      ],
      sexShow:false
    };
  },
  created() {
    this.userInfo = userInfo;
  },
  methods: {
    changePhone() {
      MessageBox.prompt("请输入电话", "").then(({ value, action }) => {
        let reg = /^1[3|4|5|7|8|9]\d{9}$/;
        if (!reg.test(value)) {
          Toast("请输入正确的手机号码");
          return;
        };
        let data = new URLSearchParams();
            data.append('id',userInfo.userid);
            data.append('phoneNum',value);
        this.axios.post('/api/wsc/user/updateUserInfo',data).then(res => {
            let obj = {
                userid: res.data.id,
                openid: res.data.openid,
                nickName: res.data.nikeName,
                avatar: res.data.img,
                sex: res.data.sex === '1' ? '男' : '女',
                phoneNum: res.data.phoneNum
            };
            this.userInfo = obj;
            sessionStorage.setItem('userInfo',JSON.stringify(obj));
            Toast('修改成功');
        })
      },() => {});
    },
    back() {
      this.$router.back();
    },
    chooseSex(){
        this.sexShow = true;
    },
    editnickname() {
      MessageBox.prompt("请输入昵称", "").then(({ value, action }) => {
        if(value.length < 2) {
            Toast('最少两个字符');
            return ;
        };
        let data = new URLSearchParams();
            data.append('id',userInfo.userid);
            data.append('phoneNum',value);
            this.axios.post('/api/wsc/user/updateUserInfo',data).then(res => {

            })
      });
      // this.editing = true
    },
    revise(name) {
      this.userInfo.nickname = name;
      this.editing = false;
    },
    address() {
      this.$router.push("/address");
    }
  },
  filters: {
    formatPhone(val) {
      return new String(val).replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
  }
};
</script>

<style lang='stylus' scoped>
.fade-enter-active {
    transition: all 0.5s;
}

.fade-enter {
    transform: translate3d(100%, 0, 0);
}

.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    left: 0;
    top: 0;
}

.pcenter {
    width: 100%;
    height: 100vh;
    position: fixed;
    background: #e7e7e7;
    z-index: 999;

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

    .content {
        .item {
            display: flex;
            box-sizing: border-box;
            padding: 0.1333rem 0.3333rem;
            border-bottom: 1px solid #e7e7e7;
            background: #fff;
            font-size: 0.4rem;
            justify-content: space-between;
            align-items: center;
            height: 1.2rem;

            &.first {
                height: auto;
            }

            &:last-child {
                margin-top: 0.1333rem;
            }

            .avatar-wrap {
                width: 1.3333rem;
                height: 1.3333rem;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .item-value {
                color: #898989;
            }

            .icon {
                color: #898989;
            }
        }
    }
}

.nickname {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
</style>
