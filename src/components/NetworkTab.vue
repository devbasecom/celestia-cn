<template>
  <tabs>
    <tab v-for="network in networks" :name="network.fullName">
      <slot :name="network.name" />
    </tab>
  </tabs>
</template>

<script>
export default {
  props: {
    networks: [String],
  },
}
</script>
