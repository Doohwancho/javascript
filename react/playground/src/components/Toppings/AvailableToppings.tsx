import Card from "../ui/Card";
import ToppingItem from "./ToppingItem/ToppingItem";

function AvailableToppings() {
    return (
        <>
            <h3>Available Toppings</h3>
            <section>
                <Card>
                    <ToppingItem />
                </Card>
            </section>
        </>
    )
}

export default AvailableToppings;