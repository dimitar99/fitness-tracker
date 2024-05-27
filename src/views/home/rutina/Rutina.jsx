import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles'
import { PickersLayout } from '@mui/x-date-pickers/PickersLayout'

const StyledPickersLayout = styled(PickersLayout)({
    '.MuiDateCalendar-root': {
        backgroundColor: '#fff',
    }
})

export const Rutina = () => {

    const [currentDate, setCurrentDate] = useState(dayjs());
    const [currentDayExercises, setCurrentDayExercises] = useState([]);

    const loadDateEvents = async () => {
        console.log('loadDateEvents')
        console.log(`currentDate ${currentDate.format('YYYY-MM-DD')}`)
        const resp = await fetch(`http://localhost:3900/routines/by-date?date=${currentDate.format('YYYY-MM-DD')}`, {
            method: 'GET',
        });
        if (resp.ok) {
            const json = await resp.json();
            console.log(json.routine)
            setCurrentDayExercises(json.routine.exercises)
        } else {
            setCurrentDayExercises(null)
        }
    }

    return (
        <>
            <div className='row'>
                <DatePicker
                    slots={{
                        layout: StyledPickersLayout,
                    }}
                    label="Basic example"
                    value={currentDate}
                    onChange={(newValue) => { setCurrentDate(newValue) }}
                    renderInput={(params) => (
                        <TextField {...params}/>
                    )}
                    autoFocus={true}
                />
                <button className='small-btn' onClick={() => loadDateEvents()}>Buscar</button>
            </div>

            <div className="rutina-container">
                {currentDayExercises.map((exercise, index) => (
                    <div key={index}>
                        <p><strong>{exercise.title}</strong> ({exercise.description})</p>
                        <div className='row'>
                            {Array.from({ length: exercise.series }).map((_, i) => (
                                <TextField key={i} label={`Serie ${i+1}`}/>
                            ))}
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    )
}