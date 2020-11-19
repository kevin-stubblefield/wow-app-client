<template>
	<div class="container">
		<h2>{{ character.name }}</h2>
		<h3>{{ character.realm }}</h3>

		<div class="equipment-container">
			<section class="equipment">
				<div v-for="slot in slots" :key="slot">
					<span v-if="findEquipmentBySlot(slot).id > 0">{{ slot }}: <a :href="`https://www.wowhead.com/item=${findEquipmentBySlot(slot).id}`" :data-wowhead="`bonus=${findEquipmentBySlot(slot).bonuses}`" data-wh-rename-link="true" data-wh-icon-size="small"></a></span>
				</div>
			</section>

			<!--<section class="equipment grid">
				<div class="item" :class="{ main: slot === 'Main Hand', off: slot === 'Off Hand', 'col-3': i > 7 && slot !== 'Off Hand' && slot !== 'Main Hand' }" v-for="(slot, i) in slots" :key="slot">
					<span><a :href="`https://www.wowhead.com/item=${findEquipmentBySlot(slot).id}`" :data-wowhead="`bonus=${findEquipmentBySlot(slot).bonuses}`"></a></span>
				</div>
				<div v-if="character.media" class="character">
					<img :src="character.media.assets[3].value" />
				</div>
			</section>-->
		</div>
	</div>
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
			character: {},
			slots: [],
		};
	},

	created: async function() {
		await this.fetchCharacter();
		this.slots = ['Head','Neck','Shoulders','Back','Chest','Shirt','Tabard','Wrist','Hands','Waist','Legs','Feet','Ring 1','Ring 2','Trinket 1','Trinket 2','Main Hand','Off Hand'];
	},

	methods: {
		fetchCharacter: async function() {
			try {
				let response = await axios.get(`https://localhost:3000/character/${this.realm}/${this.name}`)
				this.character = response.data;
			} catch(err) {
				console.error(err);
			}
		},

		findEquipmentBySlot: function(slot) {
			if (this.character.equipped) {
				let gear = this.character.equipped.filter(item => item.slot === slot)[0];
				if (!gear) {
					gear = { id: 0, name: '', slot: slot, bonuses: '' };
				}
				return gear;
			} else {
				return {};
			}
		}
	}
}
</script>

<style>
a {
	text-decoration: none;
}

.character img {
	mix-blend-mode: screen;
	width: 600px;
}

.character {
	overflow: hidden;
	max-width: 300px;
	max-height: 400px;
	margin-top: -75px;
	margin-left: -50px;
	text-indent: -50%;
	grid-column: 2 / 4;
	grid-row: 1 / 8;
}

.item {
	z-index: 100;
	grid-column: 1 / 2;
}

.item.col-3 {
	grid-column: 4 / 5;
}

.item.main {
	grid-row: 8 / 9;
	grid-column: 2 / 3;
	justify-self: right;
}

.item.off {
	grid-row: 8 / 9;
	grid-column: 3 / 4;
}

.equipment.grid {
	max-width: 300px;
}

.grid {
	display: grid;
	grid-template-columns: 45px 1fr 1fr 45px;
	grid-template-rows: repeat(8, 45px);
	gap: 0;
	justify-content: center;
	align-items: center;
	height: 100%;
	grid-auto-flow: column;
}

.equipment-container {
	margin-top: 2rem;
}

.flex {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
</style>