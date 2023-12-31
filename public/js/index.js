const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e)
{
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) 
    {
        alert("Ops! Parece que alguém errou o usuário ou a senha.");
        return;
    }

    if (account)
    {
        if(account.password !== password)
        {
            alert("Ops! Parece que alguém errou o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html"
    }
});

//criar conta
document.getElementById("create-form").addEventListener("submit", function(e)
{
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5)
    {
        alert("Insira um e-mail válido!")
        return;
    }

    if(password.length < 4)
    {
        alert("Crie uma senha com no mínimo 4 digitos.")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Sua conta foi criada com sucesso! :D")
});

function checkLogged() 
{
    if(session)
    {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged)
    {
        saveSession(logged, session);

        window.location.href = "home.html"
    }
}

function saveAccount (data)
{
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data,saveSession)
{
    if(saveSession)
    {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key)
{
    const account = localStorage.getItem(key);

    if(account)
    {
        return JSON.parse(account);
    }

    return "";
}
