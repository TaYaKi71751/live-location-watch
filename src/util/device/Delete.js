import React from 'react';

import { Config } from '../Config';
import styles from './Delete.module.css';

export function Delete (props) {
	const device = props?.device;
	const user = props?.user;
	const onClick = () => {
		if (
			typeof device?.id != 'undefined' &&
			typeof user?.email != 'undefined' &&
			typeof user?.password != 'undefined'
		) { Config.auth.delete({ device, user }); }
	};
	return <div
		className={styles.Delete}>
		<button
			onClick={onClick}
			className={styles.Button}>
		🗑️
		</button>
	</div>;
}
