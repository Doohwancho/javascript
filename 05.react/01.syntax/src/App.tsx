import './App.css'
import ReactPatterns from './03.react-patterns/index';
import Atom from "./05.atomic-design/01.atom/atom";
import Molecule from "./05.atomic-design/02.molecule/molecule";
import LoginPage from './05.atomic-design/05.page/LoginPage'
import TsxIndex from './01.types-for-tsx';
import TailwindMain from './04.style/tailwindcss/main';
import ShadcnMain from './06.shadcn/main';

function App() {

  return (
    <>
      {/* step1. tsx */}
      {/* <TsxIndex /> */}

      {/* step2. react patterns */}
      {/* <ReactPatterns /> */}

      {/* step3. atomic design pattern */}
      {/* <Atom /> */}
      {/* <Molecule /> */}
      {/* <LoginPage /> */}

      {/* step4. tailwind */}
      <TailwindMain />

      {/* step5. shadcn */}
      {/* <ShadcnMain /> */}
    </>
  )
}

export default App
