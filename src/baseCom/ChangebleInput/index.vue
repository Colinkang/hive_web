<template>
  <div class="my-box">
    <div class="my-box" :id="lisenValueChange">
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
  computed:{
    lisenValueChange(){
      this.nextValue =this.value
    }
  },
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
.my-box{
  display: inline;
  width: 40px;
}
input{
  background: transparent;
  border:none;
  color: #daac52;
}
</style>
