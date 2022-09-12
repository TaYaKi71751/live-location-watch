const subscriptions = new Subscriptions();
Config.auth.getAll().forEach((auth)=>{
	subscriptions.connect(auth);
});
