import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { SharedService } from 'src/app/core/service/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  departmentAddForm: UntypedFormGroup;

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.departmentAddForm = this.fb.group({
      Departments_name: [''],
      Departments_order: [''],      
    })
  }

  ngOnInit(): void {
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

  onSubmit() {
    let errorsStr: string = '';
    this.service.addDepartment(this.departmentAddForm.value).subscribe(
      (res: any) => {
        window.location.reload();
      },
      (error: any) => {
        for (var i = 0; i < Object.keys(error.error).length; i++) {
          errorsStr += (i + 1).toString() + '. ' + Object.values(error.error)[i][0] + '\n';
        }
        this.snackBar.open(errorsStr, 'OK', {
          duration: 10000,
          panelClass: ['mat-snack-bar-container', 'multiline-snackbar']
        });
      }
    );
  }
}
