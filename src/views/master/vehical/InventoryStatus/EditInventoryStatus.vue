<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="inventory status Information">
          <div class="space-y-4">
            <Textinput
              label=" Name"
              name="inventory_statuses_name"
             
              type="text"
              v-model="inventory_statusesName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label=" Description"
              name="inventory_statusess _description"
              placeholder="Description"
              v-model="inventory_statusesDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edit_inventory_statuses "
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
      const inventory_statusesName = ref("");
      const inventory_statusesId = ref(0);
      const inventory_statusesDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edit_inventory_statuses  = async () => {
        console.log("edited", inventory_statusesDesc.value, inventory_statusesName.value);
        if (inventory_statusesName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
          inventory_statusess_id: inventory_statusesId.value,
          name: inventory_statusesName.value,
          description: inventory_statusesDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `inventory-status/edit/${inventory_statusesId.value}`,
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
  
           router.push({name:'list-inventory-status'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e.message);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetch_inventory_statuses_details = async (id) => {
          const response = await axios.get(`inventory-status/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const inventory_statuses  = response.data;
          const inventory_status = inventory_statuses.filter((item)=>item.inventory_statuses_id === id)[0];
          console.log(inventory_statuses );
  
      
          inventory_statusesName.value = inventory_status.name;
          inventory_statusesId.value = inventory_status.inventory_statuses_id;
          inventory_statusesDesc.value = inventory_status.description;
          status.value = inventory_status.status;
          loaded.value = true;
        };
  
       fetch_inventory_statuses_details(id);
      });
  
      return {
        inventory_statusesName,
        inventory_statusesId,
        inventory_statusesDesc,
        edit_inventory_statuses ,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  