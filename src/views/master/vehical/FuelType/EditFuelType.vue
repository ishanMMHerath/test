<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="fuel Information">
          <div class="space-y-4">
            <Textinput
              label="fuel Name"
              name="fuel_name"
             
              type="text"
              v-model="fuelName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label="fuel Description"
              name="fuel_description"
              placeholder="Description"
              v-model="fuelDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="editfuel"
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
      const fuelName = ref("");
      const fuelId = ref(0);
      const fuelDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const editfuel = async () => {
        console.log("edited", fuelDesc.value, fuelName.value);
        if (fuelName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
          fuels_id: fuelId.value,
          name: fuelName.value,
          description: fuelDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `fuel-type/edit/${fuelId.value}`,
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
  
           router.push({name:'list-fuel-type'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetchfuelDetails = async (id) => {
          const response = await axios.get(`fuel-type/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const fuels = response.data;
          const fuel = fuels.filter((item)=>item.fuel_types_id === id)[0];
          console.log(fuel);
  
      
          fuelName.value = fuel.name;
          fuelId.value = fuel.fuel_types_id;
          fuelDesc.value = fuel.description;
          status.value = fuel.status;
          loaded.value = true;
        };
  
       fetchfuelDetails(id);
      });
  
      return {
        fuelName,
        fuelId,
        fuelDesc,
        editfuel,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  