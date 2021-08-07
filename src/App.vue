<template>
	<NavBar />
	<div class="app-view">
		<router-view />
	</div>
	<Footer />
</template>

<script>
import NavBar from "./components/Navigation/NavBar.vue";
import Footer from "./components/Navigation/Footer.vue";

export default {
	name: "App",
	components: {
		NavBar,
		Footer,
	},
};
</script>

<style lang="scss">
.app-view {
	min-height: 100vh;
}
@import "./Style.scss";
</style>
