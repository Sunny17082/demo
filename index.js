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
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
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

var colorchangeprimary="";
var colorchangesecondary="";

function know(){
    if(icon.classList.contains("fa-moon")){
        colorchangeprimary = "black";
        colorchangesecondary = "white";
    } else {
        colorchangeprimary = "white";
        colorchangesecondary = "black";
    }
}

const auto = document.querySelector("autopilot");
const autopilotsound = document.getElementById("autopilot-sound");
const onOff = document.getElementById("on-off");
const content = document.getElementById("autopilot-content");
const engage1 = document.getElementById("engage-1");
const engage2 = document.getElementById("engage-2");

function autopilot(){
    autopilotsound.play();
    know();
    if(onOff.innerHTML == "ON"){
        onOff.innerHTML='OFF';
        onOff.classList.add("off");
        content.style.color = colorchangesecondary;
        engage1.innerHTML="Not Engaged";
        engage2.innerHTML="Not Engaged";
    } else {
        onOff.innerHTML='ON';
        onOff.classList.remove("off");
        content.style.color=colorchangeprimary;
        engage1.innerHTML="Engaged";
        engage2.innerHTML="Engaged";
    }
}

const locked = document.getElementById("locked");
const carlock = document.getElementById("car-lock");

function lock(){
    carlock.play();
    if(locked.classList.contains("fa-lock")){
        locked.classList.remove("fa-lock");
        locked.classList.add("fa-unlock");
    } else {
        locked.classList.remove("fa-unlock");
        locked.classList.add("fa-lock");
    }
}

const charging = document.getElementById("charge");
const chargingsound = document.getElementById("charging-sound");

function charge(){
    know()
    if(charging.style.color=="green"){
        charging.style.color=colorchangeprimary;
    } else {
        charging.style.color="green";
        chargingsound.play();
    }
}

function changeangle(){
    const carcamera = document.getElementById("car-camera");
    if(carcamera.src.includes("resources/car.gif")){
        carcamera.src="resources/car back.gif";
    } else {
        carcamera.src="resources/car.gif";
    }
}

let textarea = document.getElementById("textarea");
let messageArea = document.querySelector(".message-area");

textarea.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: "You",
        message: message.trim()
    };
    appendMessage(msg, "outgoing");
    textarea.value="";
    scrollToBottom();
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, "message");

    let markup = `
        <h4>${msg.user}</h4>
        <p><pre>${msg.message}</pre></p>
    `
    
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

const wifi = document.getElementById("wifi");
if(navigator.onLine)
    wifi.classList.add("fa-wifi");
else
    wifi.classList.remove("fa-wifi");
function checkNetworkStatus() {
    if (navigator.onLine) {
        location.reload();
    } else {
        location.reload();
    }
    containerPowerOn.classList.add("no");
    container.classList.remove("no");
}

window.addEventListener('online', checkNetworkStatus);
window.addEventListener('offline', checkNetworkStatus);