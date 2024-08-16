let counter = 0;

document.getElementById('incrementButton').addEventListener('click', () => {
    counter++;
    document.getElementById('counter').innerText = counter;
});
