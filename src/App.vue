<template>
  <div style="display: flex; justify-content: center;">
    <section class="grid">
      <ul class="grid__row">
          <div class="grid__col-sm-4 grid__col-md-2 grid__col-lg-3 foundation__grid-col foundation__grid-col--secondary">sm: 4, md: 2, lg: 3</div>
          <div class="grid__col-sm-4 grid__col-md-2 grid__col-lg-8 foundation__grid-col foundation__grid-col--secondary">sm: 4, md: 2, lg: 8</div>
          <div class="grid__col-sm-4 grid__col-md-8 grid__col-lg-1 foundation__grid-col foundation__grid-col--secondary">sm: 4, md: 8, lg: 1</div>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss">
.grid {
  @include text-display-s
}
</style>
