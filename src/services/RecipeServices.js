import config from '../config';

const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH',
	'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
	'Access-Control-Allow-Credentials': true
};

const RecipeServices = {
	getRecipes: async function() {
		try {
			const requestOptions = {
				method: 'GET',
				headers
			};

			const res = await fetch(
				`${config.baseUrl}/recipes`,
				requestOptions
			);

			const payload = await res.json();

			const recipes = payload ? payload : [];
			return { recipes };
		} catch(err) {
			console.log(err);
		}
	},
	createRecipe: async function(data) {
		try {
			const requestOptions = {
				method: 'POST',
				headers,
				body: JSON.stringify(data)
			};

			const res = await fetch(
				`${config.baseUrl}/recipes`,
				requestOptions
			);

			const payload = await res.json();

			if (payload) return payload;
		} catch(err) {
			console.log(err);
		}
	},
	updateRecipe: async function(data) {
		const { id } = data;

		try {
			const requestOptions = {
				method: 'PUT',
				headers,
				body: JSON.stringify(data)
			};

			const res = await fetch(
				`${config.baseUrl}/recipes/${id}`,
				requestOptions
			);

			const payload = await res.json();

			if (payload) return payload;
		} catch(err) {
			console.log(err);
		}
	},
	deleteRecipe: async function(id) {
		console.log(id);
		try {
			const requestOptions = {
				method: 'DELETE',
				headers
			};

			const res = await fetch(
				`${config.baseUrl}/recipes/${id}`,
				requestOptions
			);

			const payload = await res.json();

			if (payload) return payload;
		} catch(err) {
			console.log(err);
		}
	}
};

export default RecipeServices;