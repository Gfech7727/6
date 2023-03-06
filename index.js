let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const localLeads = JSON.parse(localStorage.getItem("myLeads"))
if (localLeads) {
    myLeads = localLeads
    render(myLeads)
}
inputBtn.addEventListener("click", function() {
    myLeads.unshift(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    render(myLeads)
})

function render(leads) {
    ulEl.innerHTML = ""
    for (i = 0; i < leads.length; i++) {
        ulEl.innerHTML += `
        <li>
            <a target="_blank" href="${leads[i]}">${leads[i]}
            </a>
        </li>
        `
    }
}
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.unshift(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })    
})
deleteBtn.addEventListener("dblclick", function() {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})