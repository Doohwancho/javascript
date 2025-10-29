import './App.css'
import ReactPatterns from './03.react-patterns/index';
import Atom from "./05.atomic-design/01.atom/atom";
import Molecule from "./05.atomic-design/02.molecule/molecule";
import LoginPage from './05.atomic-design/05.page/LoginPage'
import TsxIndex from './01.types-for-tsx';
import TailwindMain from './04.style/tailwindcss/main';
import ShadcnMain from './06.shadcn/main';
import { UseRefDemo } from './02.hooks/state/05.useRef/02.what/useRefDemo';
import UseRefDemo2 from './02.hooks/state/05.useRef/03.useRef_vs_useState/useRefDemo2';
import Parent from './02.hooks/state/05.useRef/05.useImperativeHandle/ex2';
import ParentComponent from './02.hooks/state/05.useRef/05.useImperativeHandle/ex1';
import Example from './09.graph/bar_stack';

function App() {

  return (
    <>
      <Example width={1000} height={1000} />
      {/* step1. tsx */}
      {/* <TsxIndex /> */}

      {/* step2. hooks */}
      {/* <UseRefDemo /> */}
      {/* <UseRefDemo2 /> */}
      {/* <Parent /> */}
      {/* <ParentComponent /> */}


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

      {/* step7. motion  */}

    </>
  )
}

export default App
