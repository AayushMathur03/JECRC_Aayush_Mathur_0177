# 🏥 Angular Assessment — Hospital Appointment Booking System

## ❓ Question

Build a **Doctor Appointment Booking System** in Angular with the following features:

### 📌 Features

* Patient Name (Text Input)
* Doctor Selection (Dropdown)
* Appointment Date
* Consultation Type (Online / Offline)
* Symptoms (Textarea)

### 🧠 Logic

* Consultation Fee:

  * Online → ₹300
  * Offline → ₹500
* Show **Live Appointment Summary**

### ⭐ Bonus

* Disable past dates
* Show confirmation message after booking

---

## 🎯 Objective

Create a functional Angular UI where users can fill appointment details and see real-time updates along with proper validation and confirmation.

---

## 🧠 Core Angular Concepts Used

* Standalone Components
* Component Selector Rendering
* Root Component Bootstrapping
* Template Driven Forms (`ngModel`)
* Event Binding
* Property Binding
* Structural Directive `*ngFor`
* Angular SPA Rendering Flow

---

## 🏗️ Application Architecture

```text
index.html
   ↓
main.ts → bootstrapApplication(AppComponent)
   ↓
AppComponent (Root)
   ↓
AppointmentComponent (Feature UI)
```

---

## ⚙️ Consultation Fee Logic

| Consultation Type | Fee  |
| ----------------- | ---- |
| Online            | ₹300 |
| Offline           | ₹500 |

---

## 🚫 Validation Rule

Past appointment dates must not be selectable.

---

## 🚀 Expected Outcome

* Clean appointment form UI
* Dynamic fee calculation
* Live summary preview
* Confirmation message display
* Proper Angular component wiring

---

## 📚 Learning Outcome

This task helps understand:

* Angular SPA startup flow
* Component hierarchy
* Selector usage
* Form data binding
* Dynamic template rendering
* Basic validation handling

---
