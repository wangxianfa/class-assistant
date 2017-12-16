<template>
  <div class="group">
    <mt-cell :title="name" @click.native="stretchClick" :value="rate">
      <span slot="icon" class="stretch">
        <i :class="['fa', stretch ? 'fa-angle-down' : 'fa-angle-right']" aria-hidden="true"></i>
      </span>
    </mt-cell>
    <div class="list">
      <ul v-show="stretch">
        <li v-for="(item, index) in members" :key="index">
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
      name: '正在加载中',
      online: 0,
      sum: 1,
      members: []
    }
  },
  props: ['data'],
  mounted () {
    this.name = this.$props.data.name
    this.online = this.$props.data.online
    this.sum = this.$props.data.sum
    this.members = this.$props.data.members
  },
  methods: {
    stretchClick: function () {
      this.stretch = !this.stretch
    }
  },
  components: {
    Item
  },
  computed: {
    rate: function () {
      return this.online + '/' + this.sum
    }
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
