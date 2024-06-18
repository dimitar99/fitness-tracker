import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { API_URL } from '../../../constants';

export const RutinaDetail = (routineId) => {
    const [currentDayExercises, setCurrentDayExercises] = useState([]);

    const loadCurrentRoutine = async (id) => {
        const resp = await fetch(`${API_URL}/routines/${id}`, {
            method: 'GET',
        });
        if (resp.ok) {
            const json = await resp.json();
            console.log(json.routine.exercises)
            setCurrentDayExercises(json.routine.exercises)
            console.log(currentDayExercises)
        } else {
            setCurrentDayExercises([])
        }
    }

    useEffect(() => {
        loadCurrentRoutine(JSON.stringify(routineId) === '{}' ? '666d9802224c74ffa1da6f98' : routineId)
    }, [])

    return (
        <>
            <div className="rutina-container">
                {currentDayExercises !== null
                    ? currentDayExercises.length > 0
                        ? currentDayExercises.map((exercise, index) => (
                            <div key={index}>
                                <p><strong>{exercise.exercise}</strong></p>
                                <div className='column'>
                                    {exercise.series.map((serie, i) => (
                                        <div key={i}>
                                            <p>{serie.weight} kg x {serie.reps} - Rpe {serie.rpe_teorico}</p>
                                            <div className='row'>
                                                <TextField label='Weight' />
                                                <TextField label='Reps' />
                                                <TextField label='Rpe' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                        ))
                        : <p>No hay ejercicios para este dia</p>
                    : <div></div>}
            </div>
        </>
    )
}