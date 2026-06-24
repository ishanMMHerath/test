<template>
  <div>
    <Card noborder>
      <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
        <h5>
          <router-link to="/app/add-vehicle">
            <Button btnClass="btn-outline-primary rounded-[999px]" icon="heroicons-outline:newspaper"
                    text="Add Vehicle"/>
          </router-link>
        </h5>
        <InputGroup v-model="searchTerm" merged placeholder="Search" prependIcon="heroicons-outline:search"
                    type="text"/>
      </div>

      <div v-if="advancedTableSearch && sections.length" class="fromGroup flex gap-2">
        <select
            class="form-select w-64  block mb-5 min-h-[40px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white px-2 border-solid border border-gray-200 "
            aria-label="Select example" v-model="selectedSection" @change="handleSectionChange">

          <option value="" disabled>Filter By Section</option>
          <option value="all">All</option>
          <option v-for="(item, i) in sections" :key="i" :value="item.homepage_sections_id">{{
              item.sections_name
            }}
          </option>

        </select>

        <select
            class="form-select w-64  block mb-5 min-h-[40px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white px-2 border-solid border border-gray-200 "
            name="" id="" v-model="selectedMake" @change="handleMakeChange">
          <option value="" disabled>Filter by Make</option>
          <option value="all">All</option>

          <option v-for="(item, i) in vehicle_make" :key="i" :value="item.makes_id">{{
              item.name
            }}
          </option>
        </select>


        <select
            class="form-select w-64  block mb-5 min-h-[40px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white px-2 border-solid border border-gray-200 "
            name="" id="" v-model="selectedStatus" @change="handleStatusChange">
          <option disabled value="">Filter by Status</option>
          <option value="all">All</option>
          <option style="text-transform: capitalize;" v-for="(item,i) of inventory_status_arr" :key="i"
                  :value="item.name.toLowerCase()">{{ item.name.toLowerCase() }}
          </option>


        </select>


      </div>


      <div v-if="advancedTableSearch && sections.length">
        <vue-good-table :columns="columns" :pagination-options="{
          enabled: true,
          perPage: perpage,
        }" :rows="paginatedData" :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }" :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
          selectioninfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectinfo: true,
          selectAllByGroup: true,
        }" styleClass="vgt-table bordered centered">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'featured_image'" class="flex justify-center">
              <span class="w-20 h-20 flex-none"> <!-- Updated size -->
                <img :alt="props.row.vehicle_name" :src="props.row.featured_image" class="object-cover w-full h-full"/>
              </span>
            </span>
            <span v-if="props.column.field == 'vehicle_name'"
                  class="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {{ props.row.vehicle_name }}
            </span>
            <span v-if="props.column.field == 'sku'" class="text-sm text-slate-600 dark:text-slate-300">
              {{ props.row.sku }}
            </span>
            <span v-if="props.column.field == 'regular_price'" class="text-sm text-slate-600 dark:text-slate-300">
              {{ props.row.regular_price }}
            </span>
            <span v-if="props.column.field == 'sale_price'" class="text-sm text-slate-600 dark:text-slate-300">
              {{ props.row.sale_price }}
            </span>

            <span v-if="props.column.field == 'homepage_sections_id'"
                  class="text-sm text-slate-600 dark:text-slate-300">

              <span v-for="(section, i) in sections" :key="i">

                <template v-if="section.homepage_sections_id == props.row.homepage_sections_id">
                  {{ section.sections_name }}
                </template>


              </span>

            </span>

            <span v-if="props.column.field == 'make'" class="text-sm text-slate-600 dark:text-slate-300">

              {{ props.row.make[0].name }}

            </span>

            <span v-if="props.column.field == 'description'" class="text-slate-500 dark:text-slate-300">
              {{ props.row.description }}
            </span>
            <span v-if="props.column.field == 'inventory_status'" class="block w-full">
              <span :class=" inventoryStatusClass(props.row.inventory_status.toLowerCase())"
                    class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25">
                <!-- {{ getStatusText(props.row.status) }} -->
                 {{ props.row.inventory_status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'" class="flex space-x-1">
              <Button btnClass="btn-outline-primary btn-sm" icon="heroicons-outline:eye"
                      @click="handleAction('view', props.row.vehicle_id)"/>
              <Button btnClass="btn-outline-warning btn-sm" icon="heroicons-outline:pencil-square"
                      @click="handleAction('edit', props.row.vehicle_id)"/>
              <Button btnClass="btn-outline-secondary btn-sm" icon="heroicons-outline:pencil-alt"
                      @click="handleAction('quick edit', props.row.vehicle_id)"/>
              <Button btnClass="btn-outline-danger btn-sm" icon="heroicons-outline:trash"
                      @click="handleAction('delete', props.row.vehicle_id)"/>
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3">
              <Pagination :current="current" :options="options" :pageChanged="props.pageChanged" :pageRange="pageRange"
                          :per-page="perpage" :perPageChanged="props.perPageChanged" :total="totalRows" enableSearch
                          enableSelect
                          @page-changed="changePage"/>
            </div>
          </template>
        </vue-good-table>
      </div>


      <!--begin::Alert-->
      <div v-if="!advancedTableSearch" class="alert alert-primary d-flex align-items-center p-5">

        <!--begin::Wrapper-->
        <div class="d-flex flex-column">
          <!--begin::Title-->
          <h4 class="mb-1 text-dark text-center">Loading ...</h4>

        </div>

      </div>
      <!--end::Alert-->


    </Card>

    <!-- Quick Edit Modal -->
    <div v-if="showQuickEditModal"
         class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <span class="absolute top-0 right-0 p-4" @click="closeQuickEditModal">
          <Icon class="text-xl cursor-pointer" icon="heroicons-outline:x"/>
        </span>
        <h2 class="text-xl mb-4">Quick Edit Vehicle</h2>
        <InputGroup v-model="quickEditForm.vehicle_name" label="Vehicle Name" placeholder="Enter vehicle name"
                    type="text"/>
        <InputGroup v-model="quickEditForm.sale_price" label="Sale Price" placeholder="Sale Price" type="text"/>
        <InputGroup v-model="quickEditForm.regular_price" label="Regular Price" placeholder="Enter make" type="text"/>
        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Status</label>
          <div class="relative">
            <div>
              <select id="exterior_colors_id" v-model="quickEditForm.activeStatus"
                      class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option value="1">Active</option>
                <option value="0">Disable</option>
                <!--                <option v-for="(item, i) in activeStatusArr" :key="i" :value="item.exterior_colors_id">{{-->
                <!--                    item.name-->
                <!--                  }}-->
                <!--                </option>-->
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>
        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Inventory Status</label>
          <div class="relative">
            <div>
              <select id="exterior_colors_id" v-model="quickEditForm.inventory_status"
                      class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in inventory_status_arr" :key="i" :value="item.inventory_statuses_id">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Home Page Sections</label>
          <div class="relative">
            <div>
              <select id="position" v-model="quickEditForm.sections_id"
                      class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in sections" :key="i" :value="item.homepage_sections_id">{{
                    item.sections_name
                  }}
                </option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Label</label>
          <div class="relative">
            <div>
              <select id="position" v-model="quickEditForm.labels_id"
                      class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in label" :key="i" :value="item.vehicle_labels_id">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-2 mt-4">
          <Button btnClass="btn-secondary" text="Cancel" @click="closeQuickEditModal"/>
          <Button btnClass="btn-primary" text="Save" @click="saveQuickEdit"/>
        </div>
      </div>
    </div>
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
import {ref} from "vue";
import {ImageUrl} from "@/store/axios";

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
      advancedTableSearch: null,
      sections: ref([]),
      label: ref([]),
      vehicle_make: ref([]),
      selectedSection: '', // Holds the currently selected category ID
      selectedMake: '',
      selectedStatus: '',

      activeStatusArr: ref([]),
      inventory_status_arr: ref([]),
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      showQuickEditModal: false,
      quickEditForm: {
        vehicle_id: null,
        vehicle_name: '',
        sale_price: '',
        regular_price: '',
        activeStatus: '',
        inventory_status: '',
        sections_id: '',
        labels_id: '',
      },
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
          name: "quick edit",
          icon: "heroicons-outline:pencil-alt",
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
          label: "Image",
          field: "featured_image",
        },
        {
          label: "Name",
          field: "vehicle_name",
        },
        {
          label: "SKU",
          field: "sku",
        },
        {
          label: "Regular Price",
          field: "regular_price",
        },
        {
          label: "Sale Price",
          field: "sale_price",
        },

        {
          label: "Home Section",
          field: "homepage_sections_id",
        },
        {
          label: "Make",
          field: "make",
        },
        {
          label: "Status",
          field: "inventory_status",
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
    this.getSections();
    this.getInventoryStatus();
    this.getLabels();
    this.getVehicleMake();
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("vehicle/get-all");
        console.log(response.data);
        // Update advancedTable with API response
        const vehicles = response.data.map(vehicle => {
          // Find the featured image URL
          console.log("vehicle", vehicle);
          const featuredImage = vehicle.images.find(image => image.is_featured);

          return {
            ...vehicle,
            featured_image: featuredImage ? `${ImageUrl}/storage/images/${featuredImage.name}` : '',
            make_name: vehicle.make ? vehicle.make.name : 'N/A',
            model_name: vehicle.get_vehicle_model.length ? vehicle.get_vehicle_model[0].name : 'N/A',
          };
        });
        this.advancedTable = vehicles
        this.advancedTableSearch = vehicles
        //onsole.log(vehicles)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed (e.g., show error message)
      }
    },

    async getVehicleMake() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`makes/get-all`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );
        console.log('makessss', response.data)

        this.vehicle_make = [...response.data]

      } catch (e) {

      }
    },

    handleSectionChange() {

      this.selectedMake = '';
      this.selectedStatus = ''

      if (this.selectedSection === 'all') {
        this.advancedTable = this.advancedTableSearch
        return;
      }

      const filerBySection = this.advancedTableSearch.filter((item) => item.homepage_sections_id == this.selectedSection);

      this.advancedTable = filerBySection;

    },

    handleMakeChange() {
      this.selectedSection = ''
      this.selectedStatus = ''


      if (this.selectedMake === 'all') {
        this.advancedTable = this.advancedTableSearch
        return;
      }

      const filerByMake = this.advancedTableSearch.filter((item) => item.makes_id == this.selectedMake);

      this.advancedTable = filerByMake;

    },

    handleStatusChange() {
      this.selectedSection = ''
      this.selectedMake = ''


      if (this.selectedStatus === 'all') {
        this.advancedTable = this.advancedTableSearch
        return;
      }

      const filerByMake = this.advancedTableSearch.filter((item) => item.inventory_status.toLowerCase() == this.selectedStatus);

      this.advancedTable = filerByMake;

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

    inventoryStatusClass(status) {
      return {
        "text-success-500 bg-success-500": status == "available",
        "text-warning-500 bg-warning-500": status == "sold",
        "text-danger-500 bg-danger-500": status == "reserved",
      };
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
            await axios.delete(`vehicle/destroy/${id}`);
            await Swal.fire("Deleted!", "Your file has been deleted.", "success");
            await this.fetchData();
          }
        } catch (error) {
          console.error("Error deleting data:", error);
          await Swal.fire("Error!", "There was an error deleting the data.", "error");
        }
      } else if (action === "edit") {
        this.$router.push({name: 'edit-vehicle', params: {id: id}});
      } else if (action === "quick edit") {
        const vehicle = this.advancedTable.find(v => v.vehicle_id === id);
        console.log(vehicle);
        if (vehicle) {
          this.quickEditForm = {
            vehicle_id: vehicle.vehicle_id,
            vehicle_name: vehicle.vehicle_name,
            sale_price: Number(vehicle.sale_price),
            regular_price: Number(vehicle.regular_price),
            inventory_status: Number(vehicle.inventory_status),
            sections_id: Number(vehicle.vehicle_category),
            activeStatus: vehicle.status,
          };
          this.showQuickEditModal = true;
        }
      }
    },
    closeQuickEditModal() {
      this.showQuickEditModal = false;
    },
    async saveQuickEdit() {
      try {
        // Make an API call to save the edited data
        await axios.post(`vehicle/quick-edit/${this.quickEditForm.vehicle_id}`, this.quickEditForm);
        // Close the modal
        this.showQuickEditModal = false;
        // Refresh the data
        await this.fetchData();
        await Swal.fire("Success!", "Vehicle details updated successfully.", "success");
      } catch (error) {
        console.error("Error updating data:", error);
        await Swal.fire("Error!", "There was an error updating the data.", "error");
      }
    },
    async getLabels() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`vehicle-label/get-all`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );
        console.log(response.data);
        response.data.forEach((data) => {
          this.label.push(data)
        })
      } catch (error) {
        console.error("Error updating data:", error);
        await Swal.fire("Error!", "There was an error updating the data.", "error");
      }
    },
    changePage(page) {
      this.current = page;
      // Optionally refetch data if the API supports pagination
      // this.fetchData();
    },
    async getSections() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`home-page-sections/get-all`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );
        console.log(response);
        response.data.forEach((data) => {
          this.sections.push(data)
        })
      } catch (e) {

      }
    },
    async getInventoryStatus() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`inventory-status/get-all`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );
        response.data.forEach((data) => {
          this.inventory_status_arr.push(data)
        })
      } catch (e) {

      }
    },
  },
};
</script>

<style scoped>
.modal-bg {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.box-image {
  width: 80px;
  /* Adjust as needed */
  height: 80px;
  /* Adjust as needed */
  overflow: hidden;
}

.box-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
