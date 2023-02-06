//starts with an array of quiz questions --possibly will create new script for that
const askThis = [
    { question: 'What is your favourite movie?',
        answA: {
            answ: 'Lord of the Rings',
            addTo: 'nature'
        },
        answB: {
            answ: 'Historical Movie',
            addTo: 'history',
        },
        answC:{
            answ: 'scifi, marvel, action',
            addTo: 'culture',
        },
    picture: 'url',
    },
    //
    { question: 'What is your favourite season',
    answA: {
        answ: 'spring or autumn',
        addTo: 'history',
    },
    answB: {
        answ: 'winter',
        addTo: 'nature'
    },
    answC:{
        answ: 'summer',
        addTo: 'culture'
    },
    picture: 'url',
},
//
{ question: 'What is your favourite food?',
answA: {
    answ: 'Spicy',
    addTo: 'culture'
},
answB: {
    answ: 'Mild',
    addTo: 'history',
},
answC:{
    answ: 'I can eat all',
    addTo: 'nature',
},
picture: 'url',
},
//
{ question: 'What type of music do you like?',
answA: {
    answ: 'pop/disco',
    addTo: 'culture'
},
answB: {
    answ: 'Classical',
    addTo: 'history',
},
answC:{
    answ: 'rock/metal',
    addTo: 'nature',
},
picture: 'url',
},
//
{ question: 'What is your favourite drink?',
answA: {
    answ: 'Tea',
    addTo: 'nature',
},
answB: {
    answ: 'Coffee',
    addTo: 'history',
},
answC:{
    answ: 'pop',
    addTo: 'culture',
},
picture: 'url',
},
//
{ question: 'What is your favourite book?',
answA: {
    answ: 'romantic',
    addTo: 'nature'
},
answB: {
    answ: 'adventurous',
    addTo: 'culture'
},
answC:{
    answ: 'historical',
    addTo: 'history',
},
picture: 'url',
},
//
{ question: 'Whats your style',
answA: {
    answ: 'formal',
    addTo: 'history',
},
answB: {
    answ: 'original',
    addTo: 'culture'
},
answC:{
    answ: 'comfy',
    addTo: 'nature',},
    picture: 'url',
},
]
//results for the preferencess quiz
const culture = ['Indonesia', 'India','UAE','South Korea','SaudiArabia','Greece', 'Malaysiya', 'Mexico'];
const history = ['Czech Republic','Hungary','Netherlands','Poland','Austria','France','Spain'];
const nature = ['Croatia','Canada', 'Japan','Turkey']



//declearing variables
const checkboxesButton = $('#checkBtn');
const personalityPage = $('#checkboxes');
const quiz = $('#quiz');
let scoreObject = {
    choleric:0,
    melancholic:0,
    phlegmatic:0,
    sanguine:0,
}
let destinationResultArray = []
let o = 0;

checkboxesButton.click(function(event) {
//counting checkbox values
    event.preventDefault();
	let countCholeric = 0;
	$('input[name="choleric"]:checked').each(function() {
			countCholeric++;
		});

    let countMelancholic = 0;
    $('input[name="melancholic"]:checked').each(function() {
             countMelancholic++;
         });
        
            
    let countPhlegmatic = 0;
	$('input[name="phlegmatic"]:checked').each(function() {
        countPhlegmatic++;
		});
        
    let countSanguine = 0;
	$('input[name="sanguine"]:checked').each(function() {
			countSanguine++;
		});

//counting values from the radio buttons

let opennessVal = $("input[name='openness']:checked").val();
let stabilityVal = $("input[name='stability']:checked").val(); 

if(opennessVal == 'introvert' && stabilityVal == 'calm' ){
    countPhlegmatic += 2;
} else if (opennessVal == 'introvert' && stabilityVal == 'stressed'){
    countMelancholic += 2;
} else if (opennessVal == 'extrovert' && stabilityVal == 'stressed'){
    countCholeric +=2;
} else {
    countSanguine +=2;
}
//score object
scoreObject = {
    choleric: countCholeric,
    melancholic: countMelancholic,
    phlegmatic: countPhlegmatic,
    sanguine: countSanguine,
}


//getting result
let numbersArr = Object.values(scoreObject)
let highestResult = Math.max(...numbersArr) 
let personality = getKeyByValue(scoreObject, highestResult)
console.log(personality)

//saving result for the local storage
localStorage.setItem('Personality', personality)


//hiding page with checkboxes
personalityPage.addClass('hide')
quizQuestions(o)

});

