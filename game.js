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

class Component{
    getElement() { 
        return this._element;
    }
}

class CellComponent extends Component {
    constructor() {
        super(); //wywołuje konstruktor bazowy
        this._state = 'unknown';
        this._element = document.createElement('td');
        const self = this;
        this._element.addEventListener('click', function() {
            this.setState('miss');
        }.bind(this));
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

const myCell = new CellComponent();
document.getElementById('cellContainer').appendChild(myCell.getElement());