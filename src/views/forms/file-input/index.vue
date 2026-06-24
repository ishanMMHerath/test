<template>
  <div>
    <div class="filegroup">
      <label :for="name">
        <input
            type="file"
            @change="onChange"
            class="bg-red-400 w-full hidden"
            :id="name"
            :name="name"
            :multiple="multiple"
            :placeholder="placeholder"
            :label="label"
        />
        <div class="w-full h-[40px] file-control flex items-center" :class="`  ${classInput}`">
          <span
              v-if="!multiple"
              class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span
                v-if="selectedFile?.name"
                :class="filenametag ? ' badge-title' : 'text-slate-900 dark:text-white'"
            >{{ selectedFile?.name }}</span>
            <span v-if="!selectedFile?.name" class="text-slate-400">{{ placeholder }}</span>
          </span>

          <span
              v-if="multiple"
              class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span
                v-if="multipleurls.length > 0"
                :class="filenametag ? ' badge-title' : 'text-slate-900 dark:text-white'"
            >{{ multipleurls.length > 0 ? multipleurls.length + ' files selected' : '' }}</span>
            <span class="text-slate-400" v-if="placeholder && multipleurls.length === 0">
              {{ placeholder }}
            </span>
          </span>
          <span
              class="file-name flex-none cursor-pointer border-l px-4 border-slate-200 dark:border-slate-700 h-full inline-flex items-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-base rounded-tr rounded-br font-normal"
          >{{ label }}</span>
        </div>

        <div v-if="url && !multiple && preview" class="w-[200px] h-[200px] mx-auto mt-6">
          <img :src="url" class="w-full object-cover h-full block rounded" :alt="selectedFile?.name" />
          <button @click="removeSingleImage" class="btn-remove">Remove</button>
        </div>

        <draggable
            v-if="multipleurls.length > 0 && multiple && preview"
            v-model="multipleFiles"
            @end="updateUrls"
            class="flex flex-wrap space-x-5 rtl:space-x-reverse"
        >
          <template #item="{ element, index }">
            <div class="xl:w-1/5 md:w-1/3 w-1/2 rounded mt-6 relative">
              <img :src="multipleurls[index]" class="object-cover w-full h-full rounded" :alt="'Image ' + (index + 1)" />
              <div class="order-number">{{ index + 1 }}</div>
              <input type="checkbox" v-model="multipleFiles[index].is_featured" /> Featured
              <button @click="removeImage(index)" class="btn-remove">Remove</button>
              <div v-if="index === 0" class="featured-label">Featured</div>
            </div>
          </template>
        </draggable>
      </label>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'Fileinput',
  components: {
    draggable,
  },
  props: {
    name: {
      type: String,
      default: 'name',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Choose a file or drop it here...',
    },
    label: {
      type: String,
      default: 'Browse',
    },
    classInput: {
      type: String,
      default: '',
    },
    filenametag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedFile: null,
      url: null,
      multipleFiles: [],
      multipleurls: [],
    };
  },
  methods: {
    onChange(e) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        is_featured: false,
        order: this.multipleFiles.length + 1,
      }));

      const newUrls = newFiles.map((f) => URL.createObjectURL(f.file));

      if (this.multiple) {
        this.multipleFiles = this.multipleFiles.concat(newFiles);
        this.multipleurls = this.multipleurls.concat(newUrls);
      } else {
        this.selectedFile = newFiles[0].file;
        this.url = newUrls[0];
      }

      this.$emit('input', this.multiple ? this.multipleFiles : this.selectedFile);
    },
    removeSingleImage() {
      this.selectedFile = null;
      this.url = null;
      this.$emit('input', this.selectedFile);
    },
    removeImage(index) {
      this.multipleFiles.splice(index, 1);
      this.multipleurls.splice(index, 1);
      this.$emit('input', this.multipleFiles);
    },
    updateUrls() {
      this.multipleurls = this.multipleFiles.map((f) => URL.createObjectURL(f.file));
    },
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
