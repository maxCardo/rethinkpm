import React, {Fragment, useState, useEffect} from 'react'
import {Modal, Form, Button} from 'react-bootstrap';
import FilterFields from './filterFields/_FilterFields'
import Loading from '../../../common/LoadingScreen/Loading'
import './style.css'


const FilterModal = ({show, handleClose, filterFields, onSubmit, options}) => {

    const loading = false
    const [state, setState] = useState(filterFields);

    const onChange = (property,value ) => setState({ ...state, [property]: value})

    const onSubmitFunction = (data, type) => {
        Object.keys(data).forEach((item) => {
            if((`${data[item]['type']['value']}` === "in" && data[item]['value'] === "") || data[item]['value'].length === 0) {
                data[item]['type'] = {label: "Don't filter", value: 'noFilter'};
            }

        });
        onSubmit(data, type);
    };

    return (
      <Modal size='lg' show={show} onHide={()=> {handleClose(); setState(filterFields)}}>
        <Modal.Header closeButton>
          <Modal.Title>Create filter</Modal.Title>
        </Modal.Header>
          {loading ? <Loading/> : <Fragment>
            <Modal.Body className='filter-modal__body'>
              <Form>
                {Object.keys(state).map((x, i) => (<FilterFields orderKey={i} key={i} className={(state[x.toString()].type.value)} onChange={onChange} filterFields={state[x]} options={options[x]} prop={x} />))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={()=> {handleClose(); setState(filterFields)}}>
                Close
              </Button>
              <Button variant='primary' onClick={() => {onSubmitFunction(state); handleClose(); setState(filterFields)}}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Fragment>}
        </Modal>  
    );
}


export default FilterModal