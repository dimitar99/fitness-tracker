import { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs'

import { API_URL } from '../../../constants';

const localizer = dayjsLocalizer(dayjs);

export const CalendarioRutinas = () => {
    const [events, setEvents] = useState([]);

    const loadListOfRoutines = async (inicio, fin) => {
        const resp = await fetch(`${API_URL}/routines/by-date?inicio=${inicio}&fin=${!fin ? inicio : fin}`, {
            method: 'GET',
        });
        if (resp.ok) {
            const json = await resp.json();
            json.routines.map((item) => setEvents([...events, { title: item.title, start: new Date(2024, 5, 10, 10, 0), end: new Date(2024, 5, 10, 12, 0) }]))
            console.log(json)
        } else {
            setEvents([])
        }
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
            <p>Rutina</p>
            <div>
                <Calendar
                    // views={['month']}
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