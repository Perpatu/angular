import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from "src/app/core/service/shared.service";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.sass"],
})

export class AddEmployeeComponent implements OnInit {
  
  @Input() employeeModal: string;
  @Input() userData: any;
  userForm: UntypedFormGroup;
  userEditForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private http: HttpClient,
    private service: SharedService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      username: ["", [Validators.required]],     
      phone_number: [""],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]],
      department: [""],      
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],     
    });
  }

  ngOnInit(): void {
    this.userEditForm = this.fb.group({
      id: [this.userData.id],
      first_name: [this.userData.first_name],
      last_name: [this.userData.last_name],
      username: [this.userData.username],    
      phone_number: [this.userData.phone_number],      
      role: [this.userData.role],
      department: [this.userData.department],   
      email: [this.userData.email,
        [Validators.email, Validators.minLength(5)],
      ],     
    });
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  userFormCheck(form: any) {
    if (form.role === 'Admin') {
      form.is_staff = true;
      form.is_superuser = true;
    }
    else {
      form.is_staff = false;
      form.is_superuser = false;
    }
    return form;
  }

  onSubmit() {
    let errorsStr = '';
    this.userFormCheck(this.userForm.value);
    this.service.register(this.userForm.value).subscribe(
      res => {
        this.infoSnackBar('Użytkownik został dodany', 'ok');
      },
      err => {
        for (var i = 0; i < Object.keys(err.error).length; i++) {
          errorsStr += (i + 1).toString() + '. ' + Object.values(err.error)[i][0] + '\t' + '\n';
        }
        this.infoSnackBar(errorsStr, 'ok');
      }
    )
  }

  updateSubmit(){
    this.service.updateUser(this.userEditForm.value).subscribe(() =>{
      window.location.reload();
    })
  }
}
