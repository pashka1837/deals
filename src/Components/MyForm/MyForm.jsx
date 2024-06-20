import {useEffect, useState} from 'react';
import styles from './MyForm.module.css';
import ClientCard from '../Cards/ClientCard';
import JobCard from '../Cards/JobCard';
import LocationCard from '../Cards/LocationCard';
import ScheduledCard from '../Cards/ScheduledCard';
import AppExtensionsSDK, {Command, View} from '@pipedrive/app-extensions-sdk';
import Title from '../Title/Title';
import BtnContainer from '../BtnContainer/BtnContainer';
import {getCookie, post_deal} from '../../utils/utils.js';

const urlSearchParams = new URLSearchParams(window.location.search);

export default function MyForm() {
	const [sdk, setSdk] = useState(null);
	const [isSub, setSub] = useState(null);
	const [isError, setError] = useState(false);
	const [isSent, setSent] = useState(false);

	useEffect(() => {
		const initSdk = async () => {
			const id = urlSearchParams.get('id') || '27e21e0e-673e-4570-8c4f-4d60b9f8fa27';
			const sdk = await new AppExtensionsSDK({identifier: id}).initialize({size: {height: 800, width: 1050}});
			setSdk(sdk);
		};

		initSdk();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		const userId = getCookie('userId') || urlSearchParams.get('userId');
		const companyId = getCookie('companyId') || urlSearchParams.get('companyId');

		const formData = new FormData(e.target);
		const formJson = Object.fromEntries(formData.entries());

		setSent(true);
		try {
			const data = await post_deal(userId, companyId, formJson);

			if (!data.ok) {
				console.log('Server api error');
				setError(true);
				return;
			}

			const new_deal_id = data.id;

			setSub(new_deal_id);
			setError(false);
		} catch (e) {
			setError(true);
			console.log('Client req error', e);
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
			{isError && <h2>Oops,backend error</h2>}
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
