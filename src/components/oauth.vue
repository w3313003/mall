<template>
    <div>
       授权校检
       <div>
           {{msg}}
       </div>
    </div>
</template>

<script>
export default {
  created() {
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
