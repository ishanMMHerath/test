<template>

    <Card title="Basic Information">
      <div class="space-y-4">

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Feature
            Category</label>
          <div class="relative">
            <div>
              <select class="classinput input-control block w-full focus:outline-none min-h-[40px]"
                id="feature_category" v-model="feature_category">
                <option value="" selected>Select Options</option>
                <option v-for="(item, i) in feature_category_array" :key="i"
                  :value="item.feature_categories_masters_id">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <Textinput label="Feature Name" name="feature_name" type="text" placeholder="Feature Name"
          v-model="feature_name" />

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Feature
            Type</label>
          <div class="relative">
            <div>
              <select class="classinput input-control block w-full focus:outline-none min-h-[40px]" id="feature_type"
                @change="viewFeature()" v-model="selectedOptions">
                <option value="" selected>Select Options</option>
                <option v-for="(item, i) in featueTypeArray" :key="i" :value="item.value">{{ item.label }}</option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

      </div>
    </Card>

    <div class="xl:col-span-2" v-if="selectValue">
      <Card bodyClass="p-0">
        <header
          class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-between items-center">
          <h6 class="card-title mb-0">Features</h6>
          <div>
            <Button text="Add new" icon="heroicons-outline:plus" btnClass="btn-dark" @click="addMoreFetures" />
          </div>
        </header>
        <div class="p-6">

          <div class="lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
            v-for="(item, i) in feature_more_array" :key="i">
            <Textinput type="text" :name="`feature_name_${i}`" :id="`feature_id_${i}`" placeholder="feature" />

            <div class="flex justify-between items-end space-x-5">
              <div class="flex-none relative">
                <button type="button"
                  class="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  @click="remove(idx)">
                  <Icon icon="heroicons-outline:trash" />
                </button>
              </div>
            </div>
          </div>

          <!--            <div class="ltr:text-right rtl:text-left">-->
          <!--              <Button-->
          <!--                  text="Submit"-->
          <!--                  btnClass="btn-dark"-->
          <!--                  :isDisabled="fields.length === 0"-->
          <!--              />-->
          <!--            </div>-->
        </div>
      </Card>
    </div>
<!--    <div class="xl:col-span-2">-->
<!--      <Card>-->
<!--        <div class="row">-->
<!--          <div class="text-right flex" style="margin-top: 10px">-->
<!--            <Button style="background-color: #d8bb4f;color: #065591" @click="saveMasterDetail" text="Submit "-->
<!--              btnClass=" btn-success rounded-[999px]" type="submit"></Button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </Card>-->
<!--    </div>-->
  <div class="row">
    <Card>
      <div class="text-right" style="margin-top: 10px">
        <Button
            style="background-color: #d8bb4f; color: #065591"
            @click="saveMasterDetail"
            text="Submit"
            btnClass="btn-success rounded-[999px]"
            type="submit"
        />
      </div>
    </Card>

  </div>
</template>

<script>
import { useForm, useFieldArray } from "vee-validate";
import { onMounted, ref } from 'vue';
import Button from "@/components/Button/index.vue";
import Card from "@/components/Card/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import Icon from "@/components/Icon/index.vue";
import axios from "@/store/axios";
import VueSelect from "@/components/Select/VueSelect.vue"; // Assuming axios is imported from the correct path
import { useToast } from "vue-toastification";

export default {
  components: {
    VueSelect,
    Button,
    Card,
    Textinput,
    Icon,
  },
  setup() {
    const toast = useToast();
    const selectedOptions = ref(null);
    const feature_category = ref(null);
    const feature_name = ref(null);
    const feature_more_array = ref([]);
    const feature_category_array = ref([]);
    // const formData = ref({
    //   feature_category: "",
    //   feature_name: "",
    //   features_name: "",
    //
    // });
    const featueTypeArray = [
      { value: 'Check Box', label: 'Check Box' },
      { value: 'Select Box', label: 'Select Box' }
    ];

    const selectValue = ref(false);
    const { remove, push, fields } = useFieldArray("links");
    const { handleSubmit } = useForm({
      initialValues: {
        links: ["https://github.com/logaretm"],
      },
    });

    const viewFeature = () => {
      if (selectedOptions.value === 'Select Box') {
        selectValue.value = true;
      } else {
        selectValue.value = false
      }
      console.log(selectedOptions.value)
    };

    const saveMasterDetail = handleSubmit(async () => {
      const item_select_arr = ref([]);
      if (selectedOptions.value === "Select Box") {
        for (let i = 0; i < feature_more_array.value.length; i++) {
          let id = "feature_name_" + i;
          const element = document.getElementById(id).value;
          item_select_arr.value.push(element);
        }
      } else {

        item_select_arr.value.push("Yes", "No")
      }

      const payLoard = {
        "name": feature_name.value,
        "description": "yessdddd",
        "status": true,
        "feature_categories_masters_id": feature_category.value,
        "input_type": selectedOptions.value,
        "input_values": JSON.stringify(item_select_arr.value)

      }

      console.log(payLoard);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`features-masters/save`, payLoard, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );

        if (response.status === 201) {
          toast.success("feature create successfully", {
            timeout: 2000,
          });
        } else {
          toast.error("feature create unsuccessfully.", {
            timeout: 2000,
          });
        }

      } catch (e) {
        console.error(e);
        toast.error("feature create unsuccessfully.", {
          timeout: 2000,
        });
      }

    });

    const onSubmit = handleSubmit(() => {
      // Handle form submission logic here if needed
      // console.log('working...');

    });
    const addMoreFetures = handleSubmit(() => {
      const obj = {
        "les": 1
      };
      feature_more_array.value.push(obj);
      console.log(feature_more_array.value);
    });

    const getAllFeatureCategoryList = handleSubmit(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`feature-categories-masters/getAll`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );
        console.log(response.data)
        feature_category_array.value = response.data;
      } catch (e) {

      }
    });

    onMounted(() => {
      console.log('Component mounted, fetching feature categories...');
      getAllFeatureCategoryList();
    });

    return {
      onSubmit,
      remove,
      push,
      fields,
      featueTypeArray,
      viewFeature,
      selectedOptions,
      selectValue,
      saveMasterDetail,
      feature_category,
      feature_name,
      addMoreFetures,
      feature_more_array,
      getAllFeatureCategoryList,
      feature_category_array,
      options: [
        { value: '1', label: 'Yes' },
        { value: '1', label: 'No' }
      ],
      selectedOption: { value: 'yes', label: 'Yes' }
    };
  }
};
</script>

<style lang="scss">
.card-auto-height3 {
  .card {
    @apply h-min;
  }
}
</style>
