<template>
    <Filters @filter="filterLeaderboard($event)" />
    <ul class="leaderboard">
        <li class="entry header">
            <div class="rank">Rank</div>
            <div class="rating">Rating</div>
            <div class="name">Name</div>
            <div class="faction">Faction</div>
            <div class="race">Race</div>
            <!--<div class="class">{{ entry.class }}</div>-->
            <div class="spec">Spec</div>
            <!--<div class="played">{{ entry.played }}</div>-->
            <div class="won">Won</div>
            <div class="lost">Lost</div>
        </li>
        <li class="entry" :class="[getEntryClassStyle(entry)]" v-for="entry in filteredEntries" :key="entry.id">
            <div class="rank">{{ entry.rank }}</div>
            <div class="rating">{{ entry.rating }}</div>
            <div class="name">{{ entry.name }}</div>
            <div class="faction">{{ entry.faction }}</div>
            <div class="race">{{ entry.race }}</div>
            <!--<div class="class">{{ entry.class }}</div>-->
            <div class="spec">{{ entry.spec }}</div>
            <!--<div class="played">{{ entry.played }}</div>-->
            <div class="won">{{ entry.won }}</div>
            <div class="lost">{{ entry.lost }}</div>
        </li>
    </ul>
</template>

<script>
import Filters from './Filters.vue';

import axios from 'axios';

export default {
    components: {
        Filters,
    },

    data: function() {
        return {
            bracket: '2v2',
            entries: [],
            filteredEntries: []
        };
    },

    mounted: function() {
        this.fetchLeaderboard();
    },

    methods: {
        fetchLeaderboard: function() {
            axios.get(`https://localhost:3000/api/leaderboard/${this.bracket}`)
                .then(response => {
                    this.entries = response.data;
                    this.filteredEntries = response.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },

        getEntryClassStyle: function(entry) {
            return entry.class.toLowerCase().split(' ').join('-');
        },

        filterLeaderboard: function(filter) {
            if (filter.classes.length == 0 && filter.specs.length == 0) {
                this.filteredEntries = this.entries;
                return;
            }

            this.filteredEntries = this.entries.filter(value => {
                return filter.classes.includes(value.class);
            });
        }
    }
}
</script>

<style scoped>
    .leaderboard {
        list-style: none;
    }

    .entry {
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        display: flex;
        background-color: #131d13;
    }

    .entry:nth-of-type(2n) {
        background-color: #1b291b;
    }

    .entry > div {
        flex: 1;
    }

    .entry.header {
        border-bottom: none;
    }

    .entry.header div {
        font-weight: 700;
        font-size: 1.25rem;
    }

    .entry.header .won,
    .entry.header .lost {
        color: white;
    }

    .death-knight {
        color: #C41F3B;
    }

    .demon-hunter {
        color: #A330C9;
    }

    .druid {
        color: #FF7D0A;
    }

    .hunter {
        color: #A9D271;
    }

    .mage {
        color: #40C7EB;
    }

    .monk {
        color: #00FF96;
    }

    .paladin {
        color: #F58CBA;
    }

    .priest {
        color: #FFFFFF;
    }

    .rogue {
        color: #FFF569;
    }

    .shaman {
        color: #0070DE;
    }

    .warlock {
        color: #8787ED;
    }

    .warrior {
        color: #C79C6E;
    }

    .won {
        color: greenyellow;
    }

    .lost {
        color: red;
    }
</style>