<template>
  <div class="space-y-5">
    <tile-layer>Basic Information</tile-layer>
    <hr>
    <div class="row">
      <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        <router-link :to='{name:"list-make"}'>
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Vehicle Make</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-modal">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Vehicle Modal</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-year">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Vehicle Year</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-fuel-type">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Fuel Type</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-color">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Interior Colors</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-ex-color">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Exterior Colors</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-transmission">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Transmission</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-inventory-status">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Inventory Status</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-jci-status">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">JCI Status</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-body-type">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Body Type</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>
        <router-link to="/app/list-seat">
          <div
              class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
              :style="{
          backgroundImage:
            'url(' + widgetBg3 + ')',
        }"
          >
            <div class="flex-1">
              <div class="max-w-[180px]">
                <h4 class="text-2xl font-medium text-white mb-2">
                  <span class="block text-sm">Seat</span>
                  <br>
                </h4>
              </div>
            </div>
            <div class="flex-none">
              <Button
                  icon="heroicons-outline:eye"
                  text="View details"
                  btnClass="btn-light bg-white btn-sm "
              />
            </div>

          </div>
        </router-link>

      </div>
      <br>
<!--      <tile-layer>Features</tile-layer>-->
<!--      <br>-->
<!--      <br>-->
<!--      <hr>-->
<!--      <br>-->
<!--      <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">-->

<!--        <div-->
<!--            class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"-->
<!--            :style="{-->
<!--          backgroundImage:-->
<!--            'url(' + widgetBg3 + ')',-->
<!--        }"-->
<!--        >-->
<!--          <div class="flex-1">-->
<!--            <div class="max-w-[180px]">-->
<!--              <h4 class="text-2xl font-medium text-white mb-2">-->
<!--                <span class="block text-sm">Featuresss</span>-->
<!--                <br>-->
<!--              </h4>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="flex-none">-->
<!--            <Button-->
<!--                icon="heroicons-outline:eye"-->
<!--                text="View details"-->
<!--                btnClass="btn-light bg-white btn-sm "-->
<!--            />-->
<!--          </div>-->

<!--        </div>-->
<!--        &lt;!&ndash; ?? end Single ?? &ndash;&gt;-->

<!--      </div>-->
    </div>


  </div>
</template>
<script setup>
import Button from "@/components/Button";
import widgetBg1 from "@/assets/images/all-img/widget-bg-1.png";
import widgetBg2 from "@/assets/images/all-img/widget-bg-2.png";
import widgetBg3 from "@/assets/images/all-img/widget-bg-3.png";
import widgetBg3_1 from "@/assets/images/all-img/widget-bg-3-1.png";
import widgetBg4 from "@/assets/images/all-img/widget-bg-4.png";
import widgetBg5 from "@/assets/images/all-img/widget-bg-5.png";
import widgetBg6 from "@/assets/images/all-img/widget-bg-6.png";
import widgetBg7 from "@/assets/images/all-img/widget-bg-7.png";
import widgetBg8 from "@/assets/images/all-img/widget-bg-8.png";
import widgetVector from "@/assets/images/svg/widgetvector.svg";
import widgetVector2 from "@/assets/images/svg/widgetvector2.svg";
import rabbitImg from "@/assets/images/svg/rabit.svg";
import giftImg from "@/assets/images/svg/gift.svg";
import lineImg from "@/assets/images/svg/line.svg";
</script>
<style lang=""></style>
