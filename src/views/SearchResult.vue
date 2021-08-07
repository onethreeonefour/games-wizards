<template>
	<div class="search-results-container">
		<template v-if="!SearchResults.hasOwnProperty('length')">
			<div class="search-container loading-text">
				<div class="loading">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</template>
		<template v-else-if="SearchResults.hasOwnProperty('length') && SearchResults.length > 0">
			<h1 class="underline-heading">Search Results</h1>
			<div class="form">
				<form @submit.prevent="submit()">
					<input
						required
						v-model="Query"
						type="text"
						size="70"
						placeholder="Search over 400,000 games for PC, Xbox, Playstation and classic games!"
					/>
					<button type="submit">Search</button>
				</form>
			</div>
			<div className="landing-grid-container">
				<div v-for="(el, index) in SearchResults" :key="index" class="game-card">
					<a :href="$router.resolve({ name: 'GameDetails', params: { id: el.id } }).href">
						<img v-if="el.background_image" v-bind:src="el.background_image" alt="" />
						<img v-else src="../assets/404.png" alt="popular" />
						<div>
							<h2>{{ el.name }}</h2>
							<span
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
							</span>
							<span v-else class="metacritic">NA</span>
							<h5>{{ el.released }}</h5>
						</div>
					</a>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="search-container loading-text">
				<h1>No Results Found For {{ $route.params.query }}!</h1>
			</div>
		</template>
	</div>
</template>

<script>
import { API_KEY } from "../Config";
import axios from "axios";
export default {
	data() {
		return {
			SearchResults: {},
			Query: "",
		};
	},
	methods: {
		submit() {
			//if you want to send any data into server before redirection then you can do it here
			axios(`https://api.rawg.io/api/games?key=${API_KEY}&search=${this.Query}`).then((res) => {
				//console.log(res);
				this.SearchResults = res.data.results;
			});
		},
	},
	mounted() {
		axios(`https://api.rawg.io/api/games?key=${API_KEY}&search=${this.$route.params.query}`).then((res) => {
			//console.log(res);
			this.SearchResults = res.data.results;
		});
	},
};
</script>
<style scoped lang="scss">
.search-container {
	height: 80vh;
	display: grid;
	place-content: center;
}
.form {
	label {
		display: block;
	}
	input {
		padding: 0.6rem;
		border-radius: 0.5rem;
		margin-top: 10px;
	}
	button {
		cursor: pointer;
		margin-left: 0.5rem;
		padding: 0.5rem 2rem 0.5rem 2rem;
		background-color: black;
		color: white;
		border: 3px solid black;
		border-radius: 5px;
		font-size: 1rem;
		text-transform: uppercase;
	}
}
@media only screen and (max-width: 500px) {
	input {
		width: 100%;
		margin: 1rem auto;
	}
	button {
		width: 100%;
	}
}
</style>
