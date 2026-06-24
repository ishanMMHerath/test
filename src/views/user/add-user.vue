<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <div class="xl:col-span-2">
      <Card title="User Details">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
              label="Full Name"
              name="full_name"
              type="text"
              placeholder="Full Name"
              v-model="full_name"
          />

          <Textinput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              v-model="email"
          />

          <Textinput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              v-model="password"
          />
          <Textinput
              label="Conform Password"
              name="conform_password"
              type="password"
              placeholder="Conform Password"
              v-model="conform_password"
          />

          <div class="space-y-5">
            <Button @click="saveUserDetails" style="margin-top: 29px !important;" text="Submit" btnClass="btn-dark"/>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Horizental from "../forms/input-layout/Horizental.vue";
import HorizentalIcon from "../forms/input-layout/HorizentalIcon";
import Vertical from "../forms/input-layout/Vertical";
import VerticalIcon from "../forms/input-layout/VerticalIcon";
import MultipuleCloumn from "../forms/input-layout/MultipuleCloumn";
import Button from "@/components/Button/index.vue";
import Checkbox from "@/components/Checkbox/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import InputGroup from "@/components/InputGroup/index.vue";
import Select from "@/components/Select/index.vue";
import {useToast} from "vue-toastification";
import {onMounted, ref} from "vue";
import {useFieldArray, useForm} from "vee-validate";
import axios from "@/store/axios";

export default {
  components: {
    Select,
    InputGroup,
    Textinput, Checkbox, Button,
    Card,
    Horizental,
    HorizentalIcon,
    Vertical,
    VerticalIcon,
    MultipuleCloumn,
  },
  setup() {
    const toast = useToast();
    const full_name = ref(null);
    const designation = ref(null);
    const email = ref(null);
    const mobile = ref(null);
    const user_name = ref(null);
    const password = ref(null);
    const conform_password = ref(null);

    onMounted(() => {
      console.log('Component mounted, fetching feature categories...');

    });


    const saveUserDetails = async () => {
      const payLoard = {
        "name": full_name.value,
        "email": email.value,
        "password": password.value,
        "password_confirmation": conform_password.value,
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`register`, payLoard, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
        );

        if (response.status === 201) {
          toast.success("user create successfully", {
            timeout: 2000,
          });
        } else {
          toast.error("user create unsuccessfully.", {
            timeout: 2000,
          });
        }

      } catch (e) {
        console.error(e);
        toast.error("user create unsuccessfully.", {
          timeout: 2000,
        });
      }
    };


    return {
      full_name,
      designation,
      email,
      mobile,
      user_name,
      password,
      conform_password,
      saveUserDetails,
    };
  }
};
</script>
<style lang="scss">
.card-auto-height3 {
  .card {
    @apply h-min;
  }
}
</style>
