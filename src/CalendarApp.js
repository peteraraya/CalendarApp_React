import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './router/AppRouter';

// Importamos providers de react-redux que se va encargar de proveer toda la informacion a sus componentes hijos

export const CalendarApp = () => {
    return (
      <Provider store={ store }>
          <AppRouter />
      </Provider>
    )
}
