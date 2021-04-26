import React, {useEffect, useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap';
import CardList from "./CardList";
import {mortgageCalc, incomeValue} from './mortgageCalc'


const CompView = (data) => {

    const [comps, setComps] = useState([])
    const [incVal, setIncVal] = useState()
    const [mktRent, setMktRent] = useState()
    /* MODAL state*/
    const [activeComp, setActiveComp] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [property, setProperty] = useState([])

    const mktIncomeValue = async (noi) => {
        const res = await incomeValue(noi)
        setIncVal(res)
        console.log('income value: ', res);
    }

    useEffect(() => {
        const props = data && data.data

        if (props) {
            const theComps = props && props.compReport && props.compReport.comps ? props.compReport.comps : [];
            setComps(theComps);
            setProperty(props)
            console.log('theComps')
            console.log(theComps)
        }

        console.log('data')
        console.log(data)

        //calculate NOI issues: no reserves, taxes based on current which can be low
        const areaRents = data.data.rents.area  > 0 ? data.data.rents.area : null 
        const subRent = data.data.rents.HA.rent > 0 ? data.data.rents.HA.rent : null
        const rents = areaRents && areaRents < subRent ? areaRents : subRent 
        const { rentalIncome, vacancyLoss, management, leasing, maintenance, utilities, taxes, insurance } = data.data.model
        const totalExpPreTax = management + leasing + maintenance + utilities + insurance
        const netOpIncome = (rents*12) - vacancyLoss - totalExpPreTax - taxes.low
        console.log('noi: ', netOpIncome);
        mktIncomeValue(netOpIncome)
        setMktRent(rents)

    }, [data])

    

    const hideModal = () => {
        setShowModal(false)
        setActiveComp({})
    }

    return (
        <div className="container-fluid flex-row">
            <div className="OwnedProperty">
                <div className="op__img-container">
                    <a href="https://placeholder.com"><img src="https://via.placeholder.com/250x80" alt="placeholder"/></a>
                </div>
                <div className="op__details">
                    <div className="op__estimate">
                        <div className="op__estimateData-container">
                            <div className="op__estimatedValue">
                                <span>Land: {property && property.assessedValue && property.assessedValue.land}</span>
                                <span>Building: {property && property.assessedValue && property.assessedValue.bldg}</span>
                                <span>Income Approach: {incVal}</span>
                            </div>
                        </div>
                        <div className="op__estimateGain">
                            <div className="op__equity">
                                <div className="op__box">
                                    <p>Estimated Home Equity</p>
                                    <p className="op__resultValue">$221,125</p>
                                </div>
                                <div className="op__box">
                                    <p>Estimated Home Equity</p>
                                    <p className="op__resultValue">$221,125</p>
                                </div>
                                <div className="op__box">
                                    <p>Estimated Home Equity</p>
                                    <p className="op__resultValue">$221,125</p>
                                </div>
                            </div>
                            {/* <Form.Group className="sliderGroupContainer">
                                <Form.Group controlId="op__Estimate-price">
                                    <Form.Label>Est. selling price of your home</Form.Label>
                                    <Form.Control type="text"/>
                                </Form.Group>
                                <Form.Group controlId="op__Estimate">
                                    <Form.Control type="range"/>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group className="sliderGroupContainer">
                                <Form.Group controlId="op__Estimate-mortgage">
                                    <Form.Label>Est. remaining mortgage</Form.Label>
                                    <Form.Control type="text"/>
                                </Form.Group>
                                <Form.Group controlId="op__Estimate-mortgage">
                                    <Form.Control type="range"/>
                                </Form.Group>
                            </Form.Group> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="Map">
                <h2>This is map</h2>
            </div>
            <CardList list={comps} />

            {/*Modal thing*/}
            <Modal size='lg' className="compDetails-modal" show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>CompDetail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    the comp details
                </Modal.Body>
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" disabled={false} variant="secondary"
                            onClick={() => console.log('submitIt')}
                    >
                        Submit
                    </Button>
                    <Button className="btn btn-danger" variant="secondary"
                            onClick={hideModal}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default CompView


