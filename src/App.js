import "./styles.css";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    //resposive renderer
    const handlerWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const CreateBoxGeometry = () => {
      const geometry = new THREE.BoxGeometry(10, 10, 10);

      const outerMaterial = new THREE.MeshBasicMaterial({
        color: 0xfce5cd, // Green for outside
        side: THREE.FrontSide, // Apply only to front-facing sides (outside)
        side: THREE.BackSide,
      });

      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xf6b26b, // Red for inside
        side: THREE.BackSide, // Apply only to back-facing sides (inside)
      });

      const material = [
        outerMaterial,
        innerMaterial, // Front & Back
        outerMaterial,
        innerMaterial, // Left & Right
        outerMaterial,
        innerMaterial,
      ];

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const animated = () => {};

      const Loop = () => {
        animated();
        render();
        requestAnimationFrame(Loop);
      };
      Loop();
    };

    const CreateBoxGeometry1 = () => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      const material = new THREE.MeshBasicMaterial({
        color: 0x0000ff, // Green for outside
        side: THREE.FrontSide, // Apply only to front-facing sides (outside)
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const animated = () => {};

      const Loop = () => {
        animated();
        render();
        requestAnimationFrame(Loop);
      };
      Loop();
    };

    document.body.appendChild(renderer.domElement);
    const render = () => {
      renderer.render(scene, camera);
    };

    //Control
    const Control = () => {
      let control = new OrbitControls(camera, renderer.domElement);
    };

    CreateBoxGeometry1();
    CreateBoxGeometry();
    Control();
    window.addEventListener("resize", handlerWindowResize, false);
  });

  return <div className="App"></div>;
}
