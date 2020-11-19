<template>
	<h2>{{ character.name }}</h2>
	<h3>{{ character.realm }}</h3>

	<ul>
		<li v-for="item in character.equipped" :key="item.id">
			<span>{{ item.slot }}: <a :href="`https://www.wowhead.com/item=${item.id}`" :data-wowhead="`bonus=${item.bonuses}`">{{ item.name }}</a></span>
		</li>
	</ul>
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

		let script = document.createElement('script');
		script.setAttribute('src', '/wowhead.js');

		let externalScript = document.createElement('script');
		externalScript.setAttribute('src', 'https://wow.zamimg.com/widgets/power.js');

		document.head.appendChild(script);
		document.head.appendChild(externalScript);
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
a {
	text-decoration: none;
}
</style>