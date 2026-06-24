<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Transmission Information">
          <div class="space-y-4">
            <Textinput
              label="exterior color Name"
              name="transmissions _name"
             
              type="text"
              v-model="transmissionsName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label="exterior color Description"
              name="transmissions _description"
              placeholder="Description"
              v-model="transmissionsDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edit_transmissions "
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
      const transmissionsName = ref("");
      const transmissionsId = ref(0);
      const transmissionsDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edit_transmissions  = async () => {
        console.log("edited", transmissionsDesc.value, transmissionsName.value);
        if (transmissionsName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
          transmissions_id: transmissionsId.value,
          name: transmissionsName.value,
          description: transmissionsDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `transmission/edit/${transmissionsId.value}`,
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
  
           router.push({name:'list-transmission'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e.message);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetch_transmissions_details = async (id) => {
          const response = await axios.get(`transmission/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const transmissions  = response.data;
          const transmission = transmissions .filter((item)=>item.transmissions_id === id)[0];
          console.log(transmissions );
  
      
          transmissionsName.value = transmission.name;
          transmissionsId.value = transmission.transmissions_id;
          transmissionsDesc.value = transmission.description;
          status.value = transmission.status;
          loaded.value = true;
        };
  
       fetch_transmissions_details(id);
      });
  
      return {
        transmissionsName,
        transmissionsId,
        transmissionsDesc,
        edit_transmissions ,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  