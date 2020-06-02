import React, { Fragment } from 'react';
import StudentDataService from '../services/studentService';

export default class Students extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            disabled: true
        }
    }

    componentDidMount = () => {
        this.refreshStudents();
    }

    refreshStudents = () => {
        StudentDataService.retrieveAllStudents().then(
            response => {
              let studentArray = [];
              response.data.map(student => {
                  studentArray.push({id: student.id, name: student.name, surname: student.surname, group: student.groupDto, grade: student.grade, mark: student.mark });
              })
              this.setState({ students: studentArray });
            }
          )
    }

    handleShowExemptedClick = () => {
        this.setState({disabled: false});
    }

    handleHideExemptedClick = () => {
        this.setState({disabled: true});
    }

    render() {
      return(
        <div>
            <table className="ui striped table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Group</th>
                        <th>Grade</th>
                        <th>Mark</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.students.map(student => {
                            return (
                                <Fragment>
                                {
                                    student.mark >= 8 && this.state.disabled === false ? 
                                    <tr className="positive">
                                        <td>{student.name}</td>
                                        <td>{student.surname}</td>
                                        <td>{student.group.groupNumber}</td>
                                        <td>{student.grade}</td>
                                        {student.mark === 0 ?
                                        <td>Not certified</td>
                                        :
                                        <td>{student.mark}</td>
                                        }
                                    </tr>
                                    :
                                    <tr>
                                        <td>{student.name}</td>
                                        <td>{student.surname}</td>
                                        <td>{student.group.groupNumber}</td>
                                        <td>{student.grade}</td>
                                        {student.mark === 0 ?
                                        <td>Not certified</td>
                                        :
                                        <td>{student.mark}</td>
                                        }
                                    </tr>
                                }
                                </ Fragment>
                            );
                        }
                            )
                    }
                </tbody>
            </table>
            <div className="showExemptedButton">
                {this.state.disabled ?
                    <button onClick={() => this.handleShowExemptedClick()} class="ui secondary button">Show exempted students</button>
                    :
                    <button onClick={() => this.handleHideExemptedClick()} class="ui secondary basic button">Hide exempted students</button>
                }
            </div>
        </div>
      );
    }
  
  }
  