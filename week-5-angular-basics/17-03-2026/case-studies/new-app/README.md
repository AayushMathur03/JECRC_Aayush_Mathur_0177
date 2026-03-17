# Angular Task — Display Multiple Components on a Single Page (Revision Notes)

## 🎯 Task Goal

Create **three Angular components** (`Home`, `User`, `Product`) and **display them neatly on a single page** using a clean layout and basic styling.

---

## ✅ Step 1 — Generate Components

Using Angular CLI:

```bash
ng g c home
ng g c user
ng g c product
```

This creates for each component:

* `.ts` → logic
* `.html` → UI template
* `.css` → styling
* `.spec.ts` → test file

---

## ✅ Step 2 — Add Basic Content in Components

Example:

### `home.component.html`

```html
<h2>Home Component</h2>
<p>Welcome to Home Section</p>
```

### `user.component.html`

```html
<h2>User Component</h2>
<p>User details shown here</p>
```

### `product.component.html`

```html
<h2>Product Component</h2>
<p>Product list shown here</p>
```

---

## ✅ Step 3 — Use Component Selectors in Parent Page

Angular components behave like **custom HTML tags**.

Example selectors:

```ts
selector: 'app-home'
selector: 'app-user'
selector: 'app-product'
```

Use them inside:

### `app.component.html`

```html
<h1>Main Page</h1>

<app-home></app-home>
<app-user></app-user>
<app-product></app-product>
```

---

## ⚠️ Important — Remove Default Angular Template

Angular starter project includes:

* Placeholder UI
* Angular logo
* Links
* Router outlet

For this task:

* **Delete the whole default template**
* Also remove `<router-outlet />` if routing is not needed.

---

## ⭐ Angular 17 Standalone Concept (Very Important)

Angular 17 uses **Standalone Components (No NgModule by default).**

Therefore:
👉 Components must be **imported manually** in parent component.

### `app.component.ts`

```ts
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, UserComponent, ProductComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
```

If not imported → Angular shows **Unknown element error (red underline).**

---

## ✅ Step 4 — Make UI Neat Using Layout Styling

### `app.component.html`

```html
<h1 class="title">Main Dashboard</h1>

<div class="container">
  <div class="card"><app-home></app-home></div>
  <div class="card"><app-user></app-user></div>
  <div class="card"><app-product></app-product></div>
</div>
```

### `app.component.css`

```css
.title{
  text-align:center;
  margin-top:20px;
  font-size:40px;
}

.container{
  display:flex;
  justify-content:center;
  gap:30px;
  margin-top:40px;
  flex-wrap:wrap;
}

.card{
  width:300px;
  padding:20px;
  border-radius:12px;
  background:white;
  box-shadow:0 8px 20px rgba(0,0,0,0.1);
  transition:0.3s;
}

.card:hover{
  transform:translateY(-5px);
}
```

---

## 🎨 Component Level Styling (Style Encapsulation)

Each component has its own CSS file.

Example:

```css
/* home.component.css */
h2{ color: green; }
```

Angular ensures:
👉 Styles remain **scoped to that component only.**

---

## 🧠 Key Concepts Learned

* Angular CLI component generation
* Component selector usage
* Parent → Child component rendering
* Standalone component imports
* Removing default Angular template
* Flexbox layout basics
* Card UI design
* Component style encapsulation
* Error debugging: *Unknown component selector*

---

## 🚀 Next Topics to Learn

* Angular Routing (Navigation between pages)
* Data Binding & @Input/@Output
* Services & Dependency Injection
* Angular Material / Bootstrap UI
* Responsive Grid Layout
* Real Dashboard Architecture

---

✅ This task builds the **foundation of Angular component-based UI design.**
