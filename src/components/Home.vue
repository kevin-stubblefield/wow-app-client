<template>
    <div>
        <Filters />
        <Leaderboard />
    </div>
</template>

<script>
import Filters from './Filters.vue';
import Leaderboard from './Leaderboard.vue';

export default {
    name: 'Home',
    components: { Filters, Leaderboard }
}
</script>

<style>

</style>