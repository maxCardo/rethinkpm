import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../store';
import {MemoryRouter, Route} from 'react-router-dom';

const renderWithReduxAndRouter = (Component, path) => {
    return {
        ...render(
            <Provider store={store}>
                <MemoryRouter>
                    <Route path={path || '/'}>
                        <Component />
                    </Route>
                </MemoryRouter>
            </Provider>
        ),
    };
};

export default renderWithReduxAndRouter;
