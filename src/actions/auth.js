
import Swal from 'sweetalert2';
// Primera acción encargada de establecer el proceso de comunicación

import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventLogout } from './events';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const respuesta = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await respuesta.json();

        // console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // grabamos la información del usuario
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            // en caso de escribir el usuario o la contraseña de forma icorrecta
            Swal.fire('Error', body.msg, 'error');
        }
    };
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const respuesta = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await respuesta.json();

        // console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // grabamos la información del usuario
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            // en caso de escribir el usuario o la contraseña de forma icorrecta
            Swal.fire('Error', body.msg, 'error');
        }
    }
}


export const startChecking = () =>{
    return async( dispatch ) =>{
        
        const respuesta = await fetchConToken('auth/renew');
        const body = await respuesta.json();

        // console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            // grabamos la información del usuario
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            // en caso de escribir el usuario o la contraseña de forma icorrecta
            dispatch( checkingFinish())
        }
    }
}


const checkingFinish = () => ({ type: types.authChekingFinish });


const login = (user) => ({
    type: types.authLogin,
    payload: user
})

// Salir : necesito hacer un proceso sincrono destruyendo el token

export const startLogout = () =>{
    return( dispatch ) =>{
        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }

}

const logout = () => ({ type: types.authLogout})
// el localstorage no se recomiendo utilizarlo en efectos secundarios