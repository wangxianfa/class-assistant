<template>
  <div id="personal">
    <div v-show="!editing" id="all-msg">
      <mt-header fixed title="我的资料" class="header">
        <router-link to="/?page_name=mine" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click.native="update">保存</mt-button>
      </mt-header>
      <div class="avatar">
        <mt-cell title="头像" is-link @click.native="chooseAvatar">
          <img :src="selfInfo.avatar" alt="avatar">
        </mt-cell>
      </div>
  
      <div class="school">
        <ul>
          <li>
            <span>学校</span>
            <span>{{selfInfo._school}}</span>
          </li>
          <li>
            <span>学院</span>
            <span>{{selfInfo._institute}}</span>
          </li>
          <li>
            <span>专业</span>
            <span>{{selfInfo._major}}</span>
          </li>
        </ul>
      </div>
  
      <!-- 无需个人信息显示 -->
      <!-- <div class="basemsg">
        <ul>
          <li>
            <span>姓名</span>
            <span>{{selfInfo.name || '未公开'}}</span>
          </li>
          <li>
            <span>性别</span>
            <span>{{selfInfo.sex || '未公开'}}</span>
          </li>
          <li>
            <span>出生年月</span>
            <span>{{selfInfo.birthday || '未知'}}</span>
          </li>
          <li>
            <span>籍贯</span>
            <span>{{selfInfo.address || '不详'}}</span>
          </li>
        </ul>
      </div> -->
  
      <div class="nickname">
        <ul>
          <li @click="editMsgClick(0)">
            <span>昵称</span>
            <span>{{temp['nick_name'] || selfInfo.nick_name}}
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </li>
          <li @click="editMsgClick(1)">
            <span>签名</span>
            <span>{{temp['signature'] || selfInfo.signature}}
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </li>
        </ul>
      </div>
  
      <div class="contaction">
        <ul>
          <li @click="editMsgClick(2)">
            <span>手机</span>
            <span>{{temp['phone'] || selfInfo.phone}}
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
          </li>
        </ul>
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
    <div v-show="editing" id="msgedit">
      <mt-header fixed :title="title" class="header">
        <mt-button slot="left" icon="back" @click="editBack"></mt-button>
        <mt-button slot="right" @click.native="tempSave">保存</mt-button>
      </mt-header>
      <div class="edit">
        <p>请输入{{title}}: </p>
        <textarea v-if="useTextArea" :placeholder="'请输入你的' + title" v-model="inputChanged"></textarea>
        <input v-if="!useTextArea" type="text" :placeholder="'请输入你的' + title" v-model="inputChanged">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as constants from '@/common/constant/constant'

export default {
  name: 'Personal',
  data () {
    return {
      pickerValue: '',
      sheetVisible: false,
      actions: [
        {
          name: '拍照',
          method: this.takePhoto
        },
        {
          name: '从相册中选取',
          method: ''
        }
      ],
      selfInfo: {
        school: '',
        institute: '',
        major: ''
      },
      editing: false, // 是否处于编辑信息状态
      title: '', // 处于编辑状态的头部标题
      useTextArea: false, // 用input或者textarea
      temp: {},
      inputChanged: '' // 编辑的信息
    }
  },
  methods: {
    chooseAvatar: function () {
      this.sheetVisible = true
    },
    openPicker: function () {
      this.$refs.picker.open()
    },
    update: async function () {
      if (Object.keys(this.temp).length === 0) {
        this.$store.dispatch('setShowTips', '还没有做任何修改哦')
        return
      }
      await this.$store.dispatch('update_personal_message', {content: this.temp, userId: this.selfInfo['user_id']})
      if (this.updateStatus) {
        this.$store.dispatch('setShowTips', '保存成功')
        this.$store.dispatch('refreshDate', this.userInfo.user_id)
      } else {
        this.$store.dispatch('setShowTips', '保存失败')
        return
      }

      setTimeout(() => {
        history.go(-1)
      }, 1500)
    },
    editMsgClick: function (data) {
      let title = ''
      let useTextArea = false
      switch (data) {
        case 0:
          title = '昵称'
          break
        case 1:
          title = '签名'
          useTextArea = true
          break
        case 2:
          title = '手机号'
          break
      }
      this.useTextArea = useTextArea
      this.editing = true
      this.title = title
    },
    editBack: function () {
      this.editing = false
      this.inputChanged = ''
    },
    tempSave: function () {
      let key
      switch (this.title) {
        case '昵称':
          if (this.inputChanged.length > 10) {
            this.$store.dispatch('setShowTips', '昵称长度不能超过10个字符')
            return
          }
          key = 'nick_name'
          break
        case '签名':
          key = 'signature'
          break
        case '手机号':
          if (!this.inputChanged.match(/\d{11}/g)) {
            this.$store.dispatch('setShowTips', '请输入11位手机号')
            return
          }
          key = 'phone'
          break
      }
      this.temp[key] = this.inputChanged
      this.inputChanged = ''
      this.editing = false
    },
    takePhoto: function () {
      var errocb = function () {  
        console.log('sth wrong!')
      }  
        
      if (navigator.getUserMedia) { // 标准的API  
        navigator.getUserMedia({ 'video': true }, function (stream) {
          // video.src = window.URL && window.URL.createObjectURL(stream);  
          // video.play();
          alert(1)
        }, errocb)
      } else if (navigator.webkitGetUserMedia) { // WebKit 核心的API  
        navigator.webkitGetUserMedia({ 'video': true }, function (stream) {  
          // video.src = window.webkitURL.createObjectURL(stream);  
          // video.play();
          alert(2)
        }, errocb)
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'updateStatus'
    ])
  },
  mounted () {
    this.selfInfo = Object.assign(this.userInfo, 
      {
        '_school': constants.SCHOOL[this.userInfo.school] || '暂未公开',
        '_institute': constants.INSTITUTE[this.userInfo.institute] || '暂未公开',
        '_major': constants.MAJOR[this.userInfo.major] || '暂未公开'
      }
    )
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #personal{
    min-height: 100%;
    background-color: #f9f9f9;
    padding-top: calc(~"@{headerHeight} + 20px");
    &::-webkit-scrollbar {
      display: none
    }
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

  .school, .basemsg, .nickname, .contaction {
    padding: 0 10px;
    background-color: #fff;
    li {
      line-height: 48px;
      display: flex;
      justify-content: space-between;
    }

    span {
      display: inline-block;
      max-width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    i {
      color: #c8c8cd;
      font-weight: bold;
      padding: 0 8px;
    }
  }

  .edit{
    &>p{
      padding: 0 12px;
    }
    &>input[type='text']{
      width: 100%;
      height: 36px;
      text-indent: 12px;
      margin-top: 10px;
    }
    textarea {
      width: 100%;
      margin-top: 10px;
      min-height: 100px;
      padding: 12px 15px;
      &::-webkit-scrollbar {
        display: none
      }
    }
  }
</style>
