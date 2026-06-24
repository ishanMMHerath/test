import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

// import ListMake from "@/views/master/vehical/Make/list-make.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("@/views/auth/login/index.vue"),
    },
    {
        path: "/login2",
        name: "login2",
        component: () => import("@/views/auth/login/login2.vue"),
    },
    {
        path: "/login3",
        name: "login3",
        component: () => import("@/views/auth/login/login3.vue"),
    },
    {
        path: "/register",
        name: "reg",
        component: () => import("@/views/auth/register"),
    },
    {
        path: "/register2",
        name: "reg2",
        component: () => import("@/views/auth/register/register2"),
    },
    {
        path: "/register3",
        name: "reg3",
        component: () => import("@/views/auth/register/register3"),
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("@/views/auth/forgot-password.vue"),
    },
    {
        path: "/forgot-password2",
        name: "forgot-password2",
        component: () => import("@/views/auth/forgot-password2.vue"),
    },
    {
        path: "/forgot-password3",
        name: "forgot-password3",
        component: () => import("@/views/auth/forgot-password3.vue"),
    },
    {
        path: "/lock-screen",
        name: "lock-screen",
        component: () => import("@/views/auth/lock-screen.vue"),
    },
    {
        path: "/lock-screen2",
        name: "lock-screen2",
        component: () => import("@/views/auth/lock-screen2.vue"),
    },
    {
        path: "/lock-screen3",
        name: "lock-screen3",
        component: () => import("@/views/auth/lock-screen3.vue"),
    },
    {
        path: "/success-500",
        name: "success-500",
        component: () => import("@/views/auth/success.vue"),
    },
    {
        path: "/app",
        // name: "Layout",
        redirect: "/app/home",
        component: () => import("@/Layout/index.vue"),
        meta: {
            middleware: [auth],
        },
        children: [

            {
                path: "list-vehicle",
                name: "list-vehicle",
                component: () => import("@/views/vehicle/list-vehicle.vue"),
            },
            {
                path: "add-vehicle",
                name: "add-vehicle",
                component: () => import("@/views/vehicle/add-vehicle.vue"),
            },
            {
                path: "draft-vehicle",
                name: "draft-vehicle",
                component: () => import("@/views/vehicle/draft-vehicle/dratf-vehicle-list.vue"),
            },
            {
                path: "edit-vehicle/:id",
                name: "edit-vehicle",
                component: () => import("@/views/vehicle/edit-vehicle.vue"),
            },
            {
                path: "add-feature",
                name: "add-feature",
                component: () => import("@/views/vehicle/feature/add-feature.vue"),
            },
            {
                path: "edit-feature/:id",
                name: "edit-feature",
                component: () => import("@/views/vehicle/feature/edit-feature.vue"),
            },
            {
                path: "list-accessories",
                name: "list-accessories",
                component: () => import("@/views/accessories/list-accessories.vue"),
            },
            // Yehan Edit Accessories

            {
                path: "edit-accessories/:id",
                name: "edit-accessories",
                component: () => import("@/views/accessories/edit-accessories.vue"),
            },

            // Yehan Edit Accessories
            {
                path: "list-sections",
                name: "list-sections",
                component: () => import("@/views/vehicle/homepage-sections/list-homepage-sections.vue"),
            },
            {
                path: "add-sections",
                name: "add-sections",
                component: () => import("@/views/vehicle/homepage-sections/add-homepage-sections.vue"),
            },

            {
                path: "edit-sections-homepage/:id",
                name: "edit-sections-homepage", // Make sure this name matches exactly
                component: () => import("@/views/vehicle/homepage-sections/edit-homepage-sections.vue"),
            },

            {
                path: "add-label",
                name: "add-label",
                component: () => import("@/views/vehicle/label/add-label.vue"),
            },
            {
                path: "edit-label/:id",
                name: "edit-label",
                component: () => import("@/views/vehicle/label/edit-label.vue"),
            },

            {
                path: "list-label",
                name: "list-label",
                component: () => import("@/views/vehicle/label/list-label.vue"),
            },
            {
                path: "edit-sections/:id",
                name: "edit-sections",
                component: () => import("@/views/vehicle/label/edit-label.vue"),
            },
            {
                path: "vehicle-feature",
                name: "vehicle-feature",
                component: () => import("@/views/vehicle/feature/list-feature.vue"),
            },

            {
                path: "vehicle-feature-category",
                name: "vehicle-feature-category",
                component: () => import("@/views/vehicle/feature-category/list-feature-category.vue"),
            },
            {
                path: "vehicle-feature-category-add",
                name: "vehicle-feature-category-add",
                component: () => import("@/views/vehicle/feature-category/add-feature-category.vue"),
            },
            {
                path: "vehicle-feature-category-edit/:id",
                name: "vehicle-feature-category-edit",
                component: () => import("@/views/vehicle/feature-category/edit-feature-category.vue"),
            },
            {
                path: "add-accessories",
                name: "add-accessories",
                component: () => import("@/views/accessories/add-accessories.vue"),
            },
            {
                path: "vehicle-addon",
                name: "vehicle-addon",
                component: () => import("@/views/vehicle/addon/list-addon.vue"),
            },

            {
                path: "add-addon",
                name: "add-addon",
                component: () => import("@/views/vehicle/addon/add-addone.vue"),
            },
            {
                path: "add-shipping",
                name: "add-shipping",
                component: () => import("@/views/vehicle/shipping/add-shipping.vue"),
            },
            {
                path: "edit-shipping/:id",
                name: "edit-shipping",
                component: () => import("@/views/vehicle/shipping/edit-shipping.vue"),
            },
            {
                path: "vehicle-shipping",
                name: "vehicle-shipping",
                component: () => import("@/views/vehicle/shipping/list-shipping.vue"),
            },

            {
                path: "list-feeds",
                name: "list-feeds",
                component: () => import("@/views/feeds/list-feeds.vue"),
            },

            // New Feed End
            {
                path: "list-vehicle-feeds",
                name: "list-vehicle-feeds",
                component: () => import("@/views/feeds/list-vehicle-feeds.vue"),
            },

            // New Feed End
            {
                path: "add-feeds",
                name: "add-feeds",
                component: () => import("@/views/feeds/add-feeds.vue"),
            },
            {
                path: "accessories-leads",
                name: "accessories-leads",
                component: () => import("@/views/leads/accessories-leads.vue"),
            },
            {
                path: "reservations-leads",
                name: "reservations-leads",
                component: () => import("@/views/leads/reservations-leads.vue"),
            },
            {
                path: "service-leads",
                name: "service-leads",
                component: () => import("@/views/leads/service-leads.vue"),
            },
            {
                path: "inquiry-leads",
                name: "inquiry-leads",
                component: () => import("@/views/leads/inquiry-leads.vue"),
            },
            {
                path: "reservation-leads",
                name: "reservation-leads",
                component: () => import("@/views/leads/reservations-leads.vue"),
            },

            {
                path: "add-seo",
                name: "add-seo",
                component: () => import("@/views/seo/add-seo.vue"),
            },
            {
                path: "list-seo",
                name: "list-seo",
                component: () => import("@/views/seo/list-seo.vue"),
            },
            {
                path: "list-reviews",
                name: "list-reviews",
                component: () => import("@/views/reviews/list-reviews.vue"),
            },

            {
                path: "list-user",
                name: "list-user",
                component: () => import("@/views/user/list-user.vue"),
            },
            {
                path: "add-user",
                name: "add-user",
                component: () => import("@/views/user/add-user.vue"),
            },
              {
                path: "list-support-request",
                name: "list-support-request",
                component: () => import("@/views/support-request/list-support-request.vue"),
            },
            {
                path: "list-vehicle-masters",
                name: "list-vehicle-masters",
                component: () => import("@/views/master/vehical/list_vecical_master.vue"),
            },
            {
                path: "blank-page",
                name: "blank-page",
                component: () => import("@/views/blank-page.vue"),
            },
            {
                path: "notifications",
                name: "notifications",
                component: () => import("@/views/notifications.vue"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "home",
                name: "home",
                component: () => import("@/views/home/index.vue"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "ecommerce",
                name: "ecommerce",
                component: () => import("@/views/home/ecommerce.vue"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "banking",
                name: "banking",
                component: () => import("@/views/home/banking.vue"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "crm",
                name: "crm",
                component: () => import("@/views/home/crm.vue"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "project",
                name: "project",
                component: () => import("@/views/home/project.vue"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "changelog",
                name: "changelog",
                component: () => import("@/views/changelog.vue"),
            },

            // components
            {
                path: "button",
                name: "button",
                component: () => import("@/views/components/button/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "alert",
                name: "alert",
                component: () => import("@/views/components/alert/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "card",
                name: "card",
                component: () => import("@/views/components/card/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "carousel",
                name: "carousel",
                component: () => import("@/views/components/carousel.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "dropdown",
                name: "dropdown",
                component: () => import("@/views/components/dropdown/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "modal",
                name: "dodal",
                component: () => import("@/views/components/modal/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "tab-accordion",
                name: "tab-accordion",
                component: () => import("@/views/components/tab-accordion/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "badges",
                name: "badges",
                component: () => import("@/views/components/badges.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "tooltip-popover",
                name: "tooltip-popover",
                component: () => import("@/views/components/tooltip-popover.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "typography",
                name: "typography",
                component: () => import("@/views/components/typography.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "colors",
                name: "colors",
                component: () => import("@/views/components/colors.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "image",
                name: "image",
                component: () => import("@/views/components/image/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "video",
                name: "video",
                component: () => import("@/views/components/video.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "pagination",
                name: "pagination",
                component: () => import("@/views/components/pagination"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "progress-bar",
                name: "progress-bar",
                component: () => import("@/views/components/progress-bar/index.vue"),
                meta: {
                    groupParent: "components",
                },
            },
            {
                path: "placeholder",
                name: "placeholder",
                component: () => import("@/views/components/placeholder.vue"),
                meta: {
                    groupParent: "placeholder",
                },
            },


            {
                path: "list-body-type",
                name: "list-body-type",
                component: () => import("@/views/master/vehical/BodyType/ListBodyType.vue"),
            },
            {
                path: "add-body-type",
                name: "add-body-type",
                component: () => import("@/views/master/vehical/BodyType/AddBodyType.vue"),
            },


            // New Routes Yehan
            {
                path: "body-type/edit/:id",
                name: "edit-body-type",
                component: () => import("@/views/master/vehical/BodyType/EditBodyType.vue"),
            },
            //New Route Yehan

            {
                path: "list-make",
                name: "list-make",
                component: () => import("@/views/master/vehical/Make/ListMake.vue"),
            },
            {
                path: "add-make",
                name: "add-make",
                component: () => import("@/views/master/vehical/Make/AddMake.vue"),
            },

            // New Routes Yehan
            {
                path: "makes/edit/:id",
                name: "edit-make",
                component: () => import("@/views/master/vehical/Make/EditMake.vue"),
            },
            //New Route Yehan


            {
                path: "list-modal",
                name: "list-modal",
                component: () => import("@/views/master/vehical/Modal/ListModal.vue"),

            },
            {
                path: "add-modal",
                name: "add-modal",
                component: () => import("@/views/master/vehical/Modal/AddModal.vue"),
            },

            // New Routes Yehan
            {
                path: "modals/edit/:id",
                name: "edit-modal",
                component: () => import("@/views/master/vehical/Modal/EditModal.vue"),
            },

            //New Route Yehan

            {
                path: "list-year",
                name: "list-year",
                component: () => import("@/views/master/vehical/Year/ListYear.vue"),
            },
            {
                path: "add-year",
                name: "add-year",
                component: () => import("@/views/master/vehical/Year/AddYear.vue"),
            },


            // New Routes Yehan
            {
                path: "years/edit/:id",
                name: "edit-years",
                component: () => import("@/views/master/vehical/Year/EditYear.vue"),
            },

            //New Route Yehan

            {
                path: "list-fuel-type",
                name: "list-fuel-type",
                component: () => import("@/views/master/vehical/FuelType/ListFuelType.vue"),
            },
            {
                path: "add-fuel-type",
                name: "add-fuel-type",
                component: () => import("@/views/master/vehical/FuelType/AddFuelType.vue"),
            },


            // New Routes Yehan
            {
                path: "fuel/edit/:id",
                name: "edit-fuel",
                component: () => import("@/views/master/vehical/FuelType/EditFuelType.vue"),
            },

            //New Route Yehan

            {
                path: "list-color",
                name: "list-color",
                component: () => import("@/views/master/vehical/InteriorColor/ListColor.vue"),
            },
            {
                path: "add-color",
                name: "add-color",
                component: () => import("@/views/master/vehical/InteriorColor/AddColor.vue"),
            },

            // New Routes Yehan
            {
                path: "color/edit/:id",
                name: "edit-color",
                component: () => import("@/views/master/vehical/InteriorColor/EditInteriorColor.vue"),
            },
            //New Route Yehan


            //12/24
            {
                path:"hero-section",
                name:"hero-section",
                component: () => import("@/views/pages/hero-section.vue"),

            },

            {
                path:"edit-hero/:id",
                name:"edit-hero",
                component: () => import("@/views/pages/edit-hero.vue"),

            },

            {
                path:"popup-list",
                name:"popup-list",
                component: () => import("@/views/pages/popup-list.vue"),

            },

            {
                path:"edit-popup/:id",
                name:"edit-popup",
                component: () => import("@/views/pages/edit-popup.vue"),

            },

            {
                path:"happy-customers",
                name:"happy-customers",
                component: () => import("@/views/pages/happy-customer-list.vue"),

            },

            {
                path:"add-happy-customer",
                name:"add-happy-customer",
                
                component: () => import("@/views/pages/add-happy-customer.vue"),

            },

            {
                path:"faq-list",
                name:"faq-list",
                
                component: () => import("@/views/pages/faq-list.vue"),

            },

            {
                path:"add-faq",
                name:"add-faq",
                
                component: () => import("@/views/pages/faq-add.vue"),

            },

            {
                path:"edit-faq/:id",
                name:"edit-faq",
                
                component: () => import("@/views/pages/faq-edit.vue"),

            },

      


            {

                path: "list-ex-color",
                name: "list-ex-color",
                component: () => import("@/views/master/vehical/ExternalColors/ListExColor.vue"),
            },
            {
                path: "add-ex-color",
                name: "add-ex-color",
                component: () => import("@/views/master/vehical/ExternalColors/AddExColor.vue"),
            },

            // New Routes Yehan
            {
                path: "ex-color/edit/:id",
                name: "edit-exterior-color",
                component: () => import("@/views/master/vehical/ExternalColors/EditExColor.vue"),
            },
            //New Route Yehan

            {
                path: "list-transmission",
                name: "list-transmission",
                component: () => import("@/views/master/vehical/Transmission/ListTransmission.vue"),
            },
            {
                path: "add-transmission",
                name: "add-transmission",
                component: () => import("@/views/master/vehical/Transmission/AddTransmission.vue"),
            },

            // New Routes Yehan
            {
                path: "transmission/edit/:id",
                name: "edit-transmission",
                component: () => import("@/views/master/vehical/Transmission/EditTransmission.vue"),
            },
            //New Route Yehan


            {
                path: "list-inventory-status",
                name: "list-inventory-status",
                component: () => import("@/views/master/vehical/InventoryStatus/ListInventoryStatus.vue"),
            },
            {
                path: "add-inventory-status",
                name: "add-inventory-status",
                component: () => import("@/views/master/vehical/InventoryStatus/AddInventoryStatus.vue"),
            },
            // New Routes Yehan
            {
                path: "inventory-status/edit/:id",
                name: "edit-inventory-status",
                component: () => import("@/views/master/vehical/InventoryStatus/EditInventoryStatus.vue"),
            },
            //New Route Yehan


            {
                path: "list-jci-status",
                name: "list-jci-status",
                component: () => import("@/views/master/vehical/JciStatus/ListJciStatus.vue"),
            },
            {
                path: "add-jci-status",
                name: "add-jci-status",
                component: () => import("@/views/master/vehical/JciStatus/AddJciStatus.vue"),
            },

            // New Routes Yehan
            {
                path: "jci-status/edit/:id",
                name: "edit-jci-status",
                component: () => import("@/views/master/vehical/JciStatus/EditJciStatus.vue"),
            },
            //New Route Yehan


            {
                path: "list-seat",
                name: "list-seat",
                component: () => import("@/views/master/vehical/Seat/ListSeat.vue"),
            },
            {
                path: "add-seat",
                name: "add-seat",
                component: () => import("@/views/master/vehical/Seat/AddSeat.vue"),
            },

            // New Routes Yehan
            {
                path: "seat/edit/:id",
                name: "edit-seat",
                component: () => import("@/views/master/vehical/Seat/EditSeat.vue"),
            },
            //New Route Yehan


        
            {
                path: "list-faq",
                name: "list-faq",
                component: () => import("@/views/faq/list-faq.vue"),
            },
            {
                path: "add-pages",
                name: "add-pages",
                component: () => import("@/views/pages/add-pages.vue"),
            },
            {
                path: "list-pages",
                name: "list-pages",
                component: () => import("@/views/pages/list-pages.vue"),
            },
            // widgets
            {
                path: "basic",
                name: "basic",
                component: () => import("@/views/widgets/basic.vue"),
                meta: {
                    groupParent: "widgets",
                },
            },
            {
                path: "statistic",
                name: "statistic",
                component: () => import("@/views/widgets/statistic.vue"),
                meta: {
                    groupParent: "widgets",
                },
            },

            // forms
            {
                path: "input",
                name: "input",
                component: () => import("@/views/forms/input"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "input-group",
                name: "input-group",
                component: () => import("@/views/forms/input-group"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "input-layout",
                name: "input-layout",
                component: () => import("@/views/forms/input-layout"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "form-validation",
                name: "form-validation",
                component: () => import("@/views/forms/form-validation"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "form-wizard",
                name: "form-wizard",
                component: () => import("@/views/forms/form-wizard"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "form-repeater",
                name: "form-repeater",
                component: () => import("@/views/forms/form-repeater"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "input-mask",
                name: "input-mask",
                component: () => import("@/views/forms/input-mask"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "file-input",
                name: "file-input",
                component: () => import("@/views/forms/file-input"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "checkbox",
                name: "checkbox",
                component: () => import("@/views/forms/checkbox.vue"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "radio-button",
                name: "radio-button",
                component: () => import("@/views/forms/radio-button.vue"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "textarea",
                name: "textarea",
                component: () => import("@/views/forms/textarea"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "switch",
                name: "switch",
                component: () => import("@/views/forms/switch"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "select",
                name: "select",
                component: () => import("@/views/forms/select"),
                meta: {
                    groupParent: "forms",
                },
            },
            {
                path: "date-time-picker",
                name: "date-time-picker",
                component: () => import("@/views/forms/date-time-picker"),
                meta: {
                    groupParent: "forms",
                },
            },
            // table view
            {
                path: "table-basic",
                name: "table-basic",
                component: () => import("@/views/table/basic"),
                meta: {
                    groupParent: "Table",
                },
            },
            {
                path: "table-advanced",
                name: "table-advanced",
                component: () => import("@/views/table/advanced"),
                meta: {
                    groupParent: "Table",
                },
            },
            // chart
            {
                path: "appex-chart",
                name: "appex-chart",
                component: () => import("@/views/chart/appex-chart"),
                meta: {
                    groupParent: "charts",
                },
            },
            {
                path: "chartjs",
                name: "chartjs",
                component: () => import("@/views/chart/chartjs"),
                meta: {
                    groupParent: "charts",
                },
            },
            // app
            {
                path: "calender",
                name: "calender",
                component: () => import("@/views/app/calendar"),
            },
            {
                path: "todo",
                name: "todo",
                component: () => import("@/views/app/todo"),
                meta: {
                    hide: true,
                    appheight: true,
                },
            },
            {
                path: "kanban",
                name: "kanban",
                component: () => import("@/views/app/kanban"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "email",
                name: "email",
                component: () => import("@/views/app/email"),
                meta: {
                    groupParent: "Project",
                    hide: true,
                    appheight: true,
                },
            },
            {
                path: "projects",
                name: "projects",
                component: () => import("@/views/app/projects"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "project-details",
                name: "project-details",
                component: () => import("@/views/app/projects/project-details.vue"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "chat",
                name: "chat",
                component: () => import("@/views/app/chat"),
                meta: {
                    hide: true,
                    appheight: true,
                },
            },
            // normal pages
            {
                path: "invoice",
                name: "invoice",
                component: () => import("@/views/utility/invoice"),
                meta: {
                    groupParent: "Utility",
                },
            },
            {
                path: "invoice-preview",
                name: "invoice-preview",
                component: () => import("@/views/utility/invoice/invoice-preview"),
                meta: {
                    hide: true,
                },
            },
            {
                path: "invoice-edit",
                name: "invoice-edit",
                component: () => import("@/views/utility/invoice/invoice-edit"),
                meta: {
                    groupParent: "Utility",
                },
            },
            {
                path: "invoice-add",
                name: "invoice-add",
                component: () => import("@/views/utility/invoice/invoice-add"),
                meta: {
                    groupParent: "Utility",
                },
            },
            {
                path: "Pricing",
                name: "pricing",
                component: () => import("@/views/utility/pricing"),
                meta: {
                    groupParent: "Utility",
                },
            },
            // {
            //     path: "faq",
            //     name: "faq",
            //     component: () => import("@/views/utility/faq"),
            //     meta: {
            //         groupParent: "Utility",
            //     },
            // },
            {
                path: "blog",
                name: "blog",
                component: () => import("@/views/utility/blog"),
                meta: {
                    groupParent: "Utility",
                },
            },
            {
                path: "blog-details",
                name: "blog-details",
                component: () => import("@/views/utility/blog/blog-details"),
                meta: {
                    groupParent: "Utility",
                },
            },
            {
                path: "testimonial",
                name: "testimonial",
                component: () => import("@/views/utility/testimonial"),
                meta: {
                    groupParent: "Utility",
                },
            },
            {
                path: "map",
                name: "map",
                component: () => import("@/views/map"),
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("@/views/profile.vue"),
            },
            {
                path: "profile-setting",
                name: "profile-setting",
                component: () => import("@/views/profile.vue"),
            },
            {
                path: "settings",
                name: "settings",
                component: () => import("@/views/settings.vue"),
            },
            {
                path: "icons",
                name: "icons",
                component: () => import("@/views/icons.vue"),
            },
        ],
    },

    // {
    //     path: "list-make-new",
    //     name: "list-make-new",
    //     component: () => import("@/views/master/vehical/Make/ListMake.vue"),
    // },
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: () => import("@/views/404.vue"),
    },
    {
        path: "/coming-soon",
        name: "coming-soon",
        component: () => import("@/views/utility/comming-soon"),
    },
    {
        path: "/under-construction",
        name: "under-construction",
        component: () => import("@/views/utility/under-construction"),
    },
    {
        path: "/error",
        name: "error",
        component: () => import("@/views/error.vue"),
    },
];

export default routes;
