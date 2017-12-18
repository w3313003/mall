<template>
    <div>
       授权校检
       <div>
       </div>
       <button @click='pay'>
           支付
       </button>
    </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      config: {}
    };
  },
  methods: {
    pay() {
      let paydata = new URLSearchParams();
      paydata.append("openId", "ovUuz1Y8M09tHz5fO7iMICa1eVMw");
      paydata.append("timestamp", this.timestamp);
      paydata.append("nonceStr", this.nonceStr);
      paydata.append("url", location.href);
      this.axios
        .post(
          "http://10.0.0.17:8080/ykds-wsc/f/weixin/unifiedOrderMap",
          paydata
        )
        .then(res => {
          wx.chooseWXPay({
            timestamp: this.timestamp,
            nonceStr: this.nonceStr,
            package: `prepay_id=${res.data.obj.prepay_id}`,
            signType: "MD5",
            paySign: res.data.code,
            success: function(res) {
              alert("ok");
            },
            error(res) {
              alert(res);
            }
          });
        });
    }
  },
  created() {
    Toast({
      message: "提示复制成功",
      duration: -1
    });

    let data = new URLSearchParams(),
      url = location.href.split("?#")[0];
    data.append("url", url);
    this.axios
      .post("http://10.0.0.17:8080/ykds-wsc/f/weixin/getJsAPIConfig", data)
      .then(res => {
        if (res.data.code == "success") {
          console.log(res.data.obj);
          (this.nonceStr = res.data.obj.nonce),
            (this.timestamp = res.data.obj.timestamp);
          console.log(`随机字符串:${this.nonceStr}`);
          console.log(`时间戳:${this.timestamp}`);
          this.config = {
            debug: true,
            appId: "wx8a2df9136c4a762a",
            timestamp: res.data.obj.timestamp,
            nonceStr: res.data.obj.nonce,
            signature: res.data.obj.signature,
            jsApiList: ["chooseWXPay"]
          };
          wx.config(this.config);
          wx.checkJsApi({
            jsApiList: ["chooseWXPay"],
            success(res) {
              alert(res);
            },
            error(res) {
              alert(123);
            }
          });
          wx.ready(function() {
            // wx.hideMenuItems({
            //     menuList: ['menuItem:share:qq'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            // });
            console.log("ok");
          });
          wx.error(function() {
            console.log("error");
          });
        }
      });
    // const appid = "wx8a2df9136c4a762a";
    // let urlSearch = new URLSearchParams(location.search);
    // if (!JSON.parse(localStorage.getItem("isLogin"))) {
    //   if (!urlSearch.has("code")) {
    //     const state = Date.parse(new Date()),
    //       url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
    //         "http://mh5xhv.natappfree.cc"
    //       )}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    //     location.href = url;
    //   } else {
    //     const code = urlSearch.get("code"),
    //       time = new Date(urlSearch.get("state")).toLocaleString();
    //     this.axios
    //       .get(
    //         `http://10.0.0.23:8181/ykds-wsc/f/wsc/user/getUserByCode1?code=2013267482f84b3fb098f05e003cb263`
    //       )
    //       .then(res => {
    //         this.msg = res.data;
    //         let obj = {
    //           userid: res.data.obj.id,
    //           openid: res.data.obj.openid,
    //           nickName: res.data.obj.nickname,
    //           avatar: res.data.obj.img
    //         };
    //         localStorage.setItem("userInfo", JSON.stringify(obj));
    //         localStorage.setItem("isLogin", true);
    //         this.$router.push({
    //           path: "/test"
    //         });
    //       });
    //   }
    // } else {
    //   this.$router.push({
    //     path: "/test"
    //   });
    // }
  }
};
</script>

<style lang="stylus" scoped>
</style>
