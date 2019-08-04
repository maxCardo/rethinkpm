import React from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

let tempData = {
    tenant:{
        "_id": "1234",
        "name": "Bob",
        "email": "bob@jkhjh.com",
        "phone": "4126389232",
        "property": "1214 Wynne Ave",
        "address": "1214 Wynne Ave",
        "zip": "",
        "unitNum":"2"
    },

    request:{
        "createDate": "01/1/2019",
        "reqMadeBy": "1234", // req user ID
        "svcType": "General_Maintenance",
        "serviceType": "General_Maintenance",
        "serviceDiscription": "Clogged gutters",
        "serviceDate": "1563207966753",
        "avail": [ "13","21",],
        "status": "Requested",
        "nextStatusDate": "1/1/2019",
        "activity": [
        
            {
                "Date": "1/1/2019",
                "activity": "Terrence Denne selected as vendor and email sent to dennehandyman@gmail.com"
            }
        ]
    }
} 

const ServiceList = props => {

    return (
        <div className='table-div'>
            <div className='table-filter'>
                <select className = 'input-sm'>
                    <option value="">---select property---</option>
                    <option value="">propertyone</option>
                    <option value="">propertyTwo</option>
                </select>
                <input type="text"  id="searchBox" name="searchBox" className = 'input-sm' placeholder="Search Name or Phone Number ..."/>
            </div>
            <table className = 'table table-striped'>
                <thead>
                    <tr>
                        <th scope="col" >#</th>
                        <th scope="col" >Date Created</th>
                        <th scope="col">Unit/Prop</th>
                        <th scope="col">Req Name</th>
                        <th scope="col">Service Type</th>
                        <th scope="col" >Status</th>
                        <th scope="col" >Status Date</th>
                        <th scope="col">Closed</th>
                        <th scope="col" >Chat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i className="fas fa-file-alt"></i></td>
                        <td>{tempData.request.createDate}</td>
                        <td>{tempData.tenant.unitNum ? tempData.tenant.property +' - '+ tempData.tenant.unitNum : tempData.tenant.property }</td>
                        <td>{tempData.tenant.name}</td>
                        <td>{tempData.request.serviceType}</td>
                        <td>{tempData.request.status}</td>
                        <td>status date</td>
                        <td>Closed Date</td>
                        <td><i className="far fa-comments"></i></td>
                    </tr>
                    <tr>
                        <td><Link to='/serviceTicket'><i className="far fa-file-alt"></i></Link></td>
                        <td>{tempData.request.createDate}</td>
                        <td>{tempData.tenant.unitNum ? tempData.tenant.property + ' - ' + tempData.tenant.unitNum : tempData.tenant.property}</td>
                        <td>{tempData.tenant.name}</td>
                        <td>{tempData.request.serviceType}</td>
                        <td>{tempData.request.status}</td>
                        <td>status date</td>
                        <td>Closed Date</td>
                        <td><Link to='/serviceReq'><i className="far fa-comments"></i></Link></td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}

ServiceList.propTypes = {

}

export default ServiceList
