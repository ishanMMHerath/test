<template>
  <div>
    <div class="filegroup">
      <label :for="name">
        <input
            :id="name"
            :label="label"
            :multiple="multiple"
            :name="name"
            :placeholder="placeholder"
            class="bg-red-400 w-full hidden"
            type="file"
            @change="onChange"
        />
        <div
            :class="`  ${classInput}`"
            class="w-full h-[40px] file-control flex items-center"
        >
          <span
              v-if="!multiple"
              class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span
                v-if="selectedFile?.name"
                :class="filenametag ? 'badge-title' : 'text-slate-900 dark:text-white'"
            >
              {{ selectedFile?.name }}
            </span>
            <span v-if="!selectedFile?.name" class="text-slate-400">
              {{ placeholder }}
            </span>
          </span>

          <span
              v-if="multiple"
              class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span
                v-if="multipleFiles.length > 0"
                :class="filenametag ? 'badge-title' : 'text-slate-900 dark:text-white'"
            >
              {{ multipleFiles.length > 0 ? multipleFiles.length + ' files selected' : '' }}
            </span>
            <span v-if="placeholder && multipleFiles.length === 0" class="text-slate-400">
              {{ placeholder }}
            </span>
          </span>
          <span
              class="file-name flex-none cursor-pointer border-l px-4 border-slate-200 dark:border-slate-700 h-full inline-flex items-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-base rounded-tr rounded-br font-normal"
          >
            {{ label }}
          </span>
        </div>

        <div v-if="url && !multiple && preview" class="w-[200px] h-[200px] mx-auto mt-6">
          <img :alt="selectedFile?.name" :src="url" class="w-full object-cover h-full block rounded"/>
          <button class="btn-remove" @click="removeSingleImage">Remove</button>
        </div>


        
        <draggable
            v-if="multipleFiles.length > 0 && multiple && preview"
            v-model="multipleFiles"
            class="grid grid-cols-6 gap-3 rtl:space-x-reverse"
            @end="updateUrls" @change="onDragChange"
        >
          <template #item="{ element, index }">
            <div class=" rounded mt-6 relative">
              <img :id="'image_' + (index + 1)" :alt="'Image ' + (index + 1)" :src="multipleFiles[index].preview"
                   class="object-cover w-full h-full rounded"/>
              <div class="order-number">{{ index + 1 }}</div>
              <button class="btn-remove" @click="removeImage(index)">Remove</button>
              <div v-if="index === 0" class="featured-label">Featured</div>
            </div>
          </template>
        </draggable>

        <!-- <draggable
            v-if="multipleFiles.length > 0 && multiple && preview"
            v-model="multipleFiles"
            class="flex flex-wrap space-x-5 rtl:space-x-reverse"
            @end="updateUrls" @change="onDragChange"
        >
          <template #item="{ element, index }">
            <div class="xl:w-1/5 md:w-1/3 w-1/2 rounded mt-6 relative">
              <img :id="'image_' + (index + 1)" :alt="'Image ' + (index + 1)" :src="multipleFiles[index].preview"
                   class="object-cover w-full h-full rounded"/>
              <div class="order-number">{{ index + 1 }}</div>
              <button class="btn-remove" @click="removeImage(index)">Remove</button>
              <div v-if="index === 0" class="featured-label">Featured</div>
            </div>
          </template>
        </draggable> -->
      </label>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "Fileinput",
  components: {draggable},
  props: {
    name: {type: String, default: "name"},
    multiple: {type: Boolean, default: false},
    preview: {type: Boolean, default: false},
    placeholder: {type: String, default: "Choose a file or drop it here..."},
    label: {type: String, default: "Browse"},
    classInput: {type: String, default: ""},
    filenametag: {type: Boolean, default: false},
  },
  data() {
    return {
      selectedFile: null,
      url: null,
      multipleFiles: [],
    };
  },
  methods: {
    onChange(e) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

      if (this.multiple) {
        this.multipleFiles = this.multipleFiles.concat(newFiles);
      } else {
        this.selectedFile = newFiles[0].file;
        this.url = newFiles[0].preview;
      }

      this.$emit("input", this.multiple ? this.multipleFiles.map(f => f.file) : this.selectedFile);
    },
    removeSingleImage() {
      this.selectedFile = null;
      this.url = null;
      this.$emit("input", null);
    },
    removeImage(index) {
      this.multipleFiles.splice(index, 1);
      this.$emit("input", this.multipleFiles.map(f => f.file));
    },
    updateUrls() {
      this.multipleFiles = this.multipleFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file.file)
      }));
    },
    onDragChange() {
      this.$emit("input", this.multipleFiles.map(f => f.file));
    }
  },
};
</script>

<style lang="scss">
.file-control {
  @apply bg-transparent dark:bg-slate-900 dark:text-white transition duration-300 ease-in-out border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-900 focus:outline-none focus:ring-opacity-90 rounded text-sm ltr:pl-3 rtl:pr-3 placeholder:font-normal;
}

.badge-title {
  @apply bg-slate-900 text-white px-2 py-[3px] rounded text-sm;
}

.btn-remove {
  @apply absolute top-2 right-2 bg-red-500 text-white rounded p-1 cursor-pointer;
}

.order-number {
  @apply absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center;
}

.featured-label {
  @apply absolute bottom-2 left-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs;
}
</style>
