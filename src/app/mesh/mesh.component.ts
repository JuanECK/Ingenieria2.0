import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// const contenedor = document.getElementById('canvas');
const container = document.querySelector('.canvas_container');
const canvas    = document.querySelector('.webgl_canvas');
const sizes:any = {
  width:  container?.clientWidth,
  height: container?.clientHeight
};

// console.log(sizes)
var renderer = new THREE.WebGLRenderer();

// const container = document.getElementById('canvas');
// let container:any
// container = document.getElementById('canvas');
// console.log(container)

// const w:any = container?.offsetWidth;
// const h:any = container?.offsetHeight;
// console.log('anchoC', container?.tagName)
// console.log('anchoW', window.innerWidth)
// renderer.setSize(w, h);
// renderer.setSize(500, 400);
renderer.setSize(sizes.width, sizes.height);
// renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 1, 1000 );
camera.position.z = 5;

var keyLight = new THREE.DirectionalLight(new THREE.Color('#ffffff'), 5);
keyLight.position.set(-100, 0, 200).normalize;

var fillLight = new THREE.DirectionalLight(new THREE.Color('#ffffff'), 5);
fillLight.position.set(100, 0, 200).normalize;

var backLight = new THREE.DirectionalLight(new THREE.Color('#ffffff'), 5);
backLight.position.set(100, 0, -200).normalize();

const axesHelper = new THREE.AxesHelper(4)
scene.add(axesHelper)

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
scene.add(spotLight);

// var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 100);
// hemiLight.position.set(0, 500, 0);
// scene.add(hemiLight);

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// vercion 1
const loader = new GLTFLoader();
loader.load(
	'/cabeza/CBA.glb',
	function ( gltf ) {
		scene.add( gltf.scene );
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
  
	},
	// function ( xhr ) {
	// 	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	// },
	// function ( error ) {
	// 	console.log( 'An error happened' );
	// }
);



// ----------------------------------------
// const mtlLoader = new MTLLoader();

// mtlLoader.load('/cabeza/aaa.mtl', function (materials) {
//   materials.preload();
//   const objLoader = new OBJLoader();
//   objLoader.setMaterials(materials);
//   objLoader.load('/cabeza/aaa.obj', function (object) {
//     object.position.y =0;
//     scene.add(object);
    
//   });
  
// });
// ----------------------------------------


function loadObj( path:any, name:any ){
  
  var progress = console.log;

  return new Promise(function( resolve, reject ){
  
    var obj;
    var mtlLoader = new MTLLoader();
    
    mtlLoader.setPath( path );
    mtlLoader.load( name + ".mtl", function( materials ){
    
        materials.preload();
        
        var objLoader = new OBJLoader();
        
        objLoader.setMaterials( materials );
        objLoader.setPath( path );
        objLoader.load( name + ".obj", resolve, progress, reject );
        
    }, progress, reject );
   
  });
  
}


// var mtlLoader2  = new MTLLoader();
// mtlLoader2.setPath('/cabeza/');

// mtlLoader2.load('cabeza.mtl', function (materials) {

//     materials.preload();

//     var objLoader = new OBJLoader();
//     objLoader.setMaterials(materials);
//     objLoader.setPath('/cabeza/');
//     objLoader.load('cabeza.obj', function (object) {
//         scene.add(object);
//         object.position.y -= 18;

//     }); 

// });


// vercion 2
const torusGeometry = new THREE.TorusGeometry();
const material = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity:1,
  wireframe: false,
});
const material2 = new THREE.MeshNormalMaterial({
  flatShading:true
}
)
const torus = new THREE.Mesh(torusGeometry, material);

const texture = new THREE.TextureLoader().load('/cabeza/ladrillos.jpg');
material.map = texture
torus.position.y =0;

scene.add(torus)

// const torusGeometry = [new THREE.TorusGeometry(), new THREE.TorusGeometry(), new THREE.TorusGeometry(), new THREE.TorusGeometry(), new THREE.TorusGeometry()]
            // const material = [new THREE.MeshBasicMaterial(), new THREE.MeshLambertMaterial(), new THREE.MeshPhongMaterial(), new THREE.MeshPhysicalMaterial({}), new THREE.MeshToonMaterial()]
            // const torus = [
            //     new THREE.Mesh(torusGeometry[0], material[0]),
            //     new THREE.Mesh(torusGeometry[1], material[1]),
            //     new THREE.Mesh(torusGeometry[2], material[2]),
            //     new THREE.Mesh(torusGeometry[3], material[3]),
            //     new THREE.Mesh(torusGeometry[4], material[4]),
            // ]
            // const texture = new THREE.TextureLoader().load('/cabeza/CabezaTexturaColor.jpg')
            // material[0].map = texture
            // material[1].map = texture
            // material[2].map = texture
            // material[3].map = texture
            // material[4].map = texture
            // torus[0].position.x = -6
            // torus[1].position.x = -3
            // torus[2].position.x = 0
            // torus[3].position.x = 3
            // torus[4].position.x = 6
            // scene.add(torus[0])
            // scene.add(torus[1])
            // scene.add(torus[2])
            // scene.add(torus[3])
            // scene.add(torus[4])




// -----------------------------


// document.body.appendChild(contenedor); 

@Component({
  selector: 'app-mesh',
  standalone: true,
  templateUrl: './mesh.component.html',
  styleUrl: './mesh.component.css'
})
export class MeshComponent implements OnInit {

  // @ViewChild('rendererCanvas', {static: true})
  // public rendererCanvas: ElementRef<HTMLCanvasElement>;

  ngOnInit(){
    let container = document.getElementById('canvas');
    // console.log('ancho', container?.offsetWidth)
    container?.classList.add('negro')
     function animate() {
      requestAnimationFrame(animate)
      torus.rotation.y += 0.01
      renderer.render(scene, camera);
      controls.update();
      render()
    }
      animate()
      function render() {
          renderer.render(scene, camera)
      }
  }
  // constructor() {}

  // animateCabeza() {
  //   // requestAnimationFrame( this.animateCabeza );
  //   // controls.update();
  //   renderer.render(scene, camera);
  // };

  // renderAnimate() {
  //     // torus.rotation.y += 0.01
  //     controls.update();
  //     renderer.render(scene, camera);

  //   }
    // function animate2(){
    //   requestAnimationFrame(animate2)
    // }
    
}
