<script setup>
import axios from '@/store/axios';
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

import Card from "@/components/Card";
import Button from "@/components/Button/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import Swal from 'sweetalert2';

// Form state
const route = useRoute();
const popupObj = reactive({});
const uploadedImageDesktop = ref(null); // Reactive ref for the newly uploaded image
const uploadedImageMobile = ref(null); // Reactive ref for the newly uploaded image
const router = useRouter();

// Validation schema
const validationSchema = yup.object({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    subtitle: yup.string().required("Subtitle is required"),
    status: yup.string().required("Status is required"),
});

// Initialize the form
const { handleSubmit, resetForm, errors } = useForm({
    validationSchema,
    initialValues: popupObj,
});

// Field bindings
const { value: title } = useField('title');
const { value: subtitle } = useField('subtitle');
const { value: status } = useField('status');

// Fetch the popup data
const getPopup = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`popups/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const property = response.data.data;

    property.desktop = "https://api.yokodrive.com/car_backend/public/popup/" + property.desktop;
    property.mobile  = "https://api.yokodrive.com/car_backend/public/popup/" + property.mobile ;
  
    Object.assign(popupObj, property);
    resetForm({ values: popupObj }); // Reset the form with fetched data
};

// Handle file input change
const handleFileChangeDesk = (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadedImageDesktop.value = URL.createObjectURL(file); // Create a preview URL for the image
    }
};


const handleFileChangeMob = (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadedImageMobile.value = URL.createObjectURL(file); // Create a preview URL for the image
    }
};


// Handle form submission
const onSubmit = handleSubmit(async (values) => {

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('subtitle', values.subtitle);
    formData.append('status', values.status);
    formData.append('_method', 'PATCH'); 


    // If a file is uploaded, append it to the FormData object
    if (uploadedImageDesktop.value) {
        const fileInput = document.getElementById('fileInput1');
        formData.append('desktop', fileInput.files[0]); // Attach the uploaded file
    }
    if (uploadedImageMobile.value) {
        const fileInput = document.getElementById('fileInput2');
        formData.append('mobile', fileInput.files[0]); // Attach the uploaded file
    }

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`popups/${route.params.id}`, formData, {
            headers: {

                "Content-Type": "multipart/form-data", // Important for file uploads
                "Authorization": `Bearer ${token}`,
            },

        });

        if (response.status === 201) {
            console.log(response)
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });
            router.push({ name: "popup-list" }); // Redirect to body type list
        }

        else {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.data.message,
            });
        }

    }
    catch (error) {
        console.error("Error updating popup:", error);
        alert("An error occurred while updating the popup.");
    }

});

// Mount the popup data
onMounted(() => {
    getPopup(route.params.id);
});
</script>

<template>
    <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">

        <div class="xl:col-span-2">
            <Card title="Popup Details">
                <form @submit.prevent="onSubmit" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <!-- Title Input -->
                    <Textinput label="Title" v-model="title" name="title" type="text" :error="errors.title" />

                    <!-- Subtitle Input -->
                    <Textinput label="Subtitle" v-model="subtitle" name="subtitle" type="text"
                        :error="errors.subtitle" />

                    <!-- Status Dropdown -->
                    <!-- <div class="formGroup relative">
                        <label class="inline-block input-label" for="status">Status</label>
                        <select id="status" v-model="status" name="status"
                            class="input-control block w-full focus:outline-none min-h-[40px]">
                            <option value="inactive">Inactive</option>
                            <option value="active">Active</option>
                        </select>
                        <span class="text-red-500 text-sm">{{ errors.status }}</span>
                    </div> -->


                    <!-- Image Upload Desktop -->
                    <div class="formGroup relative row-start-2">
                        <label class="inline-block input-label" for="fileInput2">Image Mobile</label>
                        <input id="fileInput2" type="file" accept="image/*" @change="handleFileChangeMob"
                            class="input-control block w-full p-[10px]" />
                        <div class="mt-3">
                            <!-- Current Image -->
                            <div v-if="popupObj.mobile" class="mb-2">
                                <label class="text-sm">Current Image:</label>
                                <img :src="popupObj.mobile" alt="Current" class="max-h-32 rounded-md" />
                            </div>

                            <!-- Uploaded Image Preview -->
                            <div v-if="uploadedImageMobile" class="mt-2">
                                <label class="text-sm">Uploaded Image Preview:</label>
                                <img :src="uploadedImageMobile" alt="Preview" class="max-h-32 rounded-md" />
                            </div>
                        </div>
                    </div>


                    <!-- Image Upload Desl -->
                     <div class="formGroup relative row-start-2">
                            <label class="inline-block input-label" for="fileInput1">Image Desktop</label>
                            <input id="fileInput1" type="file" accept="image/*" @change="handleFileChangeDesk"
                                class="input-control block w-full p-[10px]" />
                            <div class="mt-3">
                                <!-- Current Image -->
                                <div v-if="popupObj.desktop" class="mb-2">
                                    <label class="text-sm">Current Image:</label>
                                    <img :src="popupObj.desktop" alt="Current" class="max-h-32 rounded-md" />
                                </div>
    
                                <!-- Uploaded Image Preview -->
                                <div v-if="uploadedImageDesktop" class="mt-2">
                                    <label class="text-sm">Uploaded Image Preview:</label>
                                    <img :src="uploadedImageDesktop" alt="Preview" class="max-h-32 rounded-md" />
                                </div>
                            </div>
                     </div>
    

                    <!-- Submit Button -->
                    <div class="formGroup row-start-3">
                        <Button btnClass=" btn-success rounded-[999px]" class="bg-blue-500 hover:bg-black-800 "
                            text="Update" type="submit"></Button>
                    </div>
                </form>
            </Card>
        </div>
    </div>
</template>