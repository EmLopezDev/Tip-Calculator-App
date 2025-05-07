const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".app__card--tip-button");
const tipCustom = document.getElementById("custom-tip");
const peopleInput = document.getElementById("number-of-people");
const resetButton = document.getElementById("reset-button");
let bill = 0;
let tip = 0;
let people = 0;

const calculateResults = () => {
    console.log(bill);
    console.log(tip);
    console.log(people);
    if (bill && tip && people) {
        console.log((bill * tip + bill) / people);
    }
};

billInput.addEventListener("input", (e) => {
    bill = Number(e.target.value);
    calculateResults();
});

const addTip = (e) => {
    tip = Number(e.target.value);
    calculateResults();
};

tipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        addTip(e);
    });
});

peopleInput.addEventListener("input", (e) => {
    people = Number(e.target.value);
    calculateResults();
});

tipCustom.addEventListener("input", (e) => {
    const convertedTip = e.target.value / 100;
    tip = convertedTip;
    calculateResults();
});
