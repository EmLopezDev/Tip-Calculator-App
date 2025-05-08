const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".app__card--tip-button");
const tipCustom = document.getElementById("custom-tip");
const peopleInput = document.getElementById("number-of-people");
const resetButton = document.getElementById("reset-button");
const tipPerPersonSpan = document.getElementById("tip-per-person");
const totalPerPersonSpan = document.getElementById("total-per-person");
const billErrorSpan = document.getElementById("bill-error");
const tipErrorSpan = document.getElementById("tip-error");
const peopleErrorSpan = document.getElementById("people-error");

let bill = 0;
let tip = null;
let people = 0;

const removeActiveTip = () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
};
const addAcitveTip = (evt) => {
    tipButtons.forEach((button) => {
        if (button.id === evt.target.id) {
            button.classList.add("active");
        }
    });
};

const resetCalculator = () => {
    bill = 0;
    tip = null;
    people = 0;
    billInput.value = "";
    tipCustom.value = "";
    peopleInput.value = "";
    billErrorSpan.innerHTML = "";
    peopleErrorSpan.innerHTML = "";
    tipErrorSpan.innerHTML = "";
    tipPerPersonSpan.innerHTML = "$0.00";
    totalPerPersonSpan.innerHTML = "$0.00";
    removeActiveTip();
    resetButton.setAttribute("disabled", true);
};

const formattedResults = () => {
    const tipPerPerson = (bill * tip) / people;
    const totalPerPerson = (bill * tip + bill) / people;
    const formattedTip = tipPerPerson.toFixed(2).toString();
    const formattedTotal = totalPerPerson.toFixed(2).toString();
    const values = {
        tip: formattedTip,
        total: formattedTotal,
    };

    return values;
};

const showResults = () => {
    if (!bill || tip === null || !people) {
        billErrorSpan.innerHTML = !bill ? "Can't be zero" : "";
        peopleErrorSpan.innerHTML = !people ? "Can't be zero" : "";
        tipErrorSpan.innerHTML = tip === null ? "Must enter a tip amount" : "";

        tipPerPersonSpan.innerHTML = "$0.00";
        totalPerPersonSpan.innerHTML = "$0.00";
        resetButton.setAttribute("disabled", true);
    }
    if (bill && tip !== null && people) {
        billErrorSpan.innerHTML = "";
        peopleErrorSpan.innerHTML = "";
        tipErrorSpan.innerHTML = "";
        resetButton.removeAttribute("disabled");
        const perPerson = formattedResults();

        tipPerPersonSpan.innerHTML = perPerson.tip;
        totalPerPersonSpan.innerHTML = perPerson.total;
    }
};

billInput.addEventListener("input", (e) => {
    if (e.target.value === "0") {
    } else {
        bill = Number(e.target.value);
        showResults();
    }
});

const addTip = (evt, value) => {
    removeActiveTip();
    addAcitveTip(evt);
    if (!evt.target.value) {
        tip = null;
    } else {
        tip = value;
    }
    showResults();
};

tipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        addTip(e, e.target.value);
    });
});

peopleInput.addEventListener("input", (e) => {
    people = Number(e.target.value);
    showResults();
});

tipCustom.addEventListener("input", (e) => {
    const convertedTip = Number(e.target.value) / 100;
    addTip(e, convertedTip);
});

resetButton.addEventListener("click", resetCalculator);
