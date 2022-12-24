async function post() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var text = document.getElementById('text').value;
    location.href ='/comment?{"username": "' + name + '", "email": "' + email + '", "text": "' + text + '"}';
}