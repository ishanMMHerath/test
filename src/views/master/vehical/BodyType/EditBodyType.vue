<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Body Types Information">
          <div class="space-y-4">
            <Textinput
              label=" Name"
              name="body_types_name"
             
              type="text"
              v-model="body_typesName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label=" Description"
              name="body_types_description"
              placeholder="Description"
              v-model="body_typesDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edit_body_types "
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
      const body_typesName = ref("");
      const body_typesId = ref(0);
      const body_typesDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edit_body_types  = async () => {
        console.log("edited", body_typesDesc.value, body_typesName.value);
        if (body_typesName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
            body_types_id: body_typesId.value,
          name: body_typesName.value,
          description: body_typesDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `body-type/edit/${body_typesId.value}`,
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
  
           router.push({name:'list-body-type'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e.message);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetch_body_types_details = async (id) => {
          const response = await axios.get(`body-type/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const body_types  = response.data;
          const body_type = body_types.filter((item)=>item.body_types_id === id)[0];
          console.log(body_types );
  
      
          body_typesName.value = body_type.name;
          body_typesId.value = body_type.body_types_id;
          body_typesDesc.value = body_type.description;
          status.value = body_type.status;
          loaded.value = true;
        };
  
       fetch_body_types_details(id);
      });
  
      return {
        body_typesName,
        body_typesId,
        body_typesDesc,
        edit_body_types ,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  