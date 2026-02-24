let interviewList = [];
let rejectedList = [];

// update the counts
// catch every count first
let totalCount = document.getElementById("total-count")
let interviewCount = document.getElementById("interview-count")
let rejectedCount = document.getElementById("rejected-count")

// catch allCardsContainer
let allJobCards = document.getElementById("all-job-cards")

// catch the filteredInterviewCardSection
const filteredInterviewCardSection = document.getElementById("filteredInterviewCardSection")
// catch filteredRejectedCardSection
const filteredRejectedCardSection = document.getElementById("filteredRejectedCardSection")
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

    // hide all section first
    allJobCards.classList.add("hidden");
    filteredInterviewCardSection.classList.add("hidden");
    filteredRejectedCardSection.classList.add("hidden");
    noCardSection.classList.add("hidden");

    
    if(id == "all-filter-btn"){
        allJobCards.classList.remove("hidden");
        totalJobs.innerText = `${allJobCards.children.length} Jobs`;

    }

    // interview filter btn show the interview cards
    if(id == "interview-filter-btn"){
        if(interviewList.length == 0){
            noCardSection.classList.remove("hidden")
        }else{
            filteredInterviewCardSection.classList.remove("hidden")
        } 
        totalJobs.innerText = `${interviewList.length} of ${allJobCards.children.length} Jobs`;

    }

    // rejected filter btn
    if(id == "rejected-filter-btn"){
        if(rejectedList.length == 0){
            noCardSection.classList.remove("hidden")
        } 
        else{
            filteredRejectedCardSection.classList.remove("hidden")
        }

        totalJobs.innerText = `${rejectedList.length} of ${allJobCards.children.length} Jobs`
    }
    
}

// get current visible tab
function getCurrentVisibleSection(){
    if(!allJobCards.classList.contains("hidden")){
         return allJobCards;
    }
    if(!filteredInterviewCardSection.classList.contains("hidden")){
        return filteredInterviewCardSection;
    }
    if(!filteredRejectedCardSection.classList.contains("hidden")) {
        return filteredRejectedCardSection;
    }
    return null;
}

// event deligate and catch the event
function handleCardClick(event) {
    const parentNode = event.target.closest(".bg-white, .bg-green-50, .bg-red-50");
    if (!parentNode) return;

    const jobId = parentNode.id;

    const status = parentNode.querySelector(".job-status");
    const company = parentNode.querySelector(".company").innerText;
    const jobTitle = parentNode.querySelector(".job-title").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const duration = parentNode.querySelector(".duration").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const description = parentNode.querySelector(".description").innerText;

    const currentTabSection = getCurrentVisibleSection();

    // get the interview btn
    if (event.target.classList.contains("interview-btn")) {
        status.innerText = "Interview";
        status.className = "job-status inline-block bg-green-200 text-black text-sm font-semibold px-3 py-2 rounded-md";

        const cardObject = { 
            jobId, 
            company, 
            jobTitle, 
            location, 
            duration, 
            salary, 
            description, 
            status: "Interview" 
        };

        // Remove only from current tab
        if(currentTabSection && currentTabSection.contains(parentNode)) {
            parentNode.remove();
        }

        // Remove from rejectedList if there have
        rejectedList = rejectedList.filter(item => item.jobId !== jobId);

        //Remove from interviewList if exists
        interviewList = interviewList.filter(item => item.jobId !== jobId);

        // add to interviewList
        interviewList.push(cardObject);

        // re-render filtered sections
        createInterviewRender();
        createRejectedRender();

        // update counts
        calculateCount();
    }

    // get the rejected btn
    if (event.target.classList.contains("rejected-btn")) {
        status.innerText = "Rejected";
        status.className = "job-status inline-block bg-red-500 text-white text-xs font-semibold px-3 py-2 rounded-md";

        const cardObject = { 
             jobId,
             company, 
             jobTitle, 
             location, 
             duration, 
             salary, 
             description, 
             status: "Rejected" 
        
        };

         // Remove only from current tab
        if(currentTabSection && currentTabSection.contains(parentNode)) parentNode.remove();

        // Remove from interviewList if present
        interviewList = interviewList.filter(item => item.jobId !== jobId);

        // Remove from rejectedList if exists
        rejectedList = rejectedList.filter(item => item.jobId !== jobId);

        // add to rejectedList
        rejectedList.push(cardObject);

        // re-render filtered sections
        createInterviewRender();
        createRejectedRender();

        // update counts
        calculateCount();
    }
};

// attach event delegation to all sections
allJobCards.addEventListener("click", handleCardClick);
filteredInterviewCardSection.addEventListener("click", handleCardClick);
filteredRejectedCardSection.addEventListener("click", handleCardClick);

// html file create render for keeping the cards in the filtered interview section
function createInterviewRender(){
    // initially nothing here
    filteredInterviewCardSection.innerHTML = "";
    for(let interview of interviewList){
        console.log(interview);

        let card = document.createElement("div")
        card.innerHTML =  `
        <div class="bg-green-50 rounded-xl shadow-md p-6 border border-gray-200 relative">
        
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
        <span class="job-status inline-block bg-green-200 text-black text-sm font-semibold px-3 py-2 rounded-md">${interview.status}</span>

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

        // append child the div tho the filteredInterviewCardSection
    filteredInterviewCardSection.appendChild(card)

    }
    }

// html file create render for keeping the cards in the filtered Rejected section
function createRejectedRender(){
    // initially nothing here
    filteredRejectedCardSection.innerHTML = "";
    for(let reject of rejectedList){
        console.log(reject);

        let card = document.createElement("div")
        card.innerHTML =  `
        <div class="bg-red-50 rounded-xl shadow-md p-6 border border-gray-200 relative">
        
        <!-- delete icon -->
        <button class="btn btn-circle absolute top-4 right-4 text-gray-400 hover:text-gray-700">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        
        <!-- Job Name -->
        <h2 class="company text-lg font-semibold text-[#002C5C]">${reject.company}</h2>
        <p class="job-title text-sm font-bold text-gray-500">${reject.jobTitle}</p>

        <!-- location and Salary -->
        <ul class="font-medium text-sm text-gray-500 my-4 flex gap-8">
            <li class="location">${reject.location}</li>
            <li class="duration list-disc">${reject.duration}</li>
            <li class="salary list-disc">${reject.salary}</li>
        </ul>

        <!-- Status -->
        <span class="job-status inline-block bg-red-500 text-white text-xs font-semibold px-3 py-2 rounded-md">${reject.status}</span>

        <!-- Description -->
        <p class="description text-sm text-gray-600 mt-3">${reject.description}</p>

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

        // append child the div tho the filteredInterviewCardSection
    filteredRejectedCardSection.appendChild(card)

    }
    }

    

