<template>
    <div class="container">
        <transition name="fade">
            <div v-show="showToTop" @click="backToTop" class="to-top"><p>Back To Top</p></div>
        </transition>
        <select class="select" v-model="bracket" @change="onLeaderboardChanged">
            <option value="2v2" selected>2v2 Arenas</option>
            <option value="3v3">3v3 Arenas</option>
            <option value="rbg">Rated Battlegrounds</option>
        </select>
        <Filters @filter="onFilterChanged($event)" />
        <Loader v-show="isLoading" />
        <ul v-show="!isLoading" class="leaderboard" ref="entries">
            <li class="entry header">
                <div class="rank">Rank</div>
                <div class="rating">Rating</div>
                <div class="name">Name</div>
                <div class="faction">Faction</div>
                <div class="race">Race</div>
                <!--<div class="class">Class</div>-->
                <div class="spec">Spec</div>
                <!--<div class="played">Played</div>-->
                <div class="won">Won</div>
                <div class="lost">Lost</div>
            </li>
            <li v-for="entry in entries" :key="entry.id">
                <a :href="$router.resolve({ path: `/character/${entry.realm_slug}/${entry.name}`}).href">
                    <div class="entry" :class="[getEntryClassStyle(entry)]">
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
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import Filters from './Filters.vue';
import Loader from './Loader.vue';

import _ from 'lodash';
import axios from 'axios';

export default {
    components: {
        Filters,
        Loader,
    },

    data: function() {
        return {
            bracket: '2v2',
            limit: 50,
            offset: 0,
            isLoading: false,
            showToTop: false,
            entries: [],
            filter: { classes: [], specs: []},
        };
    },

    unmounted: function() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    mounted: function() {
        this.fetchLeaderboard();
        window.addEventListener('scroll', _.throttle(this.handleScroll, 300));
    },

    methods: {
        fetchLeaderboard: function() {
            this.filterLeaderboard(this.filter);
            this.offset += this.limit;
        },

        getEntryClassStyle: function(entry) {
            return entry.class.toLowerCase().split(' ').join('-');
        },

        filterLeaderboard: function(filter) {
            this.filter = filter;
            let url = `https://localhost:3000/leaderboard/${this.bracket}?limit=${this.limit}&offset=${this.offset}`;
            if (this.filter.classes.length > 0) {
                url += '&';
                url += this.filter.classes.map(c => `class=${c}`).join('&');
            }
            if (this.filter.specs.length > 0) {
                url += '&';
                url += this.filter.specs.map(s => `spec=${s}`).join('&');
            }
            
            axios.get(url).then(response => {
                this.entries.push(...response.data);
            })
            .catch(err => {
                console.error(err);
            });
        },

        onFilterChanged: function(filter) {
            this.offset = 0;
            this.entries = [];
            this.filter = filter;
            this.fetchLeaderboard();
        },

        onLeaderboardChanged: function() {
            this.offset = 0;
            this.entries = [];
            this.fetchLeaderboard();
        },

        goToCharacterDetail: function(realmSlug, characterName) {
            const routeData = this.$router.resolve({ path: `/character/${realmSlug}/${characterName}`});
            window.open(routeData.href, '_self');
        },

        handleScroll: function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                this.showToTop = true;
            } else {
                this.showToTop = false;
            }

            // console.log(this.$refs.entries.scrollHeight - (window.scrollY + window.innerHeight));

            if (this.$refs.entries.scrollHeight - (window.scrollY + window.innerHeight) <= 600) {
                this.fetchLeaderboard();
            }
        },

        backToTop: function() {
            window.scrollTo({
                top: 0, left: 0, behavior: 'smooth'
            });
        }
    }
}
</script>

<style scoped>
    .leaderboard {
        list-style: none;
    }

    .to-top {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        bottom: 50px;
        right: 50px;
        width: 75px;
        height: 75px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        transition: background-color .2s ease-in;
    }

    .to-top:hover {
        background-color: rgba(0, 0, 0, 0.75);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s, transform .3s;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }

    .header ~ li > a > .entry {
        cursor: pointer;
    }

    .header ~ li > a > .entry:hover {
        background-color: var(--row-hover);
    }

    .entry {
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        display: flex;
        background-color: var(--primary-bg);
    }

    .entry > div {
        flex: 1;
    }

    .entry.header {
        border-bottom: none;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }

    .entry.header div {
        font-weight: 700;
        font-size: 1.25rem;
    }

    .entry.header .won,
    .entry.header .lost {
        color: white;
    }

    .select {
        position: relative;
        cursor: pointer;
        line-height: 1.1;
        padding: 0.5rem 0.75rem;
        margin-top: .5rem;
        font-size: 16px;
        font-family: inherit;
        color: inherit;
        width: 100%;
        max-width: 100%;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23DDDDDD%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
        background-color: var(--primary-bg);
        border: 1px solid var(--select-border);
        border-radius: 5px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        transition: border-color .2s;
    }

    .select:hover {
        border-color: var(--select-hover);
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
        color: #81c784;
    }

    .lost {
        color: #e57373;
    }
</style>