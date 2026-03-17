import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  title = 'My App';
  users = [
    "John",
    "David",
    "Priya",
    "Anita"
  ];

  user = {name : "John", age: 30, };
  getgreeting(){
    return "Welcome to angular :  " + this.user.name;
  }
}
