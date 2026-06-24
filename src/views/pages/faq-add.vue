<script setup>
import axios from '@/store/axios';
import { ref ,onBeforeMount, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

import Card from "@/components/Card";
import Button from "@/components/Button/index.vue";
import Swal from 'sweetalert2';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import Select from "@/components/Select/index.vue";




// Form state
const router = useRouter();
const pageOptions = ref(null);
const pageId = ref(null);

// Validation schema
const validationSchema = yup.object({
    question: yup.string().required("Question is required").min(3, "question must be at least 3 characters"),
    answer: yup.string().required("Answer is required"),
    status: yup.string().required("Status is required"),
    page_id: yup.string().required("Page Name is required"),

});

// Initialize the form
const { handleSubmit, resetForm, errors } = useForm({
    validationSchema,

});

// Field bindings
const { value: question } = useField('question');
const { value: answer } = useField('answer');
const { value: status } = useField('status');
const { value: page_id } = useField('page_id');


// Handle form submission
const onSubmit = handleSubmit(async (values) => {

    // const formData = new FormData();

    // formData.append('question', values.question);
    // formData.append('answer', values.answer);
    // formData.append('status', values.status);

    const body  = {
         question:values.question, 
         answer:values.answer,
         status:Number(values.status),
         page_id:values.page_id,
    }
    console.log(body);

    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`faqs/save`, body, {
            headers: {

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
            router.push({ name: "faq-list" }); // Redirect to body type list
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
        alert("An error occurred while updating the Faq.");
    }

});

const  fetchPages = async()=>{
      try {
        const response = await axios.get('pages/getall');
        console.log(response.data)
        pageOptions.value = response.data.map((page)=>{
            return {
            value: page.page_id,
            label: page.page_name,
            ...page
            }
        });
        console.log(pageOptions.value)
      } catch (error) {
        console.error('Error fetching pages:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch pages. Please try again.',
        });
      }
 }

onBeforeMount(()=>{
     fetchPages();
})

</script>

<template>
    <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">

        <div class="xl:col-span-2">
            <Card question="Popup Details">
                <form @submit.prevent="onSubmit" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <!-- question Input -->
                    <!-- <Textinput label="question" v-model="question" name="question" type="text" :error="errors.question" /> -->
                    <div class="formGroup">
                        <label class="inline-block input-label mb-2" for="qustion">Question</label>
                  

                            <div class="editor-wrapper h-[180px]">
                                <QuillEditor  contentType="html" v-model:content="question" theme="snow" height="400" />
                            </div>

                            <p class="text-red-500 text-sm mt-20">{{ errors.question }}</p>

                  
                    


                    </div>

                    <!-- answer Input -->
                    <!-- <Textinput label="answer" v-model="answer" name="answer" type="text"
                        :error="errors.answer" /> -->
                    <div class="formGroup">
                        <label class="inline-block input-label mb-2" for="answer">Answer</label>

                        <div class="editor-wrapper h-[180px]">
                                <QuillEditor contentType="html" v-model:content="answer" theme="snow" height="400" />
                       </div>
                       <p class="text-red-500 text-sm mt-20">{{ errors.answer }}</p>

                 

                    </div>

                    <div class="formGroup relative">
                        <Select
                        v-model="page_id"
                        label="Page"
                        :options="pageOptions"
                         placeholder="Select Page"
                      
                        />
                        <span class="text-red-500 text-sm">{{ errors.page_id }}</span>

                    </div>

   

                    <div class="formGroup relative mt-[20px]">
                        <label class="inline-block input-label mb-1" for="status">Status</label>
                        <select id="status" v-model="status" name="status"
                            class="input-control block w-full focus:outline-none min-h-[40px]">
                            <option  selected disabled value="">Select Status</option>
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                        </select>
                        <span class="text-red-500 text-sm">{{ errors.status }}</span>
                    </div>



                    <!-- Submit Button -->
                    <div class="formGroup row-start-3 ">
                        <Button btnClass=" btn-success rounded-[999px]" class="bg-blue-500 hover:bg-black-800 "
                            text="Add Faq" type="submit"></Button>
                    </div>
                </form>
            </Card>
        </div>
    </div>
</template>