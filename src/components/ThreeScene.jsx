import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = ({ model }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, controls;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set the background color to white

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    camera.position.set(-1.8, 0, 2.7);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    mountRef.current.appendChild(renderer.domElement);

    // Controls setup
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable zooming
    controls.enablePan = false; // Disable panning
    controls.target.set(0, 0, -0.2);
    controls.addEventListener("change", render);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
    scene.add(ambientLight);

    const lightIntensity = 0.7;
    const directionalLight1 = new THREE.DirectionalLight(
      0xffffff,
      lightIntensity
    );
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(
      0xffffff,
      lightIntensity
    );
    directionalLight2.position.set(-1, 1, -1);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(
      0xffffff,
      lightIntensity
    );
    directionalLight3.position.set(1, -1, 1);
    scene.add(directionalLight3);

    // Grid Helper (Floor Grid)
    const gridSize = 10; // Size of the grid, can adjust as needed
    const gridDivisions = 10; // Number of divisions in the grid
    const gridHelper = new THREE.GridHelper(
      gridSize,
      gridDivisions,
      0x888888,
      0x888888
    );
    gridHelper.position.y = -1; // Slightly below the model to avoid z-fighting
    scene.add(gridHelper);

    // Model loading
    const loader = new GLTFLoader().setPath("models/");
    loader.load(model, function (gltf) {
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      gltf.scene.position.y = -1; // Adjust the model's position as needed
      scene.add(gltf.scene);
      render();
    });

    function render() {
      renderer.render(scene, camera);
    }
    // Enhanced Lighting Setup
    function setupLights() {
      // Ambient Light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.25); // Reduced intensity for subtler effect
      scene.add(ambientLight);

      // Directional Light (Sunlight)
      const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
      sunLight.position.set(-3, 10, -10);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 512; // Default
      sunLight.shadow.mapSize.height = 512; // Default
      sunLight.shadow.camera.near = 0.5;
      sunLight.shadow.camera.far = 50;
      scene.add(sunLight);

      // Add soft white light from above
      const overheadLight = new THREE.PointLight(0xffffff, 0.5, 100);
      overheadLight.position.set(0, 5, 0);
      scene.add(overheadLight);

      // Spotlight for dramatic effect
      const spotlight = new THREE.SpotLight(0xffffff, 0.5);
      spotlight.position.set(-3, 5, 5);
      spotlight.angle = Math.PI / 6;
      spotlight.penumbra = 0.1; // Soften the edge of the spotlight
      spotlight.decay = 2;
      spotlight.distance = 50;
      spotlight.castShadow = true;
      scene.add(spotlight);
    }
    setupLights();

    // Call this function in your useEffect after setting up the scene and before loading the model

    // Handle window resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    };
    window.addEventListener("resize", onWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize);
      mountRef.current.removeChild(renderer.domElement); // Remove renderer from DOM
      // Proper cleanup for OrbitControls and other resources might be necessary
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default ThreeScene;
