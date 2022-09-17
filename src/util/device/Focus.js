import React from 'react';
import styles from './Focus.module.css';

export function Focus (props) {
	const id = props?.id;
	const onClick = () => {
		if (
			typeof id != 'undefined'
		) { localStorage.setItem('focus', id); }
	};
	return <div
		onClick={onClick}
		className={styles.Focus}>👀</div>;
}
