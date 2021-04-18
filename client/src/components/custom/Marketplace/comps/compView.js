import React, {useEffect, useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap';
import CardList from "./CardList";


const CompView = (data) => {

    const [comps, setComps] = useState([])

    /* MODAL state*/
    const [activeComp, setActiveComp] = useState({});
    const [showModal, setShowModal] = useState(false);


    const [property, setProperty] = useState([])

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

    }, [data])

    const moneyFormat = (sum) => {
        return (new Intl.NumberFormat('en-US',
            {style: 'currency', currency: 'USD'}
        ).format(sum))
    }

    const Item = ({comp, getComp}) => {
        const handleClick = () => {
            getComp(comp)
        };
        return (
            <li onClick={handleClick} style={{backgroundImage: 'url(https://via.placeholder.com/768x380)', backgroundPosition: 'cover'}}>
                <div className="Comp__details">
                    <span className="salePrice">Sale Price (adj): {moneyFormat(comp.adjSalePrice)}</span>
                    <span className="salePrice">Sale Price: {moneyFormat(comp.adjSalePrice)}</span>
                    <span className="salePrice">Area: {comp.area}.00$</span>
                    <span className="salePrice">Sale Price: {comp.adjSalePrice}.00$</span>
                </div>
            </li>
        )
    }

    const compList = (comps) && comps.map((comp, idx) => {
        const getComp = () => {
            setActiveComp(comps[idx]);
            setShowModal(true);
        };

        return (<Item key={idx} comp={comp} getComp={getComp}/>);
    })

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
                            </div>
                            <div className="op__estimateRange">
                                xxxxxx.00$ - xxxxxx.00$
                            </div>
                            <div className="op__estimateRange30">
                                xxxxxx.00$ <span className="ChangeColor">(+- 15.0%)</span>
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
                            <Form.Group className="sliderGroupContainer">
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
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Map">
                <h2>This is map</h2>
            </div>

            <CardList list={comps} />

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


