//import { Link } from "react-router-dom";
import { useState } from "react"
import BoardDetails from "../components/BoardList/BoardDetails";

interface BoardTypes {
	id: number
	name: string,
	price: number
}


function Board() {
	const [boardList, setBoardList] = useState<BoardTypes[]>([
    {
      id: 0,
      name: "laptop",
      price: 5000
    },
    {
      id: 1,
      name: "phone",
      price: 3000
    },
	{
		id: 2,
		name: "shirts",
		price: 1000
	}
  ])
	return (
		<>
			<h2>BoardList Page!</h2>
			{ boardList.map(board => <BoardDetails key={board.id} board={board} />)}
		</>
	);
}

export default Board;
