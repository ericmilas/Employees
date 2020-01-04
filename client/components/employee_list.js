import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Employees} from '../../imports/collections/employees'
import EmployeeDetail from './employee_detail'

const PER_PAGE = 20;

class EmployeeList extends Component {
    constructor(props) {
        super(props);

        this.page = 1;
    }

    handleButtonClick(){
        this.page++;
        Meteor.subscribe('Employees', this.page * PER_PAGE);
    }

    render() {
        return (
            <div>
                <div className="employee-list">
                    {this.props.employees.map(employee =>
                        <EmployeeDetail key={employee._id} employee={employee}/>)}
                </div>
                <button className="btn btn-primary"
                        onClick={this.handleButtonClick.bind(this)}>
                    Load More...
                </button>
            </div>
        )
    }
};

export default withTracker(props => {
    //Setup subscription
    const handle = Meteor.subscribe('Employees', PER_PAGE);

    //return an object. Whatever we return will be sent to EmployeeList as props
    return {
        loading: !handle.ready(),
        employees: Employees.find({}).fetch()
    }
})(EmployeeList);