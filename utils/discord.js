const database = require("../data/database"), DB = new database(true);
const { DISCORD_RPC } = DB.select();

if (DISCORD_RPC == true) {
	const RPC = require("discord-rpc");
	const rpc = new RPC.Client({
		transport: "ipc"
	});
	const {
		WRAPPER_VER: version,
		DISCORD_CLIENT: clientId,
	} = process.env;
	const startTime = new Date();

	function setRPC(state) {
		rpc.setActivity({
			state,
			details: `Version ${version}`,
			startTimestamp: startTime,
			largeImageKey: "icon",
			largeImageText: "GoAnimate 2014",
			smallImageKey: "GoAnimate 2014",
			smallImagetext: "GoAnimate 2014",
		});
	}

	module.exports = new Promise((res, rej) => {
		// set rpc activity when started
		rpc
			.on("ready", () => {
				setRPC("Idling");
				res(setRPC);
			})
			// connect rpc to app
			.login({ clientId })
			.catch((e) => {
				console.log("RPC connection failed.");
				res(() => true);
			});
	});
	return;
}
// set a blank function so we don't have to check if it's enabled
module.exports = new Promise((res) => res(() => true));
