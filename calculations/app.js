const menu =document.querySelector("#mobile-menu")
const menuLinks =document.querySelector(".navmenu")
menu.addEventListener("click",function (){
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});
var calcSign="";
document.querySelectorAll('.select-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('active');
        if (calcSign!=""){
            document.getElementById(calcSign).classList.toggle('active');
        }
        calcSign=event.currentTarget.id;
    });
});

//Actual Generation
function chooseList(lis){
    return lis[Math.floor(Math.random()*lis.length)]
}
var range1=[]
var range2=[]
var startTime=0;
var elapsedTime=0;
var running=false;
const settings=document.getElementById("settings");
const input1=document.getElementById("first-input");
const input2=document.getElementById("second-input");
const begin_button=document.getElementById("beginButton");
const set_button=document.getElementById("setButton");
const question_text=document.getElementById("practice-question");
const response_submit=document.getElementById("responseSubmit");
const answer_text=document.getElementById("practice-answer");
const stopwatch=document.getElementById("stopwatch");
function generateRange(string){
    string=string.replace(/\s+/g,"")
    var ansrange=[]
    for (const range of string.split(",")){
        if (range.includes("-")){
            const [start, end] = range.split("-").map(Number);
            for (let i=start;i<=end;i++){
                ansrange.push(i)
            }
        } else{
            ansrange.push(range)
        }
    }
    return ansrange
}
function generateQuestion(){
    num1=chooseList(range1)
    num2=chooseList(range2)
    startTime=performance.now()
    if(!running){
        running=true
        update()
    }
    if (calcSign=="Random"){
        return num1+chooseList(["+","-","×","÷"])+num2
    } else{
        return num1+calcSign+num2
    }
}
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    const millis = String(Math.floor(ms % 1000)).padStart(3, '0');
    return "Elapsed Time: "+`${hrs}:${mins}:${secs}.${millis}`;
}

function update() {
    elapsedTime = performance.now() - startTime;
    stopwatch.textContent = formatTime(elapsedTime);
    requestAnimationFrame(update);
}
begin_button.addEventListener("click", function(){
    settings.style.display="none";
    begin_button.style.display="none";
    set_button.style.display="flex";
    question_text.style.display="flex";
    response_submit.style.display="flex";
    stopwatch.style.display="flex";
    range1=generateRange(input1.value)
    range2=generateRange(input2.value)
    question_text.innerHTML=generateQuestion();
});
set_button.addEventListener("click", function(){
    settings.style.display="flex"
    stopwatch.style.display="none";
    begin_button.style.display="flex";
    set_button.style.display="none";
    question_text.style.display="none";
    response_submit.style.display="none";
    answer_text.style.opacity=0;
    answer_text.style.display="none";
});
response_submit.addEventListener("click", function(){
    question_text.innerHTML=generateQuestion();
})
