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

var button_cooldown=false;
const settings=document.getElementById("settings");
const begin_button=document.getElementById("beginButton");
const set_button=document.getElementById("setButton");
const question_text=document.getElementById("practice-question");
const response_text=document.getElementById("practice-response");
const response_submit=document.getElementById("responseSubmit");
const answer_text=document.getElementById("practice-answer");
function showresult(correct,answer){
    answer_text.style.display="flex";
    if (correct){
        answer_text.style.color="green";
    } else{
        answer_text.style.color="red";
    }
    answer_text.innerHTML=answer;
    answer_text.style.opacity=1;
    setTimeout(function(){
        answer_text.style.opacity=0;
        answer_text.style.display="none";
        button_cooldown=false;
        question_text.innerHTML="generate_question()";
    },3000)
}
function clean_string(string){
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"").toLowerCase();
}
begin_button.addEventListener("click", function(){
    settings.style.display="none";
    begin_button.style.display="none";
    set_button.style.display="flex";
    question_text.style.display="flex";
    response_text.style.display="flex";
    response_submit.style.display="flex";
    question_text.innerHTML="generate_question()";
});
set_button.addEventListener("click", function(){
    settings.style.display="flex"
    begin_button.style.display="flex";
    set_button.style.display="none";
    question_text.style.display="none";
    response_text.style.display="none";
    response_submit.style.display="none";
    answer_text.style.opacity=0;
    answer_text.style.display="none";
});
var real_ans=""
response_submit.addEventListener("click", function(){
    if (!button_cooldown){
        real_ans=generate_answer()
        if (screwed){
            showresult(false,"Your current configuration is unavailable!")
        } else if (clean_string(response_text.value)===clean_string(real_ans)){
            showresult(true,"Correct! The answer is most likely: "+real_ans)
        } else{
            showresult(false,"Incorrect! The answer is most likely: "+real_ans)
        }
        button_cooldown=true;
    }
})
