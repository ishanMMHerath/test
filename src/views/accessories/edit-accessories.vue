<template>
    <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <div class="xl:col-span-2">
            <Card title="Accessories Details">
                <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    <Textinput label="Accessory Name" v-model="accessory_name" name="name" type="text"
                        placeholder="Accessory Name" />
                    <!--          <Textinput-->
                    <!--              label="Image"-->
                    <!--              v-model="form.video"-->
                    <!--              name="video"-->
                    <!--              type="file"-->
                    <!--              placeholder="Video"-->
                    <!--          />-->
                    <Textinput label="Regular Price" v-model="product_price" name="product_price" type="number"
                        placeholder="Regular Price" />
                    <Textinput label="Installation Price" v-model="installation_price" name="installation_price"
                        type="number" placeholder="Installation Price" />
                    <Textinput label="Sales Price" v-model="unit_price" name="unit_price" type="number"
                        placeholder="Sales Price" />
                    <Textinput label="Note" v-model="note" name="note" type="textarea" placeholder="Note" />
                    <Textinput label="Inventory Status" v-model="inventory_status" name="inventory_status" type="text"
                        placeholder="Inventory Status" />


                </div>
                <div class="xl:col-span-2">
                    <Card title="Image upload ">

                        <div>

                            <draggable v-model="images_arr" class="image-grid" @end="updateUrls">
                                <template v-slot:item="{ element, index }">
                                    <div class="flex flex-wrap space-x-5 rtl:space-x-reverse gap-4">
                                        <img class="w-[300px]" :src="element.name" alt="Uploaded image" />
                                        <div
                                            style=" position: absolute;margin-top: 0.3%;display: flex;height: 1.5rem;width: 1.5rem;align-items: center;justify-content: center;border-radius: 9999px;--tw-bg-opacity: 1;background-color: rgb(59 130 246 / var(--tw-bg-opacity));--tw-text-opacity: 1;color: rgb(255 255 255 / var(--tw-text-opacity));">
                                            {{ index + 1 }}
                                        </div>

                                        <button style="position: absolute;margin-top: 0.3%;margin-left: 13%;cursor: pointer;border-radius: 0.25rem;--tw-bg-opacity: 1;background-color: rgb(239 68 68 / var(--tw-bg-opacity)); padding: 0.25rem;--tw-text-opacity: 1;
                    color: rgb(255 255 255 / var(--tw-text-opacity));" @click="removeImage(index)">Remove
                                        </button>
                                        <div v-if="index === 0" style="position: absolute;margin-top: 12%;border-radius: 9999px;--tw-bg-opacity: 1;background-color: rgb(34 197 94 / var(--tw-bg-opacity)); padding-left: 0.5rem;padding-right: 0.5rem;padding-top: 0.25rem;padding-bottom: 0.25rem;font-size: 0.75rem;line-height: 1rem;--tw-text-opacity: 1;color: rgb(255 255 255 / var(--tw-text-opacity));
                }">Featured
                                        </div>
                                    </div>
                                </template>
                            </draggable>


                        </div>
                        <Fileinput multiple preview name="mulpreview" @input="handleFiles" />
                    </Card>
                </div>
                <div class="row">
                    <div class="text-right" style="margin-top: 10px">
                        <Button style="background-color: #d8bb4f; color: #065591" @click="saveMasterDetail"
                            text="Edit Accesories" btnClass="btn-success rounded-[999px]" type="submit"></Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import Card from "@/components/Card";
import Button from "@/components/Button/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import axios from "@/store/axios";
import Swal from "sweetalert2";
import router from "@/router";
import Fileinput from "@/components/Fileinput/index.vue";
import { ref, onMounted } from "vue";
import { useForm } from "vee-validate"; // Make sure this path is correct
import { useRoute } from "vue-router";
import draggable from 'vuedraggable';
import { useDropzone } from "vue3-dropzone"; // Assuming axios is imported from the correct path
import DropZoneVue from "@/views/forms/file-input/DropZone.vue";


