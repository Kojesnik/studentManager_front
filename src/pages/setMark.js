import React, { Fragment } from 'react';
import StudentDataService from '../services/studentService';
import { Dropdown } from 'semantic-ui-react';


export default class SetMarks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            marks: [],
            studentValue: {},
            markValue: ""
        }
    }

    componentDidMount = () => {
        this.refreshStudents();
        this.refreshMarks();
    }

    refreshStudents = () => {
        StudentDataService.retrieveAllStudents().then(
            response => {
              let studentArray = [];
              response.data.map(student => {
                  studentArray.push({id: student.id, name: student.name, surname: student.surname, group: student.groupDto, grade: student.grade, mark: student.mark});
              })
              this.setState({ students: studentArray });
            }
        )
    }

    refreshMarks = () => {
        let marks = [];
        marks.push(1);
        marks.push(2);
        marks.push(3);
        marks.push(4);
        marks.push(5);
        marks.push(6);
        marks.push(7);
        marks.push(8);
        marks.push(9);
        marks.push(10);
        this.setState({marks: marks});
    }

    onStudentChange = (e, data) => {
        let studentArray = this.state.students;
        let studentName = data.value;
        let name = studentName.split(' ')[0];
        let surname = studentName.split(' ')[1];
        let student;
        for( let i = 0; i < studentArray.length; i++) { 
            if (studentArray[i].name === name && studentArray[i].surname === surname) { 
                student = studentArray[i];
            }
        }
        this.setState({studentValue: student});
    }

    onMarkChange = (e, data) => {
        this.setState({markValue: data.value});
    }

    handleAddMark = () => {
        this.refreshStudents();
        this.refreshMarks();
        this.forceUpdate();
        StudentDataService.updateStudent(this.state.studentValue.id, this.state.studentValue.name, this.state.studentValue.surname, this.state.studentValue.group, this.state.studentValue.grade, this.state.markValue).then(
            () => {
                this.refreshStudents();
                this.refreshMarks();
            }  
        );
        this.forceUpdate();
        this.refreshStudents();
        this.refreshMarks();
        StudentDataService.updateStudent(this.state.studentValue.id, this.state.studentValue.name, this.state.studentValue.surname, this.state.studentValue.group, this.state.studentValue.grade, this.state.markValue).then(
            () => {
                this.refreshStudents();
                this.refreshMarks();
            }  
        );
    }

    render() {
        return(
            <Fragment>
                <div style={{marginTop: "100px"}} className="ui stackable center aligned grid">
                                <div className="seven wide column">
                                    <form onSubmit={this.handleAddMark} className="ui form">
                                        <div className="ui grid">
                                            <div className="right aligned middle aligned four wide column">
                                                <div style={{width: "70px"}} className="ui label">
                                                    Set Mark
                                                </div>
                                            </div>
                                            <div className="middle aligned eight wide column">
                                                <div className="ui grid">
                                                    <div className="left aligned ten wide column">
                                                        <Dropdown onChange={this.onStudentChange} placeholder='Student' fluid selection options={this.state.students ? this.state.students.map(student => {
                                                            return({key: student.id, text: student.name + " " + student.surname, value: student.name + " " + student.surname});
                                                        }): 'Jopa'} />
                                                    </div>
                                                    <div className="right aligned six wide column">
                                                        <Dropdown onChange={this.onMarkChange} placeholder='Mark' fluid selection options={this.state.marks ? this.state.marks.map(mark => {
                                                            return({key: mark, text: mark, value: mark});
                                                        }): 'Jopa'} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right aligned middle aligned four wide column">
                                                    <div className="ui grid">
                                                        <div style={{display: "flex"}} className="sixteen wide column">
                                                            <button style={{width: "80px"}} type="submit" className="tagsButton ui tiny green basic button">Add</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
            </Fragment>
        );
    }

}
