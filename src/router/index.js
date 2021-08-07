import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing";
import GameDetails from "../views/GameDetails";
import SearchResult from "../views/SearchResult";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Landing,
	},
	{
		path: "/gamedetails/:id",
		name: "GameDetails",
		props: true,
		component: GameDetails,
	},
	{
		path: "/search/:query",
		name: "SearchResult",
		props: true,
		component: SearchResult,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
