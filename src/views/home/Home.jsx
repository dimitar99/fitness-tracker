import './Home.css'

import { useState } from 'react'
import { Rutina } from './rutina/Rutina';
// import { Dieta } from './dieta/Dieta';
// import { Food } from './food/Food';

export const Home = () => {

    const [selected, setSelected] = useState(1);

    // const handleButtonClick = (opt) => setSelected(opt)

    return (
        <div className='home-container'>

            <div className='home-menu'>
                {/* <input className='tab-btn' type="button" value="Rutina" onClick={() => handleButtonClick(1)} /> */}
                {/* <input className='tab-btn' type="button" value="Dieta" onClick={() => handleButtonClick(2)} />
                <input className='tab-btn' type="button" value="Food" onClick={() => handleButtonClick(3)} /> */}
            </div>

            {selected === 1 && <Rutina />}
            {/* {selected === 2 && <Dieta />}
            {selected === 3 && <Food />} */}

        </div>
    )
}