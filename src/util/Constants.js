const Constants = {
    COLUMNS: [
        {
            key: 1,
            text: "System name",
            value: "System name",
            sort: "system_name",
        },
        {
            key: 1,
            text: "Type",
            value: "Type",
            sort: "type",
        },
        {
            key: 1,
            text: "HDD Capacity",
            value: "HDD Capacity",
            sort: "hdd_capacity",
        }
    ],
    DEVICE_TYPE: [
        {
            key: 1,
            text: "Windows Workstation",
            value: "WINDOWS_WORKSTATION"
        }, {
            key: 1,
            text: "Windows Server",
            value: "WINDOWS_SERVER"
        }, {
            key: 1,
            text: "Mac",
            value: "MAC"
        }
    ],
    LABELS: {
        filter_device: "Device Type",
    },
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE"
};

export default Constants;