let boxes = document.querySelectorAll('.box');
let resetbutton = document.getElementById('reset');

let turnO = true;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turnO){
            box.innerText = 'O';
            turnO = false;
        }
        else{
            box.innerText = 'X';
            turnO = true;
        }
        checkwin() ;
});
});
const checkwin = () => {
    for(let pattern of winpatterns){
        let [a, b, c] = pattern;
        if(boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText){
            alert(`${boxes[a].innerText} wins!`);
            boxes.forEach((box) => box.disabled = true);
            return;
        }
    }
};
resetbutton.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
    });
});

         
