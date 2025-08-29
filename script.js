const menu = [

    { name: "Burger", price: 5.99 },

    { name: "Pizza", price: 8.99 },

    { name: "Pasta", price: 7.49 },

    { name: "Salad", price: 4.99 },

    { name: "Soda", price: 1.99 }

];

let order = [];

// Ensure DOM is fully loaded before attaching event listeners

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("addButton").addEventListener("click", addItem);

    document.getElementById("generateReceiptButton").addEventListener("click", generateReceipt);

});

function addItem() {

    const itemIndex = document.getElementById('item').value;

    const quantity = parseInt(document.getElementById('quantity').value);

    if (quantity <= 0 || isNaN(quantity)) {

        alert("Please enter a valid quantity!");

        return;

    }

    const item = menu[itemIndex];

    order.push({ name: item.name, price: item.price, quantity: quantity });

    displayOrder();

}

function displayOrder() {

    const orderList = document.getElementById('order-list');

    orderList.innerHTML = "";

    order.forEach((item, index) => {

        const listItem = document.createElement('li');

        listItem.innerHTML = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}

        <button onclick="editItem(${index})">Edit</button>

        <button onclick="removeItem(${index})">Remove</button>`;

        orderList.appendChild(listItem);

    });

}

function editItem(index) {

    const newQty = prompt(`Enter new quantity for ${order[index].name}:`, order[index].quantity);

    if (newQty !== null && newQty > 0) {

        order[index].quantity = parseInt(newQty);

        displayOrder();

    }

}

function removeItem(index) {

    order.splice(index, 1);

    displayOrder();

}

function generateReceipt() {

    if (order.length === 0) {

        alert("Your order is empty!");

        return;

    }

    const currencyRate = parseFloat(document.getElementById('currency').value);

    let total = 0;

    let receiptText = "<h3>Receipt:</h3><ul>";

    order.forEach(item => {

        const itemTotal = item.price * item.quantity * currencyRate;

        total += itemTotal;

        receiptText += `<li>${item.name} x ${item.quantity} - ${getCurrencySymbol(currencyRate)}${itemTotal.toFixed(2)}</li>`;

    });

    const tax = total * 0.08;

    const discount = total > 50 ? total * 0.1 : 0;

    const finalTotal = total + tax - discount;

    receiptText += `

        <li><strong>Subtotal: ${getCurrencySymbol(currencyRate)}${total.toFixed(2)}</strong></li>

        <li>Tax (8%): ${getCurrencySymbol(currencyRate)}${tax.toFixed(2)}</li>

        <li>Discount: ${getCurrencySymbol(currencyRate)}${discount.toFixed(2)}</li>

        <li><strong>Total: ${getCurrencySymbol(currencyRate)}${finalTotal.toFixed(2)}</strong></li>

    </ul>`;

    document.getElementById('receipt').innerHTML = receiptText;

    orderStatus();

}

function orderStatus() {

    setTimeout(() => alert("Order Received..."), 1000);

    setTimeout(() => alert("Preparing..."), 3000);

    setTimeout(() => alert("It's Ready!"), 5000);

}

function getCurrencySymbol(rate) {

    switch(rate) {

        case 75:

            return '₹';

        case 0.75:

            return '£';

        default:

            return '$';

    }

}