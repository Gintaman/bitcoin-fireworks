let parameters = {
    width: 2000,
    height: 2000,
    widthSegments: 250,
    heightSegments: 250,
    depth: 1500,
    param: 4,
    filterparam: 1
};

let waterNormals;

init();
animate();

var container, stats;
var camera, scene, renderer;
var controls, water, sphere;
function init() {
    container = document.querySelector("#container");
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2(0xaabbbb, 0.0001);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 3000000);
    camera.position.set(2000, 750, 2000);

    scene.add(new THREE.AmbientLight(0x444444));
    let light = new THREE.DirectionalLight(0xffffbb, 1);
    light.position.set(-1, 1, -1);
    scene.add(light);

    waterNormals = new THREE.TextureLoader().load('waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    water = new THREE.Water(renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 1.0,
        sunDirection: light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 50.0,
        fog: false 
    });

    let mirrorMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500), water.material);
    mirrorMesh.add(water);
    mirrorMesh.rotation.x = -Math.PI * 0.5;
    scene.add(mirrorMesh);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    let time = performance.now() * 0.001;
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
    renderer.render(scene, camera);
}
