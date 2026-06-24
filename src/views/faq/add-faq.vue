<template>
  <Card title="">
    <div class="space-y-4">
      <Select
          v-model="form.page_id"
          label="Page"
          :options="pageOptions"
          placeholder="Select Page"
      />
      <Textinput
          v-model="form.name"
          label="Question"
          name="name"
          type="text"
          placeholder="Name"
      />
      <Textinput
          v-model="form.desc"
          label="Answer"
          name="desc"
          type="text"
          placeholder="Type your description"
      />
      <Select
          v-model="form.status"
          label="Status"
          :options="statusOptions"
          placeholder="Select Status"
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
        page_id: null,
        name: '',
        desc: '',
        status: null,
      },
      pageOptions: [], // Options for pages
      statusOptions: [
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
    this.fetchPages();
  },
  methods: {
    async fetchPages() {
      try {
        const response = await axios.get('pages/getall');
        this.pageOptions = response.data.map(page => ({
          value: page.page_id,
          label: page.page_name,
        }));
      } catch (error) {
        console.error('Error fetching pages:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch pages. Please try again.',
        });
      }
    },
    async saveMasterDetail() {
      if (!this.form.page_id || !this.form.name || !this.form.desc || this.form.status === null) {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'Please fill all the fields before submitting.',
        });
        return;
      }
      try {
        const response = await axios.post('faqs/save', {
          page_id: this.form.page_id,
          question: this.form.name,
          answer: this.form.desc,
          status: this.form.status === "true" || this.form.status === true,
        });
        if (response.status === 201) { // Check for successful status code
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
          router.push('/app/list-faq'); // Redirect to body type list
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message,
          });
        }
      } catch (error) {
        console.error('Error saving FAQ:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save FAQ. Please try again.',
        });
      }
    },
  },
};
</script>
