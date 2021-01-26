// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCOSwTecV8DHmsYQjMs3kX1ovMBHgCcRpg",
    authDomain: "portafolio-7d532.firebaseapp.com",
    projectId: "portafolio-7d532",
    storageBucket: "portafolio-7d532.appspot.com",
    messagingSenderId: "789412725945",
    appId: "1:789412725945:web:9be74ee4f139bdca694768"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Reference contactInfo Collections

let contactInfo = firebase.database().ref("infos")



// Listen for a submit

document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    //Get input variables

    let name = document.querySelector(".name_contact").value.trim()
    let email = document.querySelector(".email").value.trim()
    let message = document.querySelector(".message").value.trim()
    
    let x = document.getElementById("DivErrror__Email")
    let y = document.getElementById("DivErrror__Name")
    let z = document.getElementById("DivErrror__Message")
    let k = document.getElementById("Succses")
    let j = document.getElementById("notSuccses")

   

    if(validateEmail(email) && validateName(email) && validateMessage(message)){

        x.style.display ="none"
        y.style.display ="none"
        z.style.display ="none"
        k.style.display ="block"


        // Save Copy on FireBase
        saveContactInfo(name, email, message)

        const serviceID = 'default_service';
        const templateID = 'template_mrr7og8';
        const userID = 'user_KM6HPNOEGEmv3NUw5IVs6';

        emailjs.sendForm(serviceID, templateID, e.target, userID)


        .then(() => {
            setTimeout(() => { k.style.display ="none" }, 800);
            k.style.display ="none"
        }, (err) => {
            console.log(err)
            k.style.display ="block"
        });

        document.querySelector(".name_contact").value = ""
        document.querySelector(".email").value = ""
        document.querySelector(".message").value = ""

    }
    else{
        if(!validateEmail(email)){
            x.style.display = "block"
        }
        else{
            x.style.display = "none"
        }
        if(!validateName(name)){
            y.style.display = "block"
        }
        else{
            y.style.display = "none"
        }
        if(!validateMessage(message)){
            z.style.display = "block"
        }
        else{
            z.style.display = "none"
        }    
            
    }
}
// Send Email Info
function validateEmail(email) {
    if(email === ""){
        return false
    }
    let er = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|co)")
    return er.test(email)
}

function validateName(name) {
    if(name === ""){
        return false
    }else{
        return true   
    }
}
function validateMessage(message) {
    if(message === ""){
        return false
    }else{
        return true   
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// Save info in FireBase

function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push()

    newContactInfo.set({
        "userName": name,
        "userEmail": email,
        "userMessage": message,
    })
}