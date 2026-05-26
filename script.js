const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let drop_downs =
document.querySelectorAll(".dropdown select");

let btn =
document.querySelector("form button");

let fromCurr =
document.querySelector(".from select");

let toCurr =
document.querySelector(".to select");

let msg =
document.querySelector(".msg");


// DROPDOWNS
for (const select of drop_downs) {

    for (const currCode in countryList) {

        let newOption =
        document.createElement("option");

        newOption.innerText = currCode;

        newOption.value = currCode;

        // DEFAULT VALUES
        if (
            select.name === "from" &&
            currCode === "USD"
        ) {
            newOption.selected = "selected";
        }

        else if (
            select.name === "to" &&
            currCode === "PKR"
        ) {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    // FLAGS UPDATE
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

    updateFlag(select);
}


// FLAG FUNCTION
function updateFlag(element) {

    let currCode = element.value;

    let countryCode =
    countryList[currCode];

    let img =
    element.parentElement.querySelector("img");

    img.src =
    `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
};


// BUTTON CLICK
btn.addEventListener("click", async (evt) => {

    evt.preventDefault();

    let amount =
    document.querySelector(".amount input");

    let amtVal = amount.value;

    // VALIDATION
    if (amtVal === "" || amtVal < 1) {

        amtVal = 1;

        amount.value = "1";
    }

    // API URL
    const URL =
    `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response =
    await fetch(URL);

    let data =
    await response.json();

    // RATE
    let rate =
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    // FINAL AMOUNT
    let finalAmount =
    (amtVal * rate).toFixed(2);

    // SHOW RESULT
    msg.innerText =
    `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});