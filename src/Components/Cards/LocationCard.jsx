import Box from '../Box/Box';
import MyTextInput from '../MyTextInput';
import MySelect from '../MySelect';

export default function LocationCard() {
	const area_options = ['Tampa', 'Miami', 'Jacksonville'];
	return (
		<Box title='Service Location'>
			<MyTextInput
				placeHolder='Address'
				required={true}
				type='text'
				name='Address'/>

			<MyTextInput
				placeHolder='City'
				required={true}
				type='text'
				name='City'/>

			<MyTextInput
				placeHolder='State'
				required={true}
				type='text'
				name='State'/>
			<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>

				<MyTextInput
					placeHolder='Zip code'
					required={true}
					type='tel'
					name='Zip code'/>

				<MySelect options={area_options} name='Area' />
			</div>
		</Box>
	);
}
