<template>
    <div>
      <Card noborder>
        <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
            <h5>
                <router-link :to='{name:"add-faq"}'>
                  <Button btnClass="btn-outline-primary rounded-[999px]" icon="heroicons-outline:newspaper"
                          text="Add Faq"/>
                </router-link>
              </h5>
        </div>
  
        <vue-good-table :columns="columns" styleClass="vgt-table bordered centered" :rows="paginatedData"
          :pagination-options="{ enabled: true, perPage: perpage }"
          :search-options="{ enabled: true, externalQuery: searchTerm }" :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectioninfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectinfo: true,
            selectAllByGroup: true,
          }">
          <template v-slot:table-row="props">

            <span v-if="props.column.field == 'question'" class=" w-ful flex-col  flex justify-center"
             v-html="props.row.question"
            >
             </span>

             <span v-if="props.column.field == 'answer'" class=" w-full flex flex-col  justify-center"
             v-html="props.row.answer"
            >
             </span>
        
            <span v-if="props.column.field == 'status'" class=" w-full flex justify-center">
             
              <Switch label="Label" @change="handleChange" modelValue="chocolates"
                :active="props.row.status" 
                :id="props.row.faq_id" />
  
            </span>
            <span v-if="props.column.field == 'action'" class="flex gap-2 justify-center">

              <Button btnClass="btn-outline-warning btn-sm" icon="heroicons-outline:pencil-square"
                @click="handleAction('edit', props.row.faq_id)" />

            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3">
              <Pagination :total="advancedTable.length" :current="current" :per-page="perpage" :pageRange="pageRange"
                @page-changed="current = $event" :pageChanged="props.pageChanged" :perPageChanged="props.perPageChanged"
                enableSearch enableSelect :options="options" />
            </div>
          </template>
        </vue-good-table>
      </Card>
    </div>
  </template>
  
  <script>
  import Dropdown from "@/components/Dropdown";
  import Card from "@/components/Card";
  import Icon from "@/components/Icon";
  import InputGroup from "@/components/InputGroup";
  import Pagination from "@/components/Pagination";
  import { MenuItem } from "@headlessui/vue";
  import Button from "@/components/Button/index.vue";
  import Swal from "sweetalert2";
  import axios from "@/store/axios";
  import Switch from '@/components/Switch/index.vue';
  
  export default {
    components: {
      Button,
      Pagination,
      InputGroup,
      Dropdown,
      Icon,
      Card,
      MenuItem,
      Switch,
    },
  
    data() {
      return {
        advancedTable: [], // Initialize as empty array
        current: 1,
        perpage: 10,
        pageRange: 5,
        searchTerm: "",
        active: false,
        statusOrId: "active",
        actions: [
          {
            name: "view",
            icon: "heroicons-outline:eye",
          },
          {
            name: "edit",
            icon: "heroicons:pencil-square",
          },
          {
            name: "delete",
            icon: "heroicons-outline:trash",
          },
        ],
        options: [
          {
            value: "1",
            label: "1",
          },
          {
            value: "3",
            label: "3",
          },
          {
            value: "5",
            label: "5",
          },
        ],
        columns: [
          {
            label: "Faq Id",
            field: "faq_id",
          },
          {
            label: "Question",
            field: "question",
          },

          {
            label: "Answer",
            field: "answer",
          },
          {
            label: "Status",
            field: "status",
          },
          {
            label: "Action",
            field: "action",
          },
        ],
      };
    },
  
    computed: {
      totalRows() {
        return this.advancedTable.length;
      },
      paginatedData() {
        const start = (this.current - 1) * this.perpage;
        const end = start + this.perpage;
        return this.advancedTable.slice(start, end);
      },
    },
  
    mounted() {
      this.fetchData(); // Fetch data when component is mounted
    },
  
  
    methods: {
  
      async handleChange(payload) {

      const data = this.advancedTable.find((tableItem)=> tableItem.faq_id === payload.id);
  

      data.status = Number(!data.status) ;


       try {
          const token = localStorage.getItem("token");
          const response = await axios.put(`faqs/update/${payload.id}`,data,
            {
              headers: {
  
      
                "Authorization": `Bearer ${token}`,
              },
  
            }
          );
  
          if (response.status === 200) {
            console.log(response)
            await Swal.fire({
              icon: 'success',
              title: data.status ? 'Faq Activated' :'Faq Deactivated',
              text: response.data.message,
            });
            //  router.push({ name: "popup-list" }); // Redirect to body type list

            this.advancedTable = this.advancedTable.map((tableItem)=>{
                if(tableItem.id === payload.id) {
                   tableItem.status = !(tableItem.status)
                }
                return tableItem
            })

            //this.fetchData();

          }
  
          else {
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.data.message,
            });
          }
  
        }
        catch (error) {
          console.error("Error updating Happy Customer:", error);
          alert("An error occurred while updating the Happey Customer.");
        }

  
      },
  
  
  
  
      async fetchData() {
        try {
            const response = await axios.get("web/faq/getall");
          const modifedData = (response.data);

          this.advancedTable = modifedData; // Update advancedTable with API response
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error as needed (e.g., show error message)
        }
      },
  
      async handleAction(action, id) {
        // let v = 0;
        // v++
        // console.log(v);
  
        if (action === "delete") {
          //   try {
          //     const result = await Swal.fire({
          //       title: "Are you sure?",
          //       text: "You won't be able to revert this!",
          //       icon: "warning",
          //       showCancelButton: true,
          //       confirmButtonColor: "#3085d6",
          //       cancelButtonColor: "#d33",
          //       confirmButtonText: "Yes, delete it!",
          //     });
  
          //     if (result.isConfirmed) {
          //       await axios.delete(`accessories/destroy/${id}`);
          //       await Swal.fire("Deleted!", "Your Accessories  has been deleted.", "success");
          //       await this.fetchData();
          //     }
          //   } catch (error) {
          //     console.error("Error deleting data:", error);
          //     await Swal.fire("Error!", "There was an error deleting the data.", "error");
          //   }
        }
        else {
          this.$router.push({ name: 'edit-faq', params: { id: id } });
        }
      },
    },
  };
  </script>