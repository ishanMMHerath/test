<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Year Information">
          <div class="space-y-4">
            <Textinput
              label="year Name"
              name="year_name"
             
              type="text"
              v-model="yearName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label="year Description"
              name="year_description"
              placeholder="Description"
              v-model="yearDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edityear"
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
      const yearName = ref("");
      const yearId = ref(0);
      const yearDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edityear = async () => {
        console.log("edited", yearDesc.value, yearName.value);
        if (yearName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
          years_id: yearId.value,
          name: yearName.value,
          description: yearDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `year/edit/${yearId.value}`,
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
  
           router.push({name:'list-year'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetchyearDetails = async (id) => {
          const response = await axios.get(`year/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const years = response.data;
          const year = years.filter((item)=>item.years_id === id)[0];
          console.log(year);
  
      
          yearName.value = year.name;
          yearId.value = year.years_id;
          yearDesc.value = year.description;
          status.value = year.status;
          loaded.value = true;
        };
  
       fetchyearDetails(id);
      });
  
      return {
        yearName,
        yearId,
        yearDesc,
        edityear,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  