<template>
  <h1 class="underline-heading">Similar Games</h1>
  <div className="suggested-grid-container">
    <div v-for="(el, index) in Suggested" :key="index" class="game-card">
      <a :href="$router.resolve({ name: 'GameDetails', params: { id: el.id } }).href">
        <img v-bind:src="el.background_image" alt="popular" />
        <div>
          <h2>{{ el.name }}</h2>
          <h5 v-if="el.metacritic !== null">{{ el.released }}</h5>
          <h5 v-else>TBD</h5>
          <h5
            v-if="el.metacritic !== null"
            class="metacritic"
            v-bind:style="[
              el.metacritic > 75
                ? { backgroundColor: 'green' }
                : el.metacritic > 65
                ? { backgroundColor: 'orange' }
                : { backgroundColor: 'red' },
            ]"
          >
            {{ el.metacritic }}
          </h5>
          <h5 v-else class="metacritic">NA</h5>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["Suggested"],
};
</script>
