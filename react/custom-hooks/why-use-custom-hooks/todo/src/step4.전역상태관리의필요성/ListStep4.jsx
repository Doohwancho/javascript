import { userInputTodoStep4 } from "./useInputTodoStep4";

export default function TodoListStep4() {
    const {list, deleteItem} = userInputTodoStep4()

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