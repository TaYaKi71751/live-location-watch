import React from 'react';
import styles from './Location.module.css';

export function Location (props) {
	const { latitude, longitude, onClick, style } = props;
	return <div onClick={onClick} className={styles.Location} style={style}>
		{latitude},{longitude}
	</div>;
}
