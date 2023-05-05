import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SharedService } from "src/app/core/service/shared.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.sass"],
})
export class EmployeeProfileComponent implements OnInit {
  
  userData: any = [];
  userId: string = this.router.url.split('/')[4];
  userUpdateForm: UntypedFormGroup;
  changePasswordForm: UntypedFormGroup; 
  hide = true;

  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.userUpdateForm = this.fb.group({   
      id: [parseInt(this.userId)],
      first_name: [""],
      last_name: [""],
      gender: [""],
      phone_number: ["", Validators.minLength(9)],      
      role: [""],
      department: [""],
      address: [""],      
      date_of_birth: [""],
      email: ["", [Validators.email, Validators.minLength(5)]],
      name: ["", [Validators.minLength(5), Validators.maxLength(25)]],
      own_description: ["", [Validators.maxLength(2000)]],
      boss_description: ["", [Validators.maxLength(2000)]],
      education: ["", [Validators.maxLength(2000)]],
      experience: ["", [Validators.maxLength(5000)]],
      username: ["", [Validators.minLength(5), Validators.maxLength(25)]]
    });

    this.changePasswordForm = this.fb.group({
      id: [parseInt(this.userId)],
      new_password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
    });
  }

  ngOnInit(): void {
    this.loadUserData();   
  }

  loadUserData(){
    this.service.getUserDetail(this.userId).subscribe((data: Object) => {
      this.userData = data;
    });
  }

  formUpdateFormat(form: any){
    if (form.first_name === ''){
      form.first_name = this.userData.first_name;
    }
    if (form.last_name === ''){
      form.last_name = this.userData.last_name;
    }
    if (form.gender === ''){
      form.gender = this.userData.gender;
    }
    if (form.phone_number === ''){
      form.phone_number = this.userData.phone_number;
    }
    if (form.role === ''){
      form.role = this.userData.role;
    }
    if (form.department === ''){
      form.department = this.userData.department;
    }
    if (form.address === ''){
      form.address = this.userData.address;
    }
    if (form.date_of_birth === ''){
      form.date_of_birth = this.userData.date_of_birth;
    }
    if (form.email === ''){
      form.email = this.userData.email;
    }
    if (form.name === ''){
      form.name = this.userData.name;
    }
    if (form.username === ''){
      form.username = this.userData.name;
    }
    if (form.own_description === ''){
      form.own_description = this.userData.own_description;
    }
    if (form.boss_description === ''){
      form.boss_description = this.userData.boss_description;
    }
    if (form.education === ''){
      form.education = this.userData.education;
    }
    if (form.experience === ''){
      form.experience = this.userData.experience;
    }
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onSubmit() { 
    this.formUpdateFormat(this.userUpdateForm.value);    
    this.service.updateUser(this.userUpdateForm.value).subscribe(
      () => {
        this.infoSnackBar('The user has been edited', 'ok');      
        this.loadUserData();
    },
      err => {
        this.infoSnackBar(err, 'ok');
      }
    );
  }

  onSubmitPassword(){ 
    this.service.changeAdminPassword(this.changePasswordForm.value).subscribe(
      () => {
        this.infoSnackBar('The password has been changed', 'ok');      
        this.loadUserData();
    },
    err => {
      this.infoSnackBar(err, 'ok');
    }
    )
  }

}
