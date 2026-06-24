<template>
    <div>
      <Card noborder>
        <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
      
          <InputGroup v-model="searchTerm" placeholder="Search" type="text" prependIcon="heroicons-outline:search"
            merged />
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
            <span v-if="props.column.field == 'image1'" class="flex">
              <img
                :src="props.row.image1"
                :alt="props.row.name" class="object-cover w-10 h-10 rounded-full" />
            </span>

            <span v-if="props.column.field == 'image2'" class="flex">
                <img
                  :src="props.row.image2"
                  :alt="props.row.name" class="object-cover w-10 h-10 rounded-full" />
              </span>


              <span v-if="props.column.field == 'image3'" class="flex">
                <img
                  :src="props.row.image3"
                  :alt="props.row.name" class="object-cover w-10 h-10 rounded-full" />
              </span>
        
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25" :class="{
                'text-success-500 bg-success-500': props.row.status === 'active',
                'text-warning-500 bg-warning-500': props.row.status === 'inactive',
           
              }">
                {{ props.row.status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'" class="flex gap-2">
<!--   
              <Button btnClass="btn-outline-primary btn-sm" icon="heroicons-outline:eye"
                @click="handleAction('view', props.row.accessories_id)" /> -->
              <Button btnClass="btn-outline-warning btn-sm" icon="heroicons-outline:pencil-square"
                @click="handleAction('edit', props.row.id)" />
              <!-- <Button btnClass="btn-outline-danger btn-sm" icon="heroicons-outline:trash"
                @click="handleAction('delete', props.row.accessories_id)" /> -->
              <!-- <Dropdown classMenuItems="w-[140px]">
                <span class="text-xl">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in actions" :key="i">
                    <div
                        :class="[
                        item.name === 'delete'
                          ? 'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white'
                          : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50',
                        'w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse'
                      ]"
                    >
                      <span class="text-base">
                        <Icon :icon="item.icon" />
                      </span>
                      <span>test {{ item.name }}</span>
                    </div>
                  </MenuItem>
                </template>
  </Dropdown> -->
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
  
  export default {
    components: {
      Button,
      Pagination,
      InputGroup,
      Dropdown,
      Icon,
      Card,
      MenuItem,
    },
  
    data() {
      return {
        advancedTable: [], // Initialize as empty array
        current: 1,
        perpage: 10,
        pageRange: 5,
        searchTerm: "",
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
             label: "Title",
            field: "title",
          },
          {
            label: "Sub title",
            field: "sub_title",
          },
          
          {
            label: "Sales Stats Count",
            field: "sales_stats_count",
          },

          {
            label: "Customer Stats Count",
            field: "customer_stats_count",
          },
          {
            label: "Status",
            field: "status",
          },
         
      
          {
            label: "Image 1",
            field: "image1",
          },
          {
            label: "Image 2",
            field: "image2",
          },
          {
            label: "Image 3",
            field: "image3",
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
  
  //cc
    methods: {
      async fetchData() {
        try {
          const response = await axios.get("hero/getall");
          const modifedData = (response.data).map((data,index)=>{

               return {
                ...data,
                image1:"https://api.yokodrive.com/car_backend/public/hero/"+ data.image1,
                image2:"https://api.yokodrive.com/car_backend/public/hero/"+ data.image2,
                image3:"https://api.yokodrive.com/car_backend/public/hero/"+ data.image3,
               }

          });
         

          console.log(modifedData);

          this.advancedTable = modifedData; // Update advancedTable with API response
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error as needed (e.g., show error message)
        }
      },
  
      async handleAction(action, id) {
        let v= 0;
        v++
        console.log(v);
  
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
          this.$router.push({ name: 'edit-hero', params: { id: id } });
        } 
      },
    },
  };
  </script>
  
  <style lang="scss"></style>
  