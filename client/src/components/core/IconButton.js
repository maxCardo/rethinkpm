import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

const IconButton = ({placement, tooltipContent, id, iconClass, onClickFunc, variant, href}) => {

    return (
        <OverlayTrigger
            placement={placement}
            overlay={<Tooltip id={id}>{tooltipContent}</Tooltip>}
        >
            {(variant && variant === 'link') ? (
                <a href={href} className='action-buttons__button '
                   target= "_blank"
                   rel="noopener noreferrer">
                    <i className={iconClass}></i>
                </a>
            ) : (
                <Button variant='default' className='action-buttons__button ' onClick={() => onClickFunc()}>
                    <i className={iconClass}></i>
                </Button>
            )}
        </OverlayTrigger>
    );
}


export default IconButton;