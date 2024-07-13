import { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { API_URL } from '../../../constants';

const localizer = dayjsLocalizer(dayjs);

export const CalendarioRutinas = () => {
    const [open, setOpen] = useState(false);

    const [events, setEvents] = useState([]);
    const [exercises, setExercises] = useState([]);

    const emptySerie = { weight: 0, reps: 0, rpe: 0 }
    const emptyExercise = { title: '', description: '', series: [emptySerie] }

    const loadListOfRoutines = async (inicio, fin) => {
        const resp = await fetch(`${API_URL}/routines/by-date?inicio=${inicio}&fin=${!fin ? inicio : fin}`, {
            method: 'GET',
        });
        if (resp.ok) {
            const json = await resp.json();
            const newEvents = json.routines.map(item => ({
                title: item.title,
                start: new Date(2024, 5, 10, 10, 0),
                end: new Date(2024, 5, 10, 12, 0)
            }));
            setEvents([...events, ...newEvents]);
            console.log(json)
        } else {
            setEvents([])
        }
    }

    const addEmptyExercise = () => setExercises(prevExercises => [...prevExercises, emptyExercise]);
    const addEmptySerieToExercise = (exercise) => {
        exercise.series = [...exercise.series, emptySerie]
        setExercises(previousExercises => [...previousExercises, exercises])
    }

    const addRoutine = async () => {
        alert('hola')
    }

    const onCloseModal = () => {
        setOpen(false)
    }

    useEffect(() => {
        const currentDate = new Date();
        // Date Start
        const dateStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0);
        const timestampStart = Math.floor(dateStart.getTime() / 1000);
        // Date End
        const dateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
        const timestampEnd = Math.floor(dateEnd.getTime() / 1000);
        loadListOfRoutines(timestampStart, timestampEnd)
    }, [])

    return (
        <>
            <input className='tab-btn' type='button' value="Crear Rutina" onClick={() => { setOpen(true) }} />

            <Modal
                open={open}
                onClose={() => onCloseModal()}
            >
                <div className='flex-col'>
                    <form onSubmit={addRoutine}>
                        <label htmlFor="title">Title:</label>
                        <input className='input' type="text" name="title" id="title" />

                        <label htmlFor="title">Description:</label>
                        <input className='input' type="text" name="description" id="description" />

                        <label htmlFor="title">Date:</label>
                        <DatePicker label="Basic date picker" />

                        <label htmlFor="title">Exercises:</label>
                        {exercises && exercises.length > 0
                            && exercises.map((exercise) => (
                                <>
                                    <div>
                                        <label htmlFor="title">Title:</label>
                                        <div style={{ width: 8 }}></div>
                                        <input className='input' type="text" name="title" id="title" onChange={(e) => exercise.title = e.target.value} />
                                    </div>
                                    <div style={{ height: 8 }}></div>
                                    <div>
                                        <label htmlFor="title">Description:</label>
                                        <div style={{ width: 8 }}></div>
                                        <input className='input' type="text" name="description" id="description" onChange={(e) => exercise.description = e.target.value} />
                                    </div>
                                    {exercise.series.map((serie) => (
                                        <>
                                            <div className='row'>
                                                <div>
                                                    <label htmlFor="title">Weight:</label>
                                                    <div style={{ width: 8 }}></div>
                                                    <input className='input' type="number" name="weight" id="weight" onChange={(e) => serie.weight = e.target.value} />
                                                </div>
                                                <div>
                                                    <label htmlFor="title">Reps:</label>
                                                    <div style={{ width: 8 }}></div>
                                                    <input className='input' type="number" name="reps" id="reps" onChange={(e) => serie.weight = e.target.value} />
                                                </div>
                                                <div>
                                                    <label htmlFor="title">Rpe:</label>
                                                    <div style={{ width: 8 }}></div>
                                                    <input className='input' type="number" name="roe" id="rpe" onChange={(e) => serie.weight = e.target.value} />
                                                </div>
                                            </div>
                                            <input type='button' value='Add Serie' onClick={() => addEmptySerieToExercise()} />
                                        </>
                                    ))}
                                    <div style={{ height: 24 }} />
                                </>
                            )
                            )}
                        <input type='button' value='Add Exercise' onClick={() => addEmptyExercise()} />
                        <div style={{ height: 24 }}></div>
                        <input type="submit" value="Crear" />
                    </form>
                </div>
            </Modal>

            <div>

                <Calendar
                    views={['month']}
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </>
    )
}