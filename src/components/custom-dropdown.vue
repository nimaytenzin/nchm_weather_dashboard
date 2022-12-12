<template>
  <div class="dropdown">
    <h1 @click="selected = !selected" class="dropdown__title">Dropdown</h1>

    <div class="items" v-if="selected">
      <div class="item">1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &__title {
    font-size: 14px;
  }

  .items {
    position: absolute;
    top: 50%;
    background: red;
    width: 100%;
    animation: fadeIn 300ms;
    div {
      width: 100%;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<script>
export default {
  data: () => ({
    selected: false,
  }),
};
</script>
