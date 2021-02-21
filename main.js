//OOP model &DOM html

const ticTacToeGame = new TicTacToeGame();
var humanPlayerSymbol;
ticTacToeGame.start();
 //(triger start function) start function is a property of constructor

//Constructor
function TicTacToeGame() { 
    const board = new Board();
    const humanPlayer = new HumanPlayer(board);
    const computerPlayer = new ComputerPlayer(board);
    let turn = 0;

    this.start = function() { //create start property 
        const config = { childList: true }; //By setting childList to true, your callback will be invoked any time nodes are added to or removed from the DOM node or nodes being watched.
        const observer = new MutationObserver(() => takeTurn()); 
        //MutationObserver is a built-in object that observes a DOM element and fires a callback when it detects a change. (takeTurn() is a callback function)
        board.positions.forEach((el) => observer.observe(el, config));
        //forEach() method executes a provided function once for each array element. It returns undefined and dosn't mutate the array.
        //we use observe method of MutationObserver on each element of the array (positions is a function that returns an array).
        //target:el. When the config option detected a node changed, the callback function is triggered.   
        takeTurn(); //Because the first person need to take turn.  
        board.reset(); 
    } 
    
    function takeTurn() { //takeTurn is a function here
        if (board.checkForWinner()) {  //we don't want anybody to take turn if someone has already won.
            turn = 0;                       
            return;
        }
        else if(turn ===9) { //we don't want anybody to take turn if there's a tie
            turn = 0;
            return;
        }
        else if (turn %2 ===0) {  //humanPlayer turn on even number
            humanPlayer.takeTurn();  //takeTurn is property here
        } else {
            computerPlayer.takeTurn();
        }
        turn++; //keep moving on.
    }
}    

//Game Board
function Board() { //create constructor
    this.positions = Array.from(document.querySelectorAll(".col"));
    const positions = this.positions;
    //The querySelectorAll() method returns all elements in the document that matches a selector(s), as a static NodeList object.
    //The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    this.resetButton = Array.from(document.querySelectorAll(".reset"));
    
    //0 1 2
    //3 4 5
    //6 7 8
    
    this.checkForWinner = function() {
        let winner = false;  //No one wins in the beginning
        const winningCombinations = [ 
            [0, 1, 2], 
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];

        winningCombinations.forEach( winningCombo => {  
            //here we use a forloop to use the numbers in each of the subarray. Then assign the numbers to the index of positions. In this case, we can get the innerText of each position/node and compare to see if they had same text (all 'O' or all 'X').   
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;
            if (pos0InnerText !== '' && 
            pos0InnerText === pos1InnerText &&
            pos1InnerText === pos2InnerText) {
                winner = true;
                winningCombo.forEach((index) => {
                positions[index].style.color ="purple";
            })}
        });
        return winner;
    }

    //create a function to check if tie     
    this.reset = function() {
        this.resetButton[0].addEventListener("click", boardReset);
    }
    function boardReset() {
        positions.forEach(el => el.innerText = '');
        positions.forEach(el => el.style.color = "black");
    }
}

//DESIGN GAME PLAYERS ACTION
function HumanPlayer(board) { //create constructor & players action based on board
    this.takeTurn = function() {   
        let availablePositions = board.positions.filter(p => p.innerText==="");
        console.log(availablePositions)
        availablePositions
            .forEach(el => el.addEventListener("click", handleTurnTaken));     
            //(turn on)addEventListener to listen the click action. Whenerver a position is clicked, it will call the handleTurnTaken function.       
    }

    function handleTurnTaken(event) {
        if (humanPlayerSymbol==='X'){
            event.target.innerText ='X'; //set the text content to "X" to the clicked node
        }
        else if (humanPlayerSymbol==='O'){
            event.target.innerText ='O';
        } 
        board.positions
            .forEach(el => el.removeEventListener('click', handleTurnTaken));
        //(turn off)the eventlistener so that when humanPlayer continue to click, it stops setting text 'X' to the new node.       
    }
}

function ComputerPlayer(board) { //create constructor
    this.takeTurn =function() {
        let availablePositions = board.positions.filter(p => p.innerText==="");
        //An array that contains all available positions (empty nodes) 
        const move = Math.floor(Math.random() * availablePositions.length);
        //move will be 0 to the length of availablePositions(random integer).
        if (humanPlayerSymbol==='X') {
            availablePositions[move].innerText = "O";  
        }
        else if (humanPlayerSymbol==='O') {
            availablePositions[move].innerText = "X";
        }
        //randomly set the text content to "O" to an available node.
    } 
}
 
function style1() {
    document.getElementsByClassName("game-starter")[0].style.zIndex = "-1";
}
function style2() {
    document.getElementsByClassName("game-starter")[0].style.zIndex = "0";
}
function symbolX() {
    humanPlayerSymbol ="X";
}
function symbolO() {
    humanPlayerSymbol ="O";
}
