# JavaScript DOM Events & Monitoring Tasks 🚀

This repository contains **9 JavaScript practice tasks** focused on **DOM manipulation, event handling, logging, analytics, and performance monitoring**.

These exercises simulate **real-world web application scenarios** such as e-commerce actions, login monitoring, analytics tracking, and performance measurement.

---

# 📚 Topics Covered

* DOM Manipulation
* JavaScript Event Handling
* Mouse Events
* Keyboard Events
* Logging Systems
* Analytics Tracking
* Form Validation
* Performance Monitoring

---

# 🧩 Task 1 — E-Commerce Add to Cart Button

### Scenario

When a user clicks **Add to Cart**, the product is added and a confirmation message appears.

### Event Used

`click`

```html
<button id="addCart">Add to Cart</button>
<p id="msg"></p>

<script>
document.getElementById("addCart").addEventListener("click", function(){

    console.log("Product added to cart");

    document.getElementById("msg").innerHTML =
    "Item successfully added to cart";

});
</script>
```

---

# ⌨️ Task 2 — Login Form Keyboard Event

### Scenario

Pressing **Enter** inside the username field triggers login submission.

### Event Used

`keydown`

```html
<input type="text" id="username" placeholder="Enter username">

<script>
document.getElementById("username").addEventListener("keydown", function(e){

if(e.key === "Enter"){

console.log("Login attempt triggered");

alert("Submitting login form");

}

});
</script>
```

---

# 🔒 Task 3 — Disable Right Click (Security)

### Scenario

A banking portal disables right-click to protect sensitive data.

### Event Used

`contextmenu`

```javascript
document.addEventListener("contextmenu", function(e){

e.preventDefault();

console.warn("Right click disabled for security");

});
```

---

# 💬 Task 4 — Customer Support Chat Hover

### Scenario

Hovering over the chat icon displays a tooltip message.

### Event Used

`mouseover`

```html
<div id="chatIcon">💬 Chat Support</div>
<p id="info"></p>

<script>

document.getElementById("chatIcon").addEventListener("mouseover", function(){

document.getElementById("info").innerText =
"Click here to talk with customer support";

console.log("Mouse hovered over chat icon");

});

</script>
```

---

# ❤️ Task 5 — Double Click to Like Product

### Scenario

Double-clicking a product image increases the like counter.

### Event Used

`dblclick`

```html
<img id="product" src="https://via.placeholder.com/200">
<p>Likes: <span id="count">0</span></p>

<script>
let likes = 0;

document.getElementById("product").addEventListener("dblclick", function(){

likes++;

document.getElementById("count").innerText = likes;

console.log("Product liked", likes);

});
</script>
```

---

# 📊 Task 6 — Track User Login Activity

### Scenario

Applications log user login attempts for monitoring.

```html
<input id="username" placeholder="Enter Username">
<button onclick="login()">Login</button>

<script>

function login(){

const user = document.getElementById("username").value;

logger.log("INFO", "User Login Attempt", {username:user});

}

</script>
```

---

# ⚠️ Task 7 — Log Form Validation Errors

### Scenario

If a user submits an invalid email, the system logs the validation issue.

```javascript
function validateForm(){

const email = document.getElementById("email").value;

if(!email.includes("@")){

logger.log("WARN","Invalid Email Entered",email);

alert("Invalid email");

}

}
```

---

# 📈 Task 8 — Track Button Click Analytics

### Scenario

Companies track which buttons users interact with the most.

```html
<button onclick="trackClick('Buy Now')">Buy Now</button>
<button onclick="trackClick('Add Wishlist')">Add Wishlist</button>

<script>

function trackClick(action){

logger.log("INFO","User Action:",action);

}

</script>
```

---

# ⚡ Task 9 — Monitor Page Load Performance

### Scenario

Developers measure how long the page takes to load.

### API Used

`performance.now()`

```javascript
const start = performance.now();

window.onload = function(){

const end = performance.now();

const loadTime = end - start;

logger.log("INFO","Page Load Time:", loadTime + " ms");

}
```

---

# 📊 Summary of Events & Concepts

| Task   | Event / Concept         |
| ------ | ----------------------- |
| Task 1 | `click`                 |
| Task 2 | `keydown`               |
| Task 3 | `contextmenu`           |
| Task 4 | `mouseover`             |
| Task 5 | `dblclick`              |
| Task 6 | User activity logging   |
| Task 7 | Form validation logging |
| Task 8 | Button click analytics  |
| Task 9 | Performance monitoring  |

---

# 🎯 Learning Outcomes

After completing these tasks, you will understand:

* How **JavaScript interacts with the DOM**
* Handling **user interaction events**
* Implementing **logging and analytics**
* Monitoring **application performance**
* Basic **frontend monitoring techniques**

---

# 🛠 Technologies Used

* HTML5
* JavaScript (DOM API)
* Browser Performance API

---

⭐ These tasks were implemented as part of **JavaScript event handling and monitoring practice exercises**.
