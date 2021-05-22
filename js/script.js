/**
 * Global Variables
 */
let otherJobRoleInputElement = document.getElementById('other-job-role');
let jobRoleSelectElement = document.getElementById('title');
let colorSelectElement = document.getElementById('color');
let designSelectElement = document.getElementById('design');
let activitiesElement = document.getElementById('activities');
let totalCostElement = document.getElementById('activities-cost');
let paymentElement = document.getElementById('payment');
let form = document.getElementsByTagName('form')[0];
let nameElement = document.getElementById('name');
let nameHintElement = document.getElementById('name-hint');
let emailElement = document.getElementById('email');
let emailHintElement = document.getElementById('email-hint');
let activitiesHintElement = document.getElementById('activities-hint');
let ccElement = document.getElementById('cc-num');
let ccHintElement = document.getElementById('cc-hint');
let zipElement = document.getElementById('zip');
let zipHintElement = document.getElementById('zip-hint');
let cvvElement = document.getElementById('cvv');
let cvvHintElement = document.getElementById('cvv-hint');
/**
* The "Name" field
*/
window.addEventListener('load',() => {
    document.getElementById('name').focus();
    otherJobRoleInputElement.style.display = 'none';
});

/**
 * "Job Role" section
*/
jobRoleSelectElement.addEventListener('change', (e) => {
    (e.target.value == 'other') ?  otherJobRoleInputElement.style.display = 'block': otherJobRoleInputElement.style.display = 'none';
});

/**
 * "T-Shirt Info" section
 */
colorSelectElement.disabled = true;
designSelectElement.addEventListener('change', (e) => {
    colorSelectElement.disabled = false;
    let selectOptions = colorSelectElement.children;
    for (element of selectOptions){
        element.setAttribute('hidden','');
    }
    if (e.target.value == 'js puns') {
        colorSelectElement[1].removeAttribute('hidden');
        colorSelectElement[2].removeAttribute('hidden');
        colorSelectElement[3].removeAttribute('hidden');
    } else {
        colorSelectElement[4].removeAttribute('hidden');
        colorSelectElement[5].removeAttribute('hidden');
        colorSelectElement[6].removeAttribute('hidden');
       
    }
});

/**
 * Register for Activities" section
 * Prevent users from registering for conflicting activities
 */
let totalCost = 0;
let timeArray = []
activitiesElement.addEventListener('change', (e) => {
    let eventTime = e.target.getAttribute('data-day-and-time');
    let eventName = e.target.getAttribute('name');
    let activitiesInputElements = document.querySelectorAll('.activities input[type="checkbox"]');
    for (element of activitiesInputElements) {
        if (element.getAttribute('data-day-and-time') == eventTime && element.getAttribute('name') != eventName) {
            element.disabled == true ? element.disabled=false : element.disabled=true;
            element.parentNode.classList.toggle('disabled');
        }
    }
    if (e.target.checked) {
        totalCost += parseFloat(e.target.getAttribute('data-cost'));
    } else {
        totalCost -= parseFloat(e.target.getAttribute('data-cost'));
    }
    totalCostElement.innerHTML = "Total: " + totalCost;
});

/**
 * "Payment Info" section
 */
let creditCardElement = document.getElementById('credit-card');
let paypalElement = document.getElementById('paypal');
let bitcoinElement = document.getElementById('bitcoin');

paymentElement.children[1].setAttribute('selected','');
paypalElement.style.display = 'none';
bitcoinElement.style.display = 'none';

paymentElement.addEventListener('change', (e) => {

    creditCardElement.style.display = 'none';
    paypalElement.style.display = 'none';
    bitcoinElement.style.display = 'none';

    if (e.target.value == 'credit-card') {
        creditCardElement.style.display = 'block';
    }
    if (e.target.value == 'paypal') {
        paypalElement.style.display = 'block';
    }
    if (e.target.value == 'bitcoin') {
        bitcoinElement.style.display = 'block';
    }
});

/**
 * Form validation
 */
let checkName = (name) => {
    return /^[^ ][a-z ]+ [a-z]+$/i.test(name);
}
let checkEmail = (email) => {
    return /^[^@]+@[^@.]+\.[a-z]{3}$/i.test(email);
}
let checkActivities = () => {
    return document.querySelectorAll('#activities-box input[type="checkbox"]:checked').length < 1;
}
let checkCC = (cc) => {
    return /^\d{13,16}$/.test(cc);
}
let checkZip = (zip) => {
    return /^\d{5}$/.test(zip);
}
let checkCVV = (cvv) => {
    return /^\d{3}$/.test(cvv);
}
let toggleValidInValid = (element,condition) => {
    if (condition) {
        element.classList.add('valid');
        element.classList.remove('not-valid');
    } else {
        element.classList.remove('valid');
        element.classList.add('not-valid');
    }
}

