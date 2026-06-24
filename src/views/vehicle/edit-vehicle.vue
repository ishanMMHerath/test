<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <Card title="Basic Information">
      <!--      <Horizental />-->

      <div class="space-y-4">
        <Textinput v-model="vehicle_name" label="Vehicle Name" name="vehicle_name" placeholder="Vehicle Name"
          type="text" />
        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Vehicle Make</label>
          <div class="relative">
            <div>
              <select id="vehicle_make_id" v-model="vehicle_make_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getModelsFromDb">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_make" :key="i" :value="item.makes_id">{{
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
          <label class="inline-block input-label" for="feature_category">Vehicle Model</label>
          <div class="relative">
            <div>
              <select id="vehicle_model_id" v-model="vehicle_model_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getLength">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_model" :key="i" :value="item.models_id">{{
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
          <label class="inline-block input-label" for="feature_category">Vehicle Year</label>
          <div class="relative">
            <div>
              <select id="vehicle_year_id" v-model="vehicle_year_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_year" :key="i" :value="item.years_id">{{
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
          <label class="inline-block input-label" for="feature_category">Fuel Type</label>
          <div class="relative">
            <div>
              <select id="vehicle_fuel_type_id" v-model="vehicle_fuel_type_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_fuel_type" :key="i" :value="item.fuel_types_id">{{
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
          <label class="inline-block input-label" for="feature_category">Exterior Colors</label>
          <div class="relative">
            <div>
              <select id="exterior_colors_id" v-model="exterior_colors_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in exterior_colors" :key="i" :value="item.exterior_colors_id">{{
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
          <label class="inline-block input-label" for="feature_category">Interior Colors</label>
          <div class="relative">
            <div>
              <select id="interior_colors_id" v-model="interior_colors_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in interior_colors" :key="i" :value="item.interior_colors_id">{{
                  item.name
                }}
                </option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>


        <Textinput v-model="chassis_no" label="Chassis No" name="chassis_no" placeholder="Chassis No" type="text" />


        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Transmissions</label>
          <div class="relative">
            <div>
              <select id="transmissions_id" v-model="transmissions_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in transmissions" :key="i" :value="item.transmissions_id">{{
                  item.name
                }}
                </option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <Textinput v-model="video_URL" label="Video URL" name="video_url" placeholder="Video URL" type="text" />


        <Textarea v-model="description" label="Description" name="description" placeholder="Description" />

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Inventory Status</label>
          <div class="relative">
            <div>
              <select id="inventory_status_id" v-model="inventory_status_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in inventory_status" :key="i" :value="item.name">{{
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
          <label class="inline-block input-label" for="feature_category">Vehicle Labels <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="position" v-model="vehicle_label_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option value="">Select Options</option>
                <option v-for="(item, i) in vehicle_label" :key="i" :value="item.vehicle_labels_id">{{
                  item.name
                }}
                </option>
              </select>
              <!--======================validation part=================================-->
              <!--              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">-->
              <!--                <span v-if="vehicle_label_id_error" class="text-danger-500">-->
              <!--                <Icon icon="heroicons-outline:information-circle"/>-->
              <!--                 </span>-->
              <!--              </div>-->
              <!--=======================================================-->

            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <span v-if="vehicle_label_id_error" class="mt-2 text-danger-500 block text-sm">{{ vehicle_label_id_error
            }}</span>
          <!--======================validation part=================================-->

        </div>

        <Textinput v-model="engine_capacity" :error="engine_capacity_error" :mark="true" label="Engine capacity (cc)"
          name="engine_capacity" placeholder="engine capacity" type="text" />

          <AdvancedSelect v-if="accessories && selected_accessories "
          :items="accessories" 
          v-model="selected_accessories"/>  

      </div>
    </Card>
    
    <Card title=" ">
      <div class="space-y-4">

        <Textinput v-model="regular_price" label="Regular Price" name="regular_price" placeholder="Regular Price"
          type="text" />
        <Textinput v-model="sale_price" label="Sale Price" name="sale_price" placeholder="Sale Price" type="text" />

        <Textinput v-model="min_payment" label="Min Payment" name="min_payment" placeholder="Min Payment" type="text" />

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">JCI Status</label>
          <div class="relative">
            <div>
              <select id="jci_status" v-model="jci_status"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getjciValue">
                <option selected value="2">2 Years</option>
                <option selected value="no">no</option>

              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <Textinput v-if="jci_boolean" v-model="jcl_year" label="JCI Year" name="jci_year" placeholder="JCI Year"
          type="text" />

        <Textinput v-if="jci_boolean" v-model="jcl_month" label="JCI Month" name="jci_year" placeholder="JCI Year"
          type="text" />

        <div class="fromGroup relative">
          <label class="inline-block input-label">Primary Body Type</label>
          <div class="relative">
            <div>
              <select v-model="p_body_type_id" @change="" id="p_body_type_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in p_body_type" :key="i" :selected="item.body_types_id ==
                  p_body_type_id" :value="item.body_types_id">{{
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
          <label class="inline-block input-label">Secondary Body Type</label>
          <div class="relative">
            <div>
              <select id="s_body_type_id" class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in s_body_type" :key="i" :selected="item.selected"
                  :value="item.s_body_type_id">{{
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
          <label class="inline-block input-label" for="feature_category">Seats</label>
          <div class="relative">
            <div>
              <select id="seats_id" v-model="seats_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in seats" :key="i" :value="item.seats_id">{{
                  item.name
                }}
                </option>
              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <!--        <Textinput-->
        <!--            label="Sizes"-->
        <!--            name="sizes"-->
        <!--            type="text"-->
        <!--            placeholder="Sizes"-->
        <!--            v-model="sizes"-->
        <!--        />-->

        <div class="fromGroup relative">
          <!--          <label class="inline-block input-label" for="feature_category">Sizes</label>-->
          <div class="relative flex space-x-2">
            <Textinput v-model="s_length" label="Length (cm)" name="length" placeholder="Length" type="text" />
            <Textinput v-model="s_width" label="Width (cm)" name="width" placeholder="Width" type="text" />
            <Textinput v-model="s_height" label="Height (cm)" name="height" placeholder="Height" type="text" />
          </div>
        </div>

        <Textarea v-model="note" label="Note" name="note" placeholder="Note" />

        <Textinput v-model="mileage" label="Mileage(Km)" name="mileage" placeholder="Mileage" type="text" />

        <Textinput v-model="sku" label="SKU" name="sku" placeholder="SKU" type="text" />

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Home Page Sections</label>
          <div class="relative">
            <div>
              <select id="position" v-model="sections_id"
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
          <label class="inline-block input-label" for="feature_category">JDM</label>
          <div class="relative">
            <div>
              <select id="position" v-model="jdm"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getjdmiValue">
                <option value="">Select Options</option>
                <option selected value="1">Yes</option>
                <option value="0">No</option>

              </select>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
        </div>

        <div class="formGroup">
          <!-- <label class="inline-block input-label" for="updated_date">Updated Date</label> -->
          <!-- <Textinput v-model="modifiedDate"  label="Updated Date"    type="date"/> -->
          <label class="inline-block input-label" for="modifiedDate">Updated Date</label>

          <input required type="date" id="modifiedDate" v-model="modifiedDate"
            class="input-control w-full block focus:outline-none h-[40px]" :max="getToday">
          <!-- <Textinput v-model="modifiedDate"  label="Updated Date"    type="date"/> -->

        </div>

        <div v-if="jdm_boolean" style="display: flex; gap: 16px;">
          <Textinput v-model="jdm_year" label="JDM Year" name="jdm_year" placeholder="JDM Year" style="flex: 1;"
            type="text" />
          <Textinput v-model="jdm_month" label="JDM Month" name="jdm_month" placeholder="JDM Month" style="flex: 1;"
            type="text" />
        </div>

     


      </div>
    </Card>

  <div class="xl:col-span-2 ">
    <Card bodyClass="p-0">
      <header class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-between items-center">
        <h6 class="card-title mb-0 text-blue-600">Features</h6>
      </header>

      <div class="p-6">
        <form novalidate @submit="onSubmit">
          <div class=" bg-white rounded-lg  ">
            <!-- Tabs Header -->
            <div class="flex border-b border-gray-200">
              <button v-for="(category_masters_object) in category_master_array" :key="category_masters_object.key"
                @click="activeTab = category_masters_object.feature_categories_masters_id"
                
                :class="[
                  'px-4 py-2 text-gray-700 border-b-2',
                  activeTab ===  category_masters_object.feature_categories_masters_id
                    ? 'text-blue-500 border-blue-500'
                    : 'border-transparent hover:text-blue-500'
                ]"
                >
                {{ category_masters_object.name }}
              </button>
            </div>
            <!-- Tabs Content -->
            <div class="mt-6 bg-slate-100 px-4 py-4 rounded">

              <template v-for="(field, idx) in sortedFeatureCategoryArray"
                v-show="activeTab === field.feature_categories_masters_id" :key="field.key" class="flex items-center">

                <div v-show="activeTab === field.feature_categories_masters_id
                " class="new-line mb-3" style="width:60%;">

                  <div v-show="field.input_type === 'Check Box'" class="flex items-center justify-between">

                    <div>
                      <input :id="`checkbox-${idx}`" :checked="isChecked(field)" :name="`checkbox[${idx}]`"
                        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-60"
                        type="checkbox" @click="filterFeatureCheckBox(idx)" />

                      <label :for="`checkbox-${idx}`" class="m-2">{{ field.name }}
                      </label>
                    </div>



                    <div class="flex gap-2">

                      <label :for="`highlight-${idx}`" class="text-sm  bg-black-400"
                        style=" padding: 2px 6px; border-radius: 2px; color: white">Highlight
                      </label>
                      |
                      <input :id="`highlight-${idx}`" :checked="isCheckedHighlight(idx)" :name="`highlight[${idx}]`"
                        style=" background: red" type="checkbox" @click="highlight(idx)" />
                    </div>






                  </div>

                  <div v-show="field.input_type === 'Select Box'" class="">
                    <div class="fromGroup relative">
                      <label class="inline-block input-label" for="feature_category">{{ field.name }}</label>
                      <div class="relative">
                        <div class="grid grid-cols-2 gap-4 items-center">
                          <div class="w-full">
                            <select :id="`select_${idx}`" :name="`name[${idx}]`"
                              class="form-select block w-full min-h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg border-solid border-2 border-gray-200 w-100%"
                              style="width: 100%" @change="filterSelectValue(idx)">
                              <option value="N/A">
                                Select Options
                              </option>
                              <option v-for="(item, i) in parseInputValues(
                                field.input_values
                              )" :key="i" :selected="isSelected(item)" :value="item">
                                {{ item }}
                              </option>
                            </select>
                          </div>
                          <div class="flex items-center justify-end gap-2">
                            <label :for="`highlight-${idx}`" class="inline-block text-sm  bg-black-400"
                              style=" padding: 2px 6px; color: white; border-radius:2px;">
                              highlight
                            </label>

                            |

                            <input :id="`highlight-${idx}`" :checked="isCheckedValue(idx)" :name="`highlight[${idx}]`"
                              type="checkbox" @click="highlight(idx)" />

                          </div>
                        </div>
                        <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                  
                </div>

              

              </template>



            </div>


          </div>

        </form>
      </div>

    </Card>
  </div>



    <!-- <div class="xl:col-span-2">

      <Card bodyClass="p-0">
        <header
          class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-between items-center">
          <h6 class="card-title mb-0 text-blue-600">Features</h6>
          <div>
          </div>

        </header>
        <div class="p-6">
          <form novalidate @submit="onSubmit">
            <div>
              <div v-for="(category_masters_object, idy) in category_master_array" :key="category_masters_object.key"
                class="grid grid-flow-row auto-rows-max gap-1 mb-5 last:mb-0  bg-slate-100 p-4 px-4 rounded-lg">
                <h6 class="mb-2 font-semibold">{{ category_masters_object.name }}</h6>
                <div class="flex flex-wrap gap-3 justify-between">
                  <template v-for="(field, idx) in sortedFeatureCategoryArray" :key="field.key"
                    class="flex items-center">
                    <div v-if="
                      category_masters_object.feature_categories_masters_id ===
                      field.feature_categories_masters_id
                    " class="new-line" style="width: calc(40% - 12px);">

                      <div v-if="field.input_type === 'Check Box'" class="flex items-center justify-between">

                        <div>
                          <input :id="`checkbox-${idx}`" :checked="isChecked(field)" :name="`checkbox[${idx}]`"
                            class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-60"
                            type="checkbox" @click="filterFeatureCheckBox(idx)" />

                          <label :for="`checkbox-${idx}`" class="m-2">{{ field.name }}
                          </label>
                        </div>



                        <div class="flex gap-2">

                          <label :for="`highlight-${idx}`" class="text-sm  bg-black-400"
                            style=" padding: 2px 6px; border-radius: 2px; color: white">highlight
                          </label>
                          |
                          <input :id="`highlight-${idx}`" :checked="isCheckedHighlight(idx)" :name="`highlight[${idx}]`"
                            style=" background: red" type="checkbox" @click="highlight(idx)" />
                        </div>






                      </div>

                      <div v-else-if="field.input_type === 'Select Box'" class="">
                        <div class="fromGroup relative">
                          <label class="inline-block input-label" for="feature_category">{{ field.name }}</label>
                          <div class="relative">
                            <div class="grid grid-cols-2 gap-4 items-center">
                              <div class="w-full">
                                <select :id="`select_${idx}`" :name="`name[${idx}]`"
                                  class="form-select block w-full min-h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg border-solid border-2 border-gray-200 w-100%"
                                  style="width: 100%" @change="filterSelectValue(idx)">
                                  <option value="N/A">
                                    Select Options
                                  </option>
                                  <option v-for="(item, i) in parseInputValues(
                                    field.input_values
                                  )" :key="i" :selected="isSelected(item)" :value="item">
                                    {{ item }}
                                  </option>
                                </select>
                              </div>
                              <div class="flex items-center justify-end gap-2">
                                <label :for="`highlight-${idx}`" class="inline-block text-sm  bg-black-400"
                                  style=" padding: 2px 6px; color: white; border-radius:2px;">
                                  highlight
                                </label>

                                |

                                <input :id="`highlight-${idx}`" :checked="isCheckedValue(idx)"
                                  :name="`highlight[${idx}]`" type="checkbox" @click="highlight(idx)" />

                              </div>
                            </div>
                            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2"></div>
                          </div>
                        </div>
                      </div>
                      <template v-else> none</template>
                    </div>
                    <template v-else></template>
                  </template>
                </div>
              </div>
            </div>
          </form>
        </div>


      </Card>
    </div> -->

    <!-------------------------File Upload --------------------->
    <div class="xl:col-span-2">
      <div class="xl:col-span-2">
        <Card title="Image Upload">

          <div>
            <draggable v-model="images_arr" class="image-grid " @end="updateUrls">
              <template v-slot:item="{ element, index }">
                <div class="flex flex-wrap  rtl:space-x-reverse relative">
                  <img :src="element.name" alt="Uploaded image" />

                  <div
                    class="flex justify-between flex-wrap absolute attr-wrapper h-full w-full py-2 px-3 left-0 content-between">


                    <div
                      style="margin-top: 0.3%;display: flex;height: 1.5rem;width: 1.5rem;align-items: center;justify-content: center;border-radius: 9999px;--tw-bg-opacity: 1;background-color: rgb(59 130 246 / var(--tw-bg-opacity));--tw-text-opacity: 1;color: rgb(255 255 255 / var(--tw-text-opacity));">
                      {{ index + 1 }}
                    </div>

                    <button class="text-sm" style="cursor: pointer;border-radius: 0.25rem;--tw-bg-opacity: 1;background-color: rgb(239 68 68 / var(--tw-bg-opacity)); padding: 0.25rem;--tw-text-opacity: 1;
                    color: rgb(255 255 255 / var(--tw-text-opacity));" @click="removeImage(index)">Remove
                    </button>

                    <div class="w-full flex">
                      <div v-if="index === 0" style="border-radius: 9999px;--tw-bg-opacity: 1;background-color: rgb(34 197 94 / var(--tw-bg-opacity)); padding-left: 0.5rem;padding-right: 0.5rem;padding-top: 0.25rem;padding-bottom: 0.25rem;font-size: 0.75rem;line-height: 1rem;--tw-text-opacity: 1;color: rgb(255 255 255 / var(--tw-text-opacity));
                        }">Featured
                      </div>
                    </div>


                  </div>

                </div>
              </template>
            </draggable>
          </div>
          <Fileinput multiple name="mulpreview" preview @input="handleFiles" />
        </Card>

      </div>
    </div>
    <!--    <div class="xl:col-span-2">-->
    <!--      <ImageUpload/>-->
    <!--    </div>-->
    <!-- ------------------------- -->

    <div class="xl:col-span-2">
      <Card>
        <div class="row">
          <div class="text-right" style="margin-top: 10px">

            <Button :is-disabled="isDisabled" btnClass=" btn-success rounded-[999px]"
              class="bg-blue-500 hover:bg-black-800 " text="Submit" type="submit" @click="saveVehicle"></Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { useForm, useFieldArray } from "vee-validate";
import Button from "@/components/Button/index.vue";
import Card from "@/components/Card/index.vue";
import Textinput from "@/components/Textinput/index.vue";
import Icon from "@/components/Icon/index.vue";
import axios from "@/store/axios";
import VueSelect from "@/components/Select/VueSelect.vue";
import { onMounted, ref } from "vue";
import DropZoneVue from "@/views/forms/file-input/DropZone.vue";
import { useDropzone } from "vue3-dropzone"; // Assuming axios is imported from the correct path
import ImageUpload from "./image-upload.vue";
import { useToast } from "vue-toastification";
import Textarea from "@/components/Textarea/index.vue";
import Fileinput from "@/components/Fileinput/index.vue";
import Swal from "sweetalert2";
import router from "@/router";
import { useRoute } from "vue-router";
import { computed } from "vue";
import draggable from 'vuedraggable';
import AdvancedSelect from "@/components/Select/advancedSelect.vue";

export default {
  components: {
    Fileinput,
    Textarea,
    DropZoneVue,
    VueSelect,
    Button,
    Card,
    Textinput,
    Icon,
    ImageUpload,
    draggable,
    AdvancedSelect,
  },
  methods: {
    parseInputValues(inputValues) {
      try {
        return JSON.parse(inputValues);
      } catch (error) {
        console.error('Invalid JSON:', inputValues);
        return [];
      }
    }
  },
  setup() {
    const toast = useToast();
    const feature_category_array = ref([]);
    const category_master_array = ref([]);

    const feature_filter_array = ref([]);
    const vehicle_name = ref("");
    const vehicle_make = ref([]);
    const sections = ref([]);
    const sections_id = ref(null);
    const vehicle_make_id = ref(null);
    const vehicle_model_id = ref(null);
    const vehicle_model = ref([]);
    const vehicle_year = ref([]);
    const vehicle_year_id = ref(null);
    const vehicle_fuel_type = ref([]);
    const vehicle_fuel_type_id = ref(null);
    const exterior_colors = ref([]);
    const exterior_colors_id = ref(null);
    const interior_colors = ref([]);
    const interior_colors_id = ref(null);
    const chassis_no = ref("");
    const sku = ref("");
    const transmissions = ref([]);
    const transmissions_id = ref(null);
    const video_URL = ref("");
    const description = ref("");
    const inventory_status = ref([]);
    const inventory_status_id = ref(null);
    const regular_price = ref("");
    const sale_price = ref("");
    const min_payment = ref("");
    const jcl_year = ref(null);
    const jcl_month = ref(null);
    const p_body_type = ref([]);
    const p_body_type_id = ref(null);
    const s_body_type = ref([]);
    const s_body_type_id = ref(null);
    const seats = ref([]);
    const seats_id = ref(null);
    const s_length = ref([]);
    const s_width = ref([]);
    const s_height = ref([]);
    const note = ref([]);
    const mileage = ref([]);
    const files = ref([]);
    const vehicle_id = ref(null);
    const jci_status = ref('');
    const highlight_array = ref([]);
    const jci_boolean = ref(false);
    const pictures = ref([]);
    const images_arr = ref([]);
    const main_vehicle = ref([]);
    const features_text_arr = ref([]);
    const position_id = ref("");
    const fb_edit = ref(false);
    const fc_edit = ref(true);
    const vehicle_ids = ref('');
    const jdm = ref('');
    const isDisabled = ref(false);
    const engine_capacity = ref("");
    const vehicle_label = ref([]);
    const vehicle_label_id = ref("");
    const jdm_year = ref("");
    const jdm_month = ref("");
    const jdm_boolean = ref(false);
    const modifiedDate = ref("");

    const modifiedTime = ref("00:00");

    // Accessories
    const selected_accessories  = ref(null);
    const accessories  = ref(null);

    // Yehan - Sort the array to group select and checkboxes
    const sortedFeatureCategoryArray = computed(() => {
      return feature_category_array.value.sort(function (a, b) {
        let x = a.input_type;
        let y = b.input_type;

        if (x.length < y.length) {
          return -1;
        }
        if (x.length > y.length) {
          return 1;
        }
        return 0;
      });
    });

    // Tabs
    const tabs = ref([
      { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
      { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
      { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
    ]);

    // Track the currently active tab
    const activeTab = ref(1);


    //  Get Todays 
    const getToday = computed(() => {
      return new Date().toISOString().slice(0, 10);
    })


    const handleFiles = (files) => {
      pictures.value = files;
      console.log(files);
    };

    const getLength = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`vehicle-model/get-by-id/` + vehicle_model_id.value, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          s_length.value = response.data.data.length
          s_height.value = response.data.data.height
          s_width.value = response.data.data.width
        }
      } catch (e) {
        console.log(e);
      }
    });

    const { handleSubmit } = useForm({
      initialValues: {
        links: ["https://github.com/logaretm"],
      },
    });


    function onDrop(acceptFiles) {
      files.value = acceptFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }

    const { remove, push, fields } = useFieldArray("links");
    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });


    const onSubmit = handleSubmit(() => {
      console.log('working');
    });

    const editFeatures = handleSubmit(() => {
      fb_edit.value = true;
      fc_edit.value = false;
    });

    const fetchData = async () => {

    };
    const filterFeatureCheckBox = (async (id) => {

      const element_id = "checkbox-" + id;
      const checked = document.getElementById(element_id).checked;

      console.log('check box checked');

      if (checked) {
        const ob = {
          features_masters_id: feature_category_array.value[id].features_masters_id,
          feature_value: "Yes"
        }
        feature_filter_array.value.push(ob)
      } else {
        const valueIndex = feature_filter_array.value.findIndex(
          (cc) => feature_category_array.value[id].features_masters_id === cc.features_masters_id
        );
        if (valueIndex !== -1) {
          feature_filter_array.value.splice(valueIndex, 1);
        }
      }
    });

    const filterSelectValue = (async (id) => {
      const element_id = "select_" + id;
      let appLoading = document.getElementById(element_id).value;
      if (appLoading === "N/A") {
        const valueIndex = feature_filter_array.value.findIndex(
          (cc) => feature_category_array.value[id].features_masters_id === cc.features_masters_id
        );
        if (valueIndex !== -1) {
          feature_filter_array.value.splice(valueIndex, 1);
        }
      } else {
        const same_array_index = feature_filter_array.value.findIndex((cc) => {
          return feature_category_array.value[id].features_masters_id === cc.features_masters_id;
        });

        if (same_array_index !== -1) {
          feature_filter_array.value.splice(same_array_index, 1);
        }

        const ob = {
          features_masters_id: feature_category_array.value[id].features_masters_id,
          feature_value: appLoading
        };
        feature_filter_array.value.push(ob);
      }
      console.log(feature_filter_array.value);
    });


    const getAllFeatureList = handleSubmit(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`features-masters/getAll`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );


        feature_category_array.value = response.data;

        console.log("feature category array", feature_category_array.value);

      } catch (e) {

      }
    });

    // const updateBodyType = (e)=>{
    //    p_body_type_id.value = e.target.value;
    //    alert(e.target.value)
    // }


    const saveVehicle = handleSubmit(async () => {
      // try {
      //
      // }catch (e){
      //
      // }
      console.log(highlight_array.value);
      isDisabled.value = true;
      feature_filter_array.value = [];
      if (Number(sale_price.value) < Number(regular_price.value)) {


        for (let p = 0; p < sortedFeatureCategoryArray.value.length; p++) {
          if (sortedFeatureCategoryArray.value[p].input_type === "Check Box") {
            const element_id = "checkbox-" + p;
            const checked = document.getElementById(element_id).checked;
            if (checked) {
              const ob = {
                features_masters_id: sortedFeatureCategoryArray.value[p].features_masters_id,
                feature_value: "Yes"
              }
              feature_filter_array.value.push(ob)
            }

          } else {
            const element_id = "select_" + p;
            let appLoading = document.getElementById(element_id).value;
            if (appLoading !== "N/A") {
              const ob = {
                features_masters_id: sortedFeatureCategoryArray.value[p].features_masters_id,
                feature_value: appLoading
              };
              feature_filter_array.value.push(ob);
            }
          }
        }

        if (jdm.value === 0) {
          jdm_year.value = '2';
          jdm_month.value = '0';
        }

        const pay_loard = {
          "vehicle_name": vehicle_name.value,
          "makes_id": vehicle_make_id.value,
          "models_id": vehicle_model_id.value,
          "years_id": vehicle_year_id.value,
          "fuel_types_id": vehicle_fuel_type_id.value,
          "exterior_colors_id": exterior_colors_id.value,
          "interior_colors_id": interior_colors_id.value,
          "chassis_no": chassis_no.value,
          "sku": sku.value,
          "transmissions_id": transmissions_id.value,
          "video_url": video_URL.value,
          "description": description.value,
          "regular_price": regular_price.value,
          "sale_price": sale_price.value,
          "inventory_status": inventory_status_id.value,
          "user_id": 1,
          "min_payment": min_payment.value,
          "jci_year": jcl_year.value,
          "jci_month": jcl_month.value,
          "p_body_type_id": p_body_type_id.value ?? 1,
          "s_body_type_id": 1,
          "seats_id": seats_id.value,
          "length": s_length.value,
          "width": s_width.value,
          "height": s_height.value,
          "note": note.value,
          "mileage": mileage.value,
          "status": 1,
          "created_by": 1,
          "updated_by": 1,
          "updated_at": `${modifiedDate.value} ${modifiedTime.value}:00`,
          "features": feature_filter_array.value,
          "highlights": highlight_array.value,
          "homepage_sections_id": sections_id.value,
          "jdm": jdm.value,
          "jdm_year": jdm_year.value,
          "jdm_month": jdm_month.value,
          "engine_capacity": engine_capacity.value,
          "vehicle_label_id": vehicle_label_id.value,
          "accessories": selected_accessories.value
        };

        console.log(pay_loard);
        try {
          const token = localStorage.getItem("token");
          console.log(vehicle_ids.value);
          const response = await axios.post(`vehicle/edit/${vehicle_ids.value}`, pay_loard, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          console.log(response);
          highlight_array.value = [];
          feature_filter_array.value = [];
          if (response.status === 200) {
            if (pictures.value.length !== 0) {
              const formData = new FormData();
              console.log(pictures.value);
              pictures.value.forEach((file, index) => {
                formData.append("image[]", file);
                formData.append(`image_order[${index}]`, index + 1); // Set the image order
                formData.append(`is_featured[${index}]`, index === 0 ? 1 : 0); // Set the first image as featured
              });


              // if (images_arr.value.length !== 0) {
              //   // for (let i = 0; i < images_arr.value.length; i++) {
              //   //   try {
              //   //     console.log(images_arr.value[i].name);
              //   //     const image_url = `http://localhost:8000/storage/images/1723461928kXxHfYtMFIHse17R.png`;
              //   //     const response = await fetch(image_url, { mode: 'cors' }); // Fetch with CORS mode
              //   //     if (!response.ok) {
              //   //       throw new Error(`Failed to fetch image: ${response.statusText}`);
              //   //     }
              //   //     const blob = await response.blob();
              //   //     const file = new File([blob], `image_${i}.jpg`, { type: blob.type });
              //   //     formData.append("image[]", file);
              //   //     formData.append(`image_order[${i}]`, i + 1);
              //   //     formData.append(`is_featured[${i}]`, i === 0 ? 1 : 0);
              //   //   } catch (error) {
              //   //     console.error('Error fetching image:', error);
              //   //   }
              //   // }
              //
              //   // for (const [i, image] of images_arr.value.entries()) {
              //   //   try {
              //   //     const image_url = `http://localhost:8000/storage/images/1723461928kXxHfYtMFIHse17R.png`;
              //   //     const response = await fetch(image_url, { mode: 'cors' });
              //   //     if (!response.ok) {
              //   //       throw new Error(`Failed to fetch image: ${response.statusText}`);
              //   //     }
              //   //     const blob = await response.blob();
              //   //     const file = new File([blob], `image_${i}.png`, { type: blob.type });
              //   //     formData.append("image[]", file);
              //   //     formData.append(`image_order[${i}]`, i + 1);
              //   //     formData.append(`is_featured[${i}]`, i === 0 ? 1 : 0);
              //   //   } catch (error) {
              //   //     console.error('Error fetching image:', error);
              //   //   }
              //   // }
              // }

              formData.append("vehicle_id", response.data.vehicle.vehicle_id);
              try {
                const token = localStorage.getItem("token");
                const response2 = await axios.post('image-file-upload/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                  }
                });

                if (response2.status === 200) {
                  console.log(response2)
                  console.log(response)
                  await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                  });
                  router.push('/app/list-vehicle'); // Redirect to body type list
                } else {
                  await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message,
                  });
                }
              } catch (e) {
                console.log('error', e.message);
              }
            } else {
              await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
              });
              isDisabled.value = false;
              router.push('/app/list-vehicle');
            }

          } else {
            isDisabled.value = false;
          }
        } catch (e) {
          isDisabled.value = false;
        }

      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Regular price should be less than sales price',
        });
        isDisabled.value = false;
      }
    });

    // --------------------------------------------------------------

    const getVehicleMake = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`makes/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          vehicle_make.value.push(data)
        })
      } catch (e) {

      }
    });

    const getVehicleModel = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`vehicle-model/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          vehicle_model.value.push(data)
        })
        // console.log(response.data)
        // feature_category_array.value = response.data;
      } catch (e) {

      }
    });

    const getVehicleYear = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`year/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          vehicle_year.value.push(data)
        })
      } catch (e) {

      }
    });

    const getVehicleFuelType = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`fuel-type/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          vehicle_fuel_type.value.push(data)
        })
      } catch (e) {

      }
    });

    const getExteriorColors = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`exterior-color/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          exterior_colors.value.push(data)
        })
      } catch (e) {

      }
    });


    const getInteriorColors = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`interior-color/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          interior_colors.value.push(data)
        })
      } catch (e) {

      }
    });


    const getTransmissions = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`transmission/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          transmissions.value.push(data)
        })
      } catch (e) {

      }
    });

    const getInventoryStatus = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`inventory-status/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          inventory_status.value.push(data)
        })
      } catch (e) {

      }

      // inventory_status.value.push(obj, obj2, ob3);
    });

    const get_P_BodyType = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`body-type/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          p_body_type.value.push(data);
          s_body_type.value.push(data);

        })
        console.log('------------------------')
        console.log(p_body_type.value)
        console.log('-----------------------')
      } catch (e) {

      }
    });

    const get_S_BodyType = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`body-type/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          // s_body_type.value.push(data)
        })
      } catch (e) {

      }
    });

    const getSeats = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`seats/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          seats.value.push(data)
        })
      } catch (e) {

      }
    });

    const getModelsFromDb = (async () => {
      vehicle_model.value = [];
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`vehicle-model/by-make/${vehicle_make_id.value}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );

        vehicle_model.value = [];
        response.data.forEach((data) => {
          // category_master_array.value.push(data);
          vehicle_model.value.push(data)
          console.log(data);
        })
      } catch (e) {

      }
    });


    const getFeatureCategory = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`feature-categories-masters/getAll`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );


        response.data.forEach((data) => {
          category_master_array.value.push(data);
        })

        console.log("Category Masters", category_master_array.value);
      } catch (e) {

      }
    });

    const getjciValue = (async () => {
      console.log(jci_status.value);
      if (jci_status.value === 'no') {
        jcl_month.value = null;
        jcl_year.value = null;
        jci_boolean.value = true;
      } else {
        jci_boolean.value = false;
        jcl_month.value = 0;
        jcl_year.value = 2;
      }

    });


    const fetchVehicleDetails = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`vehicle/get-by-id/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const vehicle = response.data;
        main_vehicle.value = response.data;
        console.log(vehicle);

        // Bind the fetched data to the form fields
        vehicle_name.value = vehicle.vehicle_name;
        vehicle_make_id.value = vehicle.makes_id;
        vehicle_model_id.value = vehicle.models_id;
        vehicle_year_id.value = vehicle.years_id;
        vehicle_fuel_type_id.value = vehicle.fuel_types_id;
        exterior_colors_id.value = vehicle.exterior_colors_id;
        interior_colors_id.value = vehicle.interior_colors_id;
        chassis_no.value = vehicle.chassis_no;
        sku.value = vehicle.sku;
        transmissions_id.value = vehicle.transmissions_id;
        video_URL.value = vehicle.video_url;
        description.value = vehicle.description;
        regular_price.value = vehicle.regular_price;
        sale_price.value = vehicle.sale_price;
        min_payment.value = vehicle.min_payment;
        jcl_year.value = vehicle.jci_year;
        jcl_month.value = vehicle.jci_month;
        p_body_type_id.value = vehicle.p_body_type_id;
        s_body_type_id.value = vehicle.s_body_type_id;
        seats_id.value = vehicle.seats_id;
        s_length.value = vehicle.length;
        s_width.value = vehicle.width;
        s_height.value = vehicle.height;
        note.value = vehicle.note;
        sections_id.value = vehicle.homepage_sections_id;
        mileage.value = vehicle.mileage;
        inventory_status_id.value = vehicle.inventory_status;
        jdm.value = vehicle.jdm;
        engine_capacity.value = vehicle.engine_capacity;
        vehicle_label_id.value = vehicle.vehicles_label;
        modifiedDate.value = vehicle.updated_at.slice(0, 10);
        // Bind other relevant fields as needed
        if (vehicle.jci_month === '0') {
          jci_status.value = 2;
          jci_boolean.value = false;
        } else {
          jci_boolean.value = true;
        }

        if (vehicle.jdm === '1') {
          jdm.value = 1;
          jdm_month.value = vehicle.jdm_month;
          jdm_year.value = vehicle.jdm_year;

          jdm_boolean.value = true;
        } else {
          jdm.value = 0;
          jdm_boolean.value = false;
        }

        highlight_array.value = vehicle.highlights.map(highlight => ({
          name: highlight.name,
          id_feature: highlight.id_feature
        }));
        console.log(highlight_array.value);
        vehicle.features.forEach((feature, index) => {
          const obj = {
            features_masters_id: feature.features_masters_id,
            feature_value: feature.feature_value,
            feature_categories_masters_id: feature.features_masters.feature_categories_masters_id,
            label: feature.features_masters.name,
          }

          features_text_arr.value.push(obj);
        });

        vehicle.images.forEach(image => {
          // const image_url = "http://localhost:8000/storage/images/" + image.name;
          const image_url = "https://api.yokodrive.com/car_backend/public/storage/images/" + image.name;
          const obj = {
            name: image_url
          }
          images_arr.value.push(obj);
        });
        // console.log(p_body_type.value[0].selected)
        for (let i = 0; i < p_body_type.value.length; i++) {
          if (Number(p_body_type.value[i].body_types_id) === Number(vehicle.p_body_type_id)) {
            p_body_type.value[i] = {
              ...p_body_type.value[i],
              selected: true
            };
            break;
          }
        }

        for (let i = 0; i < s_body_type.value.length; i++) {
          if (s_body_type.value[i].body_types_id === vehicle.s_body_type_id) {
            s_body_type.value[i] = {
              ...s_body_type.value[i],
              selected: true,
            };
            break;
          }
        }
       

        selected_accessories.value = vehicle.accessories;
        console.log("selected accessories",selected_accessories.value);


      } catch (e) {
        console.error('Error fetching vehicle details:', e.message);
      }
    };

    const getSections = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`home-page-sections/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          sections.value.push(data)
        })
      } catch (e) {

      }
    });

    const isCheckedHighlight = (index) => {
      const inputValueSet = sortedFeatureCategoryArray.value[index].name;
      for (let i = 0; i < highlight_array.value.length; i++) {
        if (inputValueSet === highlight_array.value[i].name) {
          return true;
        }
      }
    };
    const isCheckedValue = (index) => {
      const inputValueSet = JSON.parse(sortedFeatureCategoryArray.value[index].input_values);

      for (let i = 0; i < highlight_array.value.length; i++) {
        for (let j = 0; j < inputValueSet.length; j++) {
          if (highlight_array.value[i].name === inputValueSet[j]) {
            return true;
          }
        }
      }
    };
    const isSelected = ((item) => {
      for (let i = 0; i < main_vehicle.value.features.length; i++) {
        if (main_vehicle.value.features[i].feature_value === item) {
          return true;
        }
      }
    });


    const isChecked = ((item) => {

      for (let i = 0; i < main_vehicle.value.features.length; i++) {
        if (item.features_masters_id === main_vehicle.value.features[i].features_masters_id) {
          if (main_vehicle.value.features[i].feature_value === "Yes") {
            return true;
          }
        }
      }
    });

    const highlight = (id) => {
      if (sortedFeatureCategoryArray.value[id].input_type === "Select Box") {
        const select_id = 'select_' + id;
        const highlight_ids = 'highlight-' + id;
        const select_value = document.getElementById(select_id)?.value;
        const highlight_element = document.getElementById(highlight_ids);

        if (select_value === null || select_value === undefined || select_value === '') {
          if (highlight_element) {
            highlight_element.checked = false;

            Swal.fire({
              icon: 'error',
              title: 'Message',
              text: "First select the feature...",
              customClass: {
                confirmButton: 'swal-ok-button'
              },
              // buttonsStyling: false
            });
          } else {
            console.warn(`Element with ID '${highlight_ids}' not found.`);
          }
        } else {
          //push array
          console.log(sortedFeatureCategoryArray.value[id].features_masters_id);

          const is_exist = highlight_array.value.find((cc) => cc.id_feature === sortedFeatureCategoryArray.value[id].features_masters_id);

          if (is_exist === null || is_exist === undefined || is_exist === '') {
            let obj = {
              name: select_value,
              id_feature: sortedFeatureCategoryArray.value[id].features_masters_id

            }
            highlight_array.value.push(obj);
          } else {
            const index = highlight_array.value.findIndex((cc) => cc.id === sortedFeatureCategoryArray.value[id].features_masters_id);
            highlight_array.value.splice(index, 1);
          }
        }
      } else {
        // is check box
        const checkbox_id = 'checkbox-' + id;
        const checkbox_value = document.getElementById(checkbox_id);
        const highlight_ids = 'highlight-' + id;
        const highlight_element = document.getElementById(highlight_ids);
        if (!checkbox_value.checked) {
          highlight_element.checked = false;
          Swal.fire({
            icon: 'error',
            title: 'Message',
            text: "First select the feature...",
            customClass: {
              confirmButton: 'swal-ok-button'
            },
            // buttonsStyling: false
          });

        } else {
          // push array
          const is_exist = highlight_array.value.find((cc) => cc.name === sortedFeatureCategoryArray.value[id].name);

          if (is_exist === null || is_exist === undefined || is_exist === '') {
            let obj = {
              name: sortedFeatureCategoryArray.value[id].name,
              id_feature: sortedFeatureCategoryArray.value[id].features_masters_id

            }
            highlight_array.value.push(obj);
          } else {
            const index = highlight_array.value.findIndex((cc) => cc.name === sortedFeatureCategoryArray.value[id].name);
            highlight_array.value.splice(index, 1);
          }
        }
      }
      console.log(highlight_array.value);
    };


    const getjdmiValue = (async () => {
      console.log(jdm.value);
      if (jdm.value === '1') {
        console.log('working')
        jdm_month.value = null;
        jdm_year.value = null;
        jdm_boolean.value = true;
      } else {
        jdm_boolean.value = false;
        jdm_month.value = 0;
        jdm_year.value = 2;
      }

    });

    const removeImage = (async (index) => {

      const imageUrl = images_arr.value[index].name;
      const filename = imageUrl.split('/').pop();
      try {

        const obj = {
          name: filename
        }
        const token = localStorage.getItem("token");
        const response = await axios.post(`delete-images/image-delets`, obj, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        if (response.status === 200) {
          images_arr.value.splice(index, 1);
        }

      } catch (e) {

      }
    });

    const updateUrls = (() => {
      console.log('asdads');
      // this.$emit("input", images_arr.value.map(f => f.file));
    });

    const getLabels = (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`vehicle-label/get-all`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        response.data.forEach((data) => {
          vehicle_label.value.push(data)
        })
      } catch (e) {

      }
    });

        // get all accessories
    const getAllAccessories =  async ()=> {
        try {
          const response = await axios.get("web/accessories/get_all_accessories");
          accessories.value = response.data.data; 
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error as needed (e.g., show error message)
        }
      };

    onMounted(() => {
      getFeatureCategory();
      getAllFeatureList();
      getSeats();
      get_P_BodyType();
      getInventoryStatus();
      getTransmissions();
      getInteriorColors();
      getExteriorColors();
      getVehicleFuelType();
      getVehicleYear();
      getVehicleModel();
      getVehicleMake();
      getSections();
      getLabels();
     
      const route = useRoute();
      const id = route.params.id;
      vehicle_ids.value = route.params.id;
      if (id) {
        fetchVehicleDetails(id);
      }
      getAllAccessories();
      console.log('Component mounted, fetching feature categories...');
    });
    return {
      onSubmit,
      remove,
      editFeatures,
      fb_edit,
      fc_edit,
      push,
      fields,
      fetchData,
      saveVehicle,
      getAllFeatureList,
      filterFeatureCheckBox,
      feature_category_array,
      category_master_array,
      filterSelectValue,
      vehicle_name,
      vehicle_make,
      vehicle_make_id,
      vehicle_model_id,
      vehicle_model,
      vehicle_year,
      vehicle_year_id,
      vehicle_fuel_type,
      vehicle_fuel_type_id,
      exterior_colors,
      exterior_colors_id,
      interior_colors,
      interior_colors_id,
      getSections,
      chassis_no,
      isChecked,
      sku,
      transmissions,
      transmissions_id,
      video_URL,
      description,
      inventory_status,
      inventory_status_id,
      regular_price,
      sale_price,
      min_payment,
      getLabels,
      jcl_year,
      jcl_month,
      p_body_type,
      p_body_type_id,
      s_body_type,
      s_body_type_id,
      seats,
      seats_id,
      s_length,
      s_width,
      s_height,
      note,
      removeImage,
      mileage,
      getSeats,
      get_S_BodyType,
      get_P_BodyType,
      getInventoryStatus,
      getTransmissions,
      getInteriorColors,
      getExteriorColors,
      getVehicleFuelType,
      getVehicleYear,
      getVehicleModel,
      getVehicleMake,
      getRootProps,
      images_arr,
      getInputProps,
      getFeatureCategory,
      // addMoreHighlight,
      modifiedDate,
      getToday,
      jci_status,
      jci_boolean,
      getModelsFromDb,
      getjciValue,
      position_id,
      features_text_arr,
      sections_id,
      sections,
      isDisabled,
      vehicle_label_id,
      engine_capacity,
      highlight,
      isCheckedHighlight,
      ...rest,
      files,
      jdm_year,
      jdm_month,
      jdm_boolean,
      isCheckedValue,
      pictures,
      handleFiles,
      isSelected,
      updateUrls,
      jdm,
      vehicle_label,
      yearOptions: [], // Initialize yearOptions as an empty array
      capacityOptions: [], // Initialize capacityOptions as an empty array
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      selectedOption: { value: 'yes', label: 'Yes' }, // Set default value to "Yes"
      sortedFeatureCategoryArray,
      getLength,
      getjdmiValue,
      tabs, activeTab,

      selected_accessories,
      accessories,
    };
  },
  mounted() {
    this.fetchData(); // Call fetchData() on component mount

    // 

  }
};
</script>

<style lang="scss">
.card-auto-height3 {
  .card {
    @apply h-min;
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: -20px;
  margin-bottom: 28px;
}

.attr-wrapper {
  margin-left: 0;
}

.image-item {
  width: 100%;
  height: 100px;
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swal-ok-button {
  background-color: #3b82f6 !important;
  color: white !important;
  border: 2px solid #3b82f6 !important;
  border-radius: 8px !important;
  padding: 10px 20px !important;
}

.swal-ok-button:hover {
  background-color: white !important;
  color: black !important;
  border: 1px solid black !important;
  border-radius: 8px !important;
  padding: 10px 20px !important;
}
</style>
