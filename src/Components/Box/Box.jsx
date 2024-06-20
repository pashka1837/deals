import styles from './Box.module.css';

export default function Box({children, title}) {
	return (
		<div className={styles.box}>
			<h1>{title}</h1>
			{children}
		</div>
	);
}

