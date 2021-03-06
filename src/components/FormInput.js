import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
	border: 1px solid black;
	margin: 8px;
	padding: 4px;
	border-radius: 4px;
	width: 280px;
`;

const DisplayErrorMsg = styled.p`
	color: red;
`;

const FormInput = ({ id, type, name, value, placeholder, onChange, error }) => {
	const [inputType] = useState(type);

	return (
		<>
			<Input id={id} type={inputType} value={value} name={name} placeholder={placeholder} onChange={onChange} className='inputclass'/>
			{error && <DisplayErrorMsg id={`${id}-error-msg`}>{error}</DisplayErrorMsg>}
		</>
	);
};

FormInput.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string
};

export default FormInput;