import './App.css'
import ReactPatterns from './03.react-patterns/index';
import Atom from "./05.atomic-design/01.atom/atom";
import Molecule from "./05.atomic-design/02.molecule/molecule";
import LoginPage from './05.atomic-design/05.page/LoginPage'
import TsxIndex from './01.types-for-tsx';
import TailwindMain from './04.style/tailwindcss/main';
import ShadcnMain from './06.shadcn/main';
import { UseRefDemo } from './02.hooks/state/05.useRef/01.what/useRefDemo';
import UseRefDemo2 from './02.hooks/state/05.useRef/02.useRef_vs_useState/useRefDemo2';

function App() {

  return (
    <>
      {/* step1. tsx */}
      {/* <TsxIndex /> */}

      {/* step2. hooks */}
      {/* <UseRefDemo /> */}
      <UseRefDemo2 />

      {/* step3. react patterns */}
      {/* <ReactPatterns /> */}

      {/* step4. atomic design pattern */}
      {/* <Atom /> */}
      {/* <Molecule /> */}
      {/* <LoginPage /> */}

      {/* step5. tailwind */}
      {/* <TailwindMain /> */}

      {/* step6. shadcn */}
      {/* <ShadcnMain /> */}
    </>
  )
}

export default App
