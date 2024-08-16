import {Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { distance } from 'three/examples/jsm/nodes/Nodes.js';

@Component({
    selector: 'app-canvasBox',
    standalone: true,
    templateUrl: './canvasBox.component.html',
    styleUrl: './canvasBox.component.css'
  })

export class canvasBoxComponent implements OnInit {
    ngOnInit(): void {
      this.createThreeJsBox();
    }
    createThreeJsBox():void{
      const canvas = document.getElementById('canvas-box');
      const scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.x = 2;
      pointLight.position.y = 2;
      pointLight.position.z = 2;
      scene.add(pointLight);
      const dimenciones:any = {
        width: canvas?.offsetWidth,
        height: canvas?.offsetHeight
      }
      const camera = new THREE.PerspectiveCamera(75, dimenciones.width / dimenciones.height, 0.001, 1000 );
      camera.position.z = 2.5;
      scene.add(camera);
      if (!canvas) {
        return;
      }
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });
      renderer.setClearColor(0x100000, 0.5);
      // renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.setSize(dimenciones.width, dimenciones.height);
      

      const gltfLoader = new GLTFLoader()
      let object = [];
      let modelos = ['/cabeza/CBA.glb','/cabeza/cuboGLB.glb']
      gltfLoader.load(modelos[0], (result) =>{
        object[0] = result.scene;
        object[0].scale.set(11,11,11)
        object[0].translateX(-0.5)
        scene.add(object[0])

        const animate = () =>{
          requestAnimationFrame(animate);
          object[0].rotation.y += -0.02;
          object[0].rotation.x += -0.02;
          object[0].rotation.z += -0.02;
        }
        animate();
      })
      gltfLoader.load(modelos[1], (result) =>{
        object[1] = result.scene;
        object[1].scale.set(0.2,0.2,0.2)
        object[1].translateX(2)
        scene.add(object[1])

        const animate = () =>{
          requestAnimationFrame(animate);
          object[1].rotation.y += -0.01;
          object[1].rotation.x += -0.01;
          object[1].rotation.z += -0.01;
        }
        animate();
      })

      // const loader = new GLTFLoader();
      // loader.load(
      //   '/cabeza/CBA.glb',
      //   function ( gltf ) {
      //     gltf.scene.scale.setScalar(11)
      //     gltf.scene.rotation.y = 1;
      //     scene.add( gltf.scene );
      //     gltf.animations; // Array<THREE.AnimationClip>
      //     gltf.scene; // THREE.Group
      //     gltf.scenes; // Array<THREE.Group>
      //     gltf.cameras; // Array<THREE.Camera>
      //     gltf.asset; // Object
          
      //   },
      //   function ( xhr ) {
      //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      //   },
      //   function ( error ) {
      //     console.log( 'An error happened' );
      //   },
      // );


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
    torus.position.x =-0.5;
    
    scene.add(torus)


      // console.log(canvas?.offsetWidth, canvas?.offsetHeight)
      // const material = new THREE.MeshToonMaterial();
      // const box = new THREE.Mesh(
      //   new THREE.BoxGeometry(1.5, 1.5, 1.5), 
      //   material
      // );
      // const torus = new THREE.Mesh(
      //   new THREE.TorusGeometry(5, 1.5, 16, 100),
      //   material
      // );
      // scene.add(torus, box);
      // const canvasSizes = {
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // };
    
      // ------redimencionar el canvas deacuerdo al tamaño de la ventana------
      // -------------------------------------------------
      // window.addEventListener('resize', () => {
      //   canvasSizes.width = window.innerWidth;
      //   canvasSizes.height = window.innerHeight;
    
      //   camera.aspect = canvasSizes.width / canvasSizes.height;
      //   camera.updateProjectionMatrix();
    
      //   renderer.setSize(canvasSizes.width, canvasSizes.height);
      //   renderer.render(scene, camera);
      // });
      // -------------------------------------------------
      // const clock = new THREE.Clock();
      const animateGeometry = () => {
        // const elapsedTime = clock.getElapsedTime();
        // Update animation objects
        // box.rotation.x = elapsedTime;
        // box.rotation.y = elapsedTime;
        // box.rotation.z = elapsedTime;
        // torus.rotation.x = -elapsedTime;
        // torus.rotation.y = -elapsedTime;
        // torus.rotation.z = -elapsedTime;
        torus.rotation.x += 0.01;
        torus.rotation.y += -0.01;
        torus.rotation.z += -0.01;

        // object[0].rotation.y = 0.01;
        // Render
        renderer.render(scene, camera);
        // Call animateGeometry again on the next frame
        window.requestAnimationFrame(animateGeometry);
      };
      animateGeometry();           
    }

}