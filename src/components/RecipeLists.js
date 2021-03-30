import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import RecipeItem from './RecipeItem';

const Container = styled.div`
	max-width: 1440px;
	max-height: 1024px;
	margin: auto;
	table {
		font-family: Arial, Helvetica, sans-serif;
		border-collapse: collapse;
		width: 100%;
		margin: 25px 0;
	}
	table td, table th {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: center;
	}
	table tr:nth-child(even){background-color: #f2f2f2;}
	table tr:hover {background-color: #ddd;}
	table th {
		white-space: pre;
		padding-top: 12px;
		padding-bottom: 12px;
		background-color: #4CAF50;
		color: white;
		font-weight: bold;
	}
`;

const RecipeList = ({ recipes, onUpdate, onDelete }) => {

	function renderRecipeItem(recipe) {
		return (
			<RecipeItem key={recipe.uuid} recipe={recipe} onUpdate={onUpdate} onDelete={onDelete} />
		);
	}

	function renderRecipeList() {
		const hasRecipes = recipes.length > 0 ? true : false;

		const renderRecipeList = recipes.map(user => renderRecipeItem(user));
		const noRecipeFound = <tr><td colSpan='7'>No user found.</td></tr>;

		return hasRecipes ? renderRecipeList : noRecipeFound;
	}

	return (
		<Container>
			<Table>
				<Thead>
					<Tr>
						<Th>ID</Th>
						<Th>Title</Th>
						<Th>Description</Th>
						<Th>servings</Th>
						<Th>prepTime</Th>
                        <Th>cookTime</Th>
						<Th colSpan='2'>ACTIONS</Th>
					</Tr>
				</Thead>
				<Tbody>
					{renderRecipeList()}
				</Tbody>
			</Table>
		</Container>
	);
};

RecipeList.propTypes = {
	recipes: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired
};

export default RecipeList;