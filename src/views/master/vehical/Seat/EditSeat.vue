<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Body Types Information">
          <div class="space-y-4">
            <Textinput
              label=" Name"
              name="seats_name"
             
              type="text"
              v-model="seatsName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label=" Description"
              name="seatss_description"
              placeholder="Description"
              v-model="seatsDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edit_seat "
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
      const seatsName = ref("");
      const seatsId = ref(0);
      const seatsDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edit_seat  = async () => {
        console.log("edited", seatsDesc.value, seatsName.value);
        if (seatsName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
            seats_id: seatsId.value,
          name: seatsName.value,
          description: seatsDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `seats/edit/${seatsId.value}`,
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
  
           router.push({name:'list-seat'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e.message);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetch_seatss_details = async (id) => {
          const response = await axios.get(`seats/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const seats  = response.data;
          const seat = seats.filter((item)=>item.seats_id === id)[0];
          console.log(seats );
  
      
          seatsName.value = seat.name;
          seatsId.value = seat.seats_id;
          seatsDesc.value = seat.description;
          status.value = seat.status;
          loaded.value = true;
        };
  
       fetch_seatss_details(id);
      });
  
      return {
        seatsName,
        seatsId,
        seatsDesc,
        edit_seat ,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  