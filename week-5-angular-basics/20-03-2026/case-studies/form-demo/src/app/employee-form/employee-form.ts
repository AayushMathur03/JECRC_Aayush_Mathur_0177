import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormArray,
  FormRecord,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent {
  //form control (single field)
  name = new FormControl('', Validators.required);

  //form group (structured data)
  account = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  //form array (dynamic list)
  skills = new FormArray([
    new FormControl('Angular'),

  ]);

  //formrecord (dynamic object)
  prefrences = new FormRecord({
    darkMode: new FormControl(true),
    notifications: new FormControl(false),
  });


  //add skills
  addSkill() {
    this.skills.push(new FormControl(''));
  }
  //remove skills
  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  //add prefrences
  addPreference() {
    const key = 'pref_' + Object.keys(this.prefrences.controls).length;
    this.prefrences.addControl(key, new FormControl(false));
  }

  //submit form
  submit(){
    const data ={
      name: this.name.value,
      account: this.account.value,
      skills: this.skills.value,
      prefrences: this.prefrences.value
    };
    console.log('Form Data:', data);
    alert(JSON.stringify(data, null, 2));
    }
  }