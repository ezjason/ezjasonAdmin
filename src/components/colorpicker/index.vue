<template>
  <el-color-picker v-model="color" @change="change"></el-color-picker>
</template>

<script>
  let {log} = console
  export default {
    name: 'color',
    data () {
      return {}
    },
    props: {},
    computed: {
      color () {
        return this.$store.state.base.color
      }
    },
    methods: {
      change (val) {
        this.$store.commit('changeColor', val)
        // this.$emit('update:color', val)
      }
    }
  }
</script>

<style scoped>

</style>
