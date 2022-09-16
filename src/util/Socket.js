import io from 'socket.io-client';

export function Socket (props) {
	const { url, auth } = props;
	return io(url, { auth });
}
