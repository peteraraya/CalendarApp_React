import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment, { now } from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const nowDate = moment().minutes(0).seconds(0).add(1,'hours'); // 3:45:50
const endDate = nowDate.clone().add(1,'hours');

const initEvent = {
    title: 'Evento',
    notes: '',
    start: nowDate.toDate(),
    end: endDate.toDate(),
}


export const CalendarModal = () => {
    const dispatch = useDispatch();
    // para estan pendiente del store en este caso de ui
    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );

    const [dateStart, setDateStart] = useState(nowDate.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState( initEvent );

    // Extraemos los titulos y fechas
    const { title, notes, start, end } = formValues;


    useEffect(() => {
        // estar pendiente

        if ( activeEvent ) {
            setFormValues( activeEvent );
        }else{
            setFormValues( initEvent );
        }
       
    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    // closeModal
    const closeModal = () =>{
        // TODO cerrar el modal
        // console.log('cerrar modal');
       dispatch( uiCloseModal() );
       dispatch( eventClearActiveEvent() );
       setFormValues( initEvent );
    }

    const handleStartDateChange = ( e ) =>{
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDatechange = (e) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        });
    }


    const handleSubmitForm = ( e ) =>{
        e.preventDefault(); // evita la propagación del formulario
        // console.log( formValues );

        // validaciones con instancias de moment
        const momentStart = moment( start );
        const momentEnd = moment( end );

        // console.log(momentStart);
        // console.log(momentEnd);

        // si la fecha de inicio esta despues de la fecha de finalización
        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            // console.log('Fecha 2 debe ser mayor')
            Swal.fire('Error','La fecha fin debe ser mayor a la fecha de inicio','error');
            return;
        }

        if ( title.trim().length < 2 ) {
            setTitleValid( false );
            return
        }
        // TODO realizar la grabación

        // actualizando
        if ( activeEvent ) {
            dispatch( eventUpdated( formValues ) );
        } else { // creando uno nuevo
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Pedro'
                }
            }));
        }
    

        
        console.log(formValues)
        setTitleValid(true);
        closeModal();
    }



    return (
        <Modal
            isOpen={ modalOpen } // muestra u oculta el modal
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={ customStyles }
            closeTimeoutMS={500} // tiempo que se cierra el modal
            className="modal"
            overlayClassName="modal-fondo"

        >
            <h1> { (activeEvent )? ' Editar evento ' : 'Nuevo Elemento'}</h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
                >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart} // valor inicial
                    />

                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDatechange }
                        minDate={ dateStart }
                        value={ dateEnd } // valor inicial                       
                    />

                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
     </Modal>
    )
}
