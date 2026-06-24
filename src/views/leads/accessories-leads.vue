<template>
  <div class="inquiry-sec">
    <Card noborder>
      <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
        <h5></h5>
        <InputGroup v-model="searchTerm" placeholder="Search" type="text" prependIcon="heroicons-outline:search"
          merged />
      </div>

      <vue-good-table :columns="columns" styleClass="vgt-table bordered centered" :rows="paginatedData"
        :search-options="{ enabled: true, externalQuery: searchTerm }" :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
          selectioninfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectinfo: false,
          selectAllByGroup: true,
        }" :pagination-options="{
          enabled: true,
          perPage: 10
        }" @on-page-change="onPageChange" @on-per-page-change="onPerPageChange">
        <template v-slot:table-row="props">
          <!-- <span v-if="props.column.field === 'first_name'">
              {{ props.row.first_name }}
            </span>
            <span v-if="props.column.field === 'email'">
              {{ props.row.email }}
            </span>
            <span v-if="props.column.field === 'mobile'">
              {{ props.row.mobile }}
            </span>
            <span v-if="props.column.field === 'city'">
              {{ props.row.city }}
            </span>
            <span v-if="props.column.field === 'expected_delivery_date'">
              {{ props.row.expected_delivery_date }}
            </span> -->
          <span v-if="props.column.field === 'accessory'">
            <template v-if="props.row.accessory">
              <a class="text-blue-700 font-bold" title="Click to view"
                :href="'https://yokodrive.com/accessories/' + props.row.accessory.accessories_id" target="_blank">
                {{ props.row.accessory.name }}</a>
            </template>
            <template v-else>
              N/A
            </template>
          </span>


          <span v-if="props.column.field === 'action'">
            <Dropdown classMenuItems="w-[140px]">
              <span class="text-xl">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
              <template v-slot:menus>
                <MenuItem v-for="(item, i) in actions" :key="i">
                <div :class="[
                  item.name === 'delete'
                    ? 'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white'
                    : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50',
                  'w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse'
                ]">
                  <span class="text-base">
                    <Icon :icon="item.icon" />
                  </span>
                  <span>{{ item.name }}</span>
                </div>
                </MenuItem>
              </template>
            </Dropdown>
          </span>
        </template>
        <template #pagination-bottom="props">
          <div class="py-4 px-3">
            <Pagination :total="totalRows" :current="currentPage" :per-page="perPage" :pageRange="pageRange"
              @page-changed="currentPage = $event" :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged" enableSearch enableSelect :options="options">
              >
            </Pagination>
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
import { RouterLink } from "vue-router";

export default {
  components: {
    Button,
    Pagination,
    InputGroup,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    RouterLink
  },



  data() {
    return {
      advancedTable: [],
      totalRows: 0,
      currentPage: 1,
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
      columns: [
        {
          label: "First Name",
          field: "firstname",
        },
        {
          label: "Last Name",
          field: "lastname",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Contact Number",
          field: "mobile",
        },
        {
          label: "Accessory",
          field: "accessory",
        },

        // {
        //   label: "YD",
        //   field: "vehicle-sku",
        // },
        // {
        //   label: "Question",
        //   field: "question",
        // },
        // {
        //   label: "Message",
        //   field: "message",
        // },


        //   {
        //     label: "Action",
        //     field: "action",
        //   },
      ],
      paginationOptions: {
        enabled: true,
        perPage: 10,
      },
    };
  },

  computed: {
    totalRows() {
      return this.advancedTable.length;
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.advancedTable.slice(start, end);
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("accessories/inquiries/all");
        console.log(response.data);
        this.advancedTable = response.data.data;
        //   this.totalRows = response.data.total; // Ensure your API returns the total number of rows
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    onPageChange(newPage) {
      this.currentPage = newPage;
      this.fetchData();
    },
    onPerPageChange(newPerPage) {
      this.perPage = newPerPage;
      this.fetchData();
    },
  },
};
</script>

<style scoped></style>