import Saludo from '../components/Saludo';

export default function Home() {
  return (
    <div className="">
      <Saludo nombre="Juan" edad={30} />
      <Saludo nombre="Ana" />
      <Saludo nombre="Pedro" edad={25} />
    </div>
  );
}
