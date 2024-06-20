import styles from './BtnContainer.module.css';

export default function BtnContainer({handleClose, isSent}) {
	return (
		<div className={styles.btn_container}>
			<button
				className={`${styles.submit_btn} ${!isSent ? styles.not_sent : styles.sent}`}
				type='submit'
				disabled={isSent}>
				{!isSent ? 'Create job' : 'Request is sent'}
			</button>
			<button className={styles.save_btn} onClick={handleClose} type='button'>Save info</button>
		</div>
	);
}
