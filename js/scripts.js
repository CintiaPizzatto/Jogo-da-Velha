let x = document.querySelector('.x'); /* x = <div class="x">X</div>  
aqui eu pego a linha do código que tem a classe=.x    */

let o = document.querySelector('.o'); /* o = <div class="o"></div> 
aqui eu pego a linha do código que tem a classe=.o    
aqui tenho os dois elementos que serão inseridos no jogo */

let boxes = document.querySelectorAll('.box'); /* 
boxes[0]= <div class="box" id="block-1"></div> 
querySelectorAll retorna uma Nodelist. 
Todos os boxes ficarão na variável boxes, 
aqui tenho todos os boxes que serão usados no jogo */

let buttons = document.querySelectorAll('#buttons-container button'); /* 
buttons[0] = <button id="2-players">2 Jogadores </button>
buttons[1] = <button id="1-player">1 Jogador</button>
todos os botões ficarão na variável buttons
estou usando o elemento button da div que tem o id=#buttons-container */

let messageContainer = document.querySelector("#message");
/* messageContainer = <div id="message" class="hide"> <p>O vencedor é:</p> </div> 
aqui eu pego todas as linhas de código da div com id=#message     */

let messageText = document.querySelector("#message p"); 
/* messageText = <p>O vencedor é:</p> 
aqui eu pego somente o elemento <p> da div com id=#message     */

let secondPlayer; /* variável que vai definir se o jogo é single ou multiplayer */

// contador de jogadas para saber se é o X ou o 0 que está jogando
let player1 = 0;
let player2 = 0;

/* primeiro precisamos adicionar um evento de click(listener) a todos os boxes, pois são eles que vão adicionar os símbolos
vamos usar um loop for para adicionar o evento de click a todos os boxes. quando alguém clica na caixa. el é uma variável que sempre vai mudar 
el = x; este é o elemento que vamos usar para ser inserido na grade
adicionando o evento de click a todos as caixas */
console.log("antes do for" );
for(let i = 0; i < boxes.length; i++) {
  // quando há o click na caixa
  console.log("i = " + i);
  boxes[i].addEventListener("click", function() {
    let el = checkEl(player1, player2); /* aqui vamos chamar a função que vai verificar quem vai jogar (X ou O) e vai retornar o elemento que vai ser inserido na grade
    el será: <div class="x">X</div> ou <div class="o"></div>
    Vamos ver se este cara da iteração (this) tem algum nó filho (X ou 0),
    o nó filho será: <div class="x">X</div> ou <div class="o"></div> 
    se boxes[i] TIVER     nó filho, então o length será DIFERENTE de 0 e NÃO VAI ENTRAR aqui no if. Isso significa que o usuário JÁ CLICOU neste box em questão (this)
    se boxes[i] NÃO TIVER nó filho, então o length será IGUAL a 0      e VAI ENTRAR aqui no if. Isso significa que o usuário ainda NÃO CLICOU neste box em questão (this). Como o box está vazio, vamos adicionar o elemento X ou O */
    if(this.childNodes.length == 0) { /* se o filho do this for igual a 0, então o filho não existe, o box está vazio, então vamos inserir o elemento X ou O */
      let cloneEl = el.cloneNode(true);
      this.appendChild(cloneEl); // aqui eu crio uma linha no HTML. Adicionando um elemento dentro da caixa. Vamos criar um filho com o clone que foi definido na lógica acima
      // depois deste comando "this.appendChild(cloneEl)" foi colocado o X (elemento el) na tela
      if(player1 == player2) {
        player1++; // se o player1 for igual ao player2, então o player1 vai jogar, então o player1 vai ser incrementado, e agora será colocado na tela o X
        if(secondPlayer == "ai-player") { // se o jogo for single player, então o player2 vai ser a IA
          // vamos criar uma função para a IA jogar
          iaPlay(); // aqui eu chamo a função que vai fazer a IA jogar
          player2++; // aqui eu incremento o player2, pois a IA vai jogar
        }
      } else {
        player2++; /* se o player1 for diferente do player2, então o player2 vai jogar, então o player2 vai ser incrementado, e agora será colocado na tela o O */
      }
      checkWinCondition(); // sempre que insere um "el" na tela, chamamos a função que vai verificar se alguém ganhou
    }
  });
  console.log("dentro do for" );
}

