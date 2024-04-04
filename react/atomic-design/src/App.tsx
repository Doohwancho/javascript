// import { useState } from "react";
import "./App.css";
import { Button } from "./atomic-design/atom/button";
import TextArea from "./atomic-design/atom/textarea/TextArea";

function App() {
  return (
    <>
      {/* step1 - button */}
      <Button variant="solid" color="blue-lighten1" size="lg">
        Custom Button!
      </Button>
      <Button></Button>

      {/* step2 - textarea */}
      <TextArea
        appearance="standard" //style related, from useStyle.ts, - standard, none
        color="grey-base" //style related, from useStyle.ts
        maxWidth={240} //text related, from useTextarea.ts
        maxHeight={100} //text related, from useTextarea.ts
        resize="none" //text related, from useTextarea.ts - horizontal, vertical, none
        defaultValue={"텍스트를 입력해주세요"} //text related, from useTextarea.ts
      ></TextArea>
    </>
  );
}

export default App;
