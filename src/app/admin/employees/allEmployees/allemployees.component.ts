import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from "src/app/core/service/shared.service";
import { AuthService } from "src/app/core/service/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-allemployees",
  templateUrl: "./allemployees.component.html",
  styleUrls: ["./allemployees.component.scss"],
})
export class AllemployeesComponent implements OnInit {
  displayedColumns = ["name", "department", "role", "phone_number", "email", "actions"];
  userList:any = [];
  userData:any = [];
  dataSource:any = [];
  dataSourceLength: number;
  modalTitle:string;
  employeeModal:string;

  constructor(
    private service: SharedService,
    private auth: AuthService,
    private modalService: NgbModal,
    public snackBar: MatSnackBar        
    ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 5000,
    });
  }
  
  loadData(){
    this.service.getUsersAll().subscribe((data) =>{
        this.userList = data;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSourceLength = this.dataSource.filteredData.length        
        this.dataSource.sort = this.sort;
    });
  }

  loadUserData(userId:any){
    this.service.getUserDetail(userId).subscribe((data:any) => {
      this.userData = data;
    })
  }

  FilterFn(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  editData(data: any) {
    this.userData = data;    
    this.modalTitle = "Edit Employee";
    //this.ActivateAddEditProjectComp = true;
  }

  addNewEmployee(content) {
    this.employeeModal = 'add';
    this.modalTitle = 'Add a new employee';
    this.modalService.open(content, { centered: true, size: 'lg'});
  }

  editNewEmployee(content) {
    this.employeeModal = 'edit';
    this.modalTitle = 'Edit a employee';
    this.modalService.open(content, { centered: true, size: 'lg'});
  }

  deleteUser(id: number) {
    if (this.auth.currentUserValue.id === id){
      this.infoSnackBar('You cannot delete an account you are logged in to!!!', 'ok');
    }
    else {
      this.service.deleteUser(id).subscribe(() => {
        this.loadData();
        this.infoSnackBar('User deleted successfully', 'ok'); 
      });
    }    
  }

}
