import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { SharedService } from "src/app/core/service/shared.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {

  departments: any = [] 
  filesQuantityDepartment: any = []

  constructor(
    private service: SharedService,
  ) {}
  
  ngOnInit() {
    this.loadDepartmentsData();      
  }

  loadDepartmentsData() {
    this.service.getDepartments().subscribe((data: any) => {
      this.departments = data;
      const requests = this.departments.map((department: any) => 
        this.service.getFilesNumberDepartment(department.Departments_name)
      );
      forkJoin(requests).subscribe((responses: any[]) => {
        this.filesQuantityDepartment = responses; 
      });
    });
  }

}
