import React from 'react';
import styles from './Place.module.css';
import { open } from './Open';

export function place (position, pinTitle) {
	/**
			* httpURL https://developers.naver.com/forum/posts/29791
			* nmapURL https://guide.ncloud-docs.com/docs/en/naveropenapiv3-maps-url-scheme-url-scheme#mark-places
			* */
	const httpURL = `http://map.naver.com/index.nhn?enc=utf8&level=2&lng=${position?.longitude}&lat=${position?.latitude}&pinTitle=${pinTitle}`;
	const nmapURL = `nmap://place?lng=${position?.longitude}&lat=${position?.latitude}&name=${pinTitle}`;
	return [nmapURL, httpURL];
};
export function Place (props) {
	const position = props?.position;
	const pinTitle = props?.pinTitle;
	const onClick = () => {
		open(...place(position, pinTitle));
	};
	return <div
		onClick={onClick}
		className={styles.Place}>
		📍
	</div>;
}
