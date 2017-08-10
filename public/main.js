//this works, but without wrapping code in the onload function, the event is emitted before the
//listener is added
window.onload = function() {
	let el = document.querySelector('a-entity');
	el.setAttribute('log', {event: 'anEvent', message: 'hello, metaverse'});
	el.emit('anEvent');
	console.log('event emitted');
}
