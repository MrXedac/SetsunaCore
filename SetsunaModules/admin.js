 /* Setsuna administration module */
 
 /* Module interface for Setsuna  */
 module.exports = {
	 moduleName: function() {
		return "admin";
	 },
	 
	 moduleDescription: function() {
		return "Administration module for Setsuna";
	 },
	 
	 init: function(SetsunaCore) {
		 SetsunaCore.AdminChan.send("Administration module ready.");
		 
		 SetsunaCore.AddHandler("!reloadmodules", function(SetsunaCore, command, args) {
			SetsunaCore.AdminChan.send("Reloading Setsuna modules.");
			SetsunaCore.SetsunaLoadPlugins(); 
			SetsunaCore.AdminChan.send("Successfully reloaded all Setsuna modules.");
		 });
		 
		 SetsunaCore.AddHandler("!about", function(SetsunaCore, command, args) {
			command.channel.send("Setsuna version 0.2, ©MrXedac 2017"); 
			for (var plug = 0; plug < SetsunaCore.PLUGINS.length; plug++) {
				command.channel.send("=> Loaded plugin : [" + SetsunaCore.loadedPlugins[SetsunaCore.PLUGINS[plug]].moduleName() + "] " + SetsunaCore.loadedPlugins[SetsunaCore.PLUGINS[plug]].moduleDescription());
			}
			
		 });
	 }
 }
