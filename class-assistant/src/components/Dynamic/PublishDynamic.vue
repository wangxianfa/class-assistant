<template>
    <div id="publish_dynamic">
      <mt-header fixed title="添加动态" class="header">
        <router-link to="/?refer_page=dynamic" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button slot="right" @click="publish">发布</mt-button>
      </mt-header>
      <div class="container">
        <p class="select-tags">选择动态标签：
          <span v-for="(tag, index) in tags" @click="tagSelect(index)">{{tag}}
            <em><i v-show="selectedTags[index]" class="fa fa-check" aria-hidden="false"></i></em>
          </span>
        </p>
        <textarea class="content" placeholder="公告内容（必填）" v-model="dynamicDesc">{{dynamicDesc}}</textarea>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import Message from '@/base/Message/Message'

  export default {
    name: 'publishDynamic',
    data () {
      return {
        selectedTags: [true, false],
        dynamicDesc: '',
        tags: ['公告', '记事', '经费']
      }
    },
    computed: {
      ...mapGetters([
        'classId',
        'publishStatus'
      ])
    },
    methods: {
      tagSelect: function (selectedIndex) {
        var me = this
        var arr = (new Array(this.tags.length)).fill(false)
        this.selectedTags = arr.map((val, index) => {
          return selectedIndex === index ? !me.selectedTags[index] : me.selectedTags[index]
        })
      },
      publish: async function () {
        let _tags = ''
        for (let i = 0; i < this.selectedTags.length; i++) {
          if (this.selectedTags[i]) {
            _tags += ',' + this.tags[i]
          }
        }

        if (!this.dynamicDesc) {
          this.$store.dispatch('setShowTips', '公告内容不能为空')
          return
        }
        
        const data = {
          class_id: this.classId,
          tag: _tags.substring(1) || '公告',
          dynamic_text: this.dynamicDesc
        }
        await this.$store.dispatch('publish', data)
        
        if (this.publishStatus) {
          this.$store.dispatch('setShowTips', '发布成功')
        } else {
          this.$store.dispatch('setShowTips', '发布失败')
        }
        // 置空
        this.dynamicDesc = ''
        setTimeout(() => {
          history.go(-1)
        }, 1500)
      }
    },
    components: {
      Message
    }
  }
  </script>
  
  <style lang="less" scoped>
    @import url(../../common/styles/base.less);
  
    #publish_dynamic,
    .container{
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .container {
      background-color: #f8f8f8;
      padding-top: 60px;
      .select-tags {
        padding: 0 12px;
        display: flex;
        align-items: center;

        i {
          position: absolute;
          color: #f00;
          font-size: 12px;
        }

        em {
          width: 12px;
          height: 12px;
          background-color: #fff;
          display: inline-block;
          position: absolute;
          right: -3px;
          top: -3px;
        }

        span {
          display: inline-block;
          background-color: rgb(153, 102, 204, 0.8);
          margin-right: 10px;
          font-style: normal;
          padding: 0 8px;
          font-size: 12px;
          border-radius: 100%;
          color: #fff;
          font-weight: bold;
          line-height: 24px;
          position: relative;
        }

        span:nth-of-type(2n) {
          background-color: rgb(237, 208, 190, 0.8);
        }

        span:nth-last-of-type(3n) {
          background-color: rgb(37, 198, 252, 0.8);
        }

        span:nth-last-of-type(4n) {
          background-color: rgb(0, 255, 128, 0.8);
        }
      }
    }

    .content {
      width: 100%;
      outline: none;
      background-color: #fff;
      margin-top: 12px;
      line-height: 24px;
      min-height: 192px;
      padding: 12px 15px;
      color: black;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  
  </style>
  