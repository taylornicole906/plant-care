import React, { useRef, useEffect, useState, Suspense } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section";

// Page State
import state from "./components/state";

// R3F
import { Canvas, useFrame } from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";

// React Spring
import { a, useTransition } from "@react-spring/web";
//Intersection Observer
import { useInView } from "react-intersection-observer";

function Model({ url }) {
  const gltf = useGLTFLoader(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model url={modelPath} />
        </mesh>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className='container'>
            <h1 className='title'>{children}</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className='loading' style={{ opacity }}>
          <div className='loading-bar-container'>
            <a.div className='loading-bar' style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}

export default function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 75 }}>
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            bgColor='#fcd5ce'
            modelPath='/succulent3.gltf'
            position={225}>
            <span>The ultimate guide to keeping </span>
            <span>your houseplants alive. </span>
          </HTMLContent>

          <HTMLContent
            domContent={domContent}
            bgColor='#f8edeb'
            modelPath='/drac.gltf'
            position={0}>
            <span>Aloe Vera</span>
            <span className = 'top'>Place in bright, indirect sunlight or </span>
            <span className = 'small'>artificial light. Water your aloe plant </span>
            <span className = 'small'>once every 2-3 weeks in spring and </span>
            <span className = 'small'>summer, and even less often in winter. </span>
            <span className = 'small'>Aloe vera do best in temperatures  </span>
            <span className = 'small'>between 55 and 80°F. </span>
          </HTMLContent>

          
          <HTMLContent
            domContent={domContent}
            bgColor='#fcd5ce'
            modelPath='/figTree2.gltf'
            position={-250}>
            <span>Fiddle Leaf Fig</span>
            <span className = 'top'>The Fiddle Leaf Fig appreciates a warm, humid </span>
            <span className = 'small'>environment, a fair amount of water  </span>
            <span className = 'small'>and plenty of light.A few hours of direct sun is </span>
            <span className = 'small'>also beneficial. They will not thrive in  </span>
            <span className = 'small'>low-light locations. Let soil dry between  </span>
            <span className = 'small'>waterings. </span>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor='#f8edeb'
            modelPath='/airplant3.gltf'
            position={-500}>
            <span>Air Plant</span>
            <span className = 'top'>In order to thrive, air plants need  </span>
            <span className = 'small'>bright, indirect light. In general, </span>
            <span className = 'small'>the higher the humidity in your   </span>
            <span className = 'small'>space, the more light is tolerated </span>
            <span className = 'small'>by your air plant. Every 1-2 </span>
            <span className = 'small'>weeks, soak in room temperature </span>
            <span className = 'small'>water. In spring and summer, </span>
            <span className = 'small'>you may need to water more often. </span>
          </HTMLContent>

          <HTMLContent
            domContent={domContent}
            bgColor='#fcd5ce' //white
            modelPath='/pothos2.gltf'
            position={-750}>
            <span>Pothos</span>
            <span className = 'top'>Pothos enjoy a wide range of environments. </span>
            <span className = 'small'>They do well in bright indirect sunlight </span>
            <span className = 'small'>as well as low light and can be grown in </span>
            <span className = 'small'>dry soil or vases of water. Water </span>
            <span className = 'small'>once a week and keep out of bright direct  </span>
            <span className = 'small'>light. Room temperature environment is ideal.</span>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor='#f8edeb' //pink
            modelPath='/snakeplant.gltf'
            position={-1000}>
            <span>Snake plant</span>
            <span className = 'top'>The snake plant is known for being very tolerant </span>
            <span className = 'small'>and can be neglected for weeks at a time. </span>
            <span className = 'small'>Water every 1-2 weeks in spring and </span>
            <span className = 'small'>summer, and even less often in winter. </span>
            <span className = 'small'>Snake plants do best in temperatures  </span>
            <span className = 'small'>between 55 and 80°F. </span>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}
        {...events}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}