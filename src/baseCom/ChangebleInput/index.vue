<template>
  <div class="box">
    <div class="box">
      <input type="" name="" v-model="nextValue" @blur="inputChange" v-on:keyup.enter="inputChange">
    </div>
  </div>
</template>
<script>
export default {
  props:{
    value:{
      type:[String, Number],
      default:'text'
    }
  },
  name: "",
  data: () => ({
    showText:true,
    nextValue:'',
  
  }),
  methods:{
    toggle(){
      this.showText=false
    },
    inputChange(){
      this.$emit('change',this.nextValue)
    }
  },
  mounted(){
    this.nextValue= this.value
  }
}
</script>
<style lang="" scoped>
.box{
  display: inline;
  width: 40px;
}
input{
  background: transparent;
  border:none;
  color: #daac52;
}
</style>
