var host = window.location.protocol + "//" + window.location.host;
Vue.component('spinner', {
    template: '#spinner'
});

Vue.component('whois', {
    data() {
        return {
            loading: false,
            devices: null
        }
    },
    methods: {
        whois() {
            this.loading = true;
            axios.put(`${host}/api/bacnet/scan`).then(response => {
                this.devices = response.data;
                this.loading = false;
            });
        },
    }
});

Vue.component('device-scan', {
    data() {
        return {
            loading: false,
            deviceId: 2749,
            address: "10.0.0.10",
            objects: null
        }
    },
    methods: {
        scanDevice() {
            this.loading = true;
            axios.put(`${host}/api/bacnet/` + this.deviceId + '/objects', {
                deviceId: this.deviceId,
                address: this.address
            }).then(response => {
                this.objects = response.data;
                this.loading = false;
            });
        },
        getObjects(device) {
            console.log(device);
        }
    }
});

new Vue({
    el: "#app",
    data() {
        return {
            state: null,
        }
    },
    methods: {
        showWhois() {
            this.state = 'whois';
        },
        showObjects() {
            this.state = 'objects';
        }
    }
});