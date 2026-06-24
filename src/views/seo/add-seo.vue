<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <div class="xl:col-span-2">
      <Card title="SEO Details">
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
              label="Page"
              name="hmi_Fullname"
              type="text"
              placeholder="Page"
          />
<!--          <Textinput-->
<!--              label="Image"-->
<!--              name="hmi_email"-->
<!--              type="file"-->
<!--              placeholder="Image"-->
<!--          />-->
<!--          <Textinput-->
<!--              label="Video"-->
<!--              name="hmi_phone"-->
<!--              type="file"-->
<!--              placeholder="Video"-->
<!--          />-->
          <Textinput
              label="Title"
              name="hmi_password"
              type="text"
              placeholder="Title"
          />

          <Textinput
              label="URL"
              name="hmi_commpanyname"
              type="text"
              placeholder="URL"
          />
          <Textinput
              label="Canonical"
              name="hmi_commpanyname"
              type="text"
              placeholder="Canonical"
          />
          <Textinput
              label="Meta Title"
              name="hmi_commpanyname"
              type="text"
              placeholder="Meta Title"
          />

          <Textinput
              label="Meta Description"
              name="hmi_commpanyname"
              type="text"
              placeholder="Meta Description"
          />

          <Textinput
              label="Google Site Verification"
              name="hmi_commpanyname"
              type="text"
              placeholder="Google Site Verification"
          />

          <Textinput
              label="OG - Locale"
              name="hmi_commpanyname"
              type="text"
              placeholder="OG - Locale"
          />

          <Textinput
              label="OG - Type"
              name="hmi_commpanyname"
              type="text"
              placeholder="OG - Type"
          />

          <Textinput
              label="OG - Title"
              name="hmi_commpanyname"
              type="text"
              placeholder="OG - Title"
          />


          <Textinput
              label="OG - URL"
              name="hmi_commpanyname"
              type="text"
              placeholder="OG - URL"
          />

          <Textinput
              label="OG - Site Name"
              name="hmi_commpanyname"
              type="text"
              placeholder="OG - Site Name"
          />

          <Textinput
              label="Image"
              name="hmi_commpanyname"
              type="file"
              placeholder="Image"
          />

          <Textinput
              label="Image Alt"
              name="hmi_commpanyname"
              type="text"
              placeholder="Image Alt"
          />





          <!--          <Select label="Country" name="hmi_country" />-->
          <div class="space-y-5 flex justify-end items-end">
            <!--            <Checkbox label="Remember me" />-->
            <Button text="Submit" btnClass="btn-dark" />
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
};
</script>
<style lang="scss">
.card-auto-height3 {
  .card {
    @apply h-min;
  }
}
</style>
