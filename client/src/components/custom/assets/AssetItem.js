import React from 'react'
import PropTypes from 'prop-types'

const AssetItem = props => {
    return (
        <div>
            <h2 className='my-2'>My Properties</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <p>ooh ya</p>
        </div>
    )
}

AssetItem.propTypes = {

}

export default AssetItem
