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
	update: function(oldData) { //called after init anyways
		let data = this.data; //component property values
		let el = this.el; //reference to the component's entity

		if(oldData.event && oldData.event !== data.event) {
			el.removeEventListener(oldData.event, this.eventHandler);
		}

		if(data.event) {
			el.addEventListener(data.event, this.eventHandler);
			console.log('event listener added');
		}
		else { //no event specified, just log message once
			console.log(data.message);
		}
	}
});
