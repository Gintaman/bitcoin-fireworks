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
    multiple: true,
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
		}
		else { //no event specified, just log message once
			console.log(data.message);
		}
	},
    remove: function() {
        if(this.data.event) {
            this.el.removeEventListener(this.data.event, this.eventHandler);
        }
    }
});

AFRAME.registerComponent('box', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},
        color: {type: 'color', default: '#AAA'}
    },
    init: function() {
        this.geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.height, this.data.depth);
        this.material = new THREE.MeshStandardMaterial({color: this.data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.el.setObject3D('mesh', this.mesh);
    },
    update: function(oldData) {
        if(Object.keys(oldData).length === 0) return;

        //update the geometry
        if(this.data.width !== oldData.width || this.data.height !== oldData.height || this.data.depth !== oldData.depth) {
            this.el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.height, this.data.depth);
        }
        //update the material
        if(this.data.color !== oldData.color) {
            this.el.getObject3D('mesh').material.color = this.data.color;
        }
    },
    remove: function() {
        this.el.removeObject3D('mesh');
    }
});

AFRAME.registerComponent('follow', {
    schema: {
        target: {type: 'selector'},
        speed: {type: 'number'}
    },
    init: function() {
        this.directionVec3 = new THREE.Vector3();
    },
    tick: function(time, delta) {
        let targetPosition = this.data.target.object3D.position; //position of the target
        let currentPosition = this.el.object3D.position; //position of this element. it follows the target
        let directionVec3 = this.directionVec3;
        directionVec3.copy(targetPosition).sub(currentPosition);
        let distance = directionVec3.length();
        if(distance < 1) return;

        let factor = this.data.speed / distance;
        ['x', 'y', 'z'].forEach(function(axis) {
            directionVec3[axis] *= factor * (delta / 1000);
        });

        this.el.setAttribute('position', {
            x: currentPosition.x + directionVec3.x,
            y: currentPosition.y + directionVec3.y,
            z: currentPosition.z + directionVec3.z
        });;
    }
});

AFRAME.registerComponent('change-color-on-hover', {
    schema: {
        color: {default: 'red'}
    },
    init: function() {
        let data = this.data;
        let el = this.el;
        let defaultColor = el.getAttribute('material').color;
        el.addEventListener('mouseenter', function() {
            el.setAttribute('color', data.color);
        });
        el.addEventListener('mouseleave', function() {
            el.setAttribute('color', defaultColor);
        });
    }
});
