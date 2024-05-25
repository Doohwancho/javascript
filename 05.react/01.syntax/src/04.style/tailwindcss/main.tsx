import CGrid from "./01.layout/01.grid/CGrid";
import CFlexbox from "./01.layout/02.flexbox/CFlexbox";
import CSimpleStyle from "./02.style/CSimpleStyle";
import CButton from "./03.component/01.button/CButton";
import CRadio from "./03.component/02.radio/CRadio";
import CInput from "./03.component/03.input/CInput";
import CLabel from "./03.component/04.label/CLabel";
import CTextArea from "./03.component/05.textarea/CTextArea";
import CCheckbox from "./03.component/06.checkbox/CCheckbox";
import "./mytailwind.css";

export default function TailwindMain() {
  return (
    <>
      {/* step1) layout */}
      {/* <CGrid /> */}
      {/* <CFlexbox /> */}

      {/* step2) style */}
      {/* <CSimpleStyle /> */}

      {/* step3) component */}
      {/* <CButton onClick={function clickBtn() { console.log('clicked!') }}/> */}
      {/* <CRadio id="1" name="first" label="hello?" /> */}
      {/* <CRadio id="2" name="second" label="world" /> */}
      {/* <CInput placeholder="hello world" /> */}
      {/* <CLabel htmlFor="nothing" labelText="hello world" /> */}
      {/* <CTextArea placeholder="hello world" /> */}
      <CCheckbox id="1" label="hello world"/>
    </>
  );
}
