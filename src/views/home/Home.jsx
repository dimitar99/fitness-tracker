import './Home.css'

import { useState } from 'react'
import { CalendarioRutinas } from './rutinas/CalendarioRutinas';
import { RutinaDetail } from './rutinas/RutinaDetail';
// import { Dieta } from './dieta/Dieta';
import { Food } from './food/Food';
import { Exercises } from './exercises/Exercises';

export const Home = () => {

    const [selected, setSelected] = useState(1);

    const handleButtonClick = (opt) => setSelected(opt)

    return (
        <div className='home-container'>

            <div className='home-menu'>
                <input className='tab-btn' type="button" value="Rutina" onClick={() => handleButtonClick(1)} />
                {/* <input className='tab-btn' type="button" value="Dieta" onClick={() => handleButtonClick(2)} /> */}
                <input className='tab-btn' type="button" value="Food" onClick={() => handleButtonClick(3)} />
                { <input className='tab-btn' type="button" value="Exercises" onClick={() => handleButtonClick(4)} /> }
            </div>

            {/* {selected === 1 && <CalendarioRutinas />} */}
            {selected === 1 && <RutinaDetail />}
            {/* {selected === 2 && <Dieta />*/}
            {selected === 3 && <Food />}
            {selected === 4 && <Exercises />}
        </div>
    )
}