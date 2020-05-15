import React, {Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Modal, Form, Button} from 'react-bootstrap';
import {submitFilterModal as onSubmit, getFilterOptions} from '../../../../../../actions/profile' 
import FilterFields from './filterFields/FilterFields'
import Loading from '../../../../../core/LoadingScreen/Loading';


const FilterModal = ({show, handleClose, settings:{filterFields, profileType},getFilterOptions,onSubmit, loading}) => {

    const [state, setState] = useState(filterFields);
    useEffect(() => {
      getFilterOptions(profileType)
    }, [])
    const onChange = (property,value ) => setState({ ...state, [property]: value})
         
    return (
      <Modal size='xl' show={show} onHide={()=> {handleClose(); setState(filterFields)}}>
        <Modal.Header closeButton>
          <Modal.Title>Create filter</Modal.Title>
        </Modal.Header>
          {loading ? <Loading/> : <Fragment>
            <Modal.Body>
              <Form>
                {Object.keys(filterFields).map((x, i) => (<FilterFields onChange={onChange} filterFields={state[x]} prop={x} />))}
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

export default connect(mapStateToProps, {getFilterOptions, onSubmit})(FilterModal)