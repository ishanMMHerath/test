<template>
    <div>
      <div v-if="loaded" class="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="jci status Information">
          <div class="space-y-4">
            <Textinput
              label=" Name"
              name="jci_statuses_name"
             
              type="text"
              v-model="jci_statusesName"
              placeholder="Vehicle Name"
            />
  
            <Textarea
              label=" Description"
              name="jci_statuses_description"
              placeholder="Description"
              v-model="jci_statusesDesc"
            />
          </div>
  
          <div class="text-right" style="margin-top: 10px">
            <Button
              class="bg-blue-500 hover:bg-black-800 btn-success rounded text-white-400 px-6 py-2"
              @click="edit_jci_statuses "
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
      const jci_statusesName = ref("");
      const jci_statusesId = ref(0);
      const jci_statusesDesc = ref(0);
      const loaded = ref(false);
      const status = ref();
  
      const router = useRouter();
  
      const edit_jci_statuses  = async () => {
        console.log("edited", jci_statusesDesc.value, jci_statusesName.value);
        if (jci_statusesName.value === "") {
          await Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Name is is Required",
          });
  
          return;
        }
  
        // Note Empty send the request
        const pay_loard = {
          j_c_i_statuses_id: jci_statusesId.value,
          name: jci_statusesName.value,
          description: jci_statusesDesc.value,
          status:status.value
        };
  
        try {
          const token = localStorage.getItem("token");
          // console.log(vehicle_ids.value);
          const response = await axios.post(
            `jci-status/edit/${jci_statusesId.value}`,
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
  
           router.push({name:'list-jci-status'}); // Redirect to body type list
          }
         
        } catch (e) {
            console.log(e.message);
        }
  
      
      };
  
      onMounted(() => {
        const route = useRoute();
        let id = Number(route.params.id);
  
        const token = localStorage.getItem("token");
        const fetch_jci_statuses_details = async (id) => {
          const response = await axios.get(`jci-status/get-all`, {
            headers: {
              Authorization: `Bearer ${token}`,
             
            },
          });
          const jci_statuses  = response.data;
          const jci_status = jci_statuses.filter((item)=>item.j_c_i_statuses_id === id)[0];
          console.log(jci_statuses );
  
      
          jci_statusesName.value = jci_status.name;
          jci_statusesId.value = jci_status.j_c_i_statuses_id;
          jci_statusesDesc.value = jci_status.description;
          status.value = jci_status.status;
          loaded.value = true;
        };
  
       fetch_jci_statuses_details(id);
      });
  
      return {
        jci_statusesName,
        jci_statusesId,
        jci_statusesDesc,
        edit_jci_statuses ,
        loaded,
      };
    },
  };
  </script>
  <style></style>
  