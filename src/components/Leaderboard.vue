<template>
    <ul class="leaderboard">
        <li class="entry" :class="[getEntryClassStyle(entry)]" v-for="entry in entries" :key="entry.id">
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
import axios from 'axios';

export default {
    data: function() {
        return {
            bracket: '2v2',
            entries: []
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
                })
                .catch(err => {
                    console.error(err);
                });
        },

        getEntryClassStyle: function(entry) {
            return entry.class.toLowerCase().split(' ').join('-');
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
        background-color: #1a2933;
    }

    .entry:nth-of-type(2n) {
        background-color: #263d4d;
    }

    .entry > div {
        flex: 1;
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