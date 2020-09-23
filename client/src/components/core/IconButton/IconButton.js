import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Ripple from "../Ripple";

import './style.css'

const IconButton = ({placement, tooltipContent, id, iconClass, onClickFunc, variant, href, btnClass, isDisabled, fontSize}) => {
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

    const theVariant = (variant) ? variant : 'clean';

    const iTag = <i className={iconClass} style={{fontSize: fontSize ? fontSize : 12}}></i>

    return (
        <OverlayTrigger
            placement={placement}
            overlay={<Tooltip id={id}>{tooltipContent}</Tooltip>}
        >
            {(theVariant === 'link') ? (
                <a href={href}
                   className={`action-buttons__button ${btnClass === 'undefined' ? '' : btnClass}`}
                   target="_blank"
                   rel="noopener noreferrer">

                    {iTag}
                </a>
            ) : (theVariant === 'action-button') ? (
                <Button variant='default'
                        style={{overflow: 'hidden'}}
                        className={`action-buttons__button ${btnClass}`}
                        onClick={(e) => {
                            handleClick(e)
                            onClickFunc()
                        }}
                        disabled={isDisabled}>

                    {iTag}
                    <Ripple cursorPos={cursorPos}/>
                </Button>
            ) : (theVariant === 'transparent') ? (
                <Button style={{overflow: 'hidden'}}
                        className={`action-buttons__transparent ${btnClass}`}
                        onClick={(e) => {
                            handleClick(e)
                            onClickFunc()
                        }}
                        disabled={isDisabled}>

                    {iTag}
                    <Ripple cursorPos={cursorPos}/>
                </Button>
            ) : (
                <button style={{overflow: 'hidden'}}
                        className={'btn ' +btnClass}
                        onClick={(e) => {
                            handleClick(e)
                            onClickFunc()
                        }}
                        disabled={isDisabled}>

                    {iTag}
                    <Ripple cursorPos={cursorPos}/>
                </button>
            )}
        </OverlayTrigger>
    );
}

IconButton.propTypes = {
    variant: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    tooltipContent: PropTypes.string.isRequired,
    onClickFunc: PropTypes.func,
};

export default IconButton;