const activeListItems = document.getElementsByClassName("list-item");
function opentab(){
    for(activeListItem of activeListItems){
        activeListItem.classList.remove("active");
    }
    event.currentTarget.classList.add("active");
}