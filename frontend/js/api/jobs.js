// your code goes here.
const BASE_URL = 'http://localhost:3000/jobs';

const searchJobs = async (query) => {
    return await fetch(`${BASE_URL}?q=${query}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(`${BASE_URL}?q=${query}`);
            return data;
        })
        .catch(error => console.log(error)); 

   
};

export { searchJobs }

  const fetchJobDetails =async(id)=> {
    return await fetch(`${BASE_URL}/${id}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(`Fetched details for job ID ${id}`);
            return data;
        })
        .catch(error => console.log(error)); 


};

export { searchJobs, fetchJobDetails };
