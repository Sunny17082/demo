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
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

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
        if(progress.value == song.max){
            song.pause();
        }

        let currentMinutes = Math.floor(song.currentTime / 60);
        let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(song.duration / 60);
        let durationSeconds = Math.floor(song.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    },1000);
}

progress.onchange = function() {
    song.play();
    song.currentTime=progress.value;
    ctrl.classList.add("fa-pause");
    ctrl.classList.remove("fa-play");
}

const containerVideo = document.getElementById("cVideo");
const myVideo = document.getElementById("myVideo");

function playvid(videoname){
    myVideo.src = "/resources/"+videoname+".mp4";
    myVideo.play();
    containerVideo.classList.remove("no");
}

function back(){
    myVideo.pause();
    containerVideo.classList.add("no");
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

var icon = document.getElementById("icon");

icon.onclick = function() {
    document.body.classList.toggle("light-theme");
    if(document.body.classList.contains("light-theme")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

const container = document.getElementById("container-main");
const containerPowerOn = document.getElementById("cPowerOn");

function powerOff(){
    container.classList.add("no");
    containerPowerOn.classList.remove("no");
}

function powerOn(){
    containerPowerOn.classList.add("no");
    container.classList.remove("no");
}