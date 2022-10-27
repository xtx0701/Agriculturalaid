Component({

        properties: {

        },

        data: {

        },

        methods: {
                changeUserName: function (event: any) {
                        console.log(event.detail.value.input);
                        this.triggerEvent('changeUserName', event.detail.value.input);
                }
        }
})
