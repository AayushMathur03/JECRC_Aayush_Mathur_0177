# JavaScript DOM Events Practice 🚀

# 🧩 Task 1: E-Commerce Add to Cart Button

### Scenario

In an online shopping website, when a user clicks **Add to Cart**, the product should be added to the cart and a confirmation message should be displayed.

### Event Used

`click`
    
### Code

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

### Output

* Console displays: `Product added to cart`
* UI shows: **Item successfully added to cart**

---

# ⌨️ Task 2: Login Form Keyboard Event

### Scenario

When the user presses **Enter** in the username field, the login attempt should be triggered.

### Event Used

`keydown`

### Code

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

### Output

* When **Enter key is pressed**
* Console logs login attempt
* Alert box simulates form submission

---

# 🔒 Task 3: Secure Banking App Right Click Disable

### Scenario

To protect sensitive information, the banking application disables **right-click functionality**.

### Event Used

`contextmenu`

### Code

```javascript
document.addEventListener("contextmenu", function(e){

e.preventDefault();

console.warn("Right click disabled for security");

});
```

### Output

* Right-click menu is disabled
* Console warning message is displayed

---

# 💬 Task 4: Customer Support Chat Mouse Hover

### Scenario

A chat icon displays a **tooltip message** when the user hovers over it.

### Event Used

`mouseover`

### Code

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

### Output

* Tooltip message appears on hover
* Console logs hover action

---

# ❤️ Task 5: Double Click to Like Product

### Scenario

In many applications like **Instagram or shopping apps**, double-clicking a product image increases the like count.

### Event Used

`dblclick`

### Code

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

### Output

* Double-clicking the image increases the **like counter**
* Console logs the number of likes

---

# 📊 Summary of Events Used

| Task   | Event         | Purpose             |
| ------ | ------------- | ------------------- |
| Task 1 | `click`       | Add product to cart |
| Task 2 | `keydown`     | Detect Enter key    |
| Task 3 | `contextmenu` | Disable right click |
| Task 4 | `mouseover`   | Show tooltip        |
| Task 5 | `dblclick`    | Like a product      |

---

# 🎯 Learning Outcome

After completing these tasks, you will understand:

* How to use **JavaScript Event Listeners**
* How to interact with **DOM elements**
* How to respond to **user interactions**
* How to update the **UI dynamically**

