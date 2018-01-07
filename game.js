/*const gameContainer = document.querySelector('#game');
const cell = document.createElement('div');
const textNode = document.createTextNode('Hell, world');
cell.appendChild(textNode);
gameContainer.appendChild(cell);

let onClick = function onClick() {
    cell.textContent = 'Clicked';
};

cell.addEventListener('click', onClick);*/
'use strict';

class Component {
    getElement() {
        return this._element;
    }
}

class CellComponent extends Component {
    constructor({
        handleCellClick,
        location
    }) {
        super(); //wywołuje konstruktor bazowy
        this._state = 'unknown';
        this._element = document.createElement('td');
        const self = this;
        this._element.addEventListener('click', function () {
            handleCellClick({
                location
            });
        });
        this._refresh();
    }

    setState(stateName) {
        this._state = stateName;
        this._refresh();
    }

    _refresh() {
        this._element.textContent = this._state;
        this._element.className = 'cell_' + this._state;
    }
}

class BoardComponent extends Component {
constructor({
        handleCellClick,
        size = 8
    }) {
        super();
        this._cells = {};
        //Create _element, create child cells, append to our element 
        this._element = document.createElement('table');
        for (let rowNumber = 0; rowNumber < size; rowNumber += 1) {
            const rowElement = document.createElement('tr');
            for (let columnNumber = 0; columnNumber < size; columnNumber += 1) {
                const cell = new CellComponent({
                    handleCellClick,
                    location: {
                        row: rowNumber,
                        column: columnNumber
                    }
                });
                rowElement.appendChild(cell.getElement());
                //Also saver a reference to the call so that it can
                //be addressed later
                this._cells[`${rowNumber}x${columnNumber}`] = cell;
            }
            this._element.appendChild(rowElement);
        }
    }

    setCellState(location, state) {
        // Find the appropriate cell, call its setState().
        const key = `${location.row}x${location.column}`;
        this._cells[key].setState(state);

    }
}

class GameController {
    constructor(model) {
        this._model = model;
    }

    handleCellClick({
        location
    }) {
        this._model.fireAt(location);
    }
}


// ### Models ###
class CellModel {
    constructor({hasShip}) {
        this._hasShip = hasShip;
        this._firedAt = false;
    }
    
    fire() {
        //Guard clause
       if (this._firedAt) {
           return undefined;
       } 
        this._firedAt = true;
        //console.log(this);
        return (this._hasShip ? 'hit' : 'miss');
    }
}

class BoardModel {
    constructor({size = 8} = {}) {
        this._cells = {}; //pusty obiekt - bez właściwości
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this._cells[`${i}x${j}`] = new CellModel({hasShip: false});
            }
        }
    }
    fireAt(location) {
        const target = this._cells[`${location.row}x${location.column}`];
        const firingResult = target.fire();
        //TODO: Deliver the changes to the view!
    }
}

let myController;

function handleCellClick(...args) { //to 'args' po wielokropku możemy nazwać jak chcemy
    myController.handleCellClick.apply(myController, args);
}


const boardView = new BoardComponent({ handleCellClick, location: 0});
const boardModel = new BoardModel() 


myController = new GameController(boardModel);
const boardContainer = document.getElementById('boardContainer');
boardContainer.appendChild(boardView.getElement());
