<template>
    <div class="xl:col-span-2">
      <Card title="Image Gallery and Upload">
        <!-- Image Upload Area -->
        <div
          class="w-full text-center border-dashed border border-secondary-500 rounded-md py-12 flex flex-col justify-center items-center mb-4"
          @dragover.prevent
          @drop="handleDrop"
        >
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileUpload"
            multiple
          />
          <img
            src="@/assets/images/svg/upload.svg"
            alt="Upload Icon"
            class="mx-auto mb-4"
            @click="openFileUploader"
            style="cursor: pointer;"
          />
          <p class="text-sm text-slate-500 dark:text-slate-300 font-light">
            Drop files here or click to upload.
          </p>
        </div>
  
        <!-- Image Gallery with Drag and Drop Reordering -->
        <div class="flex flex-wrap">
          <div
            v-for="(image, index) in uploadedImages"
            :key="index"
            class="w-1/6 p-2 relative"
            draggable="true"
            @dragstart="handleDragStart(index)"
            @dragover.prevent
            @drop="handleDropImage(index)"
          >
            <span class="absolute top-0 left-0 bg-blue-500 text-white rounded-full py-1 px-2 z-10">{{ index + 1 }}</span>
            <img
              :src="image.url"
              :alt="'Uploaded Image ' + (index + 1)"
              class="w-full h-auto object-cover rounded-md"
              @mouseover="image.hovered = true"
              @mouseleave="image.hovered = false"
            />
            <button
              v-show="image.hovered"
              @click="deleteImage(index)"
              class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </Card>
    </div>
  </template>
  
  <script>
  export default {
    name: "ImageUploadGallery",
    data() {
      return {
        uploadedImages: [],
        draggedImageIndex: null,
      };
    },
    methods: {
      openFileUploader() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        const files = event.target.files;
        if (!files) return;
  
        this.processFiles(files);
      },
      handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (!files) return;
  
        this.processFiles(files);
      },
      processFiles(files) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.uploadedImages.push({
              url: e.target.result,
              file: files[i],
              hovered: false,
            });
          };
          reader.readAsDataURL(files[i]);
        }
      },
      handleDragStart(index) {
        this.draggedImageIndex = index;
      },
      handleDropImage(index) {
        if (this.draggedImageIndex !== null) {
          const draggedImage = this.uploadedImages[this.draggedImageIndex];
          this.uploadedImages.splice(this.draggedImageIndex, 1);
          this.uploadedImages.splice(index, 0, draggedImage);
          this.draggedImageIndex = null;
        }
      },
      deleteImage(index) {
        this.uploadedImages.splice(index, 1); // Remove image from uploadedImages array
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here if needed */
  </style>
  