import {useEffect, useState} from 'react';
import styles from './MyForm.module.css';
import ClientCard from '../Cards/ClientCard';
import JobCard from '../Cards/JobCard';
import LocationCard from '../Cards/LocationCard';
import ScheduledCard from '../Cards/ScheduledCard';
import AppExtensionsSDK, {Command, View} from '@pipedrive/app-extensions-sdk';
import Title from '../Title/Title';
import BtnContainer from '../BtnContainer/BtnContainer';
import {post_deal} from '../../utils/utils.js';

const urlSearchParams = new URLSearchParams(window.location.search);

export default function MyForm() {
	const [sdk, setSdk] = useState(null);
	const [isSub, setSub] = useState(null);
	const [isError, setError] = useState('');
	const [isSent, setSent] = useState(false);

	useEffect(() => {
		const initSdk = async () => {
			const id = urlSearchParams.get('id');
			const sdk = await new AppExtensionsSDK({identifier: id}).initialize({size: {height: 800, width: 1050}});
			setSdk(sdk);
		};

		initSdk();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		const userId = urlSearchParams.get('userId');
		const companyId = urlSearchParams.get('companyId');

		const formData = new FormData(e.target);
		const formJson = Object.fromEntries(formData.entries());

		setSent(true);
		try {
			const data = await post_deal(userId, companyId, formJson);

			if (!data.ok) {
				console.log('Server error');
				setError('Server error');
				setSent(false);
				return;
			}

			setSub(data.id);
			setError(false);
		} catch {
			setError('Client error');
			setSent(false);
			console.log('Client error');
		}
	}

	async function handleClose() {
		await sdk.execute(Command.CLOSE_MODAL);
	}

	async function handleRedirect() {
		await sdk.execute(Command.REDIRECT_TO, {view: View.DEALS, id: isSub});
	}

	return (
		<>
			{isError && <h2>Oops, {isError}</h2>}
			{isSub
				? (<Title handleRedirect={handleRedirect}/>)
				: (<form
					className={styles.myForm}
					onSubmit={handleSubmit}>
					<ClientCard />
					<JobCard />
					<LocationCard />
					<ScheduledCard/>
					<BtnContainer handleClose={handleClose} isSent={isSent} />
				</form>)
			}
		</>
	);
}
