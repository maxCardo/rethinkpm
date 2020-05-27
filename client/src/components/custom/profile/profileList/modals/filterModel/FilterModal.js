import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Modal, Form, Button} from 'react-bootstrap';
import {submitFilterModal, getFilterOptions} from '../../../../../../actions/profile'
import FilterFields from './filterFields/FilterFields'
import Loading from '../../../../../core/LoadingScreen/Loading';


const FilterModal = ({show, handleClose, settings:{filterFields, profileType},getFilterOptions, submitFilterModal, loading}) => {

    const [state, setState] = useState(filterFields);
    useEffect(() => {
      getFilterOptions(profileType)

      return () => {
        setState({})
      }
    },[]);


    const onChange = (property,value ) => setState({ ...state, [property]: value})

    const onSubmit = (data, type) => {
        Object.keys(data).forEach((item) => {
            if(`${data[item]['type']['value']}` === "in" && data[item]['value'] === "" || data[item]['value'].length === 0) {
                data[item]['type'] = {label: "Don't filter", value: 'noFilter'};
            }

        });
        submitFilterModal(data, type);
    };

    return (
      <Modal size='xl' show={show} onHide={()=> {handleClose(); setState(filterFields)}}>
        <Modal.Header closeButton>
          <Modal.Title>Create filter</Modal.Title>
        </Modal.Header>
          {loading ? <Loading/> : <Fragment>
            <Modal.Body className='filter-modal__body'>
              <Form>
                {Object.keys(state).map((x, i) => (<FilterFields orderKey={i} key={i} className={(state[x.toString()].type.value)} onChange={onChange} filterFields={state[x]} prop={x} />))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={()=> {handleClose(); setState(filterFields)}}>
                Close
              </Button>
              <Button variant='primary' onClick={() => {onSubmit(state, profileType); handleClose(); setState(filterFields)}}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Fragment>}
        </Modal>  
    );
}

const mapStateToProps = state => ({
  loading: state.profile.filterOptions.loading
});

export default connect(mapStateToProps, {getFilterOptions, submitFilterModal})(FilterModal)