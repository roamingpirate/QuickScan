import getapiClient from "../api/apiClient"

export const getStudentsPresentByDate=async(classID,date)=>{
    const apiClient = await getapiClient();
    const Attendence = await apiClient.get(`/getClassAttendence/${classID}?date=${date}`)

    return Attendence.data;
}

export const getAllStudentsInClass=async(classID)=>{
    const apiClient = await getapiClient()
    const Students = await apiClient.get(`/getStudentsList/${classID}`)

    return Students.data;
}