import React, { Fragment } from 'react';
import GroupDataService from '../services/groupService';

export default class ManageStudents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            disabled: "disabled",
            updatingGroup: "",
            groupToAdd: ""
        }
    }

    componentDidMount = () => {
        this.refreshGroups();
    }

    refreshGroups = () => {
        GroupDataService.retrieveAllGroups().then(
            response => {
              let groupArray = [];
              response.data.map(group => {
                  groupArray.push({id: group.id, groupNumber: group.groupNumber, disabled: true});
              })
              this.setState({ groups: groupArray});
            }
        )
    }

    handleEditInputChange = (event) => {
        let group = event.target.value;
        let groupArray = this.state.groups;
        for( let i = 0; i < groupArray.length; i++) { 
            if (groupArray[i].disabled === false) { 
                groupArray[i] = {id: groupArray[i].id, groupNumber: group, disabled: false};
            }
        }
        this.setState({groups: groupArray});
    }

    handleDelete = (id) => {
        GroupDataService.deleteGroupById(id).then(
            () => {
                this.refreshGroups();
            }
        );
    }

    handleEdit = (id) => {
        let groupArray = this.state.groups;
        let group;
        for( let i = 0; i < groupArray.length; i++) { 
            if (groupArray[i].disabled === false) { 
                this.handleDiscard(groupArray[i].id);
                groupArray[i] = {id: groupArray[i].id, groupNumber: groupArray[i].groupNumber, disabled: true};
            }
        }
        for( let i = 0; i < groupArray.length; i++) { 
            if (groupArray[i].id === id) { 
                group = groupArray[i].groupNumber;
                groupArray[i] = {id: groupArray[i].id, groupNumber: groupArray[i].groupNumber, disabled: false};
            }
        }
        this.setState({groups: groupArray, updatingGroup: group});
    }

    handleDiscard = (id) => {
        let groupArray = this.state.groups;
        for( let i = 0; i < groupArray.length; i++) { 
            if (groupArray[i].id === id) { 
                groupArray[i] = {id: groupArray[i].id, groupNumber: this.state.updatingGroup, disabled: true};
            }
        }
        this.setState({groups: groupArray});
    }

    handleSave = (id, groupNumber) => {
        GroupDataService.updateGroup(id, groupNumber).then(
          () => {
              this.refreshGroups();
          }  
        );
    }

    handleAddInputChange = (event) => {
        this.setState({groupToAdd: event.target.value});
    }

    handleAddGroup = () => {
        let group = this.state.groupToAdd;
        GroupDataService.addGroup(group).then(
            () => {
                this.refreshGroups();
            }
        );
    }


    render() {
        return(
            <Fragment>
                <div className="content">
                    <h2 className="ui header">Manage Groups</h2>
                    <div className="students">
                        {
                            this.state.groups.map(group => {
                                return (
                                    <div className="ui stackable center aligned grid">
                                        <div className="six wide column">
                                            <div className="ui grid">
                                                <div className="right aligned middle aligned four wide column">
                                                    <div className="ui label">
                                                        Group
                                                    </div>
                                                </div>
                                                <div className="middle aligned six wide column">
                                                    <div className="ui fluid input">
                                                        <input onChange={this.handleEditInputChange} value={group.groupNumber} disabled={group.disabled} type="text" />
                                                    </div>
                                                </div>
                                                <div className="right aligned middle aligned six wide column">
                                                    <div className="ui grid">
                                                        <div style={{display: "flex"}} className="sixteen wide column">
                                                            {group.disabled ?
                                                                <Fragment>
                                                                    <button onClick={() => this.handleEdit(group.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Edit</button>
                                                                    <button onClick={() => this.handleDelete(group.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Delete</button>
                                                                </Fragment>
                                                                :
                                                                <Fragment>
                                                                    <button onClick={() => this.handleSave(group.id, group.groupNumber)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny violet basic button">Save</button>
                                                                    <button onClick={() => this.handleDiscard(group.id)} style={{width: "80px", display: "inline-block"}} type="button" className="tagsButton ui tiny red basic button">Discard</button>
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
                                    <form onSubmit={this.handleAddGroup} className="ui form">
                                        <div className="ui grid">
                                            <div className="right aligned middle aligned four wide column">
                                                <div style={{width: "90px"}} className="ui label">
                                                    Add Group
                                                </div>
                                            </div>
                                            <div className="middle aligned eight wide column">
                                                    
                                                        <div className="ui fluid input">
                                                            <input onChange={this.handleAddInputChange} value={this.state.groupToAdd}  type="text" placeholder="Input group" />
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