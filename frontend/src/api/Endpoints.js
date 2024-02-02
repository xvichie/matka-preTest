const baseUrl = process.env.REACT_APP_ENV === 'Development'
  ? 'http://localhost:5000/api'
  : 'https://matka.ge/api';

const userTests = `${baseUrl}/userTests`;
const getTestById = `${baseUrl}/userTests/getTestById/`;

export default {userTests, getTestById };
