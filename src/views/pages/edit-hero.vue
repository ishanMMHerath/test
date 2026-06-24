<script setup>
import axios from '@/store/axios';
import { onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

import Card from "@/components/Card";
import Button from "@/components/Button/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import Textarea from "@/components/Textarea/index.vue";

import Swal from 'sweetalert2';

// Form state
const route = useRoute();
const heroObj = reactive({});

const heroImg1 = ref(null); // Reactive ref for the newly uploaded image
const heroImg2 = ref(null); // Reactive ref for the newly uploaded image
const heroImg3 = ref(null); // Reactive ref for the newly uploaded image

const router = useRouter();

// Validation schema
const validationSchema = yup.object({
    title: yup.string().required("Required").min(3, "Title must be at least 3 characters"),
    sub_title: yup.string().required("required"),
    sales_stats_count: yup.string().required("required"),
    customer_stats_count: yup.string().required("required"),

});

// Initialize the form
const { handleSubmit, resetForm, errors } = useForm({
    validationSchema,
    initialValues: heroObj,
});

// Field bindings
const { value: sales_stats_count } = useField('sales_stats_count');
const { value: sub_title } = useField('sub_title');
const { value: title } = useField('title');
const { value: customer_stats_count } = useField('customer_stats_count');


/*
    image1 	image2 	image3 	title 	sub_title 	customer_stats_count 	sales_stats_count 	status
*/

// Fetch the popup data
const getHero = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`hero/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const hero = response.data



    hero.image1 = "https://api.yokodrive.com/car_backend/public/hero/" + hero.image1;
    hero.image2 = "https://api.yokodrive.com/car_backend/public/hero/" + hero.image2;
    hero.image3 = "https://api.yokodrive.com/car_backend/public/hero/" + hero.image3;


    Object.assign(heroObj, hero);

    resetForm({ values: heroObj }); // Reset the form with fetched data
};

// Handle file input change
const handleImage1Change = (event) => {
    const file = event.target.files[0];
    if (file) {
        heroImg1.value = URL.createObjectURL(file); // Create a preview URL for the image
    }
};

const handleImage2Change = (event) => {
    const file = event.target.files[0];
    if (file) {
        heroImg2.value = URL.createObjectURL(file); // Create a preview URL for the image
    }
};


const handleImage3Change = (event) => {
    const file = event.target.files[0];
    if (file) {
        heroImg3.value = URL.createObjectURL(file); // Create a preview URL for the image
    }
};


// Handle form submission
const onSubmit = handleSubmit(async (values) => {

    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('sub_title', values.sub_title);
    formData.append('customer_stats_count', values.customer_stats_count);
    formData.append('sales_stats_count', values.sales_stats_count);    
    formData.append('_method', 'POST');


    // If a file is uploaded, append it to the FormData object
    if (heroImg1.value) {
        const fileInput = document.getElementById('fileInput1');
        formData.append('image1', fileInput.files[0]); // Attach the uploaded file
    }

    if (heroImg2.value) {
        const fileInput = document.getElementById('fileInput2');
        formData.append('image2', fileInput.files[0]); // Attach the uploaded file
    }

    if (heroImg3.value) {
        const fileInput = document.getElementById('fileInput3');
        formData.append('image3', fileInput.files[0]); // Attach the uploaded file
    }


    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`hero/update/${route.params.id}`, formData, {
            headers: {

                "Content-Type": "multipart/form-data", // Important for file uploads
                "Authorization": `Bearer ${token}`,
            },

        });

        if (response.status === 201) {
            console.log(response)
            await Swal.fire({
                icon: 'success',
                title: 'Success : Updated Hero Information',
                text: response.data.message,
            });
            router.push({ name: "hero-section" }); // Redirect to body type list
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
    getHero(route.params.id);
});
</script>

<template>
    <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">

        <div class="xl:col-span-2">
            <Card title="Edit Hero Details">
                <form @submit.prevent="onSubmit" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <!-- Title Input -->
                    <Textarea label="Title" rows="5" v-model="title" name="title" type="text" :error="errors.title" >

                    </Textarea>

                    <!-- Subtitle Input -->
                    <Textarea label="Subtitle" rows="5" v-model="sub_title" name="sub_title" type="text"
                        :error="errors.sub_title"></Textarea>

                    <Textinput label="Customer Stats Count" v-model="customer_stats_count" name="customer_stats_count" type="text"
                        :error="errors.customer_stats_count" />


                    <Textinput label="Sales Stats Count" v-model="sales_stats_count" name="sales_stats_count" type="text"
                        :error="errors.sales_stats_count" />

                    <!-- Image Upload -->
                    <div class="formGroup relative row-start-3">
                        <label class="inline-block input-label" for="fileInput">Slide Image 1</label>
                        <input id="fileInput1" type="file" accept="image/*" @change="handleImage1Change"
                            class="input-control block w-full p-[10px]" />
                        <div class="mt-3">
                            <!-- Current Image -->
                            <div v-if="heroObj.image1" class="mb-2">
                                <label class="text-sm">Current Image:</label>
                                <img :src="heroObj.image1" alt="Current" class="max-h-32 rounded-md" />
                            </div>

                            <!-- Uploaded Image Preview -->
                            <div v-if="heroImg1" class="mt-2">
                                <label class="text-sm">Uploaded Image Preview:</label>
                                <img :src="heroImg1" alt="Preview" class="max-h-32 rounded-md" />
                            </div>
                        </div>
                    </div>


                    <!-- Image Upload -->
                    <div class="formGroup relative row-start-3">
                        <label class="inline-block input-label" for="fileInput">Slide Image 2</label>
                        <input id="fileInput2" type="file" accept="image/*" @change="handleImage2Change"
                            class="input-control block w-full p-[10px]" />
                        <div class="mt-3">
                            <!-- Current Image -->
                            <div v-if="heroObj.image2" class="mb-2">
                                <label class="text-sm">Current Image:</label>
                                <img :src="heroObj.image2" alt="Current" class="max-h-32 rounded-md" />
                            </div>

                            <!-- Uploaded Image Preview -->
                            <div v-if="heroImg2" class="mt-2">
                                <label class="text-sm">Uploaded Image Preview:</label>
                                <img :src="heroImg2" alt="Preview" class="max-h-32 rounded-md" />
                            </div>
                        </div>
                    </div>



                    <!-- Image Upload -->
                    <div class="formGroup relative row-start-3">
                        <label class="inline-block input-label" for="fileInput">Slide Image 3</label>
                        <input id="fileInput3" type="file" accept="image/*" @change="handleImage3Change"
                            class="input-control block w-full p-[10px]" />
                        <div class="mt-3">
                            <!-- Current Image -->
                            <div v-if="heroObj.image3" class="mb-2">
                                <label class="text-sm">Current Image:</label>
                                <img :src="heroObj.image3" alt="Current" class="max-h-32 rounded-md" />
                            </div>

                            <!-- Uploaded Image Preview -->
                            <div v-if="heroImg3" class="mt-2">
                                <label class="text-sm">Uploaded Image Preview:</label>
                                <img :src="heroImg3" alt="Preview" class="max-h-32 rounded-md" />
                            </div>
                        </div>
                    </div>


                    <!-- Submit Button -->
                    <div class="formGroup row-start-4">
                        <Button btnClass=" btn-success rounded-[999px]" class="bg-blue-500 hover:bg-black-800 "
                            text="Update" type="submit"></Button>
                    </div>
                </form>
            </Card>
        </div>
    </div>
</template>