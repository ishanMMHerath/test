<template>
  <div>
    <Card noborder>
      <div
        class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center"
      >
        <h5 class="text-lg font-semibold text-slate-900 dark:text-white">
          Support Requests
        </h5>

        <InputGroup
          v-model="searchTerm"
          placeholder="Search support requests"
          type="text"
          prependIcon="heroicons-outline:search"
          merged
        />
      </div>

      <vue-good-table
        :columns="columns"
        styleClass="vgt-table bordered centered"
        :rows="advancedTable"
        :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
          selectioninfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectinfo: true,
          selectAllByGroup: true,
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'support_requests_id'">
            #{{ props.row.support_requests_id }}
          </span>

          <span v-if="props.column.field == 'owner_name'">
            {{ props.row.owner_name }}
          </span>

          <span v-if="props.column.field == 'email'">
            {{ props.row.email }}
          </span>

          <span v-if="props.column.field == 'mobile_number'">
            {{ props.row.mobile_country_code }} {{ props.row.mobile_number }}
          </span>

          <span v-if="props.column.field == 'vehicle_name'">
            {{ props.row.vehicle_name }}
          </span>

          <span v-if="props.column.field == 'support_category'">
            {{ props.row.support_category }}
          </span>

          <span v-if="props.column.field == 'subject'">
            {{ props.row.subject }}
          </span>

          <span v-if="props.column.field == 'status'" class="block w-full">
            <span
              class="inline-block px-3 min-w-[140px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-xs"
              :class="statusClass(props.row.status)"
            >
              {{ getStatusText(props.row.status) }}
            </span>
          </span>

          <span
            class="justify-center flex space-x-1"
            v-if="props.column.field == 'action'"
          >
            <Button
              icon="heroicons-outline:eye"
              btnClass="btn-outline-primary btn-sm"
              @click="showDetailsPopup(props.row)"
            />

            <Button
              icon="heroicons-outline:pencil-square"
              btnClass="btn-outline-warning btn-sm"
              @click="handleAction('edit', props.row.support_requests_id)"
            />
          </span>
        </template>

        <template #pagination-bottom="props">
          <div class="py-4 px-3">
            <Pagination
              :total="totalRecords"
              :current="current"
              :per-page="perpage"
              :pageRange="pageRange"
              @page-changed="current = $event"
              :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged"
              enableSearch
              enableSelect
              :options="options"
            />
          </div>
        </template>
      </vue-good-table>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button/index.vue";
import axios from "@/store/axios";
import Swal from "sweetalert2";