// vamos separar as funções para deixar o código mais limpo
// evento para saber se é 2 players ou IA
// buttons foi declarada lá em cima
for(let i =0; i<buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    secondPlayer = this.getAttribute("id"); // aqui eu pego o id do botão que foi clicado
    for(let j = 0; j < buttons.length; j++) {
      buttons[j].style.display = "none"; // aqui eu escondo os botões
    }
    setTimeout(function() {
      let container = document.querySelector("#container");
      container.classList.remove("hide"); // aqui eu removo a classe hide do container
      let buttonsContainer = document.querySelector("#buttons-container");
      buttonsContainer.classList.add("hide"); // aqui eu adiciono a classe hide no buttons-container
    }, 500);
  });
}

function iaPlay() { 
  let cloneO = o.cloneNode(true); // aqui eu crio o elemento O
  let counter = 0; // contador para saber se o jogo acabou
  let filled = 0; // contador para saber se o jogo acabou
  for(let i = 0; i < boxes.length; i++) { // vamos percorrer todos os boxes
    let randomNumber = Math.floor(Math.random() * 5); // aqui eu gero um número aleatório de 0 a 4
    if(boxes[i].childNodes[0] == undefined) { // se o filho do box[i] for igual a undefined, então o filho não existe, o box está vazio
      if(randomNumber <= 1) { // se o número aleatório for menor ou igual a 1, então vamos inserir o elemento O
        boxes[i].appendChild(cloneO); // aqui eu crio uma linha no HTML. Adicionando um elemento dentro da caixa. Vamos criar um filho com o clone que foi definido na lógica acima
        break; // aqui eu paro o loop, pois já inseri o elemento O
      } else { // se o número aleatório for maior que 1, então vamos incrementar o contador
        counter++; // aqui eu incremento o contador
      }
    } else { // se o filho do box[i] for diferente de undefined, então o filho existe, o box está cheio
      filled++; // aqui eu incremento o contador
      counter++; // aqui eu incremento o contador
    }
  }
  if(counter == 9 && filled != 9) { // se o contador for igual a 9 e o contador de caixas cheias for diferente de 9, então o jogo acabou e ninguém ganhou
    messageText.innerHTML = "Deu velha!"; // aqui eu coloco a mensagem de empate na tela
    messageContainer.classList.remove("hide"); // aqui eu removo a classe hide da div com id=#message
  }
}

// vamos criar uma função para ver quem vai jogar (X ou O)
function checkEl(player1, player2) {
  if(player1 == player2) {
    el = x; 
  } else {
    el = o;
  }
  return el;
};

