let billChk = false
let tipPerCentChk = false
let numPeopleChk = false
let Tip = 0

//bil > 0
let bill = document.getElementById('billInput')
bill.addEventListener('input', () => {
    if(bill.value > 0){
        billChk = true
    }else{
        billChk = false
    }
    check()
})

//number people > 0
let people = document.getElementById('peopleInput')
people.addEventListener('input', () => {
    if(people.value > 0){
        numPeopleChk = true
        hideError()

    }else{
        numPeopleChk = false
        people.value = ''
        showError()
    }
    check()
})

let customInput = document.getElementById('customInput')

//get % tip
let tips = document.querySelectorAll('.tip')
tips.forEach((tip) => {
    tip.addEventListener('click', () => {
        if(!tip.classList.contains('custom')) {
            Tip = (tip.innerText).substring(0, tip.innerText.length - 1)
            customInput.value = ''
            chckTips(tip)
        }
        check()
    })
})

//custom % tip
customInput.addEventListener('input', inputCustomChk)

function inputCustomChk() {
    if(customInput.value != '' && customInput.value >= 0) {
        tipPerCentChk = true
        Tip = customInput.value
        tips.forEach((tip) => {
            if(tip.classList.contains('selected')){
                tip.classList.remove('selected')
            }
        })
    }else{
        tipPerCentChk = false
    }
    check()
}

//verifica se existe algum selectionado
function chckTips(current_tip) {
    tips.forEach((tip) => {
        if(tip.classList.contains('selected')){
            tip.classList.remove('selected')
        }
    })
    current_tip.classList.add('selected')
    tipPerCentChk = true
}

function check() {
    let bttn = document.getElementById('resetBttn')
    if(billChk && tipPerCentChk && numPeopleChk){
        bttn.removeAttribute('disabled')
        calculate()
    }else{
        bttn.setAttribute('disabled', 'disabled')
    }

    if(people.value <= 0){
        showError()
    }else{
        hideError()
    }
}

function showError(){
    let pError = document.getElementById('errorMessage')
    let peopleBox = document.getElementById('peopleBox').children
    pError.style.bottom = '-20px'
    peopleBox[2].style.outline = '2px solid rgb(255, 123, 0)'
    peopleBox[2].style.boxShadow = '0px 0px 5px rgb(255, 123, 0)'
}

function hideError() {
    let pError = document.getElementById('errorMessage')
    let peopleBox = document.getElementById('peopleBox').children
    pError.style.bottom = '0px'
    peopleBox[2].style.outline = 'none'
    peopleBox[2].style.boxShadow = 'none'
}

function calculate() {
    let amount = 0
    let total = 0
    let tipAmount = document.getElementById('tipAmount')
    let totalAmount = document.getElementById('totalAmount')

    if(people.value <= 0 || people.value == ''){
        showError()
        tipAmount.innerHTML = "0.00"
        totalAmount.innerHTML = "0.00"
        return
    }

    amount = (bill.value/people.value) * (Tip/100)
    amount = amount.toFixed(2)
    total = Number((bill.value/people.value)) + Number(amount)
    total = total.toFixed(2)

    tipAmount.innerHTML = amount
    totalAmount.innerHTML = total
}

function reset() {
    let tipAmount = document.getElementById('tipAmount')
    let totalAmount = document.getElementById('totalAmount')
    let bttn = document.getElementById('resetBttn')

    tips.forEach((tip) => {
        if(tip.classList.contains('selected')){
            tip.classList.remove('selected')
        }
    })

    tipAmount.innerHTML = '0.00'
    totalAmount.innerHTML = '0.00'

    bill.value = ''
    people.value = ''
    customInput.value = ''

    bttn.setAttribute('disabled', 'disabled')

    billChk = false
    tipPerCentChk = false
    numPeopleChk = false
}