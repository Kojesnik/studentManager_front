import axios from 'axios';

class StudentDataService {
    retrieveAllStudents = () => {
        return axios.get('http://localhost:8888/student').catch(error => console.log(error));
    }

    deleteStudentById = (id) => {
        return axios.delete(`http://localhost:8888/student/${id}`).catch(error => console.log(error));
    }

    updateStudent = (id, name, surname, group, grade, mark) => {
        return axios.put(`http://localhost:8888/student/${id}`, {
            name: name,
            surname: surname,
            groupDto: {
                id: group.id,
                groupNumber: group.groupNumber
            },
            grade: grade,
            mark: mark
        }).catch(error => console.log(error));
    }

    addStudent = (name, surname, group, grade) => {
        return axios.post('http://localhost:8888/student', {
            name: name,
            surname: surname,
            groupDto: {
                id: group.id, 
                groupNumber: group.groupNumber
            },
            grade: grade,
            mark: 0
        }).catch(error => console.log(error));
    }


}

export default new StudentDataService();
