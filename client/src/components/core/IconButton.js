import React from 'react'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

const IconButton = ({placement, tooltipContent, id, iconClass, onClickFunc, variant, href, btnClass, isDisabled}) => {

    return (
        <OverlayTrigger
            placement={placement}
            overlay={<Tooltip id={id}>{tooltipContent}</Tooltip>}
        >
            {(variant && variant === 'link') ? (
                <a href={href}
                   className={`action-buttons__button ${btnClass === 'undefined' ? '' : btnClass}`}
                   target="_blank"
                   rel="noopener noreferrer">

                    <i className={iconClass}></i>
                </a>
            ) : (
                <Button variant='default'
                        className={`action-buttons__button ${btnClass}`}
                        onClick={() => onClickFunc()}
                        disabled={isDisabled}>

                    <i className={iconClass}></i>
                </Button>
            )}
        </OverlayTrigger>
    );
}


export default IconButton;