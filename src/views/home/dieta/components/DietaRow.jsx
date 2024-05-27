import '../Dieta.css'
import PropTypes from 'prop-types';

export const DietaRow = ({ food, amount, carbs, proteins, fats, kcals }) => {
    return (
        <div>
            <div className='dieta-flex-row'>
                <p className='margin-right'>|</p>
                <div className='dieta'>
                    <p>Comida</p>
                </div>
                <div className="dieta-container">
                    <p>Cantidad</p>
                    <p>Carbohidratos</p>
                    <p>Proteinas</p>
                    <p>Grasas</p>
                    <p>Kcals totales</p>
                </div>
                <p className='margin-left'>|</p>
            </div>

            <div className='dieta-flex-row'>
                <p className='margin-right'>|</p>
                <div className='dieta'>
                    <p>{food}</p>
                </div>
                <div className="dieta-container">
                    <p>{amount}</p>
                    <p>{carbs}</p>
                    <p>{proteins}</p>
                    <p>{fats}</p>
                    <p>{kcals}</p>
                </div>
                <p className='margin-left'>|</p>
            </div>
        </div>
    )
}

DietaRow.propTypes = {
    food: PropTypes.string,
    amount: PropTypes.string,
    carbs: PropTypes.string,
    proteins: PropTypes.string,
    fats: PropTypes.string,
    kcals: PropTypes.string
}