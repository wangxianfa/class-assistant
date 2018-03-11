<template>
  <div class="publicMessage">
      <div v-show="isShow">
          <img src="./images/info.png" />
          <p>{{message}}</p>
      </div>
  </div>
</template>


<script>
  export default {
    name: 'message',
    computed: {
      isShow () {
        return this.$store.state.tips.isShow
      },
      message () {
        return this.$store.state.tips.message
      }
    }
  }
</script>

<style lang="less" scoped>
  
  @keyframes show
  {
      from {transform: translate3d(0, -20px, 0); opacity: 0}
      to {transform: translate3d(0, 0, 0); opacity: 1}
  }

  
  @keyframes hide
  {
      from {opacity: 1}
      to {opacity: 0}
  }
  .publicMessage{
    display: flex;
    position: fixed;
    top: 54px;
    width: 100%;
    z-index: 999;
    justify-content: center;
    animation:show 5s;
    div {
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      color: rgba(0,0,0,.65);
      background-color: #fff;
      border: 1px solid #d9d9d9;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      img {
          height: 14px;
      }
      p{
          font-size: 14px;
          padding-left: 4px;
          text-align: center;
          line-height: 50px;
      }
  }
  .hide{
      opacity: 0;
      animation: hide 1s;
  }
}

</style>
