import '../Home.css'
import 'react-responsive-modal/styles.css';

import { useState, useEffect } from "react"
import { Modal } from 'react-responsive-modal';
import { API_URL } from '../../../constants';
import { CustomTable } from '../components/CustomTable';

export const Food = () => {

    const [listOfSupermarkets, setListOfSupermarkets] = useState([]);
    const [selectedSuperMarket, setSelectedSuperMarket] = useState('');

    const [selectedFood, setSelectedFood] = useState({});
    const isSelectedFoodSelected = () => Object.keys(selectedFood).length !== 0;

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    const getFood = async () => {
        const resp = await fetch(`${API_URL}/food`);
        if (resp.ok) {
            const json = await resp.json();
            console.log(json)
            json.food.map((food) => {
                console.log(food)
                setData((oldData) => [...oldData, [food._id, food.title, food.carbs, food.fats, food.proteins, food.calories, food.supermarket]])
            })
        } else {
            setData([])
        }
    }

    const getSupermarkets = async () => {
        const resp = await fetch(`${API_URL}/food/supermarkets`);
        if (resp.ok) {
            const json = await resp.json();
            setListOfSupermarkets(json.supermarkets)
            if (selectedSuperMarket === '' && json.supermarkets?.length > 0) setSelectedSuperMarket(json.supermarkets[0])
        } else {
            setListOfSupermarkets([])
        }
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

        const resp = await fetch(`${API_URL}/food/${isSelectedFoodSelected() ? `update/${selectedFood._id}` : 'create'}`, {
            method: isSelectedFoodSelected() ? 'PUT' : 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: data,
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
        const resp = await fetch(`${API_URL}/food/${id}/delete/`, { method: 'DELETE' });
        if (resp.ok) {
            setData(data.filter(item => item[0] !== id));
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

    useEffect(() => {
        getFood()
        getSupermarkets()
    }, [])

    const newBtn = () => <input type="button" value="NEW" onClick={() => onOpenModal(null)} />
    const editBtn = () => <input type="button" value="Edit" onClick={() => onOpenModal(item)} />
    const deleteBtn = () => <input type="button" value="Delete" onClick={() => deleteFood(item._id)} />


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
                                listOfSupermarkets.map((item, index) => (
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

            {data !== null
                ? data.length > 0
                    ? <CustomTable headers={['Title', 'Carbs', 'Fats', 'Proteins', 'Calories', 'Supermarket']} data={data} newBtn={newBtn} editBtn={editBtn} deleteBtn={deleteBtn} />
                    : <p>No hay resultados</p>
                : <p>Loading</p>}
        </div>
    )
}