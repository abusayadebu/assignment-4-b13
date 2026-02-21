let interviewList = [{name: "rahim"},];
let rejectedList = [{id:1}, {age: 12}];

// update the counts
// catch every count first
let totalCount = document.getElementById("total-count")
let interviewCount = document.getElementById("interview-count")
let rejectedCount = document.getElementById("rejected-count")

// catch allCardsContainer
let allJobCards = document.getElementById("all-job-cards")

// catch the buttons of job Cards



// function calculate count
function calculateCount(){
    totalCount.innerText = allJobCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();


// event deligate and catch the event
allJobCards.addEventListener("click", function(event){
    if(event.target.classList.contains('interview-btn')){
        console.log("yeah interview clicked");
    }
    else{
        alert('sorry not it')
    }
})