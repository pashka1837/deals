export default function MyTextField({name, placeHolder, required}) {
	return (
		<textarea
			className='inputField'
			style={{
				height: '120px',
				resize: 'none',
				font: 'inherit',
				fontSize: '1rem',
			}}

			name={name}
			placeholder={placeHolder}
			required={required}
		>
		</textarea>
	);
}
