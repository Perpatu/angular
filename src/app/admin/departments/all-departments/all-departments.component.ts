import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/core/service/shared.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-all-departments',
  templateUrl: './all-departments.component.html',
  styleUrls: ['./all-departments.component.sass']
})
export class AllDepartmentsComponent implements OnInit {

  dataSource: any = [];
  departmentsList: any = []
  displayedColumns: string[] = ['Departments_name', 'Departments_order', 'Option']
  titleModal: string;
  departmentUpdateForm: UntypedFormGroup;

  constructor(
    private service: SharedService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.departmentUpdateForm = this.fb.group({
      Departments_id: [],
      Departments_order: ['', Validators.min(1)]
    })
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.service.getDepartments().subscribe((data: any) => {
      this.departmentsList = data;
      this.dataSource = new MatTableDataSource(data);
    })
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

  async checkOrder(form: any, depId: any) {
    let departments: any = []
    departments = this.departmentsList
    const promises: Promise<any>[] = []

    for (let i = 0; i < departments.length; i++) {
      if (form.Departments_order === departments[i].Departments_order) {
        const promise1 = this.service.getDepartmentDetail(departments[i].Departments_id).toPromise();
        const promise2 = this.service.getDepartmentDetail(depId).toPromise();
        promises.push(promise1, promise2);
        break;
      }
      else {
        this.service.updateDepartment(this.departmentUpdateForm.value).subscribe(() => {
          this.loadDepartments();
        })
      }
    }

    return Promise.all(promises).then((data) => {
      try {
        const existing = data[0];
        const updating = data[1];
        const tempOrder = 0;
        const existingOrder = data[1].Departments_order;
        updating.Departments_order = existing.Departments_order
        existing.Departments_order = tempOrder
        this.service.updateDepartment(existing).subscribe(() => {
          this.service.updateDepartment(updating).subscribe(() => {
            existing.Departments_order = existingOrder
            this.service.updateDepartment(existing).subscribe(() => {
              this.departmentUpdateForm.reset();
              this.loadDepartments();
              let message: string = 'The order "' + existing.Departments_name +
                                    '" and  "' + updating.Departments_name +
                                    '" has been changed successfully.'
              this.infoSnackBar(message, 'OK')
            });
          })
        });
      }
      catch (error) {

      }
    });
  }

  updateDepartment(id: any) {
    this.departmentUpdateForm.value.Departments_id = id;
    this.checkOrder(this.departmentUpdateForm.value, id);
  }

  openAddDepartment(content) {
    this.titleModal = "Add Department";
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  deleteDepartment(department: any) {
    this.service.deleteDepartment(department.Departments_id).subscribe(() => {
      this.loadDepartments();
    })
  }
}