quiz.on('click', '.answ' ,function (){
    let chosen = jQuery(this).attr('id')
    console.log(chosen)
    destinationResultArray.push(chosen);
    o++
 if(o<askThis.length){   

    quizQuestions(o)
} else {endPage()} 
    
})





function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  //write if else statement to make sure that the submit button function only runse
  //when some checkboxes are ticked (try adding max) and both radios are ticked


//function for displaying quiz questions, they will display and create array , then will count what type of answer chosen most times ans that will be result.
//

function quizQuestions (order){
    quiz.empty();

    quiz.removeClass('hide')
    let questionCard =$('<div>');
    questionCard.addClass('card m-5 outerCard rounded d-flex')
    let picture = $('<img>');
    picture.attr('src', "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg").addClass('questionPicture');
    let cardBody = $('<div>');
    cardBody.addClass('card-body cardBody')
    let question = $('<h5>');
    question.addClass('card-title text-center').text(askThis[order].question);
    let answerOne = $('<button>')
    answerOne.addClass('btn m-3 answ').attr('id',askThis[order].answA.addTo).text(askThis[order].answA.answ).css('display','block')
    let answerTwo = $('<button>')
    answerTwo.addClass('btn m-3 answ').attr('id',askThis[order].answB.addTo).text(askThis[order].answB.answ).css('display','block')
    let answerThree = $('<button>')
    answerThree.addClass('btn m-3 answ').attr('id',askThis[order].answC.addTo).text(askThis[order].answC.answ).css('display','block')

    cardBody.append(question, answerOne, answerTwo, answerThree)
    questionCard.append(picture, cardBody)

    quiz.append(questionCard)
}

function endPage(){
    quiz.empty();
//HERE I am creating loading spinner from bootstrap
    let positionDiv = $('<div>');
    positionDiv.addClass('d-flex justify-content-center m-5')
    let loadingDiv = $('<div>');
    loadingDiv.addClass('spinner-border text-info').css('width','5rem').css('height','5rem').attr('role','status');
    let loading = $('<span>');
    loading.addClass('sr-only');
    loadingDiv.append(loading);
    positionDiv.append(loadingDiv);
    quiz.append(positionDiv);
    loadingTime(3)//this will redirect user to suggestion page after 3 seconds of watching spinner :D
    findResult(destinationResultArray)
}

//function to count final result of preferences quiz
function findResult(arr) {
    let nat = [];
    let his = [];
    let cul = [];
    //i looped through results array and created 3 arrays then compared their length to fin result
for (let i=0 ; i<arr.length; i++){
if(arr[i]=='nature'){
    nat.push(arr[i])
}else if(arr[i]=='history'){
    his.push(arr[i])
}else {
    cul.push(arr[i])
}
}
//final results are stored in local storage to access on suggestion website
if (nat.length >= his.length && nat.length >=cul.length){
localStorage.setItem('Destination',JSON.stringify(nature))
} else if (his.length >= cul.length && his.length >=nat.length ){
    localStorage.setItem('Destination',JSON.stringify(history))
}else {
    localStorage.setItem('Destination',JSON.stringify(culture))
}
}






//timer for loading function
function loadingTime (time) {
    let timerInterval = setInterval(function(){
        time--;
        if(time < 0){
        window.location.replace('./testing-api.html')
        clearInterval(timerInterval)
} },1000)};