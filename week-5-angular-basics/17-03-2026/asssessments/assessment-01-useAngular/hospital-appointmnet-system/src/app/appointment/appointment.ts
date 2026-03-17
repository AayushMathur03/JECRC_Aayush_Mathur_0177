import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class AppointmentComponent {

  patientName = '';
  doctor = '';
  date = '';
  consultationType = '';
  symptoms = '';
  fee = 0;
  message = '';

  doctors = ['Dr Sharma','Dr Mehta','Dr Singh'];

  calculateFee(){
    this.fee = this.consultationType === 'Online' ? 300 : 500;
  }

  bookAppointment(){
    this.message = "Appointment Confirmed";
  }

  getTodayDate(){
    return new Date().toISOString().split('T')[0];
  }

}