<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <div class="xl:col-span-2">
      <Card title="Accessories Details">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
              label="Accessory Name"
              v-model="accessory_name"
              name="name"
              type="text"
              placeholder="Accessory Name"
          />
          <!--          <Textinput-->
          <!--              label="Image"-->
          <!--              v-model="form.video"-->
          <!--              name="video"-->
          <!--              type="file"-->
          <!--              placeholder="Video"-->
          <!--          />-->
          <Textinput
              label="Regular Price"
              v-model="product_price"
              name="product_price"
              type="number"
              placeholder="Regular Price"
          />
          <Textinput
              label="Installation Price"
              v-model="installation_price"
              name="installation_price"
              type="number"
              placeholder="Installation Price"
          />
          <Textinput
              label="Sales Price"
              v-model="unit_price"
              name="unit_price"
              type="number"
              placeholder="Sales Price"
          />
          <Textinput
              label="Note"
              v-model="note"
              name="note"
              type="textarea"
              placeholder="Note"
          />
          <Textinput
              label="Inventory Status"
              v-model="inventory_status"
              name="inventory_status"
              type="text"
              placeholder="Inventory Status"
          />
          <div class="fromGroup relative">
            <div class="from" style="margin-bottom: 3% !important; margin-top: 3% !important;">
  <span
      v-for="(item, i) in brand_value_arr"
      :key="i"
      class="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2"
  >
    {{ item.name }}
    <Icon icon="heroicons-outline:x" class="ml-2 w-4 h-4 cursor-pointer text-blue-600 hover:text-red-600"
          @click="removeBrand(item.makes_id)"/>
  </span>
            </div>

            <label class="inline-block input-label" for="feature_category">Vehicle Model/Brand <span
                style="color: red">*</span></label>
            <div class="relative">
              <div>
                <select id="vehicle_brand_id" v-model="vehicle_brand_values"
                        class="classinput input-control block w-full focus:outline-none min-h-[40px]"
                        @change="pushBrand()">
                  <option v-for="(item, i) in vehicle_brand" :key="i" :value="item.vehicle_id">{{
                      item.vehicle_name
                    }}
                  </option>
                </select>

                <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                </div>
              </div>
              <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">
              </div>
            </div>
          </div>


        </div>
        <div class="grid lg:grid-cols-3 h-[200px] mt-3 mb-[90px]">
          <div>
            <label class="ltr:inline-block rtl:block input-label">Description</label>
            <QuillEditor contentType="html" v-model:content="desc" theme="snow" height="200"/>
          </div>


        </div>

        <div class="xl:col-span-2">
          <Card title="Image upload ">
            <Fileinput multiple preview name="mulpreview" @input="handleFiles"/>
          </Card>
        </div>
        <div class="row">
          <div class="text-right" style="margin-top: 10px">
            <Button
                style="background-color: #d8bb4f; color: #065591"
                @click="saveMasterDetail"
                text="Submit"
                btnClass="btn-success rounded-[999px]"
                type="submit"
            ></Button>
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
import {onMounted, ref} from "vue";
import {useForm} from "vee-validate"; // Make sure this path is correct
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Icon from "@/components/Icon";

export default {
  components: {
    Fileinput,
    Textinput,
    Button,
    Card,
    QuillEditor,
    Icon
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
    const vehicle_brand = ref([]);
    const vehicle_brand_values = ref(null);
    const brand_value_arr = ref([]);
    const desc = ref("");


    // for (let s = 0; s < 15; s++) {
    //   const obj3 = {
    //     name: "ddddddddddddddddd"
    //   }
    //   brand_value_arr.value.push(obj3);
    // }


    const handleFiles = (files) => {
      pictures.value = files;
      console.log(files);
    };

    const {handleSubmit} = useForm({
      initialValues: {
        links: ["https://github.com/logaretm"],
      },
    });


    onMounted(() => {
      console.log('Component mounted!');
      getAllBrands();
    });


    const getAllBrands = handleSubmit(async () => {
      console.log("getAllBrands");
      const response = await axios.get("web/vehicle/get_all_vehicle_non_paginate");
      console.log(response.data);
      response.data.forEach((data) => {
        console.log(data);
        vehicle_brand.value.push(data)
      })
      console.log("vehicle_brand", vehicle_brand.value);
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
        description: desc.value,
        regular_price: Number(product_price.value),
        installation_price: Number(installation_price.value),
        sales_price: Number(unit_price.value),
        note: note.value,
        inventory_status: inventory_status.value,
        status: true,
        video: "adasd",
        created_by: 1,
        updated_by: 1,
        vehicle_array: brand_value_arr.value
      };
      console.log(obj);
      console.log(brand_value_arr.value);
      const response = await axios.post("accessories/save", obj);

      console.log(response);
      console.log(response.data.accessories_id);

      const formData = new FormData();
      pictures.value.forEach((file, index) => {
        formData.append("image[]", file);
        formData.append(`image_order[${index}]`, index + 1); // Set the image order
        formData.append(`is_featured[${index}]`, index === 0 ? 1 : 0); // Set the first image as featured
        console.log(file);
      });

      formData.append("accessories_id", response.data.accessories_id);

      // console.log([...formData]);

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
    });

    const changeText = (e) => {
      console.log(desc.value)
    }


    const removeBrand = ((id) => {
      console.log(id);
      const select_brand = brand_value_arr.value.find(c => c.makes_id === id);
      console.log(select_brand);
      if (select_brand) {
        const index = brand_value_arr.value.findIndex(c => c.makes_id === id);
        if (index !== -1) {
          brand_value_arr.value.splice(index, 1);
        }
      }

    });
    const pushBrand = (() => {
      const brand_arr = vehicle_brand.value.find(c => c.vehicle_id === vehicle_brand_values.value);
      let obj3 = {};
      obj3 = {
        vehicle_id: brand_arr.vehicle_id,
        name: brand_arr.vehicle_name
      }
      brand_value_arr.value.push(obj3);
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
      inventory_status,
      desc,
      changeText,
      vehicle_brand,
      brand_value_arr,
      pushBrand,
      getAllBrands,
      vehicle_brand_values,
      removeBrand
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
