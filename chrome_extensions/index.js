//chrome://extensions/
let myLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEL = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
 //this takes the localStorage data and gets myLeads and turns it back into an array

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = ""
        for (let i = 0; i < leads.length; i++){
            listItems +=
            `<li>
                <a
                target='_blank' href='${leads[i]}'>${leads[i]}
                </a>
            </li>`
        }
    ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function(){
    //Grab the url of the current tab!
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    })

})


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function()
{
    myLeads.push(inputEL.value);
    inputEL.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); //This changes the myLeads[] into a string
    //localStorage makes data persistent
    render(myLeads);
})