export default {
    components: {
        Fileinput,
        Textinput,
        Button,
        Card,
        draggable,
        DropZoneVue,

    },
    data() {
        return {
            form: {
                name: "",
                video: "",
                product_price: "",
                installation_price: "",
                unit_price: "",
                note: "",
                inventory_status: "",
                status: true,
                created_by: 1,
                updated_by: 1,
            },
        };
    },
    methods: {
        // async saveMasterDetail() {
        //   // Validation
        //   if (
        //       !this.form.name ||
        //       !this.form.product_price ||
        //       !this.form.installation_price ||
        //       !this.form.unit_price ||
        //       !this.form.inventory_status
        //   ) {
        //     await Swal.fire({
        //       icon: 'error',
        //       title: 'Error',
        //       text: 'Please fill out all required fields',
        //     });
        //     return;
        //   }
        //
        //   const formData = new FormData();
        //   for (const key in this.form) {
        //     if (this.form.hasOwnProperty(key)) {
        //       formData.append(key, this.form[key]);
        //     }
        //   }
        //
        //   try {
        //     const response = await axios.post("accessories/save", formData);
        //     if (response.status === 201) {
        //       await Swal.fire({
        //         icon: 'success',
        //         title: 'Success',
        //         text: response.data.message,
        //       });
        //       await router.push('/app/list-accessories'); // Redirect to accessories list
        //     } else {
        //       await Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: response.data.message,
        //       });
        //     }
        //   } catch (error) {
        //     await Swal.fire({
        //       icon: 'error',
        //       title: 'Error',
        //       text: error.message || 'An error occurred while saving the accessory',
        //     });
        //   }
        // },
    },
    setup() {

        const accessory_name = ref('');
        const product_price = ref(null);
        const installation_price = ref(null);
        const unit_price = ref(null);
        const note = ref(null);
        const inventory_status = ref(null);
        const pictures = ref([]);
        const images_arr = ref([]);
        const assecoryId = ref(null)


        // Load Vehicle  
        onMounted(() => {

            // Getting the ID
            const route = useRoute();


            getAccessoriesData(route.params.id);
            assecoryId.value = route.params.id;


        });


        async function getAccessoriesData(id) {

            console.log("Run funciton")
            try {

                const token = localStorage.getItem("token");
                const response = await axios.get(`accessories/get-by-id/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const accessory = (response.data);

                accessory_name.value = accessory.name;
                product_price.value = accessory.regular_price; // product price change to regular price 
                installation_price.value = accessory.installation_price;
                unit_price.value = accessory.sales_price; // unit price change to sales price
                inventory_status.value = accessory.inventory_status;
                note.value = accessory.note;
                // pictures.value = accessory.images;


                accessory.images.forEach(image => {
                    // const image_url = "http://localhost:8000/storage/images/" + image.name;
                    //ulr = https://yoko.seoagency.vip/yoko_driver_api/public/accessories_images/  
                    const image_url = "https://api.yokodrive.com/car_backend/public/accessories_images/" + image.name;
                    const obj = {
                        name: image_url
                    }
                    console.log("objected", obj);
                    images_arr.value.push(obj);
                });


            } catch (e) {
                console.error('Error fetching vehicle details:', e.message);
            }

        }


        const updateUrls = (() => {
            console.log('asdads');
            // this.$emit("input", images_arr.value.map(f => f.file));
        });


        // Remove Accesories Image
        const removeImage = (async (index) => {

            const imageUrl = images_arr.value[index].name;
            const filename = imageUrl.split('/').pop();
            try {

                const obj = {
                    name: filename
                }
                const token = localStorage.getItem("token");
                                                              
                const response = await axios.post(`accessories/accessories-image-delets`, obj, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
                );
                if (response.status === 200) {
                    images_arr.value.splice(index, 1);
                }

            } catch (e) {

            }
        });


        const handleFiles = (files) => {
            pictures.value = files;
            console.log(files, pictures.value);
        };


        // const {remove, push, fields} = useFieldArray("links");
        const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });


        function onDrop(acceptFiles) {
            files.value = acceptFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
        }


        const { handleSubmit } = useForm({
            initialValues: {
                links: ["https://github.com/logaretm"],
            },
        });

        const saveMasterDetail = handleSubmit(async () => {
            pictures.value.forEach((file, index) => {
                // formData.append("image[]", file);
                // formData.append(`image_order[${index}]`, index + 1); // Set the image order
                // formData.append(`is_featured[${index}]`, index === 0 ? 1 : 0); // Set the first image as featured
                // console.log(file);
            });

            const obj = {
                name: accessory_name.value,
                description: "Description of the accessory",
                regular_price: Number(product_price.value),
                installation_price: Number(installation_price.value),
                sales_price: Number(unit_price.value),
                note: note.value,
                inventory_status: inventory_status.value,
                status: true,
                video: "adasd",
                created_by: 1,
                updated_by: 1
            };
            console.log(obj);
            const response = await axios.post(`accessories/edit/${assecoryId.value}`, obj);

            console.log(response);
            console.log(response.data.accessories_id);




            if (response.status === 200) {
                console.log("response run")

                if (pictures.value.length !== 0) {
                const formData = new FormData();
            
                console.log(pictures.value);
                pictures.value.forEach((file, index) => {
                    formData.append("image[]", file);
                    formData.append(`image_order[${index}]`, index + 1); // Set the image order
                    formData.append(`is_featured[${index}]`, index === 0 ? 1 : 0); // Set the first image as featured
                });



                formData.append("accessories_id", assecoryId.value);
                try {
                    const token = localStorage.getItem("token");
                    const response2 = await axios.post('image-file-upload/accessories-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${token}`
                    }
                    });

                    if (response2.status === 200) {
                    console.log(response2)
                    console.log(response)
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.data.message,
                    });
                    router.push('/app/list-accessories'); // Redirect to body type list
                    } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.message,
                    });
                    }
                } catch (e) {
                    console.log('error', e.message);
                }
                } 
                
                else {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
               //   isDisabled.value = false;
               router.push('/app/list-accessories')
               
                }

              

          }


        

            // console.log([...formData]);

            // const token = localStorage.getItem("token");
            // const response2 = await axios.post('image-file-upload/accessories-upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         "Authorization": `Bearer ${token}`
            //     }
            // });

            // if (response2.status === 200) {
            //     console.log(response2)
            //     console.log(response)
            //     await Swal.fire({
            //         icon: 'success',
            //         title: 'Success',
            //         text: response.data.message,
            //     });
            //     router.push('/app/list-accessories'); // Redirect to body type list
            // } else {
            //     await Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: response.data.message,
            //     });
            // }
        });

        return {
            handleFiles,
            pictures,
            saveMasterDetail,
            accessory_name,
            product_price,
            installation_price,
            unit_price,
            note,
            images_arr,
            inventory_status,
            updateUrls,
            removeImage,
            getRootProps, getInputProps, ...rest
        };
    },
};
</script>


<style lang="scss">
.card-auto-height3 {
    .card {
        @apply h-min;
    }
}
</style>