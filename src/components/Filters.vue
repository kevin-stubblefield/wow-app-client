<template>
    <ul>
        <li v-for="characterClass in classes" :key="characterClass.id">
            <input type="checkbox" :id="getCheckboxId(characterClass)" />
            <label :for="getCheckboxId(characterClass)"><img class="class-icon" :src="getImageName(characterClass)" :alt="characterClass.name" /></label>
        </li>
    </ul>
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
            ]
        }
    },

    methods: {
        getCheckboxId: function(characterClass) {
            return 'cb-' + characterClass.slug;
        },

        getImageName(characterClass) {
            return `/images/class-icons/${characterClass.slug}.jpg`
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
}

:checked + label > .class-icon {
    border-color: green;
}
</style>