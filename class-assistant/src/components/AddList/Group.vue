<template>
  <div class="group">
    <mt-cell title="我的组" @click.native="stretchClick">
      <span slot="icon" class="stretch">
        <i :class="['fa', stretch ? 'fa-angle-down' : 'fa-angle-right']" aria-hidden="true"></i>
      </span>
    </mt-cell>
    <div class="list">
      <ul v-show="stretch">
        <li v-for="(item, index) in items" :key="index">
          <Item :data="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const Item = () => import('./Item.vue')

export default {
  name: 'group',
  data () {
    return {
      stretch: false,
      items: [
        {
          sid: 201421092076,
          avatar: '/static/images/2.png',
          nickname: '小小发二号',
          detail: 'we are what we repeatedlly do',
          chatType: 'single'
        },
        {
          sid: 201421092077,
          avatar: '/static/images/3.png',
          nickname: '小小发san号',
          detail: 'we are what we repeatedlly do',
          chatType: 'single'
        }
      ]
    }
  },
  methods: {
    stretchClick: function () {
      this.stretch = !this.stretch
    }
  },
  components: {
    Item
  }
}
</script>

<style lang="less" scoped>
  .stretch{
    display: inline-block;
    width: 14px;

    >i{
      margin-right: 8px;
      color: #dfdfdf;
      font-size: 16px !important;
    }
  }
</style>
