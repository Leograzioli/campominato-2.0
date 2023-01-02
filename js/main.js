const gameField = document.getElementById("game-field");
const gameStart = document.getElementById("start-game");
const bombsNumber = 16;

let points = document.getElementById('points')
let bombsArray = [];
let clickedCells = [];
let canPLay = true;

const createSquare = () => {
    const square = document.createElement("div");
    square.classList.add('col');
    return square;
}

const GenerateField = () => {
    for (let i = 0; i < levelSelect(); i++) {
        const squares = createSquare()
        squares.setAttribute('id', (i + 1))
        gameField.append(squares)

        squares.addEventListener('click', () => {
            if (canPLay) {
                squareClick(squares);
            }
        })
    }
}

const levelSelect = () => {
    const selectedLevel = document.getElementById('game-level')
    return selectedLevel.value;
}

const squareClick = (square) => {
    let clickedSquare = parseInt(square.id)

    if (!bombsArray.includes(clickedSquare)) {

        square.classList.add('safe')

        !clickedCells.includes(clickedSquare) && clickedCells.push(clickedSquare);

        points.innerHTML = clickedCells.length;
        if(clickedCells.length === parseInt(levelSelect()) - bombsNumber) {
            gameStart.innerHTML = "&#128526"
        };
    } else {
        canPLay = false
        square.innerHTML = "bomb";
        gameStart.innerHTML = "&#128531"
        bombsArray.forEach((element, i) => {
            let bombSquare = document.getElementById(bombsArray[i])
            bombSquare.classList.add('red')
            bombSquare.innerHTML = "&#10036;"
        });
    }
}

const bombsGenerator = () => {
    while (bombsArray.length < bombsNumber) {
        let bomb = Math.floor(Math.random() * (levelSelect() - 1 + 1)) + 1;
        !bombsArray.includes(bomb) && bombsArray.push(bomb)
    }
    console.log(bombsArray);
}

gameStart.addEventListener('click', () => {

    gameStart.innerHTML = "&#128512"
    gameField.innerHTML = "";
    points.innerHTML = "0"
    canPLay = true
    clickedCells = [];
    bombsArray = [];
    GenerateField();
    bombsGenerator();
})