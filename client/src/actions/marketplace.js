import { OPEN_STREET_VIEW, CLOSE_STREET_VIEW } from './type';

export const openStreetView = (street, number) => dispatch => {

    dispatch({
        type: OPEN_STREET_VIEW,
        payload: {
            street: street,
            number: number,
            StreetViewModalOpen: true
        }
    });
}

export const closeStreetView = () => dispatch => {

    dispatch({
        type: CLOSE_STREET_VIEW,
        payload: {
            street: '',
            number: '',
            StreetViewModalOpen: false
        }
    });
}