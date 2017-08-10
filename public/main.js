//this works, but without wrapping code in the onload function, the event is emitted before the
//listener is added
window.onload = function() {
	let el = document.querySelector('a-entity');
    el.setAttribute('log__helloworld', {event: 'worldEvent', message: 'hello, world'});
    el.setAttribute('log__hellometaverse', {event: 'metaverseEvent', message: 'hello, metaverse'});
    el.emit('worldEvent');
    el.emit('metaverseEvent');

    let follower = document.querySelector('#follower');
    follower.setAttribute('follow', {target: '#leader', speed: 1});
}
