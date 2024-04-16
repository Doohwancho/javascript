import FormComponent from "./form/FormComponent";
import { Button } from 'semantic-ui-react'

function Molecule() {
    return (
        <>
            <h1>2. molecule</h1>
            <text>
                1. form
                - modal
                - filter
                - highlight
                - card
                - counter
                - rating
            </text>

            <h3>=============================================================</h3>
            <h2>step1 - form</h2>
            <FormComponent />
            <h3>=============================================================</h3>
            <Button color='instagram' size='mini'>
                로그인
            </Button>
            <h3>=============================================================</h3>
            <Button color='teal' size='large'>
                Login
            </Button>
        </>
    );
}

export default Molecule;