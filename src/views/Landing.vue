<template>
	<template v-if="Hero.length > 0 && PopularReleases.length > 0">
		<div
			className="hero-container"
			v-bind:style="{
				backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%),url(${Hero[0].background_image})`,
			}"
		>
			<div className="cta-container">
				<h1>Games Wizards</h1>
				<h2>The Most Complete Videogames Compendium</h2>
				<form @submit="submit()" method="post">
					<label for="query">Search The Dungeon From Over 400,000+ Videogames!</label>
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
			<div className="hero-details">
				<h1>{{ Hero[0].name }}</h1>
				<span v-for="(el, index) in genres" v-bind:key="index">{{ el.name }}</span>
			</div>
		</div>
		<div className="landing-container">
			<h1 className="underline-heading">Popular Releases</h1>
			<div className="landing-grid-container">
				<div v-for="(el, index) in PopularReleases[0]" :key="index" class="game-card">
					<a :href="$router.resolve({ name: 'GameDetails', params: { id: el.id } }).href">
						<img v-bind:src="el.background_image" alt="popular" />
						<div>
							<div className="platform-span" v-for="(span, index) in el.platforms" :key="index">
								<img :src="getImgUrl(span.platform.slug)" alt="platform" />
							</div>
							<h2>{{ el.name }}</h2>
							<h5
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
							<h5>{{ el.released }}</h5>
						</div>
					</a>
				</div>
			</div>
		</div>
		<div>
			<Advert />
		</div>
	</template>
	<template v-else>
		<div className="hero-container loading-text">
			<div class="loading">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</template>
</template>
<script>
import { API_KEY } from "../Config";
import axios from "axios";
import Advert from "../components/Landing/Advert";

export default {
	components: {
		Advert,
	},
	data() {
		return {
			Hero: [],
			PopularReleases: [],
			Query: "",
		};
	},

	methods: {
		submit() {
			//if you want to send any data into server before redirection then you can do it here
			this.$router.push("/search/" + this.Query);
		},
		getCurrentDay() {
			let day = new Date().getDate();
			if (day < 10) {
				return `0${day}`;
			} else {
				return day;
			}
		},
		getCurrentMonth() {
			let month = new Date().getMonth() + 1;
			if (month < 10) {
				return `0${month}`;
			} else {
				return month;
			}
		},
		getCurrentYear() {
			let year = new Date().getFullYear();
			return year;
		},
		getImgUrl(pic) {
			return require("../assets/Icons/" + pic + ".png");
		},
	},

	computed: {
		genres() {
			return this.Hero[0].genres;
		},
	},
	mounted() {
		const currentDate = `${this.getCurrentYear()}-${this.getCurrentMonth()}-${this.getCurrentDay()}`;
		const lastYear = `${this.getCurrentYear() - 1}-${this.getCurrentMonth()}-${this.getCurrentDay()}`;
		axios(
			`https://api.rawg.io/api/games?key=${API_KEY}&dates=${lastYear},${currentDate}&order=released&page_size=8`
		).then((res) => {
			//console.log(res);
			this.Hero.push(res.data.results[0]);
			this.PopularReleases.push(res.data.results);
		});
	},
};
</script>

<style lang="scss" scoped>
a {
	color: black;
}
</style>
