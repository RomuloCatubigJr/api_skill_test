import React, { useState, useEffect } from 'react';
import '../App.css';
import styled from 'styled-components';

import RecipeServices from '../services/RecipeServices';
import RecipeList from '../components/RecipeLists';
import CreateRecipe from '../components/CreateRecipe';
// import Utils from '../utils/Utils';

const Header = styled.h1`
	margin: 25px;
	text-align: center;
	font-weight: bold;
	font-size: 24px;
`;

function App() {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getRecepices();
	}, []);

	async function getRecepices() {
		const { recipes } = await RecipeServices.getRecipes();
		if (recipes) setRecipes(recipes);
	}

	async function createRecipe(recipe) {
		const recipeToCreate = {
			...recipe
		};
		console.log(recipeToCreate);
		const newRecipeCreated = await RecipeServices.createRecipe(recipeToCreate);
		console.log(newRecipeCreated);
		recipeToCreate.id = newRecipeCreated.id;
		setRecipes([
			...recipes,
			recipeToCreate
		]);
	}

	async function updateRecipe(data) {
		await RecipeServices.updateRecipe(data);
		setRecipes(recipes.map(u => {
			if (u.id === data.id) {
				return data;
			}
			return u;
		}));
	}

	async function deleteRecipe(id) {
		await RecipeServices.deleteRecipe(id);
		setRecipes(recipes.filter(u => u.id !== id));
	}

	return (
		<div>
			<Header>Recipe Menu Management</Header>
			<CreateRecipe
				onCreate={ async (recipe) => await createRecipe(recipe)}
			/>
			<RecipeList
				recipes={recipes}
				onUpdate={ async (recipe) => await updateRecipe(recipe)}
				onDelete={ async (recipe) => await deleteRecipe(recipe)}
			/>
		</div>
	);
}

export default App;