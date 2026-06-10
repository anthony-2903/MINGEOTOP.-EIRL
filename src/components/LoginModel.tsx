import { useEffect, useRef } from 'react';

type LoginModelProps = {
  className?: string;
};

export default function LoginModel({ className = '' }: LoginModelProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    async function setupScene() {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;

      const mount = mountRef.current;
      if (!mount) return;

      const [THREE, { GLTFLoader }, { OrbitControls }, { MeshoptDecoder }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/controls/OrbitControls.js'),
        import('three/examples/jsm/libs/meshopt_decoder.module.js'),
      ]);

      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
      camera.position.set(0.15, 0.05, 2.4);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      mount.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;

      scene.add(new THREE.HemisphereLight(0xffffff, 0x1f3a2c, 2.7));
      const keyLight = new THREE.DirectionalLight(0xfff0d2, 3.2);
      keyLight.position.set(2.4, 2.2, 2.8);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0x9ad8b0, 1.8);
      fillLight.position.set(-2.2, 1.1, -1.8);
      scene.add(fillLight);

      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);
      const gltf = await loader.loadAsync('/models/login-model.glb');

      if (disposed) return;

      const model = gltf.scene;
      model.traverse((object: any) => {
        if (object.isMesh) {
          object.castShadow = false;
          object.receiveShadow = false;
          if (object.material) {
            object.material.envMapIntensity = 0.8;
          }
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      model.position.sub(center);
      model.scale.setScalar(1.55 / maxAxis);
      model.rotation.set(-0.12, -0.35, 0.02);
      scene.add(model);

      const resize = () => {
        const width = mount.clientWidth || 1;
        const height = mount.clientHeight || 1;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(mount);
      resize();

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        model.rotation.y += clock.getDelta() * 0.08;
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        observer.disconnect();
        controls.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        scene.traverse((object: any) => {
          object.geometry?.dispose?.();
          if (Array.isArray(object.material)) {
            object.material.forEach((material: any) => material.dispose?.());
          } else {
            object.material?.dispose?.();
          }
        });
      };
    }

    setupScene().catch((error) => {
      console.error('Error loading login 3D model:', error);
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
