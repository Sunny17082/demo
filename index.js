const activeListItems = document.getElementsByClassName("list-item");
function opentab(){
    for(activeListItem of activeListItems){
        activeListItem.classList.remove("active");
    }
    event.currentTarget.classList.add("active");
}

let date = new Date().toLocaleDateString('en-us', {weekday:"long",month:"long", day:"numeric"});
document.getElementById("date").innerHTML = date;


function updateTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    var t_str = hours + ":" + minutes + ":" +seconds;
    document.getElementById('time').innerHTML = t_str;
}
setInterval(updateTime, 1000);