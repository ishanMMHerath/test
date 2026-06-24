<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <div class="xl:col-span-2">
      <Card title="Shipping">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
              v-model="addon_name"
              label="Shipping Location"
              name="addon_name"
              placeholder="Shipping Location"
              type="text"
          />

          <Textinput
              v-model="description"
              label="Shipping Amount"
              name="shipping_amount"
              placeholder="Shipping Amount"
              type="text"
          />


          <!--          <Select label="Country" name="hmi_country" />-->
          <div class="space-y-5 flex  items-end">
            <!--            <Checkbox label="Remember me" />-->
            <Button btnClass="btn-dark" text="Submit" @click="saveShipping"/>
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
import router from "@/router";
import {useRoute} from "vue-router";
import Swal from "sweetalert2";

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
    const shipping_id = ref(null);

    const {handleSubmit} = useForm({
      initialValues: {
        links: ["https://github.com/logaretm"],
      },
    });

    const saveShipping = handleSubmit(async () => {

      const obj = {
        "name": addon_name.value,
        "description": description.value,
        "status": true
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`shipping/edit/${shipping_id.value}`, obj, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );

        if (response.status === 201) {


          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'shipping update successfully',
            customClass: {
              confirmButton: 'swal-ok-button'
            },
          });
          router.push('/app/vehicle-shipping');
        } else {
          toast.error("shipping create unsuccessfully.", {
            timeout: 2000,
          });
        }

      } catch (e) {
        console.error(e);
        toast.error("shipping create unsuccessfully.", {
          timeout: 2000,
        });
      }

    });

    const getById = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`shipping/get-by-id/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        console.log(response);
        if (response.status === 200) {
          shipping_id.value = response.data.data.shipping_id;
          addon_name.value = response.data.data.name;
          description.value = response.data.data.description;
        }
      } catch (e) {

      }
    };

    onMounted(() => {
      const route = useRoute();
      const id = route.params.id;
      getById(id);
      console.log('Component mounted, fetching feature shipping...');
    });
    return {
      addon_name,
      description,
      toast,
      saveShipping,
      getById,
    };
  }
};
</script>
<style lang="scss">

.swal-ok-button {
  background-color: #3b82f6 !important;
  color: white !important;
  border: 2px solid #3b82f6 !important;
  border-radius: 8px !important;
  padding: 10px 20px !important;
}

.swal-ok-button:hover {
  background-color: white !important;
  color: black !important;
  border: 1px solid black !important;
  border-radius: 8px !important;
  padding: 10px 20px !important;
}
.card-auto-height3 {
  .card {
    @apply h-min;
  }
}
</style>
