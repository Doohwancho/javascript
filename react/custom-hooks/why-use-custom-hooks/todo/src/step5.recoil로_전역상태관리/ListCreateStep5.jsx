import { userInputTodoStep5 } from "./useInputTodoStep5";

export const ListCreateStep5 = () => {
    const {inputText, setInputText, createItem} = userInputTodoStep5();

    return (
        <>
            <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            />
            <button 
            onClick={() => {
                createItem();
            }}
            >
            Add 
            </button>
        </>
    )
}