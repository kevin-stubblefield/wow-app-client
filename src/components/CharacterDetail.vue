<template>
	<h2>{{ character.name }}</h2>
	<h3>{{ character.realm }}</h3>
</template>

<script>
import axios from 'axios';

export default {
	props: {
		realm: String,
		name: String,
	},

	data: function() {
		return {
			character: {}
		};
	},

	mounted: function() {
		this.fetchCharacter();
	},

	methods: {
		fetchCharacter: function() {
			axios.get(`https://localhost:3000/character/${this.realm}/${this.name}`)
				.then(response => {
					console.log(response.data);
					this.character = response.data;
				})
				.catch(err => {
					console.error(err);
				});
		}
	}
}
</script>

<style>

</style>