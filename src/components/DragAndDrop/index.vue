<template>
  <div>
    <draggable v-model="localImages" @end="onEnd">
      <transition-group name="list" tag="div" class="image-container">
        <div v-for="(image, index) in localImages" :key="index" class="image-item">
          <img :src="image.src" :alt="image.alt" />
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
export default {
  components: {
    draggable,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localImages: [...this.images],
    };
  },
  watch: {
    images(newImages) {
      this.localImages = [...newImages];
    },
  },
  methods: {
    onEnd(event) {
      console.log('Drag ended:', event);
    },
  },
};
</script>
<style>
.image-container {
  display: flex;
  flex-wrap: wrap;
}
.image-item {
  margin: 10px;
  cursor: pointer;
}
.image-item img {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}
</style>