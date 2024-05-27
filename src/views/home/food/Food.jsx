import '../Home.css'
import 'react-responsive-modal/styles.css';

import { useState, useEffect } from "react"
import { Modal } from 'react-responsive-modal';

export const Food = () => {

    const [food, setFood] = useState([]);
    const [filteredFood, setFilteredFood] = useState([]);
    const [supermarkets, setSupermarkets] = useState([]);
    const [selectedSuperMarket, setSelectedSuperMarket] = useState('');

    const [selectedFood, setSelectedFood] = useState({});

    const [open, setOpen] = useState(false);

    const getFood = async () => {
        const resp = await fetch('http://localhost:3900/food');
        if (resp.ok) {
            const json = await resp.json();
            if (json.food?.length >= 0) {
                setFood(json.food)
                setFilteredFood(json.food)
            }
        } else {
            setFood([])
            setFilteredFood([])
        }
    }

    const getSupermarkets = async () => {
        const resp = await fetch('http://localhost:3900/food/supermarkets');
        if (resp.ok) {
            const json = await resp.json();
            if (json.supermarkets?.length > 0) setSupermarkets(json.supermarkets)
            if (selectedSuperMarket === '') setSelectedSuperMarket(json.supermarkets[0])
        } else {
            setSupermarkets([])
        }
    }

    const filterFood = (value) => {
        if (value === "") {
            setFilteredFood(food)
            return
        }

        const filtered = food.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredFood(filtered);
    }

    const updateOrCreateFood = async (event) => {
        // Omite las acciones por defecto
        event.preventDefault()

        // Obtener los datos del formulario
        const fields = Object.fromEntries(new window.FormData(event.target))

        const data = JSON.stringify({
            title: fields.title,
            carbs: fields.carbs,
            proteins: fields.proteins,
            fats: fields.fats,
            calories: fields.calories,
            supermarket: selectedSuperMarket,
        })

        const resp = await fetch(`http://localhost:3900/food/${isSelectedFoodSelected() ? `update/${selectedFood._id}` : 'create'}`, {
            method: isSelectedFoodSelected() ? 'PUT' : 'POST',
            body: data,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        if (!resp.ok) {
            alert('error')
        } else {
            onCloseModal();
            getFood();
        }
    }

    const deleteFood = async (id) => {
        if (id === null || id === "") return;
        const resp = await fetch(`http://localhost:3900/food/${id}/delete/`, { method: 'DELETE' });
        if (resp.ok) {
            setFood(food.filter(item => item._id !== id));
            setFilteredFood(food.filter(item => item._id !== id));
        }
    }

    const onOpenModal = (item) => {
        if (item !== null) {
            setSelectedFood(item)
            setSelectedSuperMarket(item.supermarket)
        }
        setOpen(true);
    }
    const onCloseModal = () => {

        setSelectedFood({});
        setOpen(false);
    }

    const isSelectedFoodSelected = () => {
        console.log(selectedFood);
        return false;
    }

    useEffect(() => {
        getFood()
        getSupermarkets()
    }, [])


    return (
        <div>
            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
            >
                <div className='flex-col'>
                    <form onSubmit={updateOrCreateFood}>
                        <h2>{isSelectedFoodSelected() ? 'Update' : 'Create'} new food</h2>
                        <label htmlFor="title">Title:</label>
                        <input className='input' type="text" name="title" id="title" defaultValue={selectedFood.title} />

                        <label htmlFor="carbs">Carbs:</label>
                        <input className='input' type="number" name="carbs" id="carbs" defaultValue={selectedFood.carbs} />

                        <label htmlFor="fats">Fats:</label>
                        <input className='input' type="number" name="fats" id="fats" defaultValue={selectedFood.fats} />

                        <label htmlFor="proteins">Proteins:</label>
                        <input className='input' type="number" name="proteins" id="proteins" defaultValue={selectedFood.proteins} />

                        <label htmlFor="calories">Calories:</label>
                        <input className='input' type="number" name="calories" id="calories" defaultValue={selectedFood.calories} />

                        <label htmlFor="supermarket">Supermarket:</label>
                        <select onChange={(e) => setSelectedSuperMarket(e.target.value)}>
                            {
                                supermarkets.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>

                        <div style={{ height: '20px' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <input className='btn' type="submit" value={isSelectedFoodSelected() ? "Update" : "Add"} />
                        </div>
                    </form>
                </div>
            </Modal>

            <input type="button" value="NEW" onClick={() => onOpenModal(null)} />

            <input type="text" placeholder="Busca por nombre..." onChange={(e) => filterFood(e.target.value)} />
            {
                filteredFood.length > 0 ? filteredFood.map((item, index) => (
                    <div key={index}>
                        <p>{item.title} | {item.carbs} | {item.fats} | {item.proteins} | {item.calories} | {item.supermarket}</p>
                        <div>
                            <input type="button" value="Edit" onClick={() => onOpenModal(item)} />
                            <input type="button" value="Delete" onClick={() => deleteFood(item._id)} />
                        </div>
                    </div>
                )) : <p>No hay resultados</p>
            }
        </div>
    )
}