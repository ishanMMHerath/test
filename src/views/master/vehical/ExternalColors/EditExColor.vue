<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="exterior colors Information">
          <div class="space-y-4">
            <Textinput
              label="exterior color Name"
              name="exterior_colors _name"
             
              type="text"
              v-model="exterior_colorName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label="exterior color Description"
              name="exterior_colors _description"
              placeholder="Description"
              v-model="exterior_colorDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edit_exterior_colors "
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
      const exterior_colorName = ref("");
      const exterior_colorId = ref(0);
      const exterior_colorDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edit_exterior_colors  = async () => {
        console.log("edited", exterior_colorDesc.value, exterior_colorName.value);
        if (exterior_colorName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
          exterior_colors_id: exterior_colorId.value,
          name: exterior_colorName.value,
          description: exterior_colorDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `exterior-color/edit/${exterior_colorId.value}`,
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
  
           router.push({name:'list-ex-color'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetch_exterior_colors_details = async (id) => {
          const response = await axios.get(`exterior-color/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const exterior_colors  = response.data;
          const exterior_color = exterior_colors .filter((item)=>item.exterior_colors_id === id)[0];
          console.log(exterior_colors );
  
      
          exterior_colorName.value = exterior_color.name;
          exterior_colorId.value = exterior_color.exterior_colors_id;
          exterior_colorDesc.value = exterior_color.description;
          status.value = exterior_color.status;
          loaded.value = true;
        };
  
       fetch_exterior_colors_details(id);
      });
  
      return {
        exterior_colorName,
        exterior_colorId,
        exterior_colorDesc,
        edit_exterior_colors ,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  