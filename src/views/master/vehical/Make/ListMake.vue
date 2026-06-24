<template>
  <div>
    <Card noborder>
 
      <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
        <h5>
          <router-link :to="{name:'add-make'}">
            <Button icon="heroicons-outline:newspaper" text="Add Make" btnClass="btn-outline-primary rounded-[999px]" />
    
          </router-link>
        </h5>
        <InputGroup v-model="searchTerm" placeholder="Search" type="text" prependIcon="heroicons-outline:search" merged />
      </div>

      <vue-good-table
          :columns="columns"
          styleClass="vgt-table bordered centered"
          :rows="paginatedData"
          :pagination-options="{ enabled: true, perPage: perpage }"
          :search-options="{ enabled: true, externalQuery: searchTerm }"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true, selectioninfoClass: 'custom-class', selectionText: 'rows selected', clearSelectionText: 'clear', disableSelectinfo: true, selectAllByGroup: true }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'name'">
            {{ props.row.name }}
          </span>
          <span v-if="props.column.field == 'description'">
            {{ props.row.description }}
          </span>
          <span v-if="props.column.field == 'status'" class="block w-full">
            <span class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25" :class="statusClass(props.row.status)">
              {{ getStatusText(props.row.status) }}
            </span>
          </span>

          <span class="justify-center flex space-x-1" v-if="props.column.field == 'action'">
         
          

            <Button
                icon="heroicons-outline:eye"
                btnClass="btn-outline-primary btn-sm"
                @click="handleAction('view', props.row.makes_id)"
            />
            <Button
                icon="heroicons-outline:pencil-square"
                btnClass="btn-outline-warning btn-sm"
                @click="handleAction('edit', props.row.makes_id)"
            />
         
            <Button
                icon="heroicons-outline:trash"
                btnClass="btn-outline-danger btn-sm"
                @click="handleAction('delete', props.row.makes_id)"
            />
        
                  
        
          </span>

          <!-- <span v-if="props.column.field == 'action'">
            <Dropdown classMenuItems="w-[140px]">
              <span class="text-xl">
                <Icon icon="heroicons-outline:dots-vertical"/>
              </span>
              <template v-slot:menus>
                <MenuItem v-for="(item, i) in actions" :key="i">
                  <div @click="handleAction(item.name, props.row.makes_id)" :class="`
                      ${
                        item.name === 'delete'
                          ? 'bg-opacity-30 hover:bg-opacity-100 hover:text-white'
                          : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50'
                      }
                      w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse
                    `"
                  >
                    <span class="text-base"><Icon :icon="item.icon"/></span>
                    <span>{{ item.name }}</span>
                  </div>
                </MenuItem>
              </template>
            </Dropdown>
          </span> -->
        </template>
      
        <template #pagination-bottom="props">
          <div class="py-4 px-3">
            <Pagination
                :total="totalRows"
                :current="currentPage"
                :per-page="perpage"
                :pageRange="pageRange"
                @page-changed="changePage"
            />
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
import axios from "@/store/axios";
import Swal from "sweetalert2";

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
      advancedTable: [],
      currentPage: 1,
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
          label: "Name",
          field: "name",
        },
        {
          label: "Description",
          field: "description",
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
  async beforeRouteEnter(to, from, next) {
    try {
      const response = await axios.get("makes/get-all");
      next(vm => {
        vm.advancedTable = response.data;
        vm.setPaginatedData();
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      next();
    }
  },
  async beforeRouteUpdate(to, from, next) {
    try {
      const response = await axios.get("makes/get-all");
      this.advancedTable = response.data;
      this.setPaginatedData();
      next();
    } catch (error) {
      console.error("Error fetching data:", error);
      next();
    }
  },

  // edit page navigate function ()

  mounted() {
    this.fetchData(); // Fetch data when component is mounted
  },
  computed: {
    totalRows() {
      return this.advancedTable.length;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perpage;
      const end = start + this.perpage;
      return this.advancedTable.slice(start, end);
    },
  },
  methods: {
    getStatusText(status) {
      return status ? "Active" : "Inactive";
    },
    statusClass(status) {
      return {
        "text-success-500 bg-success-500": status,
        "text-danger-500 bg-danger-500": !status,
      };
    },
    async handleAction(action, id) {
       console.log(action,id);

       //Edit Action
       if(action === "edit") {
           this.$router.push({name: 'edit-make', params: {id: id}});
       }
  


      if (action === "delete") {
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });

          if (result.isConfirmed) {
            await axios.delete(`makes/destroy/${id}`);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            this.fetchData(); // Refresh the data after deletion
          }
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire("Error!", "There was an error deleting the data.", "error");
        }
      }
    },
    async fetchData() {
      try {
        const response = await axios.get("makes/get-all");
        this.advancedTable = response.data;
        this.setPaginatedData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.setPaginatedData();
    },
    setPaginatedData() {
      // This method will automatically update the computed property `paginatedData`
    },
  },
};
</script>
