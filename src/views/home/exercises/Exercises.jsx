import 'react-responsive-modal/styles.css';

import { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal';
import { API_URL } from '../../../constants';
import { CustomTable } from '../components/CustomTable';
import CustomAutoComplete from '../components/CustomAutoComplete';


export const Exercises = () => {

    const [selectedExercise, setSelectedExercise] = useState({});
    const isUpdateExercise = () => Object.keys(selectedExercise).length !== 0;

    const [open, setOpen] = useState(false);
    const [actingOnExercise, setActingOnExercise] = useState(false);

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchValue, setSearchValue] = useState([]);

    const getExercises = async () => {
        const resp = await fetch(`${API_URL}/exercises`);
        if (resp.ok) {
            const json = await resp.json();
            setData([])
            json.exercises.map((exercise) => {
                setData((oldData) => [...oldData, [exercise._id, exercise.title, exercise.description]])
            })
        } else {
            setData([])
        }
    }

    const updateOrCreateExercise = async (event) => {
        // Omite las acciones por defecto
        event.preventDefault()

        if (actingOnExercise) return;

        setActingOnExercise(true);

        const fields = Object.fromEntries(new window.FormData(event.target))
        const data = JSON.stringify({
            title: fields.title,
            description: fields.description === "" ? fields.title : fields.description,
        })

        // Se crea un objeto para comparar el ejercicio con los datos del formulario
        // y asi evitar lanzar una llamada de update cuando no es necesario
        const { _id, created_at, ...exerciseToCompare } = selectedExercise;

        if (isUpdateExercise && JSON.stringify(exerciseToCompare) != data) {
            const resp = await fetch(`${API_URL}/exercises/${isUpdateExercise() ? `${selectedExercise._id}/update` : `create`}`, {
                method: isUpdateExercise() ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data,
            });
            handleResponse(resp)
        }
        onCloseModal();
    }

    const deleteExercise = async (exerciseId) => {
        if (actingOnExercise) return;

        setActingOnExercise(true);

        const resp = await fetch(`${API_URL}/exercises/${exerciseId}/delete`, { method: 'DELETE' });
        handleResponse(resp)
    }

    const handleResponse = (resp) => {
        if (resp.ok) {
            getExercises();
        } else {
            alert('Ha ocurrido un error')
        }

        setActingOnExercise(false);
    }

    const onOpenModal = (item) => {
        if (item !== null) {
            setSelectedExercise(item)
        }
        setOpen(true);
    }

    const onCloseModal = () => {
        setOpen(false);
        setTimeout(() => {
            setSelectedExercise({});
        }, 200);
    }

    const newBtn = () => <input type="button" value="Add New" onClick={() => onOpenModal(null)} />
    const editBtn = (item) => <input type="button" value="Edit" onClick={() => onOpenModal(item)} />
    const deleteBtn = (id) => <input type="button" value="Delete" onClick={() => deleteExercise(id)} />

    useEffect(() => {
        getExercises()
    }, [])

    return (
        <>
            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                }}
            >
                <div className='flex-col'>
                    <form onSubmit={updateOrCreateExercise}>
                        <h2>{isUpdateExercise() ? 'Update' : 'Create'} new food</h2>
                        <label htmlFor="title">Title:</label>
                        <input className='input' required type="text" name="title" id="title" defaultValue={selectedExercise.title} />

                        <label htmlFor="description">Description:</label>
                        <input className='input' type="text" name="description" id="description" defaultValue={selectedExercise.description} />

                        <div style={{ height: '20px' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <input className='btn' type="submit" value={isUpdateExercise() ? 'Update' : 'Create'} />
                        </div>
                    </form>
                </div>
            </Modal>

            {/* <CustomAutoComplete options={searchData} searchValue={searchValue} setSearchValue={setSearchValue} /> */}

            {data !== null
                ? data.length > 0
                    ? <CustomTable headers={['Title', 'Description']} data={data} newBtn={newBtn} editBtn={editBtn} deleteBtn={deleteBtn} />
                    : <p>No hay resultados</p>
                : <p>Loading</p>}
        </>
    )
}