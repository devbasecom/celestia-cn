<template>
  <tabs>
    <tab v-for="tabName in tabs" :name="tabName">
      <slot :name="tabName" />
    </tab>
  </tabs>
</template>

<script>
export default {
  props: {
    tabs: [String],
  },
}
</script>
