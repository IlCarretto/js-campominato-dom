// **Consegna**
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// ****
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.


// Collegare il bottone Play in modo che compaia la griglia quando viene premuto
const grid = document.querySelector(".grid");
const playBtn = document.querySelector(".play-btn");


// Al click del bottone
playBtn.addEventListener("click", playGame);
let bombsArray = [];

// FUNCTIONS
// Funzione per startare il gioco
function playGame() {
    grid.innerHTML = "";
    grid.classList.add("display");

    let squareNumbers = minMaxNumber(1, 100);
    let difficultySquares = 100;
    let difficultyInput = document.getElementById("difficulties");
    const safeCells = [];

    // Creare gli square da inserire nella griglia in base alla difficoltà scelta dall'utente e creare il contatore di numeri
    if (difficultyInput.value === "medium") {
        squareNumbers = minMaxNumber(1, 81);
        difficultySquares = 81;
    } else if (difficultyInput.value === "hard") {
        squareNumbers = minMaxNumber(1, 49);
        difficultySquares = 49;
    }

    // Generare 16 numeri casuali da inserire nell'array delle bombe (in ordine casuale) non duplicati.
    bombsArray = rndBombGenerator(16, 1, difficultySquares)
    console.log(bombsArray);

    // Aggiungere il numero di celle nella griglia in base alla difficoltà scelta
    for (let i = 0; i < difficultySquares; i++) {
        let square = squareGenerator(squareNumbers[i]);
        grid.append(square);
        
        if (difficultyInput.value === "medium") {
            square.classList.add("medium");
        } else if (difficultyInput.value === "hard") {
            square.classList.add("hard");
        } else {
            square.classList.add("easy")
        }


        // Al click del quadrato
        square.addEventListener("click", handleSquareClick(i, square));
    }
    
    // FUNZIONI DEL GIOCO
    // Funzione al click dello square
    function handleSquareClick(i, square) {
        function innerFunction() {
            console.log(i, square);
            const allCells = document.getElementsByClassName("square");
            // SE l'utente ha cliccato su un numero presente nell'array delle bombe, la cella si colora di rosso e il giocatore non può più premere le celle
            if (bombsArray.includes(squareNumbers[i])) {
                alert(`You lost! in ${safeCells.length +1} tries!`);
                for (let i = 0; i < allCells.length; i++) {
                    const thisCell = allCells[i];
                    const thisCellNumber = parseInt(thisCell.textContent);
                    if (bombsArray.includes(thisCellNumber)) {
                        thisCell.classList.add("red");
                    }
                }
            } else {
            // ALTRIMENTI la cella si colora di azzurro e il gioco continua
                square.classList.add("light-blue");
                console.log(`${squareNumbers[i]}`);
                safeCells.push(squareNumbers[i]);
                if (difficultySquares - bombsArray.length === safeCells.length) {
                    alert("WOW! You won!");
                }
            }
            return i, square;
        }
        return innerFunction;
    }
}

// Funzione per creare minimo e massimo

function minMaxNumber (min, max) {
    let numbersArray = [];
    for (let i = min; i <= max; i++) {
        numbersArray.push(i);
    }
    return numbersArray;
}

// Funzione per creare squares con dentro i numeri
function squareGenerator (insideNumber) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = insideNumber;
    return square;
}

// Funzione che genera casualmente le bombe nell'array
function rndBombGenerator (totalNum, min, max) {
    resultArray = [];
    while (resultArray.length < totalNum) {
    const singleBomb = Math.floor(Math.random() * (max - min + 1) ) + min;
    if (!resultArray.includes(singleBomb)) {
        resultArray.push(singleBomb);
    }
    }
    return resultArray;
}
