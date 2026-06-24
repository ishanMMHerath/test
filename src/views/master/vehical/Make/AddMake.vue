<template>
  <Card title="">
    <router-link :to="{name:'list-vehicle'}">
      <Button icon="heroicons-outline:newspaper" text="Add Make" btnClass="btn-outline-primary  rounded-[999px]" />
    </router-link>
    <div class="space-y-4">
      <Textinput
          v-model="form.name"
          label="Name"
          name="name"
          type="text"
          placeholder="Name"
      />

      <Textinput
          v-model="form.desc"
          label="Description"
          name="desc"
          type="text"
          placeholder="Type your description"
      />

      <Select
          v-model="form.status"
          label="Status"
          :options="options"
      />
      <div class="row">
        <div class="text-right" style="margin-top: 10px">
          <Button
              style="background-color: #d8bb4f; color: #065591"
              @click="saveMasterDetail"
              text="Submit"
              btnClass="btn-success rounded-[999px]"
              type="submit"
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
import router from "@/router";
import { ref } from "vue";

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
        status: null,
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
  methods: {
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
        const response = await axios.post('makes/save', {
          name: this.form.name,
          description: this.form.desc,
          status: this.form.status === "true" || this.form.status === true,
        });

        if (response.status === 201) {
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
          this.resetForm();
          router.push('/app/list-make');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message,
          });
        }
      } catch (error) {
        console.error('Error saving make:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save make. Please try again.',
        });
      }
    },
    resetForm() {
      this.form.name = '';
      this.form.desc = '';
      this.form.status = null;
    }
  },
};
</script>
