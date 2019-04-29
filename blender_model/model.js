// 幅、高さ取得
const width  = window.innerWidth;
const height = window.innerHeight;

// レンダラの作成、DOMに追加
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xf3f3f3, 1.0);
document.body.appendChild(renderer.domElement);

// シーンの作成、カメラの作成と追加、ライトの作成と追加
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 100 );
camera.position.set(0, 1, 5);
const light  = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);


const loader = new THREE.GLTFLoader();
const url = 'test.glb';

loader.load(url, (data) => {

  const gltf = data;
  const object = gltf.scene;
  scene.add(object);

});

// レンダリング
const animation = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
};

animation();
