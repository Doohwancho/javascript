interface BoardTypes {
	id: number
	name: string,
	price: number
}

interface BoardDetailsProps {
	board: BoardTypes;
}

export default function BoardDetails({ board }: BoardDetailsProps) {
	const { id, name, price } = board;
	return (
		<>
			<h5>------------------------------</h5>
			<h3>id: {id} </h3>
			<h3>name: {name}</h3>
			<h3>price: {price}</h3>
		</>
	)
}
