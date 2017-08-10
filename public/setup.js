AFRAME.registerComponent('hello-world', {
	init: function() {
		console.log("hello, world");
	},
	update: function() {
		console.log("update fired");
	}
});

AFRAME.registerComponent('log', {
	schema: {
		message: {type: 'string', default: 'hello, world'},
		event: {type: 'string', default: ''},
	},
	init: function() {
		this.eventHandler = () => {
			console.log(this.data.message);
		};
	},
	update: function() { //called after init anyways
		let data = this.data; //component property values
		let el = this.el; //reference to the component's entity

		if(data.event) {
			el.addEventListener(data.event, this.eventHandler);
		}
		else { //no event specified, just log message once
			console.log(data.message);
		}
	}
});
