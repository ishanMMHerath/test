<template>
  <div>
    <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Make Information">
        <div class="space-y-4">
          <Textinput
            label="Vehicle Name"
            name="vehicle_name"
          
            type="text"
            v-model="makeName"
            placeholder="Vehicle Name"
          />

          <Textarea
            label="Description"
            name="description"
            placeholder="Description"
            v-model="makeDesc"
          />
        </div>

        <div class="text-right" style="margin-top: 10px">
          <Button
            class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
            @click="editMake"
            text="Submit"
            btnClass=" btn-success rounded  "
            type="submit"
            >Edit</Button
          >
        </div>
      </Card>
    </div>
    <div v-else class="text-center">Loading ...</div>
  </div>
</template>
<script>
import Textinput from "@/components/Textinput/index.vue";
import Textarea from "@/components/Textarea/index.vue";
import Card from "@/components/Card";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/store/axios";
import Button from "@/components/Button/index.vue";
import Swal from "sweetalert2";

export default {
  components: {
    Textarea,
    Textinput,
    Card,
  },
  setup() {
    const makeName = ref("");
    const hasNameError = ref(false);
    const makeId = ref(0);
    const makeDesc = ref(0);
    const loaded = ref(false);
    const status = ref();

    const router = useRouter();

    const editMake = async () => {
      console.log("edited", makeDesc.value, makeName.value);
      if (makeName.value === "") {
        await Swal.fire({
          icon: "warning",
          title: "Error",
          text: "Name is is Required",
        });

        return;
      }

      // Note Empty send the request
      const pay_loard = {
        makes_id: makeId.value,
        name: makeName.value,
        description: makeDesc.value,
        status:status.value
      };

      try {
        const token = localStorage.getItem("token");
        // console.log(vehicle_ids.value);
        const response = await axios.post(
          `makes/edit/${makeId.value}`,
          pay_loard,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('res',response);

        if(response.status === 201) {
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text:response.data.message,
          });

         router.push({name:'list-make'}); // Redirect to body type list
        }
       
      } catch (e) {
          console.log(e);
      }

    
    };

    onMounted(() => {
      const route = useRoute();
      let id = route.params.id;

      const token = localStorage.getItem("token");
      const fetchMakeDetails = async (id) => {
        const response = await axios.get(`makes/get-make/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const makeData = response.data;
    
        makeName.value = makeData.data.name;
        makeId.value = makeData.data.makes_id;
        makeDesc.value = makeData.data.description;
        status.value = makeData.data.status;
        loaded.value = true;
      };

      fetchMakeDetails(id);
    });

    return {
      makeName,
      makeId,
      makeDesc,
      editMake,
      loaded,
    };
  },
};
</script>
<style></style>
