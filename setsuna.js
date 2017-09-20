/* Setsuna requirements */
const Discord = require("discord.js");
const reload = require("require-reload");

/* Setsuna object */
var SetsunaCore = {};

/* Instanciation of Discord & login token */
SetsunaCore.DiscordClient = new Discord.Client();
const token = ""; /* Enter your bot token here */

/* Some parameters for Setsuna */
const botname = "Setsuna"; /* Bot name in channels */

/* Plugins to load on startup */
SetsunaCore.PLUGINS = ["admin", "dummy"];
SetsunaCore.loadedPlugins = {};
SetsunaCore.Handlers = {};

/* Setsuna CORE function to add a command handler */
SetsunaCore.AddHandler = function(command, callback) {
	SetsunaCore.Handlers[command] = callback;
}

SetsunaCore.DiscordClient.on('ready', () => {
	console.log("Ready!");
	
	/* Find the setsuna-admin channel */
	SetsunaCore.AdminChan = SetsunaCore.DiscordClient.channels.find('name', 'setsuna-admin');
	
	/* Output some stuff */
	SetsunaCore.AdminChan.send("Setsuna loaded and connected");
	SetsunaCore.AdminChan.send("MrXedac© 2017");
	
	/* Rename */
	SetsunaCore.DiscordClient.user.setUsername(botname);
	
	/* Load plugins */
	SetsunaCore.SetsunaLoadPlugins();
});

SetsunaCore.DiscordClient.on('message', message => {
	try {
		/* Trim spaces */
		const msg = message.content.trim();
		
		/* Get command prefix */
		const command = msg.split(/[ \n]/)[0].toLowerCase().trim();
		
		/* Get command arguments */
		const suffix = msg.substring(command.length).trim();
		
		if(SetsunaCore.Handlers[command]) {
			SetsunaCore.Handlers[command](SetsunaCore, message, suffix);
			/* Command handled, delete command message */
			message.delete();
		}
	} catch (err) {
		console.log(err);
		/* Undefined command, ignore */
	}
	
});

function SetsunaError(message)
{
	console.log("SETSUNA ERROR :");
	console.log(message);
}

/* Load initial plugins from SetsunaModules/ */
SetsunaCore.SetsunaLoadPlugins = function()
{
	SetsunaCore.loadedPlugins = {};
	SetsunaCore.Handlers = {};

	var includes = {
		'SetsunaModules': {'items': SetsunaCore.PLUGINS, 'callback': function () {
            for (var pluginName in plugins) {
                SetsunaCore.AdminChan.send("Loaded module : " + pluginName);
            }
        }}
    };
	
    for (var packageName in includes) {
        var pkg = includes[packageName];
        var includeItems = pkg.items;
        var includePaths = [];
        var includeCallback = 'callback' in pkg? pkg.callback: function() {};

        for (var i = 0; i < includeItems.length; i++) {
            var moduleName = includeItems[i];
            var scriptPath = packageName + '/' + moduleName + '.js';

            SetsunaCore.loadedPlugins[moduleName] = reload(scriptPath);
			SetsunaCore.loadedPlugins[moduleName].init(SetsunaCore);
        }
    }
}

SetsunaCore.DiscordClient.login(token);
