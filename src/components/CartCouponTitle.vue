<template>
  <div class="title">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  color: #fff;
  padding: 5px;
  font-size: 1.2rem;
  min-height: 25px;
  border-top: 1px solid #345;
  border-bottom: 1px solid #345;
  border-image: -webkit-linear-gradient(
      180deg,
      rgba(30, 54, 111, 0.1) 50%,
      rgba(30, 54, 111, 0.1) 20%,
      #fff 100%
    )
    1 10;
}
</style>
