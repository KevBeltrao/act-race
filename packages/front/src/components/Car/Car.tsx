import { type FC } from 'react';
import { BufferGeometry, Material } from 'three';
import { GLTF } from 'three-stdlib';
import { useGLTF } from '@react-three/drei';

interface GLTFResult extends GLTF {
  nodes: {
    Iron: {
      geometry: BufferGeometry;
    };
    lights: {
      geometry: BufferGeometry;
    };
    mirrors: {
      geometry: BufferGeometry;
    };
    Wheel: {
      geometry: BufferGeometry;
    };
  };
  materials: {
    Iron: Material;
    Scene: Material;
    Wheels: Material;
    Lights: Material;
    Mirror: Material;
  };
}

interface CarProps {
  carPosition: number;
}

const Car: FC<CarProps> = ({ carPosition }) => {
  const { nodes, materials } = useGLTF('/car.glb') as GLTFResult;

  return (
    <group
      dispose={null}
      position={[0, carPosition, 0.5]}
      rotation={[0, Math.PI / 2, Math.PI / 2]}
      scale={0.2}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Iron.geometry}
        material={materials.Iron}
        position={[0, 1.081, 0.008]}
        scale={[4.188, 0.762, 1.599]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wheel.geometry}
        material={materials.Wheels}
        position={[2.681, 0.747, -1.68]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.567}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lights.geometry}
        material={materials.Lights}
        position={[4.191, 1.227, 0.928]}
        rotation={[0, 0, 1.585]}
        scale={[0.48, 0.077, 0.48]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mirrors.geometry}
        material={materials.Mirror}
        position={[1.538, 3.418, 0]}
        rotation={[0, 0, -1.471]}
        scale={[1.358, 1.003, 1]}
      />
    </group>
)};

export default Car;

useGLTF.preload('/car.glb');
