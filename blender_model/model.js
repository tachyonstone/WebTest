const loader = new THREE.GLTFLoader();
const url = 'tamane.gltf';

loader.load(url, (data) => {

  const gltf = data;
  const object = gltf.scene;
  scene.add(object);

});
