<template>
  <div>
    <Card noborder>
      <div
          class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center"
      >
        <h5>
          <router-link to="/app/add-seat">
            <Button
                icon="heroicons-outline:newspaper"
                text="Add Seat"
                btnClass="btn-outline-primary rounded-[999px]"
            />
          </router-link>
        </h5>
        <InputGroup
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
        />
      </div>

      <vue-good-table
          :columns="columns"
          styleClass="vgt-table bordered centered"
          :rows="advancedTable"
          :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
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
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'customer'" class="flex">
            <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                  :src="props.row.customer.image"
                  :alt="props.row.customer.name"
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
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                :class="statusClass(props.row.status)"
            >
              {{ getStatusText(props.row.status) }}
            </span>
          </span>
          <span class="justify-center flex space-x-1" v-if="props.column.field == 'action'">
         
          

            <Button
                icon="heroicons-outline:eye"
                btnClass="btn-outline-primary btn-sm"
                @click="handleAction('view', props.row.seats_id)"
            />
            <Button
                icon="heroicons-outline:pencil-square"
                btnClass="btn-outline-warning btn-sm"
                @click="handleAction('edit', props.row.seats_id)"
            />
         
            <Button
                icon="heroicons-outline:trash"
                btnClass="btn-outline-danger btn-sm"
                @click="handleAction('delete', props.row.seats_id)"
            />
        
                  
        
          </span>
        </template>
        <template #pagination-bottom="props">
          <div class="py-4 px-3">
            <Pagination
                :total="50"
                :current="current"
                :per-page="perpage"
                :pageRange="pageRange"
                @page-changed="current = $event"
                :pageChanged="props.pageChanged"
                :perPageChanged="props.perPageChanged"
                enableSearch
                enableSelect
                :options="options"
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

  mounted() {
    this.fetchData(); // Fetch data when component is mounted
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("seats/get-all");
        console.log(response.data);
        this.advancedTable = response.data; // Update advancedTable with API response
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
        //Edit Action
       if(action === "edit") {
           this.$router.push({name: 'edit-seat', params: {id: id}});
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
            await axios.delete(`seats/destroy/${id}`);
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
