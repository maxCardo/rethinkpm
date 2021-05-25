import {Button, Col, Modal, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import React from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import {checkBoxCheck} from "../../../../../../util/commonFunctions";
import {updateCompData} from '../../../../../../actions/marketplace/comps'

const EditCompListingModal = ({ modalOpen, openModal, activeComp, submit }) => {

    const optionsGeoConditions = [
        { value: 'Flat', label: 'Flat' },
        { value: 'Light slop', label: 'Light slop' },
        { value: 'Heavy slop', label: 'Heavy slop' }
    ]

    const optionsEntranceStairs = [
        { value: '0 - 6 Stairs', label: '0 - 6 Stairs' },
        { value: '7-15 Stairs', label: '7-15 Stairs' },
        { value: '15+ Stairs', label: '15+ Stairs' }
    ]

    const optionsLocationConditions = [
        { value: 'A', label: 'A: Visible development in area. No signs of blite' },
        { value: 'B', label: 'B: Visible Development, minimal visible blite' },
        { value: 'C', label: 'C: Moderate blite with signs of development' },
        { value: 'D', label: 'D: Heavy blite, No Strong signs of development' }
    ]

    const optionsBuildingConditions = [
        { value: 'A', label: 'A: Recently Updated: All new finishes' },
        { value: 'B', label: 'B: Turnkey: Well-maintained finishes within useful life' },
        { value: 'C', label: 'C: Move in ready: Finishes older but most still serviceable' },
        { value: 'D', label: 'D: Fixer Upper: Building is not in livable condition' }
    ]

    const parkingOptions = [
        { value: 'garage', label: 'Garage' },
        { value: 'offStreet', label: 'Off Street' },
        { value: 'streetParking', label: 'Easy street parking' },
        { value: 'poorParking', label: 'Poor parking conditions' }
    ]

    const [geoValue, setGeoValue] = React.useState();
    const [stairsValue, setStairsValue] = React.useState();
    const [locationValue, setLocationValue] = React.useState();
    const [buildingValue, setBuildingValue] = React.useState();
    const [centralAir, setCentralAir] = React.useState(false);
    const [finishedBasement, setFinishedBasement] = React.useState(false);
    const [car1parking, setCar1parking] = React.useState();
    const [car2parking, setCar2parking] = React.useState();
    const [car3parking, setCar3parking] = React.useState();


    const handleGeoChange = val => {
        setGeoValue(val);
    }
    const handleStairsChange = val => {
        setStairsValue(val);
    }
    const handleLocationChange = val => {
        setLocationValue(val);
    }
    const handleBuildingChange = val => {
        setBuildingValue(val);
    }
    const handleCentralAirChange = val => {
        setCentralAir(val);
    }
    const handleFinishedBasementChange = val => {
        setFinishedBasement(val);
    }
    const handleC1PChange = val => {
        setCar1parking(val);
    }
    const handleC2PChange = val => {
        setCar2parking(val);
    }
    const handleC3PChange = val => {
        setCar3parking(val);
    }

    const checkBox = checkBoxCheck();

    return (
        <Modal size='lg'
            className='CompEdit__modal'
            show={modalOpen}
            onHide={() => {
                openModal(false)
            }}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Comp Listing Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className='cem__selectGroup' controlId="propertyGeoConditions" style={{ zIndex: 16 }}>
                                <Form.Label>Geo Conditions</Form.Label>
                                <Select
                                    placeholder={`Select Geo Condition...`}
                                    options={optionsGeoConditions}
                                    value={geoValue}
                                    onChange={handleGeoChange}
                                    style={{ width: '100%' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='cem__selectGroup' controlId="propertyEntrance" style={{ zIndex: 16 }}>
                                <Form.Label>Entrance Stairs</Form.Label>
                                <Select
                                    placeholder={`Select Stairs Condition...`}
                                    options={optionsEntranceStairs}
                                    value={stairsValue}
                                    onChange={handleStairsChange}
                                    style={{ width: '100%' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className='cem__selectGroup' controlId="propertyCondition">
                                <Form.Label>Location Condition</Form.Label>
                                <Select
                                    placeholder={`Select Building Condition...`}
                                    options={optionsLocationConditions}
                                    value={locationValue}
                                    onChange={handleLocationChange}
                                    style={{ width: '100%' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className='cem__selectGroup' controlId="propertyCondition">
                                <Form.Label>Building Condition</Form.Label>
                                <Select
                                    placeholder={`Select Building Condition...`}
                                    options={optionsBuildingConditions}
                                    value={buildingValue}
                                    onChange={handleBuildingChange}
                                    style={{ width: '100%' }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='cem__checkGroup' controlId="centralAir">
                                <label className="checkbox path">
                                    <input type="checkbox" name='centralAir' value={centralAir} onChange={() => handleCentralAirChange(!centralAir)} />
                                    {checkBox} &nbsp; Central Air
                                </label>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='cem__checkGroup' controlId="finishedBasement">
                                <label className="checkbox path">
                                    <input type="checkbox" name='finishedBasement' value={finishedBasement} onChange={() => handleFinishedBasementChange(!finishedBasement)} />
                                    {checkBox} &nbsp; Finished Basement
                                </label>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className='cem__radioGroup' controlId="car1parking">
                                <Form.Label>Car 1 Parking</Form.Label>
                                <ToggleButtonGroup type="radio" name="options" value={car1parking} onChange={handleC1PChange}>
                                    {parkingOptions.map((option, index) => {
                                        return <ToggleButton
                                            key={index}
                                            type='radio'
                                            id={`car1Parking${index}`}
                                            value={option.value}
                                        >{option.label}</ToggleButton>
                                    })}
                                </ToggleButtonGroup>
                            </Form.Group>
                            <Form.Group className='cem__radioGroup' controlId="car2parking">
                                <Form.Label>Car 2 Parking</Form.Label>
                                <ToggleButtonGroup type="radio" name="options" value={car2parking} onChange={handleC2PChange}>
                                    {parkingOptions.map((option, index) => {
                                        return <ToggleButton
                                            key={index}
                                            type='radio'
                                            id={`car2Parking${index}`}
                                            value={option.value}
                                        >{option.label}</ToggleButton>
                                    })}
                                </ToggleButtonGroup>
                            </Form.Group>
                            <Form.Group className='cem__radioGroup' controlId="car3parking">
                                <Form.Label>Car 3 Parking</Form.Label>
                                <ToggleButtonGroup type="radio" name="options" value={car3parking} onChange={handleC3PChange}>
                                    {parkingOptions.map((option, index) => {
                                        return <ToggleButton
                                            key={index}
                                            type='radio'
                                            id={`car3Parking${index}`}
                                            value={option.value}
                                        >{option.label}</ToggleButton>
                                    })}
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className='cem__notesGroup' controlId="compNotes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={() => {
                    const theObject = {
                        geo: geoValue.value,
                        area: locationValue.value,
                        bldg: buildingValue.value,
                        stairs: stairsValue.value,
                        AC: centralAir,
                        cave: finishedBasement,
                        car1: car1parking,
                        car2: car2parking,
                        car3: car3parking
                    }
                    submit(activeComp._id, theObject)
                    openModal(false)
                }}>
                    Submit
                </Button>
                <Button className='real-btn' variant='2' onClick={() => {
                    openModal(false)
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default EditCompListingModal