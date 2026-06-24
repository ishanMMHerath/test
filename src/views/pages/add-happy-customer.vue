<script setup>
import axios from '@/store/axios';
import { ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

import Card from "@/components/Card";
import Button from "@/components/Button/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import Swal from 'sweetalert2';

// Form state


const uploadedImage = ref(null); // Reactive ref for the newly uploaded image
const router = useRouter();

// Validation schema
const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    file: yup
    .mixed()
    .required("File is required")
    .test("fileRequired", "File is required", (value) => {
      // Ensure the file is provided
      console.log(value);
      return value;
    }),

});

// Initialize the form
const { handleSubmit, resetForm, errors } = useForm({
    validationSchema,
});

// Field bindings
const { value: name } = useField('name');
const { value: file, setValue: setFile } = useField('file'); // Bind the file input

// const { value: subname } = useField('subname');
// const { value: status } = useField('status');


// Handle file input change
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadedImage.value = URL.createObjectURL(file); // Create a preview URL for the image
        setFile( uploadedImage.value); // Update the `file` field value with the selected files
    }
};



// Handle form submission
const onSubmit = handleSubmit(async (values) => {

    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('status', 0);

    // // If a file is uploaded, append it to the FormData object
    if (uploadedImage.value) {
        //  console.log(uploadedImage.value.files[0])
        // // const fileInput = document.getElementById('fileInput1');
        formData.append('image', uploadedImage.value.files[0]); // Attach the uploaded file
    }
  

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("happy-customer/save", formData, {
            headers: {

                "Content-Type": "multipart/form-data", // Important for file uploads
                "Authorization": `Bearer ${token}`,
            },

        });

        if (response.status === 201) {
            console.log(response)
            await Swal.fire({
                icon: 'success',
                name: 'Success',
                text: "Happy Customer Added",
            });
           router.push({ name: "happy-customers" }); // Redirect to body type list
        }

        else {
            await Swal.fire({
                icon: 'error',
                name: 'Error',
                text: response.data.message,
            });
        }

    }
    catch (error) {
        console.error("Error updating the popup:", error);
        alert("An error occurred while Adding the Happy Customer");
    }

});


</script>

<template>
    <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">

        <div class="xl:col-span-2">
            <Card name="Popup Details">
                <form @submit.prevent="onSubmit" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <!-- name Input -->
                    <Textinput placeholder="Name" label="name" v-model="name" name="name" type="text" :error="errors.name" />

          

                    <!-- Image Upload Desktop -->
                    <div class="formGroup relative row-start-2">
                        <label class="inline-block input-label" for="fileInput2">Image</label>
                        <input ref="uploadedImage" id="fileInput2" type="file" accept="image/*" @change="handleFileChange"
                            class="input-control block w-full p-[10px]" />
                        <div class="mt-3">
                            <!-- Current Image -->
    
                            <!-- Uploaded Image Preview -->
                            <div v-if="uploadedImage" class="mt-2">
                                <label class="text-sm">Uploaded Image Preview:</label>
                                <img :src="file" alt="Preview" class="max-h-32 rounded-md" />
                            </div>
                        </div>
                        <p class="mt-2 text-danger-500 block text-sm">{{ errors.file }}</p>
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