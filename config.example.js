const hostname = '<SOCKET_IO_HOSTNAME>';
const port = '<SOCKET_IO_PORT>';
const path = '<SOCKET_IO_SUBSCRIPTIONS_PATH>';
if(!Config.auth.getAll().length){
	Config.auth.add({
		user:{
			email:'<USER_EMAIL>',
			password:'<USER_AUTH_PASSWORD>',
		},
		device:{id:'<DEVICE_ID>'}
	});
}
