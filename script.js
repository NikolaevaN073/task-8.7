let minValue = '';
let maxValue = '';
let answerNumber = '';
let answerNumberString = '';
let answer = ''; 
let orderNumber = 0;
let gameRun = true;

const minInputValue = document.querySelector('#minInputValue');
const maxInputValue = document.querySelector('#maxInputValue');
const btnInputValue = document.querySelector('#btnInputValue');

function getInputValue () {    
    
    document.querySelector('#btnCollapse').style.visibility = "visible";
    document.querySelector('#gameCard').style.visibility = "hidden";
    
    btnInputValue.addEventListener('click', () => {
        minValue = minInputValue.value;
        maxValue = maxInputValue.value;        
        checkInput();
    });
}  

function checkInput () {  
    minValue = parseInt(minValue) || 0;
    maxValue = parseInt(maxValue) || 100;    
    minValue = minValue >= -999 ? minValue : -999;
    minValue = minValue <= 999 ? minValue : 999;
    maxValue = maxValue >= -999 ? maxValue : -999;
    maxValue = maxValue <= 999 ? maxValue : 999;      

    const alertPlaceholder = document.querySelector('#liveAlertPlaceholder');    
    const alert = (message, type) => {        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible text-center" role="alert">`,
            `   <div>${message}</div>`,     
            `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть" id="${type}BtnClose"></button>`,  
            '</div>'
        ].join('')    
        alertPlaceholder.append(wrapper);                
    }    

    if (minValue > maxValue) {
        document.querySelector('#btnCollapse').style.visibility = "hidden";        
        alert(`Минимальное значение для игры должно быть меньше максимального. Введите числа заново`, 'danger');

        document.querySelector('#dangerBtnClose').addEventListener('click', () => {   
            minInputValue.value = '';
            maxInputValue.value = '';                     
            getInputValue();
        })  
    } else {           
        alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`, 'success');   
        document.querySelector('#successBtnClose').addEventListener('click', gameToRun);                  
    }                
}

function gameToRun () {
    document.querySelector('#titleStart').style.visibility = "hidden"; 
    document.querySelector('#btnCollapse').style.visibility = "hidden"; 
    document.querySelector('#gameCard').style.visibility = "visible";    
    gameRun = true;     
    answerNumber  = Math.floor((minValue + maxValue) / 2);       
    checkAnswerNumber();
}

function checkAnswerNumber () {
    if (answerNumber !==0) {
        getAnswer();
        answer = answerNumberString.length < 20 ? answerNumberString : answerNumber; 
    } else {
        answer = 0;
    }    
    viewFields();    
}

function viewFields () {  
    orderNumber++;   
    getAnswerPhrase (Math.round(Math.random()*3));     
    orderNumberField.innerText = orderNumber;    
    answerField.innerText = `${answerPhraseCurrent} ${answer}?`;
}

function getAnswerPhrase (phraseRandom) {     
    let answerPhraseVar = '';
    if (phraseRandom === 1) {
        answerPhraseVar ='Вы загадали число ';
    } else if (phraseRandom === 2) {
        answerPhraseVar = 'Скорее всего это число ';
    } else if (phraseRandom === 3) {
        answerPhraseVar = 'Дайте подумать, это число ';
    } else {
        answerPhraseVar = 'Может это число ';
    }  
    answerPhraseCurrent = answerPhraseVar;
}   

function getAnswer () {

    let arrUnits = [
        {number: 0, text: ''},
        {number: 1, text: 'один'},
        {number: 2, text: 'два'},
        {number: 3, text: 'три'},
        {number: 4, text: 'четыре'},
        {number: 5, text: 'пять'},
        {number: 6, text: 'шесть'},
        {number: 7, text: 'семь'},
        {number: 8, text: 'восемь'},
        {number: 9, text: 'девять'}
    ];
    let arrToTwenty = [
        {number: 10, text: 'десять'},
        {number: 11, text: 'одиннадцать'},
        {number: 12, text: 'двенадцать'},
        {number: 13, text: 'тринадцать'},
        {number: 14, text: 'четырнадцать'},
        {number: 15, text: 'пятнадцать'},
        {number: 16, text: 'шестнадцать'},
        {number: 17, text: 'семнадцать'},
        {number: 18, text: 'восемнадцать'},
        {number: 19, text: 'девятнадцать'}
    ];
    let arrDosens = [
        {number: 20, text: 'двадцать '},
        {number: 30, text: 'тридцать '},
        {number: 40, text: 'сорок '},
        {number: 50, text: 'пятьдесят '},
        {number: 60, text: 'шестьдесят '},
        {number: 70, text: 'семьдесят '},
        {number: 80, text: 'восемьдесят '},
        {number: 90, text: 'девяносто '}              
    ];    
    let arrHundreds = [
        {number: 100, text: 'сто '}, 
        {number: 200, text: 'двести '},
        {number: 300, text: 'триста '},
        {number: 400, text: 'четыреста '},
        {number: 500, text: 'пятьсот '},
        {number: 600, text: 'шестьсот '},
        {number: 700, text: 'семьсот '},
        {number: 800, text: 'восемьсот '},
        {number: 900, text: 'девятьсот '}        
    ];

    let textNumber = '';
    let units = 0;
    let dosens = 0;
    let hundreds = 0;
    let hundredsText = '';
    let dosensText = '';
    let unitsText = '';
    let a = 0;
       
    if (Math.abs(answerNumber) < 10) {
        a = Math.abs(answerNumber) % 10; 
        textNumber = arrUnits.find(item => item.number === a);   
        answerNumberString = answerNumber > -10 && answerNumber < 0 ? `минус ${textNumber.text}` : textNumber.text; 
                
    } else if (Math.abs(answerNumber) >= 10 && Math.abs(answerNumber) < 20) {
        a = Math.abs(answerNumber) % 100;  
        textNumber = arrToTwenty.find(item => item.number === a);
        answerNumberString = answerNumber > -20 && answerNumber <= -10 ? `минус ${textNumber.text}` : textNumber.text;

    } else if (Math.abs(answerNumber) >= 20 && Math.abs(answerNumber) < 100) {
        a = Math.abs(answerNumber) % 100;  
        dosens = (Math.floor(a / 10))*10;        
        dosensText = arrDosens.find(item => item.number === dosens);
        unitsText = arrUnits.find(item => item.number === a - dosens);     

        textNumber = answerNumber > -100 && answerNumber <= -20 ? `минус ${dosensText.text} ${unitsText.text}` : dosensText.text + unitsText.text;
        answerNumberString = textNumber;       

    } else {        
        a = Math.abs(answerNumber) % 1000;            
        hundreds = (Math.floor(a / 100)*100);   
        hundredsText = arrHundreds.find(item => item.number === hundreds);
        dosens = a - hundreds;

        if (dosens < 10) {
            dosensText = arrUnits.find(item => item.number === dosens); 
            textNumber = answerNumber < 0 ? `минус ${hundredsText.text} ${dosensText.text}` : hundredsText.text + dosensText.text;            
            
        } else if (dosens < 20 && dosens >= 10) {
            dosensText = arrToTwenty.find(item => item.number === dosens);
            textNumber = answerNumber < 0 ? `минус ${hundredsText.text} ${dosensText.text}` : hundredsText.text + dosensText.text;            

        } else {
            dosens = (Math.floor(dosens / 10)*10);              
            units = a - hundreds - dosens;
            dosensText = arrDosens.find(item => item.number === dosens);
            unitsText = arrUnits.find(item => item.number === units);
            textNumber = answerNumber < 0 ? `минус ${hundredsText.text} ${dosensText.text} ${unitsText.text}`: 
            hundredsText.text + dosensText.text + unitsText.text;            
        } 
        answerNumberString = textNumber;  
    }      
}

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
getInputValue();

document.querySelector('#btnOver').addEventListener('click', () => {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
            `Вы загадали неправильное число!\n\u{1F914}` :
            `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;            
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2); 
            checkAnswerNumber();          
        }
    } 
})

document.querySelector('#btnLess').addEventListener('click', () => {
    if (gameRun){
        if (maxValue === minValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
            `Вы загадали неправильное число!\n\u{1F914}` :
            `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;            
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.ceil((minValue + maxValue) / 2);             
            checkAnswerNumber();
        }
    }
})

document.querySelector('#btnEqual').addEventListener('click', () => {
    if (gameRun){
        const phraseRandom = Math.round( Math.random()*3);

        if (phraseRandom === 1) {
            answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        } else if (phraseRandom === 2) {
            answerField.innerText = `Это было не сложно\n\u{1F60E}`;
        } else if (phraseRandom === 3) {
            answerField.innerText = `Угадал! Попробуем еще раз?\n\u{1F60E}`;
        } else {
            answerField.innerText = `Я знаю верный ответ\n\u{1F60E}`;
        }
        gameRun = false;
    }
})

document.querySelector('#btnRetry').addEventListener('click', reset);

function reset () {
    orderNumber = 0;
    orderNumberField.innerText = '';
    answerField.innerText = '';
    minInputValue.value = '';
    maxInputValue.value = '';  
    getInputValue();    
}
