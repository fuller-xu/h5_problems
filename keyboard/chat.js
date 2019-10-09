var vm = new Vue({

	data: function() {
		return {
			array: Array.form(1000)
		}
	},
	created: function() {
		console.log(this.array);
	},
	methods: {

	}
})
vm.$mount('#app');
