import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

const IconButton = ({  placement, tooltipContent, id, iconClass, onClickFunc}) => {

    return (
        <OverlayTrigger
            placement={placement}
            overlay={<Tooltip id={id}>{tooltipContent}</Tooltip>}
        >
            <Button className='action-buttons__button ' onClick={() => onClickFunc()}>
                <i className={iconClass}></i>
            </Button>
        </OverlayTrigger>
    );

}


export default IconButton;