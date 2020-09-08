// boton flotante

import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleCloseModal = (e) =>{
        e.preventDefault();
        // console.log('Cerrando modal');
        dispatch(uiOpenModal());
    }

    return (
        <button 
            className="btn btn-primary fab"
            onClick={ handleCloseModal }
            >


            <i className=" fas fa-plus"></i>
        </button>
    )
}
