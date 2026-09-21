import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getLenis } from "../../core/TickerBridge";

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Particle Geometry
    const particleCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const cyanColor = new THREE.Color("#00f0ff");
    const blueColor = new THREE.Color("#0284c7");
    const whiteColor = new THREE.Color("#ffffff");
    const charcoalColor = new THREE.Color("#334155");

    for (let i = 0; i < particleCount; i++) {
      // Cylinder distribution along Z-axis
      const radius = 12 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 100;

      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(theta);
      positions[i * 3 + 2] = z;

      // Color distribution: 60% cyan/blue, 20% white highlights, 20% subtle charcoal
      const rand = Math.random();
      let color = cyanColor;
      if (rand < 0.35) color = cyanColor;
      else if (rand < 0.65) color = blueColor;
      else if (rand < 0.85) color = charcoalColor;
      else color = whiteColor;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = Math.random() * 1.5 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Perspective Wireframe Plane (Horizon Grid)
    const gridHelper = new THREE.GridHelper(120, 60, "#00f0ff", "#182030");
    gridHelper.position.y = -14;
    gridHelper.position.z = -20;
    scene.add(gridHelper);

    // 4. Animation & Scroll Delta Integration
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      const lenis = getLenis();
      
      const scrollProgress = lenis ? lenis.progress : 0;
      const scrollVelocity = lenis ? lenis.velocity : 0;

      // Subtle base rotation + scroll speed warp
      particles.rotation.y = elapsedTime * 0.04 + scrollProgress * Math.PI * 1.5;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1 + (scrollVelocity * 0.001);

      // Camera Z-tracking based on overall scroll
      camera.position.z = 30 - scrollProgress * 15;
      camera.position.y = Math.sin(scrollProgress * Math.PI) * 4;

      // Dynamic grid movement
      gridHelper.position.z = -20 + (scrollProgress * 25) % 10;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div id="webgl-canvas-container" ref={containerRef} aria-hidden="true" />;
}
