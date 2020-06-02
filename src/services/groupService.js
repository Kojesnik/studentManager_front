import axios from 'axios';

class GroupDataService {
    retrieveAllGroups = () => {
        return axios.get('http://localhost:8888/group').catch(error => console.log(error));
    }

    deleteGroupById = (id) => {
        return axios.delete(`http://localhost:8888/group/${id}`).catch(error => console.log(error));
    }

    updateGroup = (id, groupNumber) => {
        return axios.put(`http://localhost:8888/group/${id}`, {
            groupNumber: groupNumber
        }).catch(error => console.log(error));
    }

    addGroup = (groupNumber) => {
        return axios.post('http://localhost:8888/group', {
            groupNumber: groupNumber
        }).catch(error => console.log(error));
    }

}

export default new GroupDataService();