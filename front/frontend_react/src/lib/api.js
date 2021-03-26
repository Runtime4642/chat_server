import axios from 'axios';

//const address = 'http://localhost:8076';
const address = 'http://localhost:8080/chat';



export const getCalendarData = (date) => axios.get(address+"/get?date="+date);

export const saveCalendarData = (no,startDate,endDate,location) => axios.post(address+"/save",{no,startDate,endDate,location});

export const getChatUserList = () => axios.get(address+"/user");

export const gethistory = () => axios.get(address+"/gethistory");

