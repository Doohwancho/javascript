// import { useState } from "react";
import "./App.css";
import { Button } from "./atomic-design/atom/button";
import Checkbox from "./atomic-design/atom/checkbox/checkbox";
import Radio from "./atomic-design/atom/radio/Radio";
import TextArea from "./atomic-design/atom/textarea/TextArea";

function App() {
  return (
    <>
      <h2>step1 - Button</h2>
      <Button variant="solid" color="blue-lighten1" size="lg">
        Custom Button!
      </Button>
      <Button></Button>

      <h2>step2 - TextArea</h2>
      <TextArea
        appearance="standard" //style related, from useStyle.ts, - standard, none
        color="grey-base" //style related, from useStyle.ts
        maxWidth={240} //text related, from useTextarea.ts
        maxHeight={100} //text related, from useTextarea.ts
        resize="none" //text related, from useTextarea.ts - horizontal, vertical, none
        defaultValue={"텍스트를 입력해주세요"} //text related, from useTextarea.ts
      ></TextArea>

      <h2>step3 - Radio</h2>
      <Radio
        name="fruit"
        size="lg"
        color="yellow-lighten3"
        defaultChecked={false}
      >
        포도
      </Radio>
      <Radio
        name="fruit"
        size="lg"
        color="yellow-lighten3"
        defaultChecked={true}
        // onClick={(e) => alert(e.target.value)}
      >
        바나나
      </Radio>
      <Radio
        name="fruit"
        size="lg"
        color="yellow-lighten3"
        defaultChecked={true}
        // onClick={(e) => alert(e.target.value)}
      >
        수박
      </Radio>

      <h2>step4 - checkbox</h2>
      {/* <Checkbox>와자뵤</Checkbox> */}
      <Checkbox />
      <Checkbox color="amber-lighten1" />
      <Checkbox checked color="lightBlue-darken1" />
      <Checkbox disabled label="test" />
      <Checkbox checked disabled />
    </>
  );
}

export default App;
