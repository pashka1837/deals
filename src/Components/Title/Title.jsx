import styles from './Title.module.css';

export default function Title({handleRedirect}) {
	return (
		<div className={styles.myTitle}>
			<p> Job is created! </p>
			<button className={styles.link} onClick={handleRedirect}>View Deal</button>
		</div>

	);
}
