<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <div class="xl:col-span-2">
      <Card title="Addon">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
              label="Addon Name"
              name="addon_name"
              type="text"
              placeholder="addon Name"
              v-model="addon_name"
          />

          <Textinput
              label="Description"
              name="description"
              type="text"
              placeholder="Description"
              v-model="description"
          />


          <!--          <Select label="Country" name="hmi_country" />-->
          <div class="space-y-5 flex  items-end">
            <!--            <Checkbox label="Remember me" />-->
            <Button text="Submit" @click="saveAddon" btnClass="btn-dark"/>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Horizental from "../../forms/input-layout/Horizental.vue";
import HorizentalIcon from "../../forms/input-layout/HorizentalIcon";
import Vertical from "../../forms/input-layout/Vertical";
import VerticalIcon from "../../forms/input-layout/VerticalIcon";
import MultipuleCloumn from "../../forms/input-layout/MultipuleCloumn";
import Button from "@/components/Button/index.vue";
import Checkbox from "@/components/Checkbox/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import InputGroup from "@/components/InputGroup/index.vue";
import Select from "@/components/Select/index.vue";
import {useToast} from "vue-toastification";
import {onMounted, ref} from "vue";
import {useFieldArray, useForm} from "vee-validate";
import axios from "@/store/axios";

export default {
  components: {
    Select,
    InputGroup,
    Textinput, Checkbox, Button,
    Card,
    Horizental,
    HorizentalIcon,
    Vertical,
    VerticalIcon,
    MultipuleCloumn,
  },
  setup() {
    const toast = useToast();
    const addon_name = ref(null);
    const description = ref(null);

    const {handleSubmit} = useForm({
      initialValues: {
        links: ["https://github.com/logaretm"],
      },
    });

    const saveAddon = handleSubmit(async () => {

      const obj = {
        "name": addon_name.value,
        "description": description.value,
        "status": true
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`addon/save`, obj, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );

        if (response.status === 201) {
          toast.success("addon create successfully", {
            timeout: 2000,
          });
        } else {
          toast.error("addon create unsuccessfully.", {
            timeout: 2000,
          });
        }

      } catch (e) {
        console.error(e);
        toast.error("addon create unsuccessfully.", {
          timeout: 2000,
        });
      }

    });

    // const getAllFeatureCategoryList = handleSubmit(async () => {
    //   try {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.get(`http://127.0.0.1:8000/api/feature-categories-masters/getAll`, {
    //           headers: {
    //             "Authorization": `Bearer ${token}`
    //           }
    //         }
    //     );
    //     console.log(response);
    //   } catch (e) {
    //
    //   }
    // });

    onMounted(() => {
      console.log('Component mounted, fetching feature categories...');
      // getAllFeatureCategoryList();
    });
    return {
      addon_name,
      description,
      toast,
      saveAddon,
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
