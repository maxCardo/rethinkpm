import React from 'react';
import NumberField from './NumberFields';
import StringField from './StringFields';
import ArrayField from './ArrayFields';

const FilterFields = (props) => {

    const {filterFields:{dataType}} = props

    switch (dataType) {
        case 'array':
            return <ArrayField {...props} />;
        case 'string':
            return <StringField {...props} />;
        case 'number':
            return <NumberField {...props} />;
        default:
            console.log('errror, default caled')
    }
}

export default FilterFields;  