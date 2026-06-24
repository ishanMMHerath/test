<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <div class="xl:col-span-2">
      <Card title="Labels">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
              label="Labels Name"
              name="Labels"
              type="text"
              placeholder="Labels Name"
              v-model="label_name"
          />

          <!--          <Select label="Country" name="hmi_country" />-->
          <div class="space-y-5 flex  items-end">
            <!--            <Checkbox label="Remember me" />-->
            <Button text="Submit" @click="saveFeatureCategory" btnClass="btn-dark"/>
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
import Swal from "sweetalert2";
import {useRoute} from "vue-router";

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
    const label_name = ref(null);
    const description = ref(null);
    const label_id = ref('');

    const {handleSubmit} = useForm({
      initialValues: {
        links: ["https://github.com/logaretm"],
      },
    });

    const saveFeatureCategory = handleSubmit(async () => {
      const obj = {
        "name": label_name.value,
        "status": 1
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`vehicle-label/edit/` + label_id.value, obj, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );
        console.log(response);

        if (response.status === 200) {

          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'label updated success...',
          });
          router.push('/app/list-label');
        } else {

          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'label create unsuccessfully',
          });
        }

      } catch (e) {
        console.error(e);

        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'sections create unsuccessfully',
        });
      }

    });
    const getLabelById = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`vehicle-label/get-by-id/` + id, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );

        if (response.status === 200) {
          console.log(response.data);
          label_name.value = response.data.name;
        }

      } catch (e) {
        console.error(e);
      }
    };

    onMounted(() => {
      const route = useRoute();
      label_id.value = route.params.id;
      getLabelById(route.params.id);
      console.log('Component mounted, fetching feature categories...');
    });
    return {
      label_name,
      description,
      toast,
      saveFeatureCategory,
      getLabelById,
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