export default {
  components: {
    Button,
    Pagination,
    InputGroup,
    Card,
  },

  data() {
    return {
      advancedTable: [],
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      totalRecords: 0,

      statusOptions: {
        "1": "Open",
        "2": "In Progress",
        "3": "Pending Customer",
        "4": "Pending Third Party",
        "5": "Resolved",
        "6": "Closed",
        "7": "Reopened",
      },

      options: [
        {
          value: "10",
          label: "10",
        },
        {
          value: "25",
          label: "25",
        },
        {
          value: "50",
          label: "50",
        },
      ],

      columns: [
        {
          label: "ID",
          field: "support_requests_id",
        },
        {
          label: "Owner Name",
          field: "owner_name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Mobile",
          field: "mobile_number",
        },
        {
          label: "Vehicle",
          field: "vehicle_name",
        },
        {
          label: "Category",
          field: "support_category",
        },
        {
          label: "Subject",
          field: "subject",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("support-request/get-all");

        console.log("Support Requests:", response.data);

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          this.advancedTable = response.data.data.data;
          this.totalRecords =
            response.data.data.total || this.advancedTable.length;
        } else if (response.data && Array.isArray(response.data.data)) {
          this.advancedTable = response.data.data;
          this.totalRecords = this.advancedTable.length;
        } else if (Array.isArray(response.data)) {
          this.advancedTable = response.data;
          this.totalRecords = this.advancedTable.length;
        } else {
          this.advancedTable = [];
          this.totalRecords = 0;
        }
      } catch (error) {
        console.error("Error fetching support requests:", error.response || error);

        Swal.fire(
          "Error!",
          error.response?.data?.message ||
            "There was an error loading support requests.",
          "error"
        );
      }
    },

    getStatusText(status) {
      const statuses = {
        1: "Open",
        2: "In Progress",
        3: "Pending Customer",
        4: "Pending Third Party",
        5: "Resolved",
        6: "Closed",
        7: "Reopened",
      };

      return statuses[Number(status)] || "Unknown";
    },

    statusClass(status) {
      const statusCode = Number(status);

      return {
        "text-primary-500 bg-primary-500": statusCode === 1,
        "text-info-500 bg-info-500": statusCode === 2,
        "text-warning-500 bg-warning-500":
          statusCode === 3 || statusCode === 4,
        "text-success-500 bg-success-500": statusCode === 5,
        "text-slate-500 bg-slate-500": statusCode === 6,
        "text-danger-500 bg-danger-500": statusCode === 7,
      };
    },

    formatDate(date) {
      if (!date) {
        return "N/A";
      }

      return new Date(date).toLocaleString();
    },

    getValue(value) {
      if (value === null || value === undefined || value === "") {
        return "N/A";
      }

      return value;
    },

    popupRow(label, value) {
      return `
        <div class="support-popup-row">
          <div class="support-popup-label">${label}</div>
          <div class="support-popup-value">${this.getValue(value)}</div>
        </div>
      `;
    },

    showDetailsPopup(row) {
      Swal.fire({
        title: "Support Request Details",
        width: 760,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Close",
        buttonsStyling: false,
        customClass: {
          popup: "support-request-popup",
          confirmButton: "support-details-close",
        },
        html: `
          <div class="support-popup-wrap">
            <div class="support-popup-header">
              <h3>Request #${this.getValue(row.support_requests_id)}</h3>
              <p>${this.getValue(row.subject)}</p>
            </div>

            <div class="support-popup-body">
              ${this.popupRow("Owner Name", row.owner_name)}
              ${this.popupRow("Email Address", row.email)}
              ${this.popupRow(
                "Mobile Number",
                `${this.getValue(row.mobile_country_code)} ${this.getValue(
                  row.mobile_number
                )}`
              )}
              ${this.popupRow("Vehicle Name", row.vehicle_name)}
              ${this.popupRow("Vehicle Make", row.vehicle_make)}
              ${this.popupRow("Vehicle Model", row.vehicle_model)}
              ${this.popupRow("Vehicle Year", row.vehicle_year)}
              ${this.popupRow("VIN No", row.vin_no)}
              ${this.popupRow("Support Category", row.support_category)}
              ${this.popupRow("Subject", row.subject)}
              ${this.popupRow("Status", this.getStatusText(row.status))}
              ${this.popupRow("Created Date", this.formatDate(row.created_at))}

              <div class="support-popup-row message-row">
                <div class="support-popup-label">Message</div>
                <div class="support-popup-value support-message">
                  ${this.getValue(row.message)}
                </div>
              </div>
            </div>
          </div>
        `,
      });
    },

    async handleAction(action, id) {
      if (action === "edit") {
        const row = this.advancedTable.find(
          (item) => Number(item.support_requests_id) === Number(id)
        );

        if (!row) {
          Swal.fire("Error!", "Support request not found.", "error");
          return;
        }

        let currentStatus = Number(row.status);

        if (!currentStatus || ![1, 2, 3, 4, 5, 6, 7].includes(currentStatus)) {
          currentStatus = 1;
        }

        const { value: status } = await Swal.fire({
          title: "Update Status",
          input: "select",
          inputOptions: {
            "1": "Open",
            "2": "In Progress",
            "3": "Pending Customer",
            "4": "Pending Third Party",
            "5": "Resolved",
            "6": "Closed",
            "7": "Reopened",
          },
          inputValue: String(currentStatus),
          inputPlaceholder: "Select status",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Update",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            popup: "support-status-popup",
            confirmButton: "support-status-confirm",
            cancelButton: "support-status-cancel",
          },
          didOpen: () => {
            const select = Swal.getInput();

            if (select) {
              select.value = String(currentStatus);
            }
          },
          inputValidator: (value) => {
            if (!value) {
              return "Please select a status.";
            }

            if (![1, 2, 3, 4, 5, 6, 7].includes(Number(value))) {
              return "Invalid status selected.";
            }
          },
        });

        if (status) {
          try {
            await axios.put(`support-request/update/${id}`, {
              status: Number(status),
            });

            Swal.fire({
              title: "Updated!",
              text: "Support request status updated successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });

            this.fetchData();
          } catch (error) {
            console.error("Status update error:", error.response || error);

            Swal.fire(
              "Error!",
              error.response?.data?.message ||
                "There was an error updating the status.",
              "error"
            );
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
.support-request-popup {
  border-radius: 12px !important;
  padding: 0 !important;
  max-width: 760px !important;
}

.support-request-popup .swal2-title {
  font-size: 18px !important;
  line-height: 24px !important;
  color: #0f172a !important;
  padding-top: 22px !important;
}

.support-request-popup .swal2-html-container {
  margin: 12px 0 0 0 !important;
  padding: 0 22px 22px 22px !important;
  overflow: visible !important;
}

.support-request-popup .swal2-actions {
  display: flex !important;
  justify-content: center !important;
  gap: 10px !important;
  margin-top: 18px !important;
  padding-bottom: 20px !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.support-details-close {
  background: #0f172a !important;
  color: #ffffff !important;
  border: 1px solid #0f172a !important;
  padding: 9px 24px !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}

.support-popup-wrap {
  text-align: left;
  font-family: Arial, sans-serif;
  font-size: 13px;
}

.support-popup-header {
  background: #0f172a;
  color: #ffffff;
  padding: 14px 18px;
  border-radius: 8px 8px 0 0;
}

.support-popup-header h3 {
  margin: 0;
  font-size: 15px;
  line-height: 21px;
  color: #ffffff;
  font-weight: 700;
}

.support-popup-header p {
  margin: 4px 0 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #cbd5e1;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.support-popup-body {
  border: 1px solid #e5e7eb;
  border-top: 0;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  max-height: 65vh;
  overflow-y: auto;
}

.support-popup-row {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.support-popup-row:last-child {
  border-bottom: 0;
}

.support-popup-label {
  width: 34%;
  min-width: 180px;
  padding: 9px 12px;
  background: #f8fafc;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  color: #334155;
}

.support-popup-value {
  width: 66%;
  padding: 9px 12px;
  font-size: 12px;
  line-height: 18px;
  color: #334155;
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
}

.support-message {
  max-height: 180px;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 19px;
}

/* Status update popup */
.support-status-popup {
  border-radius: 12px !important;
  padding: 24px !important;
  min-height: auto !important;
}

.support-status-popup .swal2-title {
  font-size: 20px !important;
  line-height: 26px !important;
  margin-bottom: 15px !important;
  color: #333333 !important;
}

.support-status-popup .swal2-html-container {
  margin: 0 !important;
}

.support-status-popup .swal2-select {
  width: 100% !important;
  height: 48px !important;
  margin: 0 auto !important;
  padding: 8px 14px !important;
  font-size: 14px !important;
  border-radius: 8px !important;
  border: 1px solid #0f172a !important;
  color: #334155 !important;
  box-shadow: none !important;
}

.support-status-popup .swal2-actions {
  display: flex !important;
  justify-content: center !important;
  gap: 10px !important;
  margin-top: 24px !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.support-status-confirm {
  background: #0f172a !important;
  color: #ffffff !important;
  border: 1px solid #0f172a !important;
  padding: 9px 24px !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}

.support-status-cancel {
  background: #ffffff !important;
  color: #334155 !important;
  border: 1px solid #cbd5e1 !important;
  padding: 9px 24px !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}

@media (max-width: 640px) {
  .support-request-popup {
    width: 94% !important;
  }

  .support-popup-row {
    display: block;
  }

  .support-popup-label,
  .support-popup-value {
    width: 100%;
    min-width: unset;
    box-sizing: border-box;
  }

  .support-popup-label {
    padding-bottom: 4px;
  }

  .support-popup-value {
    padding-top: 4px;
  }

  .support-message {
    max-height: 220px;
  }

  .support-status-popup {
    width: 94% !important;
  }
}
</style>