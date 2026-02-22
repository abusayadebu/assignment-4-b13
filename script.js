let interviewList = [];
let rejectedList = [];

// update the counts
// catch every count first
let totalCount = document.getElementById("total-count")
let interviewCount = document.getElementById("interview-count")
let rejectedCount = document.getElementById("rejected-count")

// catch allCardsContainer
let allJobCards = document.getElementById("all-job-cards")

// catch the filteredCardSection
const filteredCardSection = document.getElementById("filteredCardSection")
// no-card section catch
const noCardSection = document.getElementById("no-card-section")
let totalJobs = document.getElementById("total-jobs")

// catch filter buttons
const allFilterBtn = document.getElementById("all-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectedFilterBtn = document.getElementById("rejected-filter-btn")




// function calculate count -1
function calculateCount(){
    totalCount.innerText = allJobCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();


// toggle filterBtn function -2
function toggleFilterBtn(id){
    allFilterBtn.classList.remove("bg-blue-600", "text-white")
    interviewFilterBtn.classList.remove("bg-blue-600", "text-white")
    rejectedFilterBtn.classList.remove("bg-blue-600", "text-white")
    
    // which is selected-- 
    const selectedBtn = document.getElementById(id)
    if(selectedBtn){
        selectedBtn.classList.add("bg-blue-600", "text-white")
    }
    if(id == "all-filter-btn"){
        // hide interview cards
        filteredCardSection.classList.add("hidden")
        allJobCards.classList.remove("hidden")
        totalJobs.innerText = `${allJobCards.children.length} jobs`;

    }

    // interview filter btn show the interview cards
    if(id == "interview-filter-btn"){
        // hide all jobs container
        allJobCards.classList.add("hidden")
        
        // if interviewList.length 0, then show no interview
        if(interviewList.length == 0){
            noCardSection.classList.remove("hidden")
            // initially interview 0
            totalJobs.innerText = `${interviewList.length} of ${allJobCards.children.length} Jobs`;
        }
        else if(interviewList.length > 0){
            noCardSection.classList.add("hidden")
             // show filterd card section
        filteredCardSection.classList.remove("hidden")
        // initially interview 0
        totalJobs.innerText = `${interviewList.length} of ${allJobCards.children.length} Jobs`;
        }
       
    }
    
}


// event deligate and catch the event
allJobCards.addEventListener("click", function(event){
    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;

        // take the elements and make a object
        const company = parentNode.querySelector(".company").innerText;
        const jobTitle = parentNode.querySelector(".job-title").innerText;
        const location = parentNode.querySelector(".location").innerText;
        const duration = parentNode.querySelector(".duration").innerText;
        const salary = parentNode.querySelector(".salary").innerText;
        let status = parentNode.querySelector(".job-status").innerText;
        const description = parentNode.querySelector(".description").innerText;
        const jobStatus = "Applied"

        // make object
        const cardObject = {
            company: company,
            jobTitle: jobTitle,
            location: location,
            duration: duration,
            salary: salary,
            status: jobStatus,
            description: description,
        }
        console.log(cardObject);
        // check already job object exsit or not
        const interviewExist = interviewList.find(item => item.company == cardObject.company)

        if(!interviewExist){
            interviewList.push(cardObject);
            createInterviewRender()
            calculateCount();
            // push the cardObject to the inteviewList
        }
        else{
            alert("sorry already exist")
        }
}
})



// html file create render for keeping the cards in the filtered section
function createInterviewRender(){
    // initially nothing here
    filteredCardSection.innerHTML = "";
    for(let interview of interviewList){
        console.log(interview);

        let card = document.createElement("div")
        card.innerHTML =  `
        <div class="w-11/12 mx-auto bg-red-300 rounded-xl shadow-md p-6 border border-gray-200 relative">
        
        <!-- delete icon -->
        <button class="btn btn-circle absolute top-4 right-4 text-gray-400 hover:text-gray-700">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        
        <!-- Job Name -->
        <h2 class="company text-lg font-semibold text-[#002C5C]">${interview.company}</h2>
        <p class="job-title text-sm font-bold text-gray-500">${interview.jobTitle}</p>

        <!-- location and Salary -->
        <ul class="font-medium text-sm text-gray-500 my-4 flex gap-8">
            <li class="location">${interview.location}</li>
            <li class="duration list-disc">${interview.duration}</li>
            <li class="salary list-disc">${interview.salary}</li>
        </ul>

        <!-- Status -->
        <span class="job-status inline-block bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-md mt-3">${interview.status}</span>

        <!-- Description -->
        <p class="description text-sm text-gray-600 mt-3">${interview.description}</p>

        <!-- Buttons -->
        <div class="flex gap-3 mt-4">
        <button class="interview-btn border border-green-500 text-green-600 px-4 py-1 rounded-md text-sm font-semibold hover:bg-green-50">
            INTERVIEW
        </button>

        <button class="rejected-btn border border-red-500 text-red-600 px-4 py-1 rounded-md text-sm font-semibold hover:bg-red-50">
            REJECTED
        </button>
        </div>
    </div>
        `

        // append child the div tho the filteredCardSection
    filteredCardSection.appendChild(card)

    }
    }

    

