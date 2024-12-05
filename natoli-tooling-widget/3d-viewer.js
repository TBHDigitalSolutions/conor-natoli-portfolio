import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 2);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#viewer'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Environment Map (HDR)
const hdrLoader = new RGBELoader();
hdrLoader.load('assets/environments/DayEnvironmentHDRI033_4K-HDR.exr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
});

// Load GLTF Model
const loader = new GLTFLoader();
loader.load(
    'assets/models/Lower_3 Tip Multi-Tool.glb',
    (gltf) => {
        scene.add(gltf.scene);
        animate();
    },
    (xhr) => {
        console.log(`Loading Model: ${Math.round((xhr.loaded / xhr.total) * 100)}% complete`);
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

// Adjust Camera on Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('model-viewer');
    const progressBar = document.querySelector('.progress-bar');
    const updateBar = document.querySelector('.update-bar');
    const arPrompt = document.getElementById('ar-prompt');

    // Update progress bar during model loading
    modelViewer.addEventListener('progress', (event) => {
        const progress = Math.round(event.detail.totalProgress * 100);
        updateBar.style.width = `${progress}%`;

        // Show progress bar while loading
        if (progress < 100) {
            progressBar.classList.remove('hide');
        } else {
            progressBar.classList.add('hide');
        }
    });

    // Show AR prompt when AR button is clicked
    const arButton = document.getElementById('ar-button');
    arButton.addEventListener('click', () => {
        arPrompt.style.display = 'flex';
        setTimeout(() => {
            arPrompt.style.display = 'none';
        }, 3000); // Hide prompt after 3 seconds
    });
});