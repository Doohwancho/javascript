/** @jsxImportSource @emotion/react */
import { CButton } from "./button/index";
import Checkbox from "./checkbox/checkbox";
import Radio from "./radio/Radio";
import TextArea from "./textarea/TextArea";
import TextInput from "./textInput/TextInput";
import { Box } from "./box";
import { Nike } from "./icon/Nike";
import Link from "./link/Link";
import Image from "./image/Image";
import Spinner from "./spinner/Spinner";
import Text from "./text/Text";
import TextList from "./list/TextList";
import { Button } from "semantic-ui-react";

function Atom() {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']; 
    
    return (
        <>
            <h1>1. atoms</h1>
            <text>
                1. theme
                2. button 
                3. textarea
                4. radio 
                5. checkbox
                6. input
                7. box
                8. icon 
                9. link 
                10. image 
                11. spinner 
                12. text
                13. list 
            </text>
            <h3>=============================================================</h3>

            <h2>step1 - CButton</h2>
            <CButton variant="solid" color="blue-lighten1" size="lg">
                Custom CButton!
            </CButton>
            <CButton variant="solid" color="red-lighten3" size="sm">
                Custom CButton!
            </CButton>
            <CButton></CButton>

            <Button color='teal' fluid size='large'>
                Login
            </Button>



            <h3>=============================================================</h3>
            <h2>step2 - TextArea</h2>
            <TextArea
                appearance="standard" //style related, from useStyle.ts, - standard, none
                color="grey-base" //style related, from useStyle.ts
                maxWidth={240} //text related, from useTextarea.ts
                maxHeight={100} //text related, from useTextarea.ts
                resize="none" //text related, from useTextarea.ts - horizontal, vertical, none
                defaultValue={"텍스트를 입력해주세요"} //text related, from useTextarea.ts
            ></TextArea>
            <textarea>hello?</textarea>

            <h3>=============================================================</h3>
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

            <h3>=============================================================</h3>
            <h2>step4 - checkbox</h2>
            <Checkbox />
            <Checkbox color="amber-lighten1" />
            <Checkbox checked color="lightBlue-darken1" />
            <Checkbox disabled label="test" />
            <Checkbox checked disabled />

            <h3>=============================================================</h3>
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

            <h3>=============================================================</h3>
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

            <h3>=============================================================</h3>
            <h2>step7 - icon</h2>
            <Nike />

            <h3>=============================================================</h3>
            <h2>step8 - Link</h2>
            <Link to="https://google.com">google</Link>

            <h3>=============================================================</h3>
            <h2>step9 - image</h2>
            <Image src="https://reactnative.dev/img/header_logo.svg" alt="image" width={100} height={100} />

            <h3>=============================================================</h3>
            <h2>step10 - loading spinner</h2>
            <Spinner />

            <h3>=============================================================</h3>
            <h2>step11 - text</h2>
            <Text fontSize={32} bold={true}>this is bold h1 text</Text>
            <br></br>
            <Text fontSize={16} bold={false}>this is regular text</Text>

            <h3>=============================================================</h3>
            <h2>step12 - list</h2>
            <TextList items={items} fontSize={18} color="black" />
            <h3>=============================================================</h3>
        </>
    )

}
export default Atom;