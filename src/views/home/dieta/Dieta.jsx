import { DietaRow } from './components/DietaRow'

export const Dieta = () => {

    const food = {
        food: "Corn Flakes",
        amount: "2",
        carbs: "2",
        proteins: "2",
        fats: "2",
        kcals: "2"
    }

    const food1 = {
        food: "Comia",
        amount: "2",
        carbs: "2",
        proteins: "2",
        fats: "2",
        kcals: "2"
    }

    const food2 = {
        food: "Pepe",
        amount: "2",
        carbs: "2",
        proteins: "2",
        fats: "2",
        kcals: "2"
    }

    const listOfFoods = [food, food1, food2];

    return (
        <div>
            <p>Comida 1 ➡️ Desayuno</p>
            <hr />
            {listOfFoods.map((food) =>
                <div key={food.food}>
                    <DietaRow food={food.food} amount={food.amount} carbs={food.carbs} proteins={food.proteins} fats={food.fats} kcals={food.kcals} />
                    <button className='btn' onClick={() => listOfFoods.remove(food)}>DELETE</button>
                </div>
            )}
            <hr />
            <p>Comida 2 ➡️ Almuerzo</p>
            <hr />
            <DietaRow food="Corn Flakes" amount="2" carbs="2" proteins="2" fats="2" kcals="2" />
            <hr />
            <p>Comida 3 ➡️ Comida</p>
            <DietaRow food="Corn Flakes" amount="2" carbs="2" proteins="2" fats="2" kcals="2" />
            <hr />
            <p>Comida 4 ➡️ Merienda</p>
            <DietaRow food="Corn Flakes" amount="2" carbs="2" proteins="2" fats="2" kcals="2" />
            <hr />
            <p>Comida 5 ➡️ Cena</p>
            <DietaRow food="Corn Flakes" amount="2" carbs="2" proteins="2" fats="2" kcals="2" />
            <hr />
        </div>
    )
}