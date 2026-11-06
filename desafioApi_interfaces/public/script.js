const loginForm = document.getElementById('loginForm');
const mensagem = document.getElementById('mensagem');
const resultado = document.getElementById('resultado');
const tokenCampo = document.getElementById('token');
const btnLogin = document.getElementById('btnLogin');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    mensagem.textContent = '';
    mensagem.className = '';
    resultado.classList.add('hidden');

    btnLogin.disabled = true;
    btnLogin.textContent = 'Autenticando...';

    try {
        const resposta = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem);
        }

        sessionStorage.setItem('access_token', dados.access_token);

        mensagem.textContent = dados.mensagem;
        mensagem.className = 'sucesso';

        tokenCampo.value = dados.access_token;

        resultado.classList.remove('hidden');

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.className = 'erro';

    } finally {
        btnLogin.disabled = false;
        btnLogin.textContent = 'Entrar';
    }
});

document.getElementById('copiarToken').addEventListener('click', async () => {
    const token = sessionStorage.getItem('access_token');

    if (token) {
        await navigator.clipboard.writeText(token);
        alert('Token copiado!');
    }
});