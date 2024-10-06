// your code goes here.

//import jobsAPI from './api/jobs.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { searchJobs, fetchJobDetails } from './api/jobs.js'

const form = document.querySelector("#search-jobs-form");
const jobList = document.querySelector("#searched-jobs");
const jobDetailsCard = document.querySelector("#job-details-card");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let jobs = [];
    let searchValue = e.target.elements["query"].value;

    await searchJobs(searchValue).then((data) => {
        jobs=data
    }).catch(error => console.log(error));

    jobList.innerHTML="";
    if (jobs.length>0){
        jobs.forEach(job => {
            let liJob =
            `<li class="job-card card my-1" style="width: 18rem;">
            <div class="card-header">${job.company}</div>
            <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">${job.date_posted}</h6>
            <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
            </div>
            </li>`;
            
        //jobList.appendChild(liJob);
        jobList.innerHTML += liJob;
        });
    } else {
        jobList.innerHTML = '<div class="text-dark">No Results Found</div';
    }
});

jobList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("view-job-button")) {
        const jobID = e.target.getAttribute("job-data-id");
        const jobDetails = await fetchJobDetails(jobID);

        displayJobDetails(jobDetails);

    }
})

const displayJobDetails = (job) => {
    jobDetailsCard.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">${job.title}</h3>
            <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.date_posted} (FORMATTED)</h6>
        
            <h5 class="card-subtitle mb-2">Description</h5>
            <p class="card-text">${job.description}</p>
            <h5 class="card-subtitle mb-2">Qualifications</h5>
            <p class="card-text">${job.qualifications}</p>
            <button class="btn btn-success save-job">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
                Save Job
            </button>
        </div>
    </div>`;
};

