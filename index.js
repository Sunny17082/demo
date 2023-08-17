const activeListItems = document.getElementsByClassName("list-item");
const tabcontents=document.getElementsByClassName("tab-contents");
function opentab(tabname){
    for(activeListItem of activeListItems){
        activeListItem.classList.remove("active");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active");
    document.getElementById(tabname).classList.add("active-tab");
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

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrl = document.getElementById("ctrl-icon");

song.onloadedmetadata = function() {
    progress.max=song.duration;
    progress.val=song.currentTime;
}

function playpause() {
    if(ctrl.classList.contains("fa-pause")) {
        song.pause();
        ctrl.classList.remove("fa-pause");
        ctrl.classList.add("fa-play");
    } else {
        song.play();
        ctrl.classList.add("fa-pause");
        ctrl.classList.remove("fa-play");
    }
}

if(!song.pause()) {
    setInterval(() => {
        progress.value = song.currentTime
    },500);
}

progress.onchange = function() {
    song.play();
    song.currentTime=progress.value;
    ctrl.classList.add("fa-pause");
    ctrl.classList.remove("fa-play");
}

const containers = document.getElementById("c1");
const myVideo = document.getElementById("myVideo");

function playvid(videoname){
    myVideo.src = "/resources/"+videoname+".mp4";
    myVideo.play();
    containers.classList.remove("no");
    containers.classList.add("yes");
}

function fun(e){
    var container = document.getElementById('container-main');
    var c1 = document.getElementById('c1');
    var val = e.value;
    container.setAttribute("style", "filter: brightness("+val+"%);");
    c1.setAttribute("style", "filter: brightness("+val+"%);");
}

function thisVolume(volume_value){
    var myvid = document.getElementById("myVideo");
    var song = document.getElementById("song");
    myvid.volume = volume_value / 100;
    song.volume = volume_value / 100;
}