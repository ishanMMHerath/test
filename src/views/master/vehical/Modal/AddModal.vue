<template>
  <Card title="">
    <div class="space-y-4">
      <div class="formGroup relative">
        <label class="inline-block input-label" for="feature_category">Vehicle Make</label>
        <div class="relative">
          <div>
            <select id="vehicle_make_id"
                    v-model="form.vehicle_make_id"
                    class="classinput input-control block w-full focus:outline-none min-h-[40px]">
              <option selected value="">Select Options</option>
              <option v-for="(item, i) in form.vehicle_make" :key="i"
                      :value="item.makes_id">{{ item.name }}
              </option>
            </select>
          </div>
          <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div class="formGroup relative">
        <div class="relative flex space-x-2">
          <Textinput v-model="form.s_length" :error="s_length_error" :mark="true" class="flex-grow" label="Length"
                     name="length" placeholder="Length" type="text"/>
          <Textinput v-model="form.s_width" :error="s_width_error" :mark="true" class="flex-grow" label="Width"
                     name="width" placeholder="Width" type="text"/>
          <Textinput v-model="form.s_height" :error="s_height_error" :mark="true" class="flex-grow" label="Height"
                     name="height" placeholder="Height" type="text"/>
        </div>
      </div>

      <Textinput
          v-model="form.name"
          label="Name"
          name="name"
          placeholder="Name"
          type="text"
      />
      <Textinput
          v-model="form.desc"
          label="Description"
          name="desc"
          placeholder="Type your description"
          type="text"
      />
      <Select
          v-model="form.status"
          :options="options"
          label="Status"
      />
      <div class="row">
        <div class="text-right" style="margin-top: 10px">
          <Button
              btnClass="btn-success rounded-[999px]"
              style="background-color: #d8bb4f; color: #065591"
              text="Submit"
              type="submit"
              @click="saveMasterDetail"
          />
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import Card from "@/components/Card/index.vue";
import Select from "@/components/Select/index.vue";
import axios from "@/store/axios";
import Swal from "sweetalert2";
import router from "@/router"; // Ensure your router is imported

export default {
  components: {
    Select,
    Card,
    Textinput,
    Button,
  },
  data() {
    return {
      form: {
        name: '',
        desc: '',
        s_length: '',
        s_width: '',
        s_height: '',
        status: null,
        vehicle_make: [],
        vehicle_make_id: ''
      },
      options: [
        {
          value: true,
          label: "Active",
        },
        {
          value: false,
          label: "Inactive",
        },
      ],
    };
  },
  mounted() {
    this.getVehicleMakes();
  },
  methods: {
    async getVehicleMakes() {
      this.form.vehicle_make = [];
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`makes/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        this.form.vehicle_make = response.data;
      } catch (error) {
        console.error('Error fetching vehicle makes:', error);

      }
    },
    async saveMasterDetail() {
      if (!this.form.name || !this.form.desc || this.form.status === null) {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'Please fill all the fields before submitting.',
        });
        return;
      }
      try {
        this.form.status = this.form.status === "true" || this.form.status === true;
        console.log(this.form.vehicle_make_id)
        const response = await axios.post('vehicle-model/save', {
          name: this.form.name,
          description: this.form.desc,
          makes_id: this.form.vehicle_make_id,
          length: this.form.s_length,
          width: this.form.s_width,
          height: this.form.s_height,
          status: this.form.status,
        });
        if (response.status === 201) { // Check for successful status code
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
          router.push('/app/list-modal'); // Redirect to body type list
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message,
          });
        }
      } catch (error) {
        console.error('Error saving Vehical Modal:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save makes. Please try again.',
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
