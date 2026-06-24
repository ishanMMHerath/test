<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <div class="xl:col-span-2">
      <Card title="Sections">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
              label="Sections Name"
              name="sections_name"
              type="text"
              placeholder="Sections Name"
              v-model="sections_name"
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
    const sections_name = ref(null);
    const description = ref(null);
    const sections_id = ref("");

    const {handleSubmit} = useForm({
      initialValues: {
        links: ["https://github.com/logaretm"],
      },
    });

    const saveFeatureCategory = handleSubmit(async () => {
      const obj = {
        "sections_name": sections_name.value,
        "status": 1
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`home-page-sections/edit/` + sections_id.value, obj, {
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
            text: 'sections create successfull',
          });
          router.push('/app/list-sections');
        } else {

          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'sections create unsuccessfully',
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

    const getSectionsHomepage = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`home-page-sections/get-by-id/` + id, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );
        sections_name.value = response.data.sections_name

      } catch (e) {
        console.error(e);
      }
    };

    onMounted(() => {
      const route = useRoute();
      sections_id.value = route.params.id;
      getSectionsHomepage(route.params.id);
      console.log('Component mounted, fetching feature categories...');
    });
    return {
      sections_name,
      description,
      toast,
      saveFeatureCategory,
      getSectionsHomepage,
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
