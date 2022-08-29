let usuario;
let texto;
let destinatario;
let tipo;
let entrada;
let saida;
let mensagens
let id1;
let id2;

const hora = new Date().toLocaleTimeString();
const chat = document.querySelector('ul');

function processarCarregamento(resposta) {
    console.log('Deu certo');
    console.log(resposta.data);
    mensagens = resposta.data;

    for (let i = 0; i < 4; i++){
        let item = `
    <li class = "${mensagens[i].type}">
        <h1>(${mensagens[i].time})  <strong>${mensagens[i].from}</strong>  ${mensagens[i].text}</h1>
    </li>`;

    chat.innerHTML = chat.innerHTML + item;
    }
}

function processarErro(erro){
    console.log('Deu errado');
    console.log(erro.response);
}

function online(resposta){
    console.log(resposta.data);
}

function saiu(erro){
    console.log(erro.response);
}

function conectado(){
    const dado = {name: usuario}
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dado);

    requisicao.then(online);
    requisicao.catch(saiu);
}

function carregarchat(){

    const corpo = document.querySelector('.conteiner');
    const telainicial = document.querySelector('main');
    telainicial.classList.add('inativo');
    corpo.classList.remove('inativo');

    entrada = `
    <li class = "sistema">
        <h1>(${hora})  <strong>${usuario}</strong>  entra na sala...</h1>
    </li>`;

    chat.innerHTML = chat.innerHTML + entrada;
    id1 = setInterval(conectado, 5000);
    id2 = setInterval(recarregarchat, 3000);
    
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(processarCarregamento);
    promessa.catch(processarErro)
}

function digitenovonome(erro){
    alert('Já existe um usuário com esse nome, digite outro nome que possamos identificar você.');
    document.location.reload(true);
}

function entrar(){
    const nome = document.querySelector('input').value;

    if (nome.length !== 0){

    usuario = nome;
    const dado = {name: usuario};
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', dado);

    requisicao.then(carregarchat);
    requisicao.catch(digitenovonome);

    }else{

        alert("Digite um nome vállido");

    }
}

function abrirFecharMenu(){
    const menu = document.querySelector('nav');
    menu.classList.toggle('inativo');
}

function carregarMensagem(seilaoque){
    let item = `
    <li class = "${tipo}">
        <h1>(${hora})  <strong>${usuario}</strong>  ${texto}</h1>
    </li>`;

    const novasmensagens = document.querySelector('.conteiner ul li');
    novasmensagens.scrollIntoView();

    chat.innerHTML = chat.innerHTML + item;
}

function enviar(){
    texto = document.querySelector('.escreva input').value;
    destinatario = "Todos";
    tipo = "message";

    const dados = {
        from: usuario,
        to: destinatario,
        text: texto,
        type: tipo,
    };

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', dados);

    requisicao.then(carregarMensagem);
    requisicao.catch(processarErro);
}

function recarregarchat(){
    
    for (let i = 0; i < 4; i++){
        let item = `
    <li class = "${mensagens[i].type}">
        <h1>(${mensagens[i].time})  <strong>${mensagens[i].from}</strong>  ${mensagens[i].text}</h1>
    </li>`;

    chat.innerHTML = chat.innerHTML + item;
    }
}