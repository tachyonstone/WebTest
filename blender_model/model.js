JS Result
EDIT ON
 var camera, scene, renderer, mouse2D, controls,
    radius = 150,
    theta = 45,
    phi = 0,
    width = window.innerWidth,
    height = window.innerHeight,
    lastAnimTime = window.performance.now(),
    RENDER_INTERVAL = 30,
    TICK_INTERVAL = 500;

var assetsPath = 'https://s3-ap-northeast-1.amazonaws.com/niisan-tokyo-threejs-playground/treee_assets/tuna/';

loadOBJ();
init();
// start();
render();

function init() {

    // renderer ------------------------------
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( 0x222222 ); // 背景色
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    // scene ------------------------------
    scene = new THREE.Scene();

    // camera ------------------------------
    var perscamera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 ); // fov(視野角),aspect,near,far
    var orthocamera = new THREE.OrthographicCamera( width / -2, width / 2, height / 2, height / -2, 1, 10000 );
    camera = perscamera;
    camera.position.set(100, 100, 100);
    camera.up.set(0, 1, 0);
    camera.lookAt({ x:0, y:0, z:0 });

    // add light ３点光にしてあげる
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var light = new THREE.DirectionalLight( 0x002288 );
    light.position.set( -1, -1, -1 );
    scene.add( light );

    var light = new THREE.AmbientLight( 0x444444 );
    scene.add( light );

    // controls ------------------------------
    controls = new THREE.OrbitControls(camera);

    // axis ------------------------------
    var axis = new THREE.AxisHelper(1000);
    axis.position.set(0,0,0);
    scene.add(axis);

}

function render(){
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}

function loadOBJ() {
    // obj mtl を読み込んでいる時の処理
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
    };

    // obj mtl が読み込めなかったときのエラー処理
    var onError = function ( xhr ) {    };

    // obj mtlの読み込み
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( assetsPath  );              // this/is/obj/path/
    mtlLoader.load( 'tuna_r.mtl', function( materials ) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.setPath( assetsPath );            // this/is/obj/path/
      objLoader.load( 'tuna_r.obj', function ( object ) {
        objmodel = object.clone();
        objmodel.scale.set(100, 100, 100);      // 縮尺の初期化
        objmodel.rotation.set(0, 0, 0);         // 角度の初期化
        objmodel.position.set(0, 0, 0);         // 位置の初期化

    // objをObject3Dで包む
        obj = new THREE.Object3D();
        obj.add(objmodel);

        scene.add(obj);                         // sceneに追加
      }, onProgress, onError );
    });
}


