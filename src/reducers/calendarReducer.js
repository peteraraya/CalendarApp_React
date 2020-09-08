
import moment from 'moment';
import { types } from '../types/types';

const initialState = {
    // eventos del calendario
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), // lo mismo que un new Date de js
        end: moment().add(2, 'hours').toDate(),
        bgColor: '#fafafa',
        notes: 'Comprar pastel',
        user: {
            _id: '123',
            name: 'Pedro'
        }
    }],
    // objeto quie tendra todas las propiedades del evento - sera un arreglo
    activeEvent: null
};



export const calendareducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ],
                activeEvent: action.payload
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                // utilizo filter para evitar regresar el que la persona esta borrando
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                // quito la nota activa para evitar errores
                activeEvent: null

            }


        default:
            return state;
    }
}