//Validate fields hen you submit form
form.addEventListener('submit', (e) => {
    let flag = true;

    nameHintElement.style.display = 'none';
    emailHintElement.style.display = 'none';
    activitiesHintElement.style.display = 'none';
    ccHintElement.style.display = 'none';
    zipHintElement.style.display = 'none';
    cvvHintElement.style.display = 'none';

    //The "Name" field cannot be blank or empty.
    if (checkName(nameElement.value) == false) {
        nameHintElement.style.display = 'block';
        toggleValidInValid(nameElement.parentElement,false);
        if (e.target.value == 0) {
            nameHintElement.textContent = "Name field cannot be blank";
        } else {
            nameHintElement.textContent = "Must include first and last name";
        }
        flag = false;
    }
    if (checkName(nameElement.value) == true) {
        toggleValidInValid(nameElement.parentElement,true);
    }

    //A few characters for the username, followed by "@", followed by a few more characters and a ".com" for the domain name. 
    //You don’t have to account for other top-level domains, like .org, .net, etc.
    if (checkEmail(emailElement.value) == false) {
        emailHintElement.style.display = 'block';
        toggleValidInValid(emailElement.parentElement,false);
        flag = false;
    }
    if (checkEmail(emailElement.value) == true) {
        toggleValidInValid(emailElement.parentElement,true);
    }

    //The "Register for Activities" section must have at least one activity selected.
    if (checkActivities() == true) {
        activitiesHintElement.style.display = 'block';
        toggleValidInValid(activitiesElement,false);
        flag = false;
    }
    if (checkActivities() == false) {
        toggleValidInValid(activitiesElement,true);
    }

    //The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces. 
    //The value does not need to be a real credit card number.
    if (checkCC(ccElement.value) == false) {
        ccHintElement.style.display = 'block';
        toggleValidInValid(ccElement.parentElement,false);
        flag = false;
    }
    if (checkCC(ccElement.value) == true) {
        toggleValidInValid(ccElement.parentElement,true);
    }

    //The "Zip code" field must contain a 5 digit number.
    if (checkZip(zipElement.value) == false) {
        zipHintElement.style.display = 'block';
        toggleValidInValid(zipElement.parentElement,false);
        flag = false;
    }
    if (checkZip(zipElement.value) == true) {
        toggleValidInValid(zipElement.parentElement,true);
    }

    //The "CVV" field must contain a 3 digit number.
    if(checkCVV(cvvElement.value) == false) {
        cvvHintElement.style.display = 'block';
        toggleValidInValid(cvvElement.parentElement,false);
        flag = false;
    }
    if(checkCVV(cvvElement.value) == true) {
        toggleValidInValid(cvvElement.parentElement,true);
    }
    
    flag ? form.submit() : e.preventDefault();
});

//Validate fields in real time
form.addEventListener('keyup', (e) => {
    if (e.target.name=='user-name' && (checkName(e.target.value)==false)) {
        nameHintElement.style.display = 'block';
        if (e.target.value == 0) {
            nameHintElement.textContent = "Name field cannot be blank";
        } else {
            nameHintElement.textContent = "Must include first and last name";
        }
        toggleValidInValid(nameElement.parentElement,false);
    } 
    else if (e.target.name=='user-email' && (checkEmail(e.target.value)==false)) {
        emailHintElement.style.display = 'block';
        toggleValidInValid(emailElement.parentElement,false);
    }
    else if (e.target.name=='user-cc-num' && (checkCC(e.target.value)==false)) {
        ccHintElement.style.display = 'block';
        toggleValidInValid(emailElement.parentElement,false);
    } 
    else if (e.target.name=='user-zip' && (checkZip(e.target.value)==false)) {
        zipHintElement.style.display = 'block';
        toggleValidInValid(zipElement.parentElement,false);
    } 
    else if (e.target.name=='user-cvv' && (checkCVV(e.target.value)==false)) {
        cvvHintElement.style.display = 'block';
        toggleValidInValid(cvvElement.parentElement,false);
    }  
    else {
        if (e.target.name=='user-name'|e.target.name=='user-email'|e.target.name=='user-cc-num'|e.target.name=='user-zip'|e.target.name=='user-cvv') {
            e.target.parentElement.lastElementChild.style.display = 'none';
            e.target.parentElement.classList.add('valid');
            e.target.parentElement.classList.remove('not-valid');
        }
    }
});

/**
 * Make the focus states of the activities more obvious to all users
 */
let inputElements = document.querySelectorAll('input');
for (element of inputElements) {
    element.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });
    element.addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    });
}

