import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { API_URL } from '../../../constants';

export const RutinaDetail = (routineId) => {
    const [selectedRoutine, setSelectedRoutine] = useState({});
    const [selectedRoutineExercises, setSelectedRoutineExercises] = useState([]);

    const loadCurrentRoutine = async (id) => {
        const resp = await fetch(`${API_URL}/routines/${id}`, {
            method: 'GET',
        });
        if (resp.ok) {
            const json = await resp.json();
            console.log(json.routine)
            setSelectedRoutine(json.routine)
            setSelectedRoutineExercises(json.routine.exercises)
        } else {
            setSelectedRoutine({})
            setSelectedRoutineExercises([])
        }
    }

    const updateRoutine = async () => {
        console.log(`selectedRoutine (${typeof selectedRoutine}):`, selectedRoutine);
        selectedRoutine.exercises = selectedRoutineExercises
        // const resp = await fetch(`${API_URL}/routines/${selectedRoutine._id}/update`, {
        console.log(`selectedRoutine (${typeof selectedRoutine}):`, selectedRoutine);
        const resp = await fetch(`${API_URL}/routines/66734e5e94c7457f3bff3b16/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedRoutine),
        },);
        if (resp.ok) {
            alert('Rutina actualizada')
        } else {
            alert(`Ha ocurrido un error ${resp.text}`)
        }
    }

    const deleteRoutine = async () => {
        // const resp = await fetch(`${API_URL}/routines/${selectedRoutine._id}/update`, {
        const resp = await fetch(`${API_URL}/routines/66734e5e94c7457f3bff3b16/delete`, {
            method: 'DELETE',
        },);
        if (resp.ok) {
            setSelectedRoutine({})
            setSelectedRoutineExercises([])
            alert('Rutina eliminada')
        } else {
            alert(`Ha ocurrido un error ${resp.text}`)
        }
    }

    useEffect(() => {
        loadCurrentRoutine(JSON.stringify(routineId) === '{}' ? '66734e5e94c7457f3bff3b16' : routineId)
    }, [])

    return (
        <>
            <div className="rutina-container">
                {selectedRoutineExercises !== null
                    ? selectedRoutineExercises.length > 0
                        ? <div>
                            {selectedRoutineExercises.map((exercise, index) => (
                                <div key={index}>
                                    <div className='row'>
                                        <p><strong>{exercise.title}</strong></p>
                                        <input type='button' value="EDITAR" onClick={() => { }} />
                                        <input type='button' value="ELIMINAR RUTINA" onClick={() => deleteRoutine()} />
                                    </div>
                                    <div className='column'>
                                        {exercise.series.map((serie, i) => (
                                            <div key={i}>
                                                <p>Weight → {serie.weight}kg | Reps → {serie.reps} | Rpe → {serie.rpe}</p>
                                                <div className='row'>
                                                    <TextField label='Weight' defaultValue={serie.my_weight} onChange={(event) => serie.my_weight = event.currentTarget.value} />
                                                    <TextField label='Reps' defaultValue={serie.my_reps} onChange={(event) => serie.my_reps = event.currentTarget.value} />
                                                    <TextField label='Rpe' defaultValue={serie.my_rpe} onChange={(event) => serie.my_rpe = event.currentTarget.value} />
                                                    {exercise.series.length > 1 && <input type='button' value="ELIMINAR" onClick={() => {}} />}
                                                </div>
                                                <input type='button' value="ADD" onClick={() => { }} />
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>
                            ))}
                            <input type='button' value="GUARDAR" onClick={() => updateRoutine()} />
                        </div>
                        : <p>No hay ejercicios para este dia</p>
                    : <div></div>}
            </div>
        </>
    )
}