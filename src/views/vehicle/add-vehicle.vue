<template>
  <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
    <Card title="Basic Information">
      <!--      <Horizental />-->

      <div class="space-y-4">
        <Textinput v-model="vehicle_name" :error="vehicle_name_errr" :mark="true" aria-required="true"
          label="Vehicle Name" name="vehicle_name" placeholder="Vehicle Name" type="text" />
        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Vehicle Make <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="vehicle_make_id" v-model="vehicle_make_id"
                :style="{ border: vehicle_make_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getModelsFromDb">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_make" :key="i" :value="item.makes_id">{{
                  item.name
                }}
                </option>
              </select>

              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="vehicle_make_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <!--======================validation message=================================-->
          <span v-if="vehicle_make_id_error" class="mt-2 text-danger-500 block text-sm">{{ vehicle_make_id_error
            }}</span>
          <!--======================validation part=================================-->
        </div>

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Vehicle Model<span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="vehicle_model_id" v-model="vehicle_model_id"
                :style="{ border: vehicle_model_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getLength">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_model" :key="i" :value="item.models_id">{{
                  item.name
                }}
                </option>
              </select>

              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="vehicle_model_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>

          <!--======================validation message=================================-->
          <span v-if="vehicle_model_id_error" class="mt-2 text-danger-500 block text-sm">{{ vehicle_model_id_error
            }}</span>
          <!--======================validation part=================================-->
        </div>
        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Vehicle Year <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="vehicle_year_id" v-model="vehicle_year_id"
                :style="{ border: vehicle_year_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_year" :key="i" :value="item.years_id">{{
                  item.name
                }}
                </option>
              </select>

              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="vehicle_year_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <span v-if="vehicle_year_id_error" class="mt-2 text-danger-500 block text-sm">{{ vehicle_year_id_error
            }}</span>
          <!--======================validation part=================================-->
        </div>

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Fuel Type <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="vehicle_fuel_type_id" v-model="vehicle_fuel_type_id"
                :style="{ border: vehicle_fuel_type_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in vehicle_fuel_type" :key="i" :value="item.fuel_types_id">{{
                  item.name
                }}
                </option>
              </select>

              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="vehicle_fuel_type_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <span v-if="vehicle_fuel_type_id_error" class="mt-2 text-danger-500 block text-sm">{{
            vehicle_fuel_type_id_error }}</span>
          <!--======================validation part=================================-->

        </div>


        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Exterior Colors <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="exterior_colors_id" v-model="exterior_colors_id"
                :style="{ border: exterior_colors_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in exterior_colors" :key="i" :value="item.exterior_colors_id">{{
                  item.name
                }}
                </option>
              </select>
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="exterior_colors_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>

          <span v-if="exterior_colors_id_error" class="mt-2 text-danger-500 block text-sm">{{ exterior_colors_id_error
            }}</span>
        </div>


        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Interior Colors <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="interior_colors_id" v-model="interior_colors_id"
                :style="{ border: interior_colors_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in interior_colors" :key="i" :value="item.interior_colors_id">{{
                  item.name
                }}
                </option>
              </select>

              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="interior_colors_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <!--======================validation message=================================-->
          <span v-if="interior_colors_id_error" class="mt-2 text-danger-500 block text-sm">{{ interior_colors_id_error
            }}</span>
          <!--======================validation part=================================-->
        </div>


        <Textinput v-model="chassis_no" :error="chassis_no_error" :mark="true" label="Chassis No" name="chassis_no"
          placeholder="Chassis No" type="text" />


        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Transmissions <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="transmissions_id" v-model="transmissions_id"
                :style="{ border: transmissions_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in transmissions" :key="i" :value="item.transmissions_id">{{
                  item.name
                }}
                </option>
              </select>
              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="transmissions_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <span v-if="transmissions_id_error" class="mt-2 text-danger-500 block text-sm">{{ transmissions_id_error
            }}</span>
          <!--======================validation part=================================-->
        </div>

        <Textinput v-model="video_URL" label="Video URL" name="video_url" placeholder="Video URL" type="text" />


        <Textarea v-model="description" label="Description" name="description" placeholder="Description" />

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Inventory Status <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="inventory_status_id" v-model="inventory_status_id"
                :style="{ border: inventory_status_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in inventory_status" :key="i" :value="item.name">{{
                  item.name
                }}
                </option>
              </select>
              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="inventory_status_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>

          <span v-if="inventory_status_id_error" class="mt-2 text-danger-500 block text-sm">{{ inventory_status_id_error
            }}</span>
          <!--======================validation part=================================-->
        </div>


        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Vehicle Labels <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="position" v-model="vehicle_label_id"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]"
                :style="{ border: vehicle_label_id_error ? 'solid 1px red' : '' }">
                <option value="">Select Options</option>
                <option v-for="(item, i) in vehicle_label" :key="i" :value="item.vehicle_labels_id">{{
                  item.name
                }}
                </option>
              </select>
              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="vehicle_label_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
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

      </div>
    </Card>


    <Card title=" ">
      <div class="space-y-4">


        <Textinput v-model="regular_price" :error="regular_price_error" :mark="true" label="Regular Price"
          name="regular_price" placeholder="Regular Price" type="number" />

        <Textinput v-model="sale_price" :error="sale_price_error" :mark="true" label="Sale Price" name="sale_price"
          placeholder="Sale Price" type="number" />
        <Textinput v-model="min_payment" :error="min_payment_error" :mark="true" label="Min Payment" name="min_payment"
          placeholder="Min Payment" type="number" />

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">JCI Status <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="jci_status" v-model="jci_status" :style="{ border: jci_status_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getjciValue">
                <option selected value="2">2 Years</option>
                <option selected value="no">no</option>

              </select>

              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="jci_status_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>

          <span v-if="jci_status_error" class="mt-2 text-danger-500 block text-sm">{{ jci_status_error }}</span>
          <!--======================validation part=================================-->
        </div>

        <div v-if="jci_boolean" style="display: flex; gap: 16px;">
          <Textinput v-model="jcl_year" label="JCI Year" name="jci_year" placeholder="JCI Year" style="flex: 1;"
            type="text" />
          <Textinput v-model="jcl_month" label="JCI Month" name="jci_month" placeholder="JCI Month" style="flex: 1;"
            type="text" />
        </div>

        <div class="fromGroup relative">
          <label class="inline-block input-label">Primary Body Type <span style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="body_type_p_id" :style="{ border: body_type_p_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in body_p_type" :key="i" :value="item.body_types_id">{{
                  item.name
                }}
                </option>
              </select>
              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="body_type_p_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <!--======================validation part=================================-->
          <span v-if="body_type_p_id_error" class="mt-2 text-danger-500 block text-sm">{{ body_type_p_id_error }}</span>
          <!--======================validation part=================================-->
        </div>


        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Secondary Body Type</label>
          <div class="relative">
            <div>
              <select id="body_type_s_id" class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in body_type_s" :key="i" :value="item.body_types_id">{{
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
          <label class="inline-block input-label">Seats <span style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="seats_id" v-model="seats_id" :style="{ border: seats_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item2, ip) in seats" :key="ip" :value="item2.seats_id">{{
                  item2.name
                }}
                </option>
              </select>
              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="seats_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>

          <!--======================validation part=================================-->
          <span v-if="seats_id_error" class="mt-2 text-danger-500 block text-sm">{{ seats_id_error }}</span>
          <!--======================validation part=================================-->
        </div>

        <div class="fromGroup relative">
          <!--          <label class="inline-block input-label" for="feature_category">Sizes</label>-->
          <div class="relative flex space-x-2">
            <Textinput v-model="s_length" :error="s_length_error" :mark="true" label="Length" name="length"
              placeholder="Length" type="text" />
            <Textinput v-model="s_width" :error="s_width_error" :mark="true" label="Width" name="width"
              placeholder="Width" type="text" />
            <Textinput v-model="s_height" :error="s_height_error" :mark="true" label="Height" name="height"
              placeholder="Height" type="text" />
          </div>
        </div>

        <Textarea v-model="note" label="Note" name="note" placeholder="Note" />

        <Textinput v-model="mileage" :error="mileage_error" :mark="true" label="Mileage(Km)" name="mileage"
          placeholder="Mileage" type="text" />

        <Textinput v-model="sku" :error="sku_error" :mark="true" label="SKU" name="sku" placeholder="SKU" type="text" />
        <!--        <span v-if="errors.sku" class="text-red-500">{{ errors.sku }}</span>-->

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">Home Page Sections <span
              style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="position" v-model="sections_id" :style="{ border: sections_id_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]">
                <option selected value="">Select Options</option>
                <option v-for="(item, i) in sections" :key="i" :value="item.homepage_sections_id">{{
                  item.sections_name
                }}
                </option>
              </select>

              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="sections_id_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>

          <!--======================validation part=================================-->
          <span v-if="sections_id_error" class="mt-2 text-danger-500 block text-sm">{{ sections_id_error }}</span>
          <!--======================validation part=================================-->
        </div>

        <div class="fromGroup relative">
          <label class="inline-block input-label" for="feature_category">JDM <span style="color: red">*</span></label>
          <div class="relative">
            <div>
              <select id="position" v-model="jdm" :style="{ border: jdm_error ? 'solid 1px red' : '' }"
                class="classinput input-control block w-full focus:outline-none min-h-[40px]" @change="getjdmiValue">
                <option value="">Select Options</option>
                <option selected value="1">Yes</option>
                <option value="0">No</option>

              </select>
              <!--======================validation part=================================-->
              <div class="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2">
                <span v-if="jdm_error" class="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
              <!--=======================================================-->
            </div>
            <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">

            </div>
          </div>
          <!--======================validation part=================================-->
          <span v-if="jdm_error" class="mt-2 text-danger-500 block text-sm">{{ jdm_error }}</span>
          <!--======================validation part=================================-->
        </div>


        <div v-if="jdm_boolean" style="display: flex; gap: 16px;">
          <Textinput v-model="jdm_year" label="JDM Year" name="jdm_year" placeholder="JDM Year" style="flex: 1;"
            type="text" />
          <Textinput v-model="jdm_month" label="JDM Month" name="jdm_month" placeholder="JDM Month" style="flex: 1;"
            type="text" />
        </div>



        <div class="">
      

           <AdvancedSelect
               :items="accessories" 
              v-model="selectedItem"/>
        </div>

    


      </div>
    </Card>



    <div class="xl:col-span-2 ">
      <Card bodyClass="p-0">
        <header
          class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-between items-center">
          <h6 class="card-title mb-0 text-blue-600">Features</h6>
        </header>

        <div class="p-6">
          <form novalidate @submit="onSubmit">
            <div class=" bg-white rounded-lg  ">
              <!-- Tabs Header -->
              <div class="flex border-b border-gray-200">
                <button v-for="(category_masters_object) in category_master_array" :key="category_masters_object.key"
                  @click="activeTab = category_masters_object.feature_categories_masters_id" :class="[
                    'px-4 py-2 text-gray-700 border-b-2',
                    activeTab === category_masters_object.feature_categories_masters_id
                      ? 'text-blue-500 border-blue-500'
                      : 'border-transparent hover:text-blue-500'
                  ]">
                  {{ category_masters_object.name }}
                </button>
              </div>
              <!-- Tabs Content -->
              <div class="mt-6 bg-slate-100 px-4 py-4 rounded">

                <template v-for="(field, idx) in sortedFeatureCategoryArray" :key="field.key"
                 v-show="activeTab === field.feature_categories_masters_id"
                class="flex items-center">
                <div 
                v-show="activeTab === field.feature_categories_masters_id"

                class="new-line mb-3" style="width: 60%;">
                  <div v-if="field.input_type === 'Check Box'" class="flex items-center justify-between">
                    <div>
                      <input :id="`checkbox-${idx}`" :name="`checkbox[${idx}]`"
                        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="checkbox" @click="filterFeatureCheckBox(idx)" />
                      <label :for="`checkbox-${idx}`" class="m-2">{{ field.name }}
                      </label>
                    </div>



                    <div class="flex gap-2">

                      <label :for="`highlight-${idx}`" class="text-sm  bg-black-400"
                        style=" padding: 2px 6px; border-radius: 2px; color: white">Highlight
                      </label>

                      <input :id="`highlight-${idx}`" :name="`highlight[${idx}]`" style=" background: red"
                        type="checkbox" @click="highlight(idx)" />
                    </div>



                  </div>



                  <div v-else-if="field.input_type === 'Select Box'" class="">
                    <div class="fromGroup relative">
                      <label :for="`select_${idx}`" class="inline-block input-label">
                        {{ field.name }}
                      </label>
                      <div class="grid grid-cols-2 gap-4 items-center">
                        <div class="w-full">
                          <select :id="`select_${idx}`" v-model="make_id" :name="`name[${idx}]`"
                            class="form-select block w-full min-h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg border-solid border-2 border-gray-200 w-100%"
                            @change="filterSelectValue(idx)">
                            <option selected value="NA">Select Options </option>
                            <option v-for="(item, i) in parseInputValues(field.input_values)" :key="i"
                              :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </div>
                        <div class="flex items-center justify-end gap-2">
                          <label :for="`highlight-${idx}`" class="inline-block text-sm bg-black-400"
                            style=" padding: 2px 6px; border-radius: 3px; color: white;">
                            Highlight
                          </label>
                          <input :id="`highlight-${idx}`" :name="`highlight[${idx}]`" style="" type="checkbox"
                            @click="highlight(idx)" />

                        </div>
                      </div>
                    </div>

                  </div>
                  <template v-else> none</template>
                </div>
           
              </template>
              



              </div>


            </div>

          </form>
        </div>

      </Card>
    </div>
  
    <!-- non tabs -->


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
                          <input :id="`checkbox-${idx}`" :name="`checkbox[${idx}]`"
                            class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="checkbox" @click="filterFeatureCheckBox(idx)" />
                          <label :for="`checkbox-${idx}`" class="m-2">{{ field.name }}
                          </label>
                        </div>



                        <div class="flex gap-2">

                          <label :for="`highlight-${idx}`" class="text-sm  bg-black-400"
                            style=" padding: 2px 6px; border-radius: 2px; color: white">Highlight
                          </label>

                          <input :id="`highlight-${idx}`" :name="`highlight[${idx}]`" style=" background: red"
                            type="checkbox" @click="highlight(idx)" />
                        </div>



                      </div>



                      <div v-else-if="field.input_type === 'Select Box'" class="">
                        <div class="fromGroup relative">
                          <label :for="`select_${idx}`" class="inline-block input-label">
                            {{ field.name }}
                          </label>
                          <div class="grid grid-cols-2 gap-4 items-center">
                            <div class="w-full">
                              <select :id="`select_${idx}`" v-model="make_id" :name="`name[${idx}]`"
                                class="form-select block w-full min-h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg border-solid border-2 border-gray-200 w-100%"
                                @change="filterSelectValue(idx)">
                                <option selected value="NA">Select Options </option>
                                <option v-for="(item, i) in parseInputValues(field.input_values)" :key="i"
                                  :value="item">
                                  {{ item }}
                                </option>
                              </select>
                            </div>
                            <div class="flex items-center justify-end gap-2">
                              <label :for="`highlight-${idx}`" class="inline-block text-sm bg-black-400"
                                style=" padding: 2px 6px; border-radius: 3px; color: white;">
                                Highlight
                              </label>
                              <input :id="`highlight-${idx}`" :name="`highlight[${idx}]`" style="" type="checkbox"
                                @click="highlight(idx)" />

                            </div>
                          </div>
                        </div>

                      </div>
                      <template v-else> none</template>
                    </div>
                    <template v-else></template>
                  </template>
                </div>


              </div>

              <div class="flex justify-between items-end space-x-5">
                <div class="flex-none relative">

                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div> -->


    <!-------------------------File Upload --------------------->
    <div class="xl:col-span-2">
      <Card title="Image upload ">
        <Fileinput multiple name="mulpreview" preview @input="handleFiles" />
      </Card>
    </div>
    <!--    <div class="xl:col-span-2">-->
    <!--      <ImageUpload/>-->
    <!--    </div>-->
    <!-- ------------------------- -->

    <div class="xl:col-span-2">
      <Card>
        <div class="row">
          <div class="text-right" style="margin-top: 10px">
            <Button :is-disabled="isDisabled" btnClass="btn-success rounded-[3px]"
              class="bg-blue-500 hover:bg-black-800 " style="margin-right: 29px !important;" text="Save To Draft"
              type="submit" @click="saveToDraft"></Button>
            <Button :is-disabled="isDisabled" btnClass="btn-success rounded-[3px]"
              class="bg-blue-500 hover:bg-black-800 " text="Publish" type="submit" @click="saveVehicle"></Button>


          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { useForm, useFieldArray } from "vee-validate";
