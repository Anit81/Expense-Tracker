let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateList() {
  const list = document.getElementById("list");
  const balance = document.getElementById("balance");
  list.innerHTML = "";

  let total = 0;

  transactions.forEach((tran, index) => {
    const sign = tran.amount < 0 ? "-" : "+";
    const li = document.createElement("li");
    li.innerHTML = `
      ${tran.text} <span>${sign}₦${Math.abs(tran.amount)}</span>
      <button onclick="deleteTransaction(${index})">x</button>
    `;
    list.appendChild(li);
    total += tran.amount;
  });

  balance.innerText = total;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = Number(document.getElementById("amount").value);

  if (!text || !amount) return alert("Please fill all fields");

  transactions.push({ text, amount });
  updateList();
  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateList();
}

updateList();