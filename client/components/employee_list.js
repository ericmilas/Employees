import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Employees from '../../imports/collections/employees'


const EmployeeList = () => {
    return(
        <div>
            <div className="employee-list"></div>
            Employee List
        </div>
    )
};

export default createContainer(() => {
    //Setup subscription
    Meteor.subscribe('Employees');

    //return an object. Whatever we return will be sent to EmployeeList as props
    return {employees: Employees.find({}).fetch()};
}, EmployeeList);