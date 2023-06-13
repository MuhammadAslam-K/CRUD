function validation() {
    alert("error")
    let email = document.getElementById("loginEmail").value;
    console.log(email);
    let password = document.getElementById("loginPassword").value;
    console.log(password);
    let passwordError = document.getElementById("loginPasswordError");

    if (password.length < 8) {
        passwordError.innerHTML = "The password must contain at least 8 characters";
        return;
    }
}
