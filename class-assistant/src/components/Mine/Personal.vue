<template>
  <div id="personal">
    <mt-header fixed title="我的资料" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">保存</mt-button>
    </mt-header>

    <div class="avatar">
      <mt-cell title="头像" is-link @click.native="chooseAvatar">
        <img src="/static/images/1.png" alt="avatar">
      </mt-cell>
    </div>

    <div class="school">
      <mt-cell title="学校" value="中南民族大学"></mt-cell>
      <mt-cell title="学院" value="计算机科学学院"></mt-cell>
      <mt-cell title="专业" value="软件工程"></mt-cell>
    </div>

    <div class="basemsg">
      <mt-cell title="姓名" value="王小明" to="/msgedit" is-link></mt-cell>
      <mt-cell title="性别" value="男" @click.native="chooseAvatar" is-link></mt-cell>
      <mt-cell title="出生年月" @click.native="openPicker" is-link></mt-cell>
      <mt-cell title="籍贯" is-link></mt-cell>
    </div>

    <div class="nickname">
      <mt-cell title="签名" is-link></mt-cell>
      <mt-cell title="昵称" is-link value="王小明"></mt-cell>
    </div>

    <div class="contaction">
      <mt-cell title="手机" is-link value="13007155600"></mt-cell>
      <mt-cell title="QQ" is-link></mt-cell>
      <mt-cell title="微信" is-link></mt-cell>
    </div>

    
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data () {
    return {
      pickerValue: '',
      sheetVisible: false,
      actions: [
        {
          name: '拍照',
          methods: ''
        },
        {
          name: '从相册中选取',
          methods: ''
        }
      ]
    }
  },
  methods: {
    chooseAvatar: function () {
      this.sheetVisible = true
    },
    openPicker: function () {
      this.$refs.picker.open()
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #personal{
    // height: 1000px;
    background-color: #f9f9f9;
    padding-top: calc(~"@{headerHeight} + 20px");
  }

  .header{
    background-color: #fff;
    color: #4a4a4a;
    border-bottom: 1px solid #e1e1e1;
    .is-left *,
    .is-right *
    {
      color: #26a2ff !important;
    }
  }

  .avatar{
    img{
      width: 54px;
      height: 54px;
      border: 1px solid #e1e1e1;
      border-radius: 8px;
      margin: 10px 6px;
    }
  }

  .school, .basemsg, .nickname, .contaction{
    margin-top: 16px;
  }
</style>
