<template>
    <div>
        <span>
            支付测试
        </span>
    </div>

</template>

<script>
import wx from 'weixin-js-sdk'


export default {
    created(){
        let appid = 'wx8a2df9136c4a762a',
            userInfo =  JSON.parse(localStorage.getItem("userInfo")),
            openid = userInfo.openid;
        wx.config({
            debug : true
        })
    }
}
</script>

<style lang="stylus" scoped>
span 
    display block
    margin 40vh auto
</style>
