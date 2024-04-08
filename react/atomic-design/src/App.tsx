// import { useState } from "react";
import "./App.css";
import { Button } from "./atomic-design/atom/button";
import Checkbox from "./atomic-design/atom/checkbox/checkbox";
import Radio from "./atomic-design/atom/radio/Radio";
import TextArea from "./atomic-design/atom/textarea/TextArea";
import TextInput from "./atomic-design/atom/textInput/TextInput";
import { Box } from "./atomic-design/atom/box";
import { Nike } from "./atomic-design/atom/icon/Nike";

function App() {
  return (
    <>
      <h1>atoms</h1>
      <text>
        1. theme
        2. button 
        3. textarea
        4. radio 
        5. checkbox
        6. input
        7. box
        8. icon 
        - link 
        - image 
        - spinner 
      </text>
      <h2>step1 - Button</h2>
      <Button variant="solid" color="blue-lighten1" size="lg">
        Custom Button!
      </Button>
      <Button variant="solid" color="red-lighten3" size="sm">
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

      <h2>step5 - input</h2>
      <>
        <TextInput variant="outline" inputSize="sm" label="outline" />
        <TextInput variant="outline" inputSize="md" placeholder="placeholder" />
        <TextInput
          variant="outline"
          inputSize="lg"
          label="outline"
          placeholder="placeholder"
        />
        <TextInput variant="outline" inputSize="xl" />

        <TextInput
          variant="filled"
          inputSize="sm"
          label="filled"
          placeholder="placeholder"
        />
        <TextInput variant="filled" inputSize="md" label="filled" />
        <TextInput variant="filled" inputSize="lg" />
        <TextInput variant="filled" inputSize="xl" label="filled" />

        <TextInput variant="solo" inputSize="sm" label="solo" />
        <TextInput
          variant="solo"
          inputSize="md"
          placeholder="only_placeholder"
        />
        <TextInput
          variant="solo"
          inputSize="lg"
          label="solo"
          placeholder="placeholder"
        />
        <TextInput variant="solo" inputSize="xl" />
      </>
      <>
        <TextInput inputSize="sm" label="sm" />
        <TextInput inputSize="md" label="md" />
        <TextInput inputSize="lg" label="lg" />
        <TextInput inputSize="xl" label="xl" />
      </>
      <>
        <TextInput type="text" label="ID" />
        <TextInput type="password" label="password" />
        <TextInput type="text" label="ID" />
        <TextInput type="password" label="password" />
        <TextInput type="text" label="only label" />
        <TextInput placeholder="only placeholder" />
        <TextInput label="label" placeholder="placeholder" />
        <TextInput label="defaultValue" defaultValue="defaultValue" clearable />
        <TextInput variant="filled" value="disabled" disabled />
        <TextInput variant="outline" value="disabled" disabled />
        <TextInput variant="solo" value="disabled" disabled />
      </>
      <form>
        <TextInput type="text" label="ID" />
        <TextInput type="password" label="password" />
        <TextInput type="text" label="only label" />
        <TextInput placeholder="only placeholder" />
        <TextInput label="label" placeholder="placeholder" />
        <TextInput label="defaultValue" defaultValue="defaultValue" />
        <TextInput variant="filled" value="disabled" disabled />
        <TextInput variant="outline" value="disabled" disabled />
        <TextInput variant="solo" value="disabled" disabled />
      </form>
      <h2>step6 - Box</h2>
      <Box>
        <Box width="64px" height="64px" center backgroundColor="yellow-base">
          <span>first</span>
        </Box>
        <Box width="64px" height="64px" center backgroundColor="blue-base">
          <span>second</span>
        </Box>
        <Box width="64px" height="64px" center backgroundColor="amber-base">
          <span>third</span>
        </Box>
        <Box width="64px" height="64px" center backgroundColor="cyan-base">
          <span>fourth</span>
        </Box>
      </Box>
      <h2>step7 - icon</h2>
      <Nike />
    </>
  );
}

export default App;
