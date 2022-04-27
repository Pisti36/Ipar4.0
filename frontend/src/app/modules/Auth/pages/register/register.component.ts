import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  reactiveForm: FormGroup = this.formBuilder.group({
    email: ["",[Validators.required, Validators.pattern(this.emailPattern)]],
    password: ["",[Validators.required, Validators.minLength(6)]],
    confirmpassword: ["", [Validators.required]],
  }, {
    validator: this.passwordMatchValidator('password', 'confirmpassword')
  });

  get f(){return this.reactiveForm.controls}


  constructor(private formBuilder:FormBuilder, private location: Location) { 
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mismatch: true });
          return true;
      } else {
        confirmPasswordControl.setErrors(null);
          return null;
      }
    };
  }

  onSubmit(){
    if(this.reactiveForm.invalid){
      return;
    }
  }

  ngOnInit(): void {
  }

  back(){
    this.location.back();
  }
}
