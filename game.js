const gameContainer = document.querySelector('#game');
const cell = document.createElement('div');
const textNode = document.createTextNode('Hell, world');
//cell.textContent = 'Hello World';
cell.appendChild(textNode);
gameContainer.appendChild(cell);

/*console.log(typeof onClick);
console.log(typeof onClick2);*/

let onClick = function onClick() {
    cell.textContent = 'Clicked';
};


cell.addEventListener('click', onClick);
    
/*}
const onClick2 = function() {
    cell.textContent = 'Clicked';
}*/

/*console.log(function() {
    cell.textContent = 'Clicked';
}.name.length);*/

/*cell.addEventListener('click', function() {
    cell.textContent = 'Clicked';
})*/