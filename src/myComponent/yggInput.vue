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
    width: 12rem;
    height: 2rem;
    padding-left: 1rem;
    background-color: rgba(209,209,209,0.19);
    border: 0.1rem solid rgba(107, 105, 105, 0.8);
    outline: none;
    margin: 1rem 0;
    margin-left: 3rem;
  }
  span {
    width: 3rem;
    font-size: 0.3rem;
    padding-left: 1rem;
  }
}
</style>