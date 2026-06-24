<template>
    <div class="bg-white p-4 ">
        <div class="mb-3 flex justify-between items-center gap-20">
            <Button  @click="openNewTab"  icon="heroicons-outline:newspaper" text="Generate Feed"
                btnClass="btn-outline-primary rounded-[999px] " />

            <div class="mr-auto">
                <!-- Clickable text to copy the link -->
                <p class="copy-text m-0 cursor-pointer text-lg hover:text-blue-700" @click="copyLink">Click here to copy the
                    link</p>

                <!-- Notification message -->
                <!-- Notification modal -->
                <div v-if="isCopied" class="modal-backdrop fixed left-60 inset-0 flex items-center justify-center">
                    <div class="bg-white p-4 rounded-lg shadow-lg text-center modal-content">
                        <p class="text-blue-700 font-bold">Link copied to clipboard!</p>
                    </div>
                </div>



            </div>

            <!-- <button @click="openNewTab" class="text-black-500 hover:text-blue-700 transition-all text-lg pr-28">
                Generate Feed
            </button> -->
        </div>
        <div class="2xl:col-span-9 lg:col-span-8 col-span-12">

            <Card bodyClass="p-4">
                <div class="grid md:grid-cols-2 col-span-1 gap-4">
                    <div class="py-[18px] px-4 rounded-[6px]" v-for="(item, i) in statistics" :class="item.bg" :key="i">
                        <div class="flex items-center space-x-6 rtl:space-x-reverse">
                            <div class="flex-none">
                                <apexchart type="area" height="48" width="48" :options="item.name.chartOptions"
                                    :series="item.name.series" />
                            </div>
                            <div class="flex-1">
                                <div class="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                                    {{ item.title }}
                                </div>
                                <div class="text-slate-900 dark:text-white text-lg font-medium">
                                    {{ item.count }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>

    </div>

</template>
<script setup>
import axios from "@/store/axios";
import Button from "@/components/Button/index.vue";

import {

    shapeLine1,


} from "../home/Analytics-Component/data";
import { ref, onMounted } from 'vue';


const statistics = ref([
    {
        name: shapeLine1,
        title: "Vehicles in Feed",
        count: "Loading...",
        bg: "bg-[#E5F9FF] dark:bg-slate-900",
    },

])

const isCopied = ref(false);


const fetchData = async () => {

    try {
        // Fetch data from composite API
        const response = await axios.get('/web/get-feed-count', {

        });

        console.log(response.data)
        statistics.value[0].count = response.data.items_count;


    } catch (error) {
        //console.error("Error fetching composite API:", error);
    }
};

const openNewTab = () => {
    fetchData();
    const url = 'https://api.yokodrive.com/car_backend/public/api/web/get-feed';  // Replace with the desired link
    window.open(url, '_blank');  // Opens the link in a new tab
}

// Fetch data when the component is mounted

const copyLink = () => {

    const link = 'https://api.yokodrive.com/car_backend/public/api/web/get-feed';  // The link to be copied

    // Copy the link to the clipboard
    navigator.clipboard.writeText(link).then(() => {
        // Show the notification
        isCopied.value = true;
        // Hide the notification after 1 seconds
        setTimeout(() => {
            isCopied.value = false;
        }, 1000);
    }).catch(error => {
        console.error('Error copying text: ', error);
    });
}



onMounted(() => {
    fetchData();

});

</script>

<style scoped>
/* Modal backdrop with pseudo element for blur effect */
.modal-backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    left: 248px;
    /* High z-index to overlay everything */
}

.modal-backdrop::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    /* Semi-transparent overlay */
    backdrop-filter: blur(8px);
    /* Apply the blur effect */
    z-index: -1;
    /* Ensure the blur stays behind the modal content */
}

.modal-content {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    width: 16rem;
    text-align: center;
}
</style>