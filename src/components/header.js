import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

class Header extends React.Component {
    
    render() {
        return(
            <div className="ui secondary pointing menu">
                <a href="/students" className="item active">Students</a>
                <a href="/manageStudents" className="item">Manage Students</a>
                <a href="/manageGroups" className="item">Manage Groups</a>
                <a href="/setMarks" className="item">Set Marks</a>
                <div className="right menu">
                    <p className="ui item">Student Manager</p>
                </div>
            </div>
        );
    }
}

export default Header;
