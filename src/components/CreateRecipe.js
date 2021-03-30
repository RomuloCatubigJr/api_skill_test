import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Utils from '../utils/Utils';
import FormInput from './FormInput';
import Button from './Button';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

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

const CreateRecipeButton = styled.button`
	border: 1px solid black;
	margin: 8px;
	padding: 4px;
	border-radius: 4px;
	width: 280px;
	text-align: center;
	background-color: #4CAF50;
	color: white;
`;

const CloseButton = styled.h1`
	align-self: flex-end;
	margin-right: 8px;
	margin-bottom: 8px;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const DisplayErrorMsg = styled.p`
	color: red;
`;

const CreateRecipe = ({ onCreate }) => {
    const [uuid, setUID] = useState(uuidv4());
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [servings, setServings] = useState('');
    const [prepTime, setPrepTime] = useState('');
	const [cookTime, setCookTime] = useState('');
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [errors, setErrors] = useState({});

	function openModal() {
		setIsOpen(true);
	}

	function closeModal(){
        setUID('');
		setTitle('');
		setDescription('');
		setServings('');
        setPrepTime('');
		setCookTime('');

		setIsOpen(false);
	}

	function handleCreate(e) {
		let hasError = validateForm();

		if (hasError) {
			onCreate({
				uuid,
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

	return (
		<>
			<Container>
				<CreateRecipeButton id='create-user-button' onClick={openModal}>Create Recipe</CreateRecipeButton>
			</Container>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Modal"
				ariaHideApp={false}
			>
				<Form onSubmit={handleCreate}>
					<CloseButton id='create-recipe-close-btn' onClick={closeModal}>X</CloseButton>
					<h1 id='create-recipe-header'>Create Recipe</h1>
					<input style={{ visibility: 'hidden' }} name='uuid' placeholder='uuid' type={'text'}  onChange={(e) => { setUID(e.target.value); }} value={uuidv4()} />
					<FormInput name='title' id='create-recipe-form-input-title' value={title} placeholder='Title' type={'text'} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
					<FormInput name='description' id='create-recipe-form-input-description' value={description} placeholder='Description' type={'text'} onChange={(e) => setDescription(e.target.value)} error={errors.description} />
					<FormInput name='servings' id='create-recipe-form-input-servings' value={servings} placeholder='Servings' type={'text'} onChange={(e) => setServings(e.target.value)} error={errors.servings} />
                    <FormInput name='prepTime' id='create-recipe-form-input-prepTime' value={prepTime} placeholder='PrepTime' type={'text'} onChange={(e) => setPrepTime(e.target.value)} error={errors.prepTime} />
					<FormInput name='cookTime' id='create-recipe-form-input-cookTime' value={cookTime} placeholder='CookTime' type={'text'} onChange={(e) => setCookTime(e.target.value)} error={errors.cookTime} />
                    <Button id='create-user-submit-btn' type='submit' name='Create Recipe' />
				</Form>
			</Modal>
		</>
	);
};

CreateRecipe.propTypes = {
	onCreate: PropTypes.func.isRequired,
};


export default CreateRecipe;