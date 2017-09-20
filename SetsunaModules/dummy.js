 /* Module interface for Setsuna */
 module.exports = {
	 moduleName: function() {
		return "dummy";
	 },
	 
	 moduleDescription: function() {
		return "A dummy module for Setsuna to test the plugin system";
	 },
	 
	 init: function(SetsunaCore) {		 
		 SetsunaCore.AddHandler("!dummy", function(SetsunaCore, command, args) {
			 command.channel.send("Dummy module speaking. I'm useless, but because I'm here and working, I rock. :ok_hand:")
		 });
	 }
 }
