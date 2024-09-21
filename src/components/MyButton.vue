<template>
  <button class="submit">
    <slot></slot><!-- 允许用户传递内容 -->
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.submit {
  border: none;
  color: #fff;
  background: #409EFF;
  border-radius: 5px;
  font-family: inherit;
  font-size: 15px;
  padding: 0.5em 1em;
  transition: scale 0.2s ease;
}
.submit:hover {
  cursor: pointer;
  -webkit-animation: pulse 1.5s infinite;
  animation: pulse512 1.5s infinite;
}
.submit:active {
  scale: 0.95;
}

@keyframes pulse512 {
  0% {
    box-shadow: 0 0 0 0  #a0cfff;
  }
  70% {
    box-shadow: 0 0 0 8px rgba(218, 03, 8,  0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(218, 03, 8,  0);
  }
}
</style>