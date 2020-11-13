<template>
    <section class="filters">
        <ul>
            <li v-for="characterClass in classes" :key="characterClass.id">
                <input type="checkbox" :value="characterClass.name" :id="getCheckboxId(characterClass)" v-model="checkedClasses" @change="onCheckChanged()" />
                <label :for="getCheckboxId(characterClass)"><img class="class-icon" :src="getImageName(characterClass)" :alt="characterClass.name" /></label>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data: function() {
        return {
            classes: [
                {id: 1, name: 'Death Knight', slug: 'death-knight', specs: ['unholy', 'frost', 'blood']},
                {id: 2, name: 'Demon Hunter', slug: 'demon-hunter', specs: ['vengeance', 'havoc']},
                {id: 3, name: 'Druid', slug: 'druid', specs: ['balance', 'feral', 'restoration', 'guardian']},
                {id: 4, name: 'Hunter', slug: 'hunter', specs: ['survival', 'marksmanship', 'beast-mastery']},
                {id: 5, name: 'Mage', slug: 'mage', specs: ['frost', 'arcane', 'fire']},
                {id: 6, name: 'Monk', slug: 'monk', specs: ['windwalker', 'brewmaster', 'mistweaver']},
                {id: 7, name: 'Paladin', slug: 'paladin', specs: ['protection', 'holy', 'retribution']},
                {id: 8, name: 'Priest', slug: 'priest', specs: ['holy', 'discipline', 'shadow']},
                {id: 9, name: 'Rogue', slug: 'rogue', specs: ['subtlety', 'assassination', 'outlaw']},
                {id: 10, name: 'Shaman', slug: 'shaman', specs: ['restoration', 'elemental', 'enhancement']},
                {id: 11, name: 'Warlock', slug: 'warlock', specs: ['demonology', 'affliction', 'destruction']},
                {id: 12, name: 'Warrior', slug: 'warrior', specs: ['protection', 'fury', 'arms']},
            ],
            checkedClasses: [],
            checkedSpecs: [],
        }
    },

    methods: {
        getCheckboxId: function(characterClass) {
            return 'cb-' + characterClass.slug;
        },

        getImageName: function(characterClass) {
            return `/images/class-icons/${characterClass.slug}.jpg`
        },

        onCheckChanged: function() {
            this.$emit('filter', { classes: this.checkedClasses, specs: this.checkedSpecs })
        }
    }
}
</script>

<style scoped>
ul {
    margin-top: 1rem;
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100px;
    background-color: var(--main-bg-color);
}

input[type='checkbox'][id^='cb'] {
    display: none;
}

label {
    cursor: pointer;
}

.class-icon {
    border: 2px solid gold;
    border-radius: 50%;
    transition: 100ms ease-in;
}

.class-icon:hover {
    transform: scale(0.95);
}

:checked + label > .class-icon {
    border-color: green;
}

.filters {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
</style>