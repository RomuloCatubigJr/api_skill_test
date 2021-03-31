import React from 'react';
import PropTypes from 'prop-types';
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import styled from 'styled-components';

import UpdateRecipe from './UpdateRecipe';

const StyledTableData = styled.td`
	color: blue;
	cursor: pointer;
`;

const RecipeItem = ({ recipe, onDelete, onUpdate }) => {
	const { id, title, description, servings, prepTime, cookTime } = recipe;

	return (
		<Tr>
			<Td>{id}</Td>
			<Td>{title}</Td>
			<Td>{description}</Td>
			<Td>{servings}</Td>
			<Td>{prepTime}</Td>
            <Td>{cookTime}</Td>
			<StyledTableData onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) onDelete(id);}}>Delete Recipe</StyledTableData>
			<StyledTableData><UpdateRecipe recipe={recipe} onUpdate={onUpdate} /></StyledTableData>
		</Tr>
	);
};

RecipeItem.propTypes = {
	recipe: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired
};

export default RecipeItem;