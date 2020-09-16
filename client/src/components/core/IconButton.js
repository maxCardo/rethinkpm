import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Ripple from "./Ripple";

const IconButton = ({placement, tooltipContent, id, iconClass, onClickFunc, variant, href, btnClass, isDisabled}) => {
    const [cursorPos, setCursorPos] = useState({
        top: 0,
        left: 0,
        time: Date.now() // time indicates particular clicks
    });

    const handleClick = e => {
        e.stopPropagation();
        // Waves - Get Cursor Position
        let cursorPos = {
            top: e.clientY,
            left: e.clientX,
            time: Date.now() // time indicates particular clicks
        };
        setCursorPos(cursorPos);
    };

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
                        style={{overflow: 'hidden'}}
                        className={(variant === 'action-button') ? `action-buttons__button ${btnClass}` : btnClass}
                        onClick={(e) => {
                            handleClick(e)
                            onClickFunc()
                        }}
                        disabled={isDisabled}>

                    <i className={iconClass}></i>
                    <Ripple cursorPos={cursorPos}/>
                </Button>
            )}
        </OverlayTrigger>
    );
}

IconButton.propTypes = {
    variant: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default IconButton;