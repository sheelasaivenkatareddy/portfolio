import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getLenis } from "../../core/TickerBridge";

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Quality tier: fewer particles and a lower pixel ratio on touch / low-core devices
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      window.matchMedia("(pointer: coarse)").matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    const maxPixelRatio = lowPower ? 1 : 1.5;

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
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    container.appendChild(renderer.domElement);

    // 2. Particle Geometry
    const particleCount = lowPower ? 900 : 1600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const cyanColor = new THREE.Color("#ff6a3d");
    const blueColor = new THREE.Color("#c2410c");
    const whiteColor = new THREE.Color("#ffffff");
    const charcoalColor = new THREE.Color("#4a433b");

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

    // 4. Animation & Scroll Delta Integration
    let animationFrameId = 0;
    let lastRender = 0;
    const clock = new THREE.Clock();

    const renderFrame = (now: number) => {
      const lenis = getLenis();
      const scrollProgress = lenis ? lenis.progress : 0;
      const scrollVelocity = lenis ? lenis.velocity : 0;

      // Idle drift is slow, so 30fps is indistinguishable; run full rate only while scrolling.
      const scrolling = Math.abs(scrollVelocity) > 0.05;
      if (!scrolling && now - lastRender < 33) return;
      lastRender = now;

      const elapsedTime = clock.getElapsedTime();
      particles.rotation.y = elapsedTime * 0.04 + scrollProgress * Math.PI * 1.5;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1 + scrollVelocity * 0.001;

      camera.position.z = 30 - scrollProgress * 15;
      camera.position.y = Math.sin(scrollProgress * Math.PI) * 4;

      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      renderFrame(now);
      animationFrameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!animationFrameId && !reduceMotion) animationFrameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    renderFrame(performance.now()); // always paint one frame (static backdrop for reduced motion)
    start();
    document.addEventListener("visibilitychange", onVisibility);

    // Resize Handler
    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
        renderFrame(performance.now());
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
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
