const gameField = document.getElementById("game-field");
const gameStart = document.getElementById("start-game");
const message = document.getElementById('victory');
const bombsNumber = 1;

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

const bombCount = (square) => {
    let bombs = 0
    let lastCells = levelSelect();
    leftCells = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91]
    rightCells = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    //cell top left
     if (leftCells.includes(parseInt(square.id))) {
        bombsNext = [-10, -9, 10, 11, 1];
        bombsNext.forEach(element => {
            sum = element + parseInt(square.id)
            if (bombsArray.includes(sum)) {
                bombs++
            }
        });
        return bombs
    } else if (rightCells.includes(parseInt(square.id))) {
        bombsNext = [-10, -11, 10, 9, -1];
        bombsNext.forEach(element => {
            sum = element + parseInt(square.id)
            if (bombsArray.includes(sum)) {
                bombs++
            }
        });
        return bombs
    } else {
        bombsNext = [-10, -11, -9, 10, 9, 11, 1, -1];
        bombsNext.forEach(element => {
            sum = element + parseInt(square.id)
            if (bombsArray.includes(sum)) {
                bombs++
            }
        });
        return bombs        
    }

    //all other cases
    
    
}

const squareClick = (square) => {
    let clickedSquare = parseInt(square.id)

    if (!bombsArray.includes(clickedSquare)) {

        square.classList.add('safe')

        !clickedCells.includes(clickedSquare) && clickedCells.push(clickedSquare);

        square.innerHTML = bombCount(square)
        points.innerHTML = clickedCells.length;
    } else {
        canPLay = false
        square.innerHTML = "bomb";
        gameStart.innerHTML = "&#128531"
        bombsArray.forEach((element, i) => {
            let bombSquare = document.getElementById(bombsArray[i])
            bombSquare.classList.add('red')
            bombSquare.innerHTML = "&#10036;"
            message.innerHTML = `you made ${clickedCells.length} points`
        });
    }
    if (clickedCells.length === parseInt(levelSelect()) - bombsNumber) {
        message.innerHTML = 'Victory!'
        gameStart.innerHTML = "&#128526"

    };
}

const bombsGenerator = () => {
    while (bombsArray.length < bombsNumber) {
        let bomb = Math.floor(Math.random() * (levelSelect() - 1 + 1)) + 1;
        !bombsArray.includes(bomb) && bombsArray.push(bomb)
    }
    console.log(bombsArray);
}

gameStart.addEventListener('click', () => {
    message.innerHTML = 'Let me see what you got!'
    gameStart.innerHTML = "&#128512"
    gameField.innerHTML = "";
    points.innerHTML = "0"
    canPLay = true
    clickedCells = [];
    bombsArray = [];
    GenerateField();
    bombsGenerator();
})