// vamos criar uma função para checar quem venceu e quem perdeu após cada jogada
// existem 8 possibilidades de vitória
// vamos criar um array para cada uma delas
// vamos criar uma função para checar se o jogador ganhou
// vamos criar uma função para checar se o jogo empatou
// vamos criar uma função para reiniciar o jogo
// vamos criar uma função para checar se o jogo acabou
function checkWinCondition() {
  // vamos pegar o que foi digitado no input de cada bloco
  let b1 = document.getElementById('block-1'); //pode usar o querySelector também
  let b2 = document.getElementById('block-2');
  let b3 = document.getElementById('block-3');
  let b4 = document.getElementById('block-4');
  let b5 = document.getElementById('block-5');
  let b6 = document.getElementById('block-6');
  let b7 = document.getElementById('block-7');
  let b8 = document.getElementById('block-8');
  let b9 = document.getElementById('block-9');

  // vamos conferir todas as linhas horizontais
  // primeiro vamos conferir se o bloco 1, 2 e 3 tem elemento filho (b1.childNodes.length > 0)
  if(b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {
    // agora que vimos que toda a 1ª linha tem X ou O, vamos descobrir o que tem em cada box. Podemos fazer isso conferindo a classe de cada box. Pois, quando inserimos o código com X, colocamos a classe .x, e quando inserimos o código com O, colocamos a classe .o 
    // Nós inserimos um X no box, então o box tem a classe .x
    // Mas quando inserimos o O no box, não inserimos nenhum código, apenas colocamos a classe .o. Por isso que não podemos usar o innerHTML, pois ele retorna o código que foi inserido no box, e não a classe que foi inserida no box
    // vamos pegar a classe de cada box
    let b1Child = b1.childNodes[0].className;
    let b2Child = b2.childNodes[0].className;
    let b3Child = b3.childNodes[0].className;
    
    // vamos conferir se o bloco 1, 2 e 3 tem o mesmo elemento filho
    // Caso o bloco 1 tenha a classe .x, o bloco 2 tenha a classe .x e o bloco 3 tenha a classe .x, então o jogador X venceu
    if(b1Child == 'x' && b2Child == 'x' && b3Child == 'x') {
      // X venceu
      declareWinner('x');
    } else if(b1Child == 'o' && b2Child == 'o' && b3Child == 'o') {
      // O venceu
      declareWinner('o');
    }
  } // fim da verificação da linha 1

  if(b4.childNodes.length > 0 && b5.childNodes.length > 0 && b6.childNodes.length > 0) {

    let b4Child = b4.childNodes[0].className;
    let b5Child = b5.childNodes[0].className;
    let b6Child = b6.childNodes[0].className;
    
    if(b4Child == 'x' && b5Child == 'x' && b6Child == 'x') {
      declareWinner('x');
    } else if(b4Child == 'o' && b5Child == 'o' && b6Child == 'o') {
      declareWinner('o');
    }
  } // fim da verificação da linha 2

  if(b7.childNodes.length > 0 && b8.childNodes.length > 0 && b9.childNodes.length > 0) {

    let b7Child = b7.childNodes[0].className;
    let b8Child = b8.childNodes[0].className;
    let b9Child = b9.childNodes[0].className;
    
    if(b7Child == 'x' && b8Child == 'x' && b9Child == 'x') {
      declareWinner('x');
    } else if(b7Child == 'o' && b8Child == 'o' && b9Child == 'o') {
      declareWinner('o');
    }
  } // fim da verificação da linha 3

  if(b1.childNodes.length > 0 && b4.childNodes.length > 0 && b7.childNodes.length > 0) {

    let b1Child = b1.childNodes[0].className;
    let b4Child = b4.childNodes[0].className;
    let b7Child = b7.childNodes[0].className;
    
    if(b1Child == 'x' && b4Child == 'x' && b7Child == 'x') {
      declareWinner('x');
    } else if(b1Child == 'o' && b4Child == 'o' && b7Child == 'o') {
      declareWinner('o');
    }
  } // fim da verificação da coluna 1

  if(b2.childNodes.length > 0 && b5.childNodes.length > 0 && b8.childNodes.length > 0) {

    let b2Child = b2.childNodes[0].className;
    let b5Child = b5.childNodes[0].className;
    let b8Child = b8.childNodes[0].className;
    
    if(b2Child == 'x' && b5Child == 'x' && b8Child == 'x') {
      declareWinner('x');
    } else if(b2Child == 'o' && b5Child == 'o' && b8Child == 'o') {
      declareWinner('o');
    }
  } // fim da verificação da coluna 2

  if(b3.childNodes.length > 0 && b6.childNodes.length > 0 && b9.childNodes.length > 0) {

    let b3Child = b3.childNodes[0].className;
    let b6Child = b6.childNodes[0].className;
    let b9Child = b9.childNodes[0].className;
    
    if(b3Child == 'x' && b6Child == 'x' && b9Child == 'x') {
      declareWinner('x');
    } else if(b3Child == 'o' && b6Child == 'o' && b9Child == 'o') {
      declareWinner('o');
    }
  } // fim da verificação da coluna 3
  
  if(b1.childNodes.length > 0 && b5.childNodes.length > 0 && b9.childNodes.length > 0) {

    let b1Child = b1.childNodes[0].className;
    let b5Child = b5.childNodes[0].className;
    let b9Child = b9.childNodes[0].className;
    
    if(b1Child == 'x' && b5Child == 'x' && b9Child == 'x') {
      declareWinner('x');
    } else if(b1Child == 'o' && b5Child == 'o' && b9Child == 'o') {
      declareWinner('o');
    }
  } // fim da verificação da diagonal 1

  if(b3.childNodes.length > 0 && b5.childNodes.length > 0 && b7.childNodes.length > 0) {

    let b3Child = b3.childNodes[0].className;
    let b5Child = b5.childNodes[0].className;
    let b7Child = b7.childNodes[0].className;
    
    if(b3Child == 'x' && b5Child == 'x' && b7Child == 'x') {
      declareWinner('x');
    } else if(b3Child == 'o' && b5Child == 'o' && b7Child == 'o') {
      declareWinner('o');
    }
  } // fim da verificação da diagonal 2


  // se o código chegou aqui é porque nenhum jogador venceu, então é velha
  console.log('testando se deu velha');
  let counter = 0;
  // contador para saber quantas caixas estão preenchidas
  for(let i = 0; i < boxes.length; i++) {
    if(boxes[i].childNodes[0] != undefined) {
  // ou seja, se a caixa tiver um filho, ou seja, se tiver uma linha de código abaixo dela
      counter++;
    } 
  }
  if(counter == 9) {  
    // se o contador for igual a 9, então todas as caixas estão preenchidas, mas ninguém venceu, senão o código não teria chegado aqui
    declareWinner('Deu velha');
  }
}
/*
  1 - verificar se o jogador X venceu
  2 - verificar se o jogador O venceu
  3 - verificar se deu velha
*/


/* quando um dos jogadores vence, temos que:
  1 - aumentar o score dele. O HTML inicial colocou 0 no #scoreboard-1 e no scoreboard-2. Então vamos criar uma função para aumentar o score. Para pegar o valor atual de score, vamos usar o innerHTML. 
  assim: let scoreboardx = document.querySelector('#scoreboard-1');
  Para aumentar o score, vamos usar o parseInt para converter o valor de string para inteiro, e depois somar 1. 
  assim: scoreboardx.textContent = parseInt(scoreboardx.textContent) + 1;
  Depois vamos converter o valor de inteiro para string novamente, e colocar no innerHTML.
  2 - mostrar uma mensagem de quem venceu
  let msg = '';
  pode ser assim: msg = 'O jogador X venceu!';  
  primeiro precisamos mostrar a mensagem na tela
  Haviamos declarado uma variável chamada msg no início do código, vamos usar ela
  let messageText = document.querySelector("#message p"); 
  messageText = <p>O vencedor é:</p> 
  3 - parar o jogo
  vamos criar uma função para declarar o vencedor
*/
function declareWinner(winner) {
  let scoreboardx = document.querySelector('#scoreboard-1');
  let scoreboardo = document.querySelector('#scoreboard-2');
  let msg = '';

  if(winner == 'x') {
    scoreboardx.textContent = parseInt(scoreboardx.textContent) + 1;
    msg = 'O jogador 1 venceu!';
  } else if(winner == 'o')  {
    scoreboardo.textContent = parseInt(scoreboardo.textContent) + 1;
    msg = 'O jogador 2 venceu!';
  } else {
    msg = 'Deu velha!';
  }


  //exibe msg
  messageText.innerHTML = msg;
  messageContainer.classList.remove("hide");

  // esconde msg
  setTimeout(function() {
    messageContainer.classList.add("hide");
  }, 3000); // 3 segundos para esconder a msg de novo     

  // zerar o jogo
  player1 = 0;
  player2 = 0;

  // remover x e o  
  let boxesToRemove = document.querySelectorAll(".box div"); /* aqui pega todos os box que tem div, ou seja, aqueles que tem X ou O dentro do box*/ 
  for(let i = 0; i < boxesToRemove.length; i++) { 
    // acessa o pai (parentNode) do box em questão (boxesToRemove[i]), e remove o filho (removeChild)
    /* outra forma de entender é: 
    acessa o box:boxesToRemove[i]
    vai para o pai do box: .parentNode.
    agora que está no pai, remove o filho: removeChild(boxesToRemove[i]) */
    boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]); /* aqui vai remover o X ou O do box */
  }
}