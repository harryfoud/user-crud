import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
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
    if(this.userForm.valid){
      this.submittedData = this.userForm.getRawValue(),
      console.log(this.userForm.getRawValue())
      //TODO send them to a service
    }
  }
}

