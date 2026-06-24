<template>
  <div class="reservation-sec">
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
          <span v-if="props.column.field === 'vehicle_sub_info'">
            <template v-if="props.row.vehicle_sub_info">
              <a class="text-blue-700 font-bold" title="Click to view"
                :href="'https://yokodrive.com/vehicle/' + props.row.vehicle_sub_info.id" target="_blank">
                {{ props.row.vehicle_sub_info.name }}</a>
            </template>
            <template v-else>
              N/A
            </template>
          </span>

          
          
          <span v-if="props.column.field === 'vehicle-sku'">
            <template v-if="props.row.vehicle.length">
              <a class="text-blue-700 font-bold" title="Click to view"
                :href="'https://yokodrive.com/vehicle/' + props.row.vehicle.vehicle_id" target="_blank">
                {{ props.row.vehicle.sku }}</a>
            </template>
            <template v-else>
                  N/A
            </template>
          </span>


          <span v-if="props.column.field === 'more_info'">
            <Dropdown class="" classMenuItems="w-[300px]">
              <span class="text-xl" title="Click to View">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
              <template v-slot:menus>
                <MenuItem class="bg-gray-200 p-4">
                <div class="flex flex-col gap-2 items-start">
                  <span class="">
                    Price : ${{ props.row.more_info.price ?? "NA" }}
                  </span>
                  <span class="">
                    Min Payment : ${{ props.row.more_info.minPayment ?? "NA" }}
                  </span>
                  <span class="">
                    Down Payment : ${{ props.row.more_info.downPayment ?? "NA" }}
                  </span>

                  <span class="" v-if="props.row.more_info.shipping == 'null'">
                    Shipping : NA

                  </span>
                  <span v-else>

                    Shipping : {{ props.row.more_info.shipping }}
                  </span>

                  <span class="text-start" v-if="props.row.more_info.addOns">
                       Addons:
                       <small v-for="addOn in props.row.more_info.addOns ">
                            {{ addOn.name }} , $: {{ addOn.price }}
                       </small>
                  </span>
                  <span v-else>
                       Not Selected
                  </span>

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
          field: "first_name",
        },
        {
          label: "Last Name",
          field: "last_name",
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
          label: "Vehicle Name",
          field: "vehicle_sub_info",
        },

        {
          label: "SKU Number",
          field: "vehicle-sku",
        },
        {
          label: "Delivery_date",
          field: "expected_delivery_date",
        },


        {
          label: "More Details",
          field: "more_info",
        },
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
        const response = await axios.get("vehicle-booking/getall");

        const responseData = response.data.data;

        responseData.forEach((data, index) => {
          console.log(data, index)
          data["vehicle_sub_info"] = data.vehicle ? { name: data.vehicle.vehicle_name, id: data.vehicle_id } : "NA";
          data["more_info"] = {
            addOns: data.addOns == "null" ? null : function(){
              let jsonMatch = data.addOns.match(/^[\s\S]*[\]}]/);
              return JSON.parse(jsonMatch[0]);
            }(),
            minPayment: data.minPayment,
            downPayment: data.downPayment,
            shipping: data.shipping,
            price: data.price,
          }
        })

        console.log(responseData);

        this.advancedTable = responseData;
        //   this.totalRows = response.data.total; // Ensure your API returns the total number of rows
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    fixShippingformat(shipping) {
      if (typeof this.shipping === 'string') {
        try {
          const parsed = JSON.parse(shipping);
          console.log(parsed)
          // Verify if parsed result is an object, not just a string or number
          if (parsed && typeof parsed === 'object') {
            return parsed;
          }
        } catch (e) {
          console.warn('Not a JSON string:', shipping);
        }
      }
      // Return the original `shipping` if it's not a JSON object
      return shipping;
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

<style lang="scss"></style>
