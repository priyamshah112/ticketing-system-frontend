export const apipaths = {
    login: { url: "/login", method: "POST" },
    listroles: { url: "/roles", method: "GET" },
    addrole: { url: "/role/add", method: "POST" },
    deleterole: { url: "/role/delete", method: "POST" },
    updateProfile: { url: "/profile/update", method: "POST" },
    listusers: { url: "/users", method: "GET" },
    supportUsers: { url: "/support-users", method: "GET" },
    adduser: { url: "/user/add", method: "POST" },
    deleteuser: { url: "/user/delete", method: "POST" },
    listticket: { url: "/tickets", method: "GET" },
    addticket: { url: "/ticket/add", method: "POST" },
    closeticket: { url: "/ticket/status/close", method: "POST" },
    replyTicket: { url: "/ticket/reply", method: "POST" },
    assignTicket: { url: "/ticket/assign", method: "POST" },
    hardwareInventoryList: { url: "/inventory/Hardware", method: "GET" },
    softwareInventoryList: { url: "/software/inventory", method: "GET" },
    addInventorySoftware: { url: "/software/inventory/add", method: "POST" },
    deleteInventorySoftware: { url: "/software/inventory/delete", method: "POST" },
    deleteInventoryHardware: { url: "/inventory/delete", method: "POST" },
    addInventoryHardware: { url: "/inventory/Hardware/add", method: "POST" },
    assignInventory: { url: "/user/inventory", method: "POST" },
    unAssignInventory: { url: "/user/inventory/remove", method: "POST" },
    resetPassword: { url: "/reset-password", method: "POST" },
    changePassword: { url: "/change-password", method: "POST" },
    forgotPassword: {url: "/forgot-password", method:"POST"},
    getInventory: { url: "/user/get/inventory", method: "POST" },
    importInventory: { url: "/inventory/import", method: "POST" },
    importUser: { url: "/user/import", method: "POST" },
    assignInvToUser: { url: "/user/inventory", method: "POST" },
    usergetlist: {url: "/user/getlist" ,method:"GET"},
    faqList: {url: "/faqs", method: "GET"},
    addFaq: {url: "/faq/add", method: "POST"},
    dashboard: { url: "/dashboard", method: "GET" }, 
    userDashboard: { url: "/userdashboard", method: "GET" },
    getHardwareInventory:{url:"/hardware-inventory",method:"GET"},
    getTicketRequestByUser:{url:"/request-by-user",method:"GET"},
    getTicketPriority:{url:"/ticket-priority-level",method:"GET"},
    getTicketRequest:{url:"/ticket-request",method:"GET"},
    getTrackByCountry:{url:"/track-by-contry",method:"GET"},
    getUserData:{url:"/user-details", method:"GET"}
}