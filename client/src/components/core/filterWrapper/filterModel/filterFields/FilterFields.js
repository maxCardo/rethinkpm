import React from 'react';
import NumberField from './NumberFields';
import StringField from './StringFields';
import ArrayField from './ArrayFields';

const FilterFields = (props) => {

    const {filterFields:{dataType}} = props

    switch (dataType) {
        case 'array':
            return <ArrayField orderKey={props.orderKey} {...props} />;
        case 'string':
            return <StringField orderKey={props.orderKey} {...props} />;
        case 'number':
            return <NumberField orderKey={props.orderKey} {...props} />;
        default:
            console.error(`Filter field ${dataType} not yet implemented`)
    }
}

export default FilterFields;  