import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
submittedData: any;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService); 

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [
      null, 
      [
        Validators.required,
        Validators.min(18),
        Validators.max(99)
      ]
    ],
    faveColors: this.fb.array([]),
  });

  get faveColors() {
    return this.userForm.controls["faveColors"] as FormArray;
  }

  get faveColorGroups(): FormGroup[] {
    return this.faveColors.controls as FormGroup[];
  }

  addColor(){
    const faveColor = this.fb.group({
      color: ['', Validators.required],
    });
    this.faveColors.push(faveColor)
  }

  onReset() {
    this.userForm.reset({
      name: '',
      email: ''
    });
  }

  onSubmit() {
    console.log(this.userForm);
    
    if(this.userForm.valid){
      this.submittedData = this.userForm.getRawValue(),
      console.log(this.userForm.getRawValue());
      const name1 = this.userForm.get('name')?.value as string;
      const email = this.userForm.get('email')?.value as string;
      //send them to a service
      this.userService.addUser(0, name1, email);
 
    }
  }
  goToUsers() {
    this.router.navigate(['/users']);
  }
}

