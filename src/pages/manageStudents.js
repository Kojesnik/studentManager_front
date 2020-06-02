import React, { Fragment } from 'react';
import StudentDataService from '../services/studentService';
import GroupDataService from '../services/groupService';
import { Dropdown } from 'semantic-ui-react';


export default class ManageStudents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            groups: [],
            grades: [],
            studentToAdd: "",
            disabled: "disabled",
            updatingStudent: "",
            groupValue: {},
            gradeValue: ""
        }
    }

    componentDidMount = () => {
        this.refreshStudents();
        this.refreshGroups();
        this.refreshGrades();
    }

    refreshStudents = () => {
        StudentDataService.retrieveAllStudents().then(
            response => {
              let studentArray = [];
              response.data.map(student => {
                  studentArray.push({id: student.id, name: student.name, surname: student.surname, group: student.groupDto, grade: student.grade, mark: student.mark, disabled: true });
              })
              this.setState({ students: studentArray });
            }
        )
    }

    refreshGroups = () => {
        GroupDataService.retrieveAllGroups().then(
            response => {
              let groupArray = [];
              response.data.map(group => {
                  groupArray.push({id: group.id, groupNumber: group.groupNumber});
              })
              this.setState({ groups: groupArray});
            }
        )
    }

    refreshGrades = () => {
        let gradeArray = [];
        gradeArray.push(1);
        gradeArray.push(2);
        gradeArray.push(3);
        gradeArray.push(4);
        this.setState({grades: gradeArray});
    }

    handleEditInputChange = (event) => {
        let student = event.target.value;
        let name = student.split(' ')[0];
        let surname = student.split(' ')[1];
        let studentArray = this.state.students;
        for( let i = 0; i < studentArray.length; i++) { 
            if (studentArray[i].disabled === false) { 
                studentArray[i] = {id: studentArray[i].id, name: name, surname: surname, disabled: false};
            }
        }
        this.setState({students: studentArray});
    }

    handleDelete = (id) => {
        StudentDataService.deleteStudentById(id).then(
            () => {
                this.refreshStudents();
            }
        );
    }

    handleEdit = (id) => {
        let studentArray = this.state.students;
        let name;
        let surname;
        let group;
        for( let i = 0; i < studentArray.length; i++) { 
            if (studentArray[i].disabled === false) { 
                this.handleDiscard(studentArray[i].id);
                studentArray[i] = {id: studentArray[i].id, name: studentArray[i].name, surname: studentArray[i].surname, group: studentArray[i].group, grade: studentArray[i].grade, mark: studentArray[i].mark, disabled: true};
            }
        }
        for( let i = 0; i < studentArray.length; i++) { 
            if (studentArray[i].id === id) { 
                name = studentArray[i].name;
                surname = studentArray[i].surname;
                group = studentArray[i].group;
                studentArray[i] = {id: studentArray[i].id, name: studentArray[i].name, surname: studentArray[i].surname, group: studentArray[i].group, grade: studentArray[i].grade, mark: studentArray[i].mark, disabled: false};
            }
        }
        this.setState({students: studentArray, updatingStudent: {name: name, surname: surname, group: group}});
    }

    handleDiscard = (id) => {
        let studentArray = this.state.students;
        for( let i = 0; i < studentArray.length; i++) { 
            if (studentArray[i].id === id) { 
                studentArray[i] = {id: studentArray[i].id, name: this.state.updatingStudent.name, surname: this.state.updatingStudent.surname, disabled: true};
            }
        }
        this.setState({students: studentArray});
    }

    handleSave = (id, name, surname, grade, mark) => {
        StudentDataService.updateStudent(id, name, surname, this.state.updatingStudent.group, grade, mark).then(
          () => {
              this.refreshStudents();
          }  
        );
    }

    handleAddInputChange = (event) => {
        this.setState({studentToAdd: event.target.value});
    }

    handleAddStudent = () => {
        let student = this.state.studentToAdd;
        let name = student.split(' ')[0];
        let surname = student.split(' ')[1];
        StudentDataService.addStudent(name, surname, this.state.groupValue, this.state.gradeValue).then(
            () => {
                this.refreshStudents();
            }
        );
    }

    onGroupChange = (e, data) => {
        let groupArray = this.state.groups;
        let id;
        for( let i = 0; i < groupArray.length; i++) { 
            if (groupArray[i].groupNumber === data.value) { 
                id = groupArray[i].id;
            }
        }
        this.setState({groupValue: {id: id, groupNumber: data.value}});
    }
    
    onGradeChange = (e, data) => {
        this.setState({gradeValue: data.value});
    }


    render() {
        return(
            <Fragment>
                <div className="content">
                    <h2 className="ui header">Manage Students</h2>
                    <div className="students">
                        {
                            this.state.students.map(student => {
                                return (
                                    <div className="ui stackable center aligned grid">
                                        <div className="six wide column">
                                            <div className="ui grid">
                                                <div className="right aligned middle aligned four wide column">
                                                    <div className="ui label">
                                                        Student
                                                    </div>
                                                </div>
                                                <div className="middle aligned six wide column">
                                                    <div className="ui fluid input">
                                                        <input onChange={this.handleEditInputChange} value={student.name + " " + student.surname} disabled={student.disabled} type="text" />
                                                    </div>
                                                </div>
                                                <div className="right aligned middle aligned six wide column">
                                                    <div className="ui grid">
                                                        <div style={{display: "flex"}} className="sixteen wide column">
                                                            {student.disabled ?
                                                                <Fragment>
                                                                    <button onClick={() => this.handleEdit(student.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Edit</button>
                                                                    <button onClick={() => this.handleDelete(student.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Delete</button>
                                                                </Fragment>
                                                                :
                                                                <Fragment>
                                                                    <button onClick={() => this.handleSave(student.id, student.name, student.surname, student.grade, student.mark)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Save</button>
                                                                    <button onClick={() => this.handleDiscard(student.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Discard</button>
                                                                </Fragment>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div style={{marginTop: "100px"}} className="ui stackable center aligned grid">
                                <div className="seven wide column">
                                    <form onSubmit={this.handleAddStudent} className="ui form">
                                        <div className="ui grid">
                                            <div className="right aligned middle aligned four wide column">
                                                <div style={{width: "90px"}} className="ui label">
                                                    Add Student
                                                </div>
                                            </div>
                                            <div className="middle aligned eight wide column">
                                                <div className="ui grid">
                                                    <div className="left aligned six wide column">
                                                        <div className="ui input">
                                                            <input onChange={this.handleAddInputChange} value={this.state.studentToAdd}  type="text" placeholder="Input student" />
                                                        </div>
                                                    </div>
                                                    <div className="right aligned five wide column">
                                                        <Dropdown onChange={this.onGroupChange} placeholder='Group' fluid selection options={this.state.groups ? this.state.groups.map(group => {
                                                            return({key: group.id, text: group.groupNumber, value: group.groupNumber});
                                                        }): 'Jopa'} />
                                                    </div>
                                                    <div className="right aligned five wide column">
                                                        <Dropdown onChange={this.onGradeChange} placeholder='Grade' fluid selection options={this.state.grades ? this.state.grades.map(grade => {
                                                            return({key: grade, text: grade, value: grade});
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
