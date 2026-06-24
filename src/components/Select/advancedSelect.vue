<template>
    <div class="relative w-full" ref="dropdownContainer">
        <!-- Label -->


        <label class="inline-block input-label" for="dropdown">
            Accessories<span style="color: red"></span></label>

        <!-- Selected Items Displayed Below -->
        <div v-if="selectedOptions.length > 0" class="mb-2 mt-1 flex flex-wrap gap-2">
            <div v-for="(option,index) in selectedOptions" :key="index"
                class="flex items-center bg-slate-200 text-black rounded-md px-3 py-1 text-sm">

                <img :alt="option.name" width="30" class="rounded-full inline-block mr-2"
                    :src="`https://api.yokodrive.com/car_backend/public/accessories_images/${option.images.find(image => image.is_featured === 1)?.name}`" />

                {{ option.name }}
                <button class="ml-2 text-black hover:text-white" @click="removeOption(option)">
                    &times;
                </button>
            </div>
        </div>

        <!-- Input Box -->
        <div id="dropdown"
            class="border text-sm border-gray-300 bg-white rounded-md px-3 py-2 cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            @click="toggleDropdown" ref="dropdownInput">
            <span v-if="selectedOptions.length === 0" class="text-gray-400">Select an option</span>
            <span v-else class="text-gray-700">Select Accessory</span>
        </div>

        <!-- Dropdown -->
        <div v-if="isOpen" class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <!-- Search Input -->
            <input type="text" v-model="searchTerm" placeholder="Search..."
                class="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500" />

            <!-- Options -->
            <ul class="max-h-40 overflow-y-auto">
                <li v-for="option in filteredOptions" :key="option.id"
                    class="px-3 flex gap-6 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                    :class="{ 'bg-indigo-100': isSelected(option) }" @click="selectOption(option)">
                    <span>
                        <img :alt="option.name" width="40" height="120" class="rounded-full"
                            :src="`https://api.yokodrive.com/car_backend/public/accessories_images/${option.images.find(image => image.is_featured === 1)?.name}`" />

                    </span> {{ option.name }}
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import { onUpdated } from 'vue';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

export default {
    name: 'AdvancedSelect',
    props: {
        items: {
            type: Array,
            required: true,
            default: () => [],
        },
        modelValue: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const isOpen = ref(false);
        const searchTerm = ref('');
        const dropdownContainer = ref(null);
        const dropdownInput = ref(null);
        const skipInitialWatch = ref(true);

        // Initialize selected options with the parent value
        const selectedOptions = ref(props.modelValue);



        // onMounted(() => {
        //     skipInitialWatch.value = false;
        //     console.log("props", props.modelValue)
        // })

        // Watch selectedOptions and emit updates to the parent
        // onUpdated(()=>{
        //     selectedOptions.value = props.modelValue  
        // })
     
        watch(selectedOptions, (newValue) => {
        

            emit('update:modelValue', newValue);
        });

        // Toggle dropdown visibility
        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
        };

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
                isOpen.value = false;
            }
        };

        // Autofocus on dropdown input
        onMounted(() => {
            dropdownInput.value?.focus();
            document.addEventListener('click', handleClickOutside);
        });

        // Remove event listener on unmount
        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        // Filter options based on search term
        const filteredOptions = computed(() => {
            return props.items.filter(option =>
                option.name.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        });

        // Select an option
        const selectOption = (option) => {
            if (!isSelected(option)) {
          
                selectedOptions.value.push(option);
         

            }
        };

        // Remove a selected option
        const removeOption = (option) => {
            selectedOptions.value = selectedOptions.value.filter(
                selected => selected.name !== option.name
            );
        };

        // Check if an option is selected
        const isSelected = (option) => {
            return selectedOptions.value.some(selected =>
                selected.name === option.name);
        };

        return {
            isOpen,
            selectedOptions,
            searchTerm,
            filteredOptions,
            toggleDropdown,
            selectOption,
            removeOption,
            isSelected,
            dropdownContainer,
            dropdownInput,
        };
    },
};
</script>
