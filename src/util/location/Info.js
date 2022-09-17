import React from 'react';
import styles from './Info.module.css';

export function Info (props) {
	const { location, onClick, style, children } = props;
	return <div onClick={onClick} className={styles.Info} style={style}>
		<div className={styles.Latitude}>{location?.latitude}</div>
		<div className={styles.Longitude}>{location?.longitude}</div>
		<div className={styles.created_at}>{location?.created_at}</div>
		<span>{children}</span>
	</div>;
}
