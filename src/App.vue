<template>
  <div style="display: flex; justify-content: center;">
    <section class="grid">
      <div class="grid__row">
        <div class="grid__col-sm-12 grid__col-md-3 grid__col-lg-11" style="background: pink;">1</div>
        <div class="grid__col-sm-12 hidden-md grid__col-md-9 grid__col-lg-1" style="background: pink;">1</div>
      </div>
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
<!-- <style lang="scss" src="@/assets/grid/index.scss" /> -->
