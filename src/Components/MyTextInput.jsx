export default function MyTextInput(props) {
	const {placeHolder, required, type, name} = props;
	return (
		<input
			className='inputField'
			name={name}
			type={type}
			placeholder={placeHolder}
			required={required}
		/>
	);
}

