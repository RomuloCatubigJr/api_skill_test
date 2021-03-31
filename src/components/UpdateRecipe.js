import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import Utils from '../utils/Utils';

import FormInput from './FormInput';
import Button from './Button';

const customStyles = {
	content : {
		top                   : '20%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
        marginTop             : '10%',
		transform             : 'translate(-50%, -50%)'
	}
};

const CloseButton = styled.h1`
	align-self: flex-end;
	margin-right: 8px;
	margin-bottom: 8px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const DisplayErrorMsg = styled.p`
	color: red;
`;

const UpdateRecipe = ({ recipe, onUpdate }) => {
	const [id, setUID] = useState(recipe.id);
	const [title, setTitle] = useState(recipe.title);
	const [description, setDescription] = useState(recipe.description);
	const [servings, setServings] = useState(recipe.servings);
    const [prepTime, setPrepTime] = useState(recipe.prepTime);
	const [cookTime, setCookTime] = useState(recipe.cookTime);
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [errors, setErrors] = useState({});


	function openModal() {
		setIsOpen(true);
	}

	function closeModal(){
		setIsOpen(false);
	}

	function handleUpdate(e) {
		let hasError = validateForm();

		if (hasError) {
			onUpdate({
                id,
				title,
				description,
				servings,
                prepTime,
				cookTime,
			});
			closeModal();
		}

		e.preventDefault();
	}

	function validateForm() {
		setErrors({});

		let err = {};

        if (!title) err.title = 'Title is required';
		if (!description) err.description = 'Description is required';
		if (!servings) err.servings = 'Serving is required';
        if (!prepTime) err.prepTime = 'PrepTime is required';
		if (!cookTime) err.cookTime = 'CookTime is required';

		setErrors(err);

		return Utils.isEmpty(err);
	}

	useEffect(() => {
        setUID(recipe.id);
		setTitle(recipe.title);
		setDescription(recipe.description);
		setServings(recipe.servings);
        setPrepTime(recipe.prepTime);
		setCookTime(recipe.cookTime);
	}, []);

	return (
		<>
			<div id='update-recipe-button' onClick={openModal}>Update Recipe</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Modal"
				ariaHideApp={false}
			>
				<Form onSubmit={handleUpdate}>
					<CloseButton id='update-recipe-close-btn' onClick={closeModal}>X</CloseButton>
					<h1 id='update-recipe-header'>Update Recipe</h1>
					<input style={{ visibility: 'hidden' }} name='id' placeholder='id' type={'text'}  onChange={(e) => { setUID(e.target.value); }} value={id} />
					<FormInput name='title' id='create-recipe-form-input-title' value={title} placeholder='Title' type={'text'} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
					<FormInput name='description' id='create-recipe-form-input-description' value={description} placeholder='Description' type={'text'} onChange={(e) => setDescription(e.target.value)} error={errors.description} />
					<FormInput name='servings' id='create-recipe-form-input-servings' value={servings} placeholder='Servings' type={'text'} onChange={(e) => setServings(e.target.value)} error={errors.servings} />
                    <FormInput name='prepTime' id='create-recipe-form-input-prepTime' value={prepTime} placeholder='PrepTime' type={'text'} onChange={(e) => setPrepTime(e.target.value)} error={errors.prepTime} />
					<FormInput name='cookTime' id='create-recipe-form-input-cookTime' value={cookTime} placeholder='CookTime' type={'text'} onChange={(e) => setCookTime(e.target.value)} error={errors.cookTime} />
					<Button id='update-recipre-submit-btn' type='submit' name='Update Recipe' />
				</Form>
			</Modal>
		</>
	);
};

UpdateRecipe.propTypes = {
	recipe: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired
};

export default UpdateRecipe;