import { userInputTodoStep5 } from "./useInputTodoStep5";

export default function ListStep5() {
    const {list, deleteItem} = userInputTodoStep5()

    return (
        <>
            <ol>
                {
                    list.map((item, index) => {
                    return <li key={index}>
                        {item}
                        <button
                        onClick={() => {
                            deleteItem(index);
                        }}
                        >
                            Delete
                        </button>
                        </li>;
                    })
                }
            </ol>
        </>
    )
}