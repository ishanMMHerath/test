<template>
  <div>
    <Card noborder>
      <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
        <h5>
          <router-link to="/app/add-sections">
            <Button
                icon="heroicons-outline:newspaper"
                text="Add Sections"
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
          :rows="paginatedRows"
          :pagination-options="{
          enabled: true,
          perPage: perPage,
        }"
          :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
          :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true,
          selectAllByGroup: true,
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field === 'customer'" class="flex">
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
          <span v-if="props.column.field === 'order'">
            {{ "#" + props.row.order }}
          </span>
          <span v-if="props.column.field === 'date'" class="text-slate-500 dark:text-slate-300">
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
          <span v-if="props.column.field == 'action'" class="flex space-x-1">
            <Button
                icon="heroicons-outline:eye"
                btnClass="btn-outline-primary btn-sm"
                @click="handleAction('view', props.row.homepage_sections_id)"
            />
            <Button
                icon="heroicons-outline:pencil-square"
                btnClass="btn-outline-warning btn-sm"
                @click="handleAction('edit', props.row.homepage_sections_id)"
            />
            <Button
                icon="heroicons-outline:trash"
                btnClass="btn-outline-danger btn-sm"
                @click="handleAction('delete', props.row.homepage_sections_id)"
            />
          </span>
        </template>
        <template #pagination-bottom="props">
          <div class="py-4 px-3">
            <Pagination
                :total="totalRows"
                :current="current"
                :per-page="perPage"
                :pageRange="pageRange"
                @page-changed="current = $event"
                @perPageChanged="perPage = $event"
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
      current: 1,
      perPage: 10,
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
          label: "Sections Name",
          field: "sections_name",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Created At",
          field: "created_at",
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
  computed: {
    paginatedRows() {
      const start = (this.current - 1) * this.perPage;
      const end = start + this.perPage;
      return this.advancedTable.slice(start, end);
    },
    totalRows() {
      return this.advancedTable.length;
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('home-page-sections/get-all');
        this.advancedTable = response.data; // Update advancedTable with API response
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed (e.g., show error message)
      }
    },
    async handleAction(action, id) {
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
            await axios.delete(`home-page-sections/destroy/${id}`);
            await Swal.fire("Deleted!", "Your file has been deleted.", "success");
            await this.fetchData();
          }
        } catch (error) {
          console.error("Error deleting data:", error);
          await Swal.fire("Error!", "There was an error deleting the data.", "error");
        }
      } else if (action === "edit") {
        console.log(id);
        this.$router.push({name: 'edit-sections-homepage', params: {id: id}});
      } else if (action === "quick edit") {
        const vehicle = this.advancedTable.find(v => v.vehicle_id === id);
        console.log(vehicle);

      }
    },
    getStatusText(status) {
      switch (status) {
        case 1:
          return "Available";
        case 2:
          return "Draft";
        case 3:
          return "Sold";
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

  },
};
</script>
<style lang="scss"></style>
