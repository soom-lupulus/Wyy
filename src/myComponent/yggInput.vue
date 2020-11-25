<template>
  <div>
    <main>
      <input
        :type="type"
        :value="value"
        class="ipt"
        @input="$emit('input', $event.target.value)"
      />
      <slot>
        <span>手机</span>
      </slot>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    value: [String, Number]
  },
};
</script>

<style lang="less" scoped>
main {
  display: flex;
  align-items: center;
  .ipt {
    width: 14rem;
    height: 2rem;
    background-color: transparent;
    border: 0.1rem solid rgba(5, 5, 5, 0.8);
    outline: none;
    margin: 1rem 0;
  }
  span {
    font-size: 0.3rem;
    margin-left: 1rem;
  }
}
</style>