import { computed } from "vue";
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

import AdvancedSelect from "@/components/Select/advancedSelect.vue";
import { onUpdated } from "vue";


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
    AdvancedSelect
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
    const sections = ref([]);
    const sections_id = ref(null);
    const sections_id_error = ref('');
    const vehicle_make = ref([]);
    const vehicle_make_id = ref(null);
    const vehicle_model_id = ref(null);
    const vehicle_model_id_error = ref(null);
    const vehicle_model = ref([]);
    const vehicle_year = ref([]);
    const vehicle_year_id = ref(null);
    const vehicle_year_id_error = ref(null);
    const vehicle_fuel_type = ref([]);
    const vehicle_fuel_type_id = ref(null);
    const vehicle_fuel_type_id_error = ref(null);
    const exterior_colors = ref([]);
    const exterior_colors_id = ref(null);
    const exterior_colors_id_error = ref(null);
    const interior_colors = ref([]);
    const interior_colors_id = ref(null);
    const interior_colors_id_error = ref(null);
    const chassis_no = ref("");
    const chassis_no_error = ref("");
    const sku = ref("");
    const sku_error = ref("");
    const transmissions = ref([]);
    const transmissions_id = ref(null);
    const transmissions_id_error = ref(null);
    const video_URL = ref("");
    const description = ref("");
    const inventory_status = ref([]);
    const inventory_status_id = ref(null);
    const inventory_status_id_error = ref(null);
    const regular_price = ref("");
    const regular_price_error = ref("");
    const sale_price = ref("");
    const sale_price_error = ref("");
    const min_payment = ref("");
    const min_payment_error = ref("");
    const jcl_year = ref(null);
    const jcl_month = ref(null);
    const body_p_type = ref([]);
    const body_type_s = ref([]);
    const seats = ref([]);
    const seats_id = ref(null);
    const s_length = ref('');
    const s_length_error = ref('');
    const s_width = ref('');
    const s_width_error = ref('');
    const s_height = ref('');
    const s_height_error = ref('');
    const note = ref(null);
    const mileage = ref(null);
    const mileage_error = ref('');
    const files = ref([]);
    const vehicle_id = ref(null);
    const jci_status = ref('');
    const jci_status_error = ref('');
    const highlight_more_array = ref([]);
    const highlight_array = ref([]);
    const jci_boolean = ref(false);
    const pictures = ref([]);
    const vehicle_label = ref([]);
    const vehicle_label_id = ref("");
    const vehicle_label_id_error = ref("");
    const position_id = ref("");
    const jdm = ref("");
    const jdm_error = ref("");
    const isDisabled = ref(false);
    const jdm_boolean = ref(false);
    const jdm_year = ref("");
    const jdm_month = ref("");
    const vehicle_name_errr = ref("");
    const vehicle_make_id_error = ref("");
    const body_type_p_id_error = ref("");
    const seats_id_error = ref("");
    const engine_capacity = ref("");
    const engine_capacity_error = ref("");

    const activeTab = ref(1);

    // 
    const accessories = ref([]);
    const selectedItem = ref([]); // Array to store selected values

   

    const handleFiles = (files) => {
      pictures.value = files;
      console.log(files);
    };


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

    const fetchData = async () => {

    };
    const filterFeatureCheckBox = (async (id) => {

      const element_id = "checkbox-" + id;
      const checked = document.getElementById(element_id).checked;

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
      console.log(feature_filter_array.value);
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
        console.log(response.data)
        feature_category_array.value = response.data;
        console.log('-----------------------')
        console.log(feature_category_array.value)
        console.log('-----------------------')
      } catch (e) {

      }
    });


    const validate = () => {

      if (!vehicle_name.value) {
        vehicle_name_errr.value = "vehicle name is required.";
      } else {
        vehicle_name_errr.value = "";
      }
      if (!min_payment.value) {
        min_payment_error.value = "vehicle min payment is required.";
      } else {
        min_payment_error.value = "";
      }
      console.log(s_length.value);
      if (!s_length.value) {
        s_length_error.value = "vehicle length is required.";
      } else {
        s_length_error.value = "";
      }
      if (!mileage.value) {
        mileage_error.value = "vehicle mileage is required.";
      } else {
        mileage_error.value = "";
      }


      if (!s_width.value) {
        s_width_error.value = "vehicle width is required.";
      } else {
        s_width_error.value = "";
      }
      if (!s_height.value) {
        s_height_error.value = "vehicle height is required.";
      } else {
        s_height_error.value = "";
      }

      // if (!sale_price.value) {
      //   sale_price_error.value = "vehicle sale price is required.";
      // } else {
      //   sale_price_error.value = "";
      // }

      if (!regular_price.value) {
        regular_price_error.value = "vehicle regular price is required.";
      } else {
        regular_price_error.value = "";
      }
      if (!sku.value) {
        sku_error.value = "vehicle sku is required.";
      } else {
        sku_error.value = "";
      }


      if (!chassis_no.value) {
        chassis_no_error.value = "vehicle chassis no is required.";
      } else {
        chassis_no_error.value = "";
      }

      if (vehicle_make_id.value === null || vehicle_make_id.value === '') {
        vehicle_make_id_error.value = "vehicle make is required.";
      } else {
        vehicle_make_id_error.value = "";
      }

      if (vehicle_model_id.value === null || vehicle_model_id.value === '') {
        console.log(vehicle_model_id_error.value)
        vehicle_model_id_error.value = "vehicle model is required.";
      } else {
        vehicle_model_id_error.value = "";
      }

      if (vehicle_year_id.value === null || vehicle_year_id.value === '') {
        vehicle_year_id_error.value = "vehicle year is required.";
      } else {
        vehicle_year_id_error.value = "";
      }

      if (transmissions_id.value === null || transmissions_id.value === '') {
        transmissions_id_error.value = "vehicle transmissions is required.";
      } else {
        transmissions_id_error.value = "";
      }

      if (vehicle_fuel_type_id.value === null || vehicle_fuel_type_id.value === '') {
        vehicle_fuel_type_id_error.value = "vehicle fuel type is required.";
      } else {
        vehicle_fuel_type_id_error.value = "";
        console.log(vehicle_fuel_type_id_error.value);
      }

      if (exterior_colors_id.value === null || exterior_colors_id.value === '') {
        exterior_colors_id_error.value = "vehicle exterior colors is required.";
      } else {
        exterior_colors_id_error.value = "";
      }

      if (interior_colors_id.value === null || interior_colors_id.value === '') {
        interior_colors_id_error.value = "vehicle interior colors is required.";
      } else {
        interior_colors_id_error.value = "";
      }

      if (inventory_status_id.value === null || inventory_status_id.value === '') {
        inventory_status_id_error.value = "vehicle inventory status is required.";
      } else {
        inventory_status_id_error.value = "";
      }

      if (vehicle_label_id.value === null || vehicle_label_id.value === '') {
        vehicle_label_id_error.value = "vehicle vehicle label is required.";
      } else {
        vehicle_label_id_error.value = "";
      }

      if (seats_id.value === null || seats_id.value === '') {
        seats_id_error.value = "vehicle seats is required.";
      } else {
        seats_id_error.value = "";
      }

      if (jci_status.value === null || jci_status.value === '') {
        jci_status_error.value = "vehicle jci status is required.";
      } else {
        jci_status_error.value = "";
      }

      const body_type_p_id = document.getElementById("body_type_p_id").value;
      if (body_type_p_id === null || body_type_p_id === '') {
        body_type_p_id_error.value = "vehicle primary body type is required.";
      } else {
        body_type_p_id_error.value = "";
      }
      if (sections_id.value === null || sections_id.value === '') {
        sections_id_error.value = "vehicle sections is required.";
      } else {
        sections_id_error.value = "";
      }

      if (jdm.value === null || jdm.value === '') {
        jdm_error.value = "vehicle jdm is required.";
      } else {
        jdm_error.value = "";
      }

      if (engine_capacity.value === null || engine_capacity.value === '') {
        engine_capacity_error.value = "vehicle engine capacity is required.";
      } else {
        engine_capacity_error.value = "";
      }


    };

    const saveVehicle = handleSubmit(async () => {

      console.log(validate())

      isDisabled.value = true;
      if (Number(sale_price.value) < Number(regular_price.value)) {
        const body_type_p_id = document.getElementById("body_type_p_id").value;
        const body_type_s_id = document.getElementById("body_type_s_id").value;
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
          "p_body_type_id": Number(body_type_p_id),
          "s_body_type_id": Number(body_type_s_id),
          "seats_id": seats_id.value,
          "length": s_length.value,
          "width": s_width.value,
          "height": s_height.value,
          "note": note.value,
          "mileage": mileage.value,
          "status": 1,
          "created_by": 1,
          "updated_by": 1,
          "features": feature_filter_array.value,
          "highlights": highlight_array.value,
          "homepage_sections_id": sections_id.value,
          "jdm": jdm.value,
          "jdm_year": jdm_year.value,
          "jdm_month": jdm_month.value,
          "engine_capacity": engine_capacity.value,
          "vehicles_label": vehicle_label_id.value,
          "accessories":selectedItem.value.length>0 ? selectedItem.value :
                        null,
        };
        console.log(pay_loard);
        try {
          const token = localStorage.getItem("token");
          document.getElementById('')
          const response = await axios.post(`vehicle/save`, pay_loard, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
          );
          highlight_more_array.value = [];
          feature_filter_array.value = [];
          console.log(response)
          if (response.status === 200) {

            const formData = new FormData();
            pictures.value.forEach((file, index) => {
              formData.append("image[]", file);
              formData.append(`image_order[${index}]`, index + 1); // Set the image order
              formData.append(`is_featured[${index}]`, index === 0 ? 1 : 0); // Set the first image as featured
            });
            formData.append("vehicle_id", response.data.vehicle.vehicle_id);


            console.log([...formData]);
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
                isDisabled.value = false;
                await Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: response.data.message,
                  customClass: {
                    confirmButton: 'swal-ok-button'
                  },
                });
                router.push('/app/list-vehicle'); // Redirect to body type list
              } else {
                await Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: response.data.message,
                  customClass: {
                    confirmButton: 'swal-ok-button'
                  },
                });
              }
            } catch (e) {
              isDisabled.value = false;
              console.log('error', e.message);
            }
          } else {
            isDisabled.value = false;
          }
        } catch (e) {
          isDisabled.value = false;


          if (e.response && e.response.data && e.response.data.errors && e.response.data.errors.sku && e.response.data.errors.sku[0]) {
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: e.response.data.errors.sku[0],
              customClass: {
                confirmButton: 'swal-ok-button'
              },
            });
          }
        }
      } else {
        isDisabled.value = false;
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Regular price should be less than sales price',
          customClass: {
            confirmButton: 'swal-ok-button'
          },
        });
      }

    });


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


    const getSections = (async () => {
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
          sections.value.push(data)
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
          body_p_type.value.push(data)
        })
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
          body_type_s.value.push(data)
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
      } catch (e) {

      }
    });

    const saveToDraft = (async () => {
      isDisabled.value = true;
      validate();
      const body_type_p_id = document.getElementById("body_type_p_id").value;
      const body_type_s_id = document.getElementById("body_type_s_id").value;
      console.log(body_type_p_id)
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
        "inventory_status": "active",
        "user_id": 1,
        "min_payment": min_payment.value,
        "jci_year": jcl_year.value,
        "jci_month": jcl_month.value,
        "p_body_type_id": Number(body_type_p_id),
        "s_body_type_id": Number(body_type_s_id),
        "seats_id": seats_id.value,
        "length": s_length.value,
        "width": s_width.value,
        "height": s_height.value,
        "note": note.value,
        "mileage": mileage.value,
        "status": 2,
        "created_by": 1,
        "updated_by": 1,
        "features": feature_filter_array.value,
        "highlights": highlight_array.value,
        "homepage_sections_id": sections_id.value,
        "jdm": jdm.value,
        "jdm_year": jdm_year.value,
        "jdm_month": jdm_month.value,
        "engine_capacity": engine_capacity.value,
        "vehicles_label": vehicle_label_id.value,
      };
      console.log(pay_loard);
      try {
        const token = localStorage.getItem("token");
        document.getElementById('')
        const response = await axios.post(`vehicle/save`, pay_loard, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
        );
        highlight_more_array.value = [];
        feature_filter_array.value = [];
        console.log(response)
        if (response.status === 200) {
          if (pictures.value.length !== 0) {
            const formData = new FormData();
            pictures.value.forEach((file, index) => {
              formData.append("image[]", file);
              formData.append(`image_order[${index}]`, index + 1); // Set the image order
              formData.append(`is_featured[${index}]`, index === 0 ? 1 : 0); // Set the first image as featured
            });
            formData.append("vehicle_id", response.data.vehicle.vehicle_id);

            // formData.append('vehicle_id', response.data.vehicle.vehicle_id);

            console.log([...formData]);
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
                  customClass: {
                    confirmButton: 'swal-ok-button'
                  },
                });
                isDisabled.value = false;
                router.push('/app/list-vehicle'); // Redirect to body type list
              } else {
                await Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: response.data.message,
                  customClass: {
                    confirmButton: 'swal-ok-button'
                  },
                });
              }
            } catch (e) {
              isDisabled.value = false;

              console.log('error', e.message);
            }
          } else {
            await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'save to draft successful',
              customClass: {
                confirmButton: 'swal-ok-button'
              },
            });
            router.push('/app/draft-vehicle');
          }


        } else {
          isDisabled.value = false;
        }
      } catch (e) {
        isDisabled.value = false;
        if (e.response && e.response.data && e.response.data.errors && e.response.data.errors.sku && e.response.data.errors.sku[0]) {
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.response.data.errors.sku[0],
            customClass: {
              confirmButton: 'swal-ok-button'
            },
          });
        }
        console.log('error', e.message);
      }
    });


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



    // --------------------------------------------------------------


    // Use ref() for reactive variables if needed
    onMounted(() => {


      console.log('Component mounted, fetching feature categories...');
      getFeatureCategory();
      getAllFeatureList();
      getSeats();
      get_S_BodyType();
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

      getAllAccessories();


    });
    return {
      onSubmit,
      remove,
      push,
      fields,
      fetchData,
      saveVehicle,
      vehicle_name_errr,
      saveToDraft,
      getAllFeatureList,
      filterFeatureCheckBox,
      feature_category_array,
      category_master_array,
      filterSelectValue,
      vehicle_name,
      sections,
      sections_id,
      sections_id_error,
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
      chassis_no,
      sku,
      jdm_boolean,
      jdm_year,
      jdm_month,
      transmissions,
      transmissions_id,
      highlight,
      video_URL,
      description,
      inventory_status,
      inventory_status_id,
      regular_price,
      regular_price_error,
      sale_price,
      min_payment,
      min_payment_error,
      jcl_year,
      jcl_month,
      body_p_type,
      body_type_s,
      seats,
      seats_id,
      s_length,
      s_length_error,
      s_width,
      s_width_error,
      s_height,
      s_height_error,
      note,
      mileage,
      mileage_error,
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
      getInputProps,
      getFeatureCategory,
      highlight_more_array,
      jci_status,
      jci_boolean,
      getModelsFromDb,
      getjciValue,
      getjdmiValue,
      position_id,
      isDisabled,
      vehicle_label,
      vehicle_label_id,
      vehicle_model_id_error,
      jdm,
      validate,
      getLabels,
      // highlight,
      ...rest,
      files,
      pictures,
      getSections,
      handleFiles,
      sku_error,
      sale_price_error,
      seats_id_error,
      body_type_p_id_error,
      jci_status_error,
      inventory_status_id_error,
      transmissions_id_error,
      chassis_no_error,
      vehicle_make_id_error,
      vehicle_year_id_error,
      vehicle_fuel_type_id_error,
      exterior_colors_id_error,
      interior_colors_id_error,
      vehicle_label_id_error,
      getLength,
      engine_capacity,
      engine_capacity_error,
      jdm_error,
      yearOptions: [], // Initialize yearOptions as an empty array
      capacityOptions: [], // Initialize capacityOptions as an empty array
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      selectedOption: { value: 'yes', label: 'Yes' }, // Set default value to "Yes"
      sortedFeatureCategoryArray,
      activeTab,

      selectedItem,
      accessories,
    };
  },
  mounted() {
    this.fetchData(); // Call fetchData() on component mount
  }
};
</script>

<style lang="scss">
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

.card-auto-height3 {
  .card {
    @apply h-min;
  }
}
</style>
