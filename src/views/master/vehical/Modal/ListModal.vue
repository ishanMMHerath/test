<template>
  <div>
    <Card noborder>
      <div
          class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center"
      >
        <h5>
          <router-link to="/app/add-modal">
            <Button
                btnClass="btn-outline-primary rounded-[999px]"
                icon="heroicons-outline:newspaper"
                text="Add Modal"
            />
          </router-link>
        </h5>
        <InputGroup
            v-model="searchTerm"
            merged
            placeholder="Search"
            prependIcon="heroicons-outline:search"
            type="text"
        />
      </div>

      <vue-good-table
          :columns="columns"
          :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
          :rows="advancedTable"
          :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
          :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
          selectioninfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectinfo: true,
          selectAllByGroup: true,
        }"
          styleClass="vgt-table bordered centered"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'customer'" class="flex">
            <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                  :alt="props.row.customer.name"
                  :src="props.row.customer.image"
                  class="object-cover w-full h-full rounded-full"
              />
            </span>
            <span class="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {{ props.row.customer.name }}
            </span>
          </span>
          <span v-if="props.column.field == 'order'">
            {{ "#" + props.row.order }}
          </span>
          <span v-if="props.column.field == 'date'" class="text-slate-500 dark:text-slate-300">
            {{ props.row.date }}
          </span>
          <span v-if="props.column.field == 'status'" class="block w-full">
            <span
                :class="statusClass(props.row.status)"
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
            >
              {{ getStatusText(props.row.status) }}
            </span>
          </span>
          <span v-if="props.column.field == 'action'" class="justify-center flex space-x-1">
         
          

            <Button
                btnClass="btn-outline-primary btn-sm"
                icon="heroicons-outline:eye"
                @click="handleAction('view', props.row.models_id)"
            />
            <Button
                btnClass="btn-outline-warning btn-sm"
                icon="heroicons-outline:pencil-square"
                @click="handleAction('edit', props.row.models_id)"
            />
         
            <Button
                btnClass="btn-outline-danger btn-sm"
                icon="heroicons-outline:trash"
                @click="handleAction('delete', props.row.models_id)"
            />
        
                  
        
          </span>
          <!-- <span v-if="props.column.field == 'action'">
            <Dropdown classMenuItems="w-[140px]">
              <span class="text-xl">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
              <template v-slot:menus>
                <MenuItem v-for="(item, i) in actions" :key="i">
                  <div
                      @click="handleAction(item.name, props.row.models_id)"
                      :class="`
                      ${
                        item.name === 'delete'
                          ? 'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white'
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
                :current="current"
                :options="options"
                :pageChanged="props.pageChanged"
                :pageRange="pageRange"
                :per-page="perpage"
                :perPageChanged="props.perPageChanged"
                :total="pageCount"
                enableSearch
                enableSelect
                @page-changed="current = $event"
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
import {MenuItem} from "@headlessui/vue";
import Button from "@/components/Button/index.vue";
import {advancedTable} from "@/constant/basic-tablle-data";
import axios from "@/store/axios";
import Swal from "sweetalert2";
import {ref} from "vue";

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
      advancedTable,
      pageCount: 0,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      resData: ref([]),
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
          label: "Make",
          field: "make",
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

  mounted() {
    this.fetchData(); // Fetch data when component is mounted
  },

  watch: {
    // Watch for route changes and fetch data when route changes
    '$route': 'fetchData'
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("vehicle-model/get-all");
        console.log(response);
        this.pageCount = response.data.length;
        console.log(Math.round(response.data.length / 10))
        response.data.forEach((item, index) => {
          let make_name = "";
          if (item.make === null) {
            make_name = '';

          } else {
            make_name = item.make.name;
          }
          const pageRange = {
            models_id: item.models_id,
            name: item.name,
            make: make_name,
            description: item.description,
            status: item.status
          }
          this.resData.push(pageRange);
        })

        this.advancedTable = this.resData; // Update advancedTable with API response
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed (e.g., show error message)
      }
    },

    getStatusText(status) {
      switch (status) {
        case 1:
          return "Active";
        case 2:
          return "Pending";
        case 3:
          return "Inactive";
        default:
          return "Unknown";
      }
    },

    statusClass(status) {
      return {
        "text-success-500 bg-success-500": status === 1,
        "text-warning-500 bg-warning-500": status === 2,
        "text-danger-500 bg-danger-500": status === 3,
      };
    },

    async handleAction(action, id) {

      //Edit Button Function
      //Edit Action
      if (action === "edit") {
        this.$router.push({name: 'edit-modal', params: {id: id}});
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
            await axios.delete(`vehicle-model/destroy/${id}`);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            this.fetchData(); // Refresh the data after deletion
          }
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire("Error!", "There was an error deleting the data.", "error");
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
