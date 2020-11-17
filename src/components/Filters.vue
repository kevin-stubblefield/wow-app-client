<template>
    <section class="filters">
        <ul>
            <li v-for="characterClass in classes" :key="characterClass.id">
                <input type="checkbox" :value="characterClass[0]" :id="getCheckboxId(characterClass[1].classSlug)" v-model="checkedClasses" @change="onCheckChanged()" />
                <label :for="getCheckboxId(characterClass[1].classSlug)"><img class="class-icon" :src="getClassImageName(characterClass[1].classSlug)" :alt="characterClass[0]" /></label>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data: function() {
        return {
            classes: [],
            checkedClasses: [],
            checkedSpecs: [],
        }
    },

    mounted: function() {
        this.isLoading = true;
        this.fetchClasses();
    },

    methods: {
        fetchClasses: function() {
            axios.get(`https://localhost:3000/specs`)
                .then(response => {
                    this.classes = this.mapClasses(response.data);
                    this.isLoading = false;
                })
                .catch(err => {
                    console.error(err);
                });
        },

        mapClasses: function(data) {
            let classMap = new Map();
            for(const item of data) {
                if (classMap.has(item.class)) {
                    let value = classMap.get(item.class);
                    value.specs.push({ spec: item.spec, slug: item.spec_slug });
                    classMap.set(item.class, value);
                } else {
                    let value = {
                        classSlug: item.class_slug,
                        specs: [{ spec: item.spec, slug: item.spec_slug }]
                    }
                    classMap.set(item.class, value);
                }
            }
            return Array.from(classMap);
        },

        getCheckboxId: function(slug) {
            return `cb-${slug}`;
        },

        getClassImageName: function(slug) {
            return `/images/class-icons/${slug}.jpg`;
        },

        getSpecImageName: function(slug) {
            return `/images/spec-icons/${slug}.jpg`;
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