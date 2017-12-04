<template>
  <p class="loading" v-show="isShow">{{message}}</p>
</template>

<script>
export default {
  name: 'warn',
  computed: {
    isShow () {
      return this.$store.state.warn.isShow
    },
    message () {
      return this.$store.state.warn.message
    }
  }
}
</script>

<style lang="less" type="text/css" scoped>
p.loading{
   position:absolute;
   top:20px;
   left:0;
   right:0;
   margin:0 10px;
   padding:0 20px;
   text-align:center;
   color:#333;
   letter-spacing:1px;
   background:#fff;
   opacity:0.7;
   font-size:14px;
   border-radius:6px;
   border: 1px solid #f8f8f8;
   height: 42px;
   line-height: 42px;
   box-sizing: border-box;
}
</style>
