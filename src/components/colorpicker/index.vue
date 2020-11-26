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
      color :{
        get(){
          return this.$store.state.base.color
        },
        set(val){
          this.$store.state.base.color = val
        }

      }
    },
    methods: {
      change (val) {
        this.$store.commit('changeColor', val)
      }
    }
  }
</script>

<style scoped>

</style>
