export const types = {
    uiOpenModal:  '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',
    // eventos
    eventSetActive: '[event] Set Active',
    eventLogout: '[event] Logout event',

    eventStartAddNew: '[event] Start add new', // va inicializar todo el proceso de grabación
    eventAddNew: '[event] Add new',
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',
    eventLoaded: '[event] Events loaded',

    // autenticación
    authChekingFinish: '[auth] Finish login state', // cuando termine de verificar el token saber si este es correcto o no 
    authStartLogin: '[auth] Start login state', // proceso asincrono para revisar el posteo
    authLogin: '[auth] Login', // este se va llamar cuando tengamos la autenticación y quedera,
    authStartRegister: '[auth] Start register', // para registrar un nuevo usuario
    authStartTokenRenew: '[auth] Start token renew', // para renovar el token
    authLogout: '[auth] Logout', // salida
}