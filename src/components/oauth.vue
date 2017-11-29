<template>
    <div>
       授权校检
       <div>
           {{msg}}
       </div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  created() {
      wx.config({
        debug: true, //

        appId: 'wxdb0c8f2e996db7cb', // 必填，公众号的唯一标识

        timestamp: '', // 必填，生成签名的时间戳

        nonceStr: '', // 必填，生成签名的随机串

        signature: '',// 必填，签名，见附录1

        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })

    let urlSearch = new URLSearchParams(location.search);

    /**
    * @param url 重定向地址
    * 是否重定向
    */
    if (!urlSearch.has("code")) {
      const appid = "wxdb0c8f2e996db7cb",
        state = Date.parse(new Date()),
        url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
      location.href = url;
    } else {
      const code = urlSearch.get("code");
      this.axios
        .get(
          `http://120.27.230.208/ykds-wsc/f/wsc/user/getUserByCode?code=${code}`
        )
        .then(res => {
          this.msg = res.data;
          let obj = {
              userid : res.data.obj.id,
              openid : res.data.obj.openid,
              nickName : res.data.obj.nickname,
              avatar : res.data.obj.img
          };
          localStorage.setItem('userInfo',JSON.stringify(obj));
          this.$router.push({
              path:'/personalcenter'
          })
        });
    }
  },
  data() {
    return {
      msg: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
</style>
