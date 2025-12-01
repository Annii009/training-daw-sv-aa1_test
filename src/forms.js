

const handleFillCountry = _.debounce((ev) => {
    // only show matched events

    const node = ev.target.parentNode.getElementsByClassName('search-box')[0]
    node.style.display = 'initial'
    node.innerHTML = ''

    let inputText = ev.target.value.toLowerCase()
    console.log(`search for ${inputText}`);

    for (let country of countryList) {
        let row = document.createElement('div')
        row.innerText = country
        row.onclick = selectCountry

        node.appendChild(row)
    }
  }, 300);

//
function validateName(event) {
    const name = event.target.value
    console.log('validate name: ' + name);

    if(name.length < 8 || name == ""){
        hideElementWithClassName(event.target, 'valid-feedback')
        showElementWithClassName(event.target, 'invalid-feedback')
        return false
    }
    else{
        showElementWithClassName(event.target, 'valid-feedback')
        hideElementWithClassName(event.target, 'invalid-feedback')
        return true
    }
}

function validatePassword(event) {
    const password = event.target.value
    console.log('validate password:' + password);

    if(password.length < 8 || password == ""){
        hideElementWithClassName(event.target, 'valid-feedback')
        showElementWithClassName(event.target, 'invalid-feedback')
        return false
    }
    else{
        showElementWithClassName(event.target, 'valid-feedback')
        hideElementWithClassName(event.target, 'invalid-feedback')
        return true
    }
}

    // password should be at least 8 of length
    // should contains at least one lower letter
    // should contains at least one capital letter
    // should contains at least one number
    // otherwise, password is invalid


function validateEmail(event) {
    const email = event.target.value

    if(email.length == "" || !email.includes ("@") || email.startsWith ("@")){
        hideElementWithClassName(event.target, 'valid-feedback')
        showElementWithClassName(event.target, 'invalid-feedback')
        return true
    }
    else{
        showElementWithClassName(event.target, 'valid-feedback')
        hideElementWithClassName(event.target, 'invalid-feedback')
        return false
    }
}



// general register
function register(event) {
    // check if name is fullfiled
    // check if email is fullfiled
    // check if password is fullfiled
    // check if gender is selected
    // check if checkbox with "I confirm that all data are correct" is checked

    const confirm = event.target.value
    if (confirm.value == true){
        hideElementWithClassName(event.target, 'valid-feedback')
        showElementWithClassName(event.target, 'invalid-feedback')
        return true
    }
    else{
        showElementWithClassName(event.target, 'valid-feedback')
        hideElementWithClassName(event.target, 'invalid-feedback')
        return false
    }

    // then, send a POST to localhost:3000/register with all the data in the body as a JSON
    fetch('http://localhost:3000/', {
        method: 'POST',
        body: JSON.stringify({
            'name': 'sample'
        }),
        headers: {
            'Content-type': 'application/json'
        },
    })
    event.preventDefault();
    return false;
}

// utility functions
function showElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'initial'
}
function hideElementWithClassName(node, className) {
    node.parentNode.getElementsByClassName(className)[0].style.display = 'none'
}
function selectCountry(event) {
    console.log(event);
    document.forms[0].country.value = event.target.innerText

    const node = document.getElementsByClassName('search-box')[0]
    node.style.display = 'none'
    node.innerHTML = ''

    showElementWithClassName(event.target,'invalid-feedback')
}

function init() {
    let items = document.getElementsByClassName('valid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }
    items = document.getElementsByClassName('invalid-feedback')
    for (const item of items) {
        item.style.display = 'none'
    }

    document.getElementsByClassName('search-box')[0].style.display = 'none'
}

init()