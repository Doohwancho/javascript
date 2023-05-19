import Card from "../ui/Card";
import ToppingItem from "./ToppingItem/ToppingItem";
import classes from './AvailableToppings.module.css';


function AvailableToppings() {
    return (
        <>
            <h3>Available Toppings</h3>
            <section className = {classes.toppings}>
                <Card>
                    <ToppingItem />
                </Card>
            </section>
        </>
    )
}

export default AvailableToppings;