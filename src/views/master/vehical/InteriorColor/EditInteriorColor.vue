<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="interior colors Information">
          <div class="space-y-4">
            <Textinput
              label="interior color Name"
              name="interior_colors_name"
             
              type="text"
              v-model="interior_colorName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label="interior color Description"
              name="interior_colors_description"
              placeholder="Description"
              v-model="interior_colorDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edit_interior_colors"
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
      const interior_colorName = ref("");
      const interior_colorId = ref(0);
      const interior_colorDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edit_interior_colors = async () => {
        console.log("edited", interior_colorDesc.value, interior_colorName.value);
        if (interior_colorName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
          interior_colors_id: interior_colorId.value,
          name: interior_colorName.value,
          description: interior_colorDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `interior-color/edit/${interior_colorId.value}`,
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
  
           router.push({name:'list-color'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetchinterior_colorsDetails = async (id) => {
          const response = await axios.get(`interior-color/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const interior_colors = response.data;
          const interior_color = interior_colors.filter((item)=>item.interior_colors_id === id)[0];
          console.log(interior_colors);
  
      
          interior_colorName.value = interior_color.name;
          interior_colorId.value = interior_color.interior_colors_id;
          interior_colorDesc.value = interior_color.description;
          status.value = interior_color.status;
          loaded.value = true;
        };
  
       fetchinterior_colorsDetails(id);
      });
  
      return {
        interior_colorName,
        interior_colorId,
        interior_colorDesc,
        edit_interior_colors,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  