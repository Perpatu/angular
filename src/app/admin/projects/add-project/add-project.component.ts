import { Component, OnInit, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SharedService } from "src/app/core/service/shared.service";
import { AuthService } from "src/app/core/service/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.sass"]

})
export class AddprojectsComponent implements OnInit {
  @Input() projectAddEditModal: string = '';
  @Input() projectData: any;

  adminList: any = [];

  ClientList: any = [];
  updating: boolean = false;
  projectAddForm: UntypedFormGroup;
  projectUpdateForm: UntypedFormGroup;
  projectAddUrl: string = this.router.url.split('/')[3];
  users: any;

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.projectAddForm = this.fb.group({
      Project_number: ["", [Validators.required]],
      Project_name: ["", [Validators.required]],
      Project_priority: ["", [Validators.required]],
      Client: ["", [Validators.required]],
      Project_end_date: ["", [Validators.required]],
      Project_date_created: ["", [Validators.required]],
      Project_or_order: ["", [Validators.required]],
      Project_order_number: [""],
      Project_status: ["In design", [Validators.required]],
      User: [this.auth.currentUserValue.id],
    })
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadAdmins();
    if (this.projectAddEditModal === 'edit') {
      this.loadUsers();
      this.projectUpdateForm = this.fb.group({
        Project_id: [this.projectData.Project_id],
        Project_number: [this.projectData.Project_number],
        Project_group: [this.projectData.Project_group_to_update],
        Project_name: [this.projectData.Project_name],
        Project_priority: [this.projectData.Project_priority],
        Client: [this.projectData.Client.id],
        Project_end_date: [this.projectData.Project_end_date],
        Project_date_created: [this.projectData.Project_date_created],
        Project_or_order: [this.projectData.Project_or_order],
        Project_order_number: [this.projectData.Project_order_number],
        Project_status: [this.projectData.Project_status],
        User: [this.projectData.User.id],
      })
    }
  }

  loadUsers(){
    this.service.getUsersAll().subscribe((data:any) => {
      this.users = data;
    })
  }

  loadAdmins() {
    this.service.getUsersAdmin().subscribe(data => {      
      this.adminList = data;
    })
  }

  loadClients() {
    this.service.getClients().subscribe(data => {
      this.ClientList = data;
    });
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

  formatDate(form: any){
    const startDate = new Date(form.Project_date_created);
    const endDate = new Date(form.Project_end_date);
  
    const dayStart = startDate.getDate().toString().padStart(2, '0');
    const monthStart = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const yearStart = startDate.getFullYear().toString();
  
    const dayEnd = endDate.getDate().toString().padStart(2, '0');
    const monthEnd = (endDate.getMonth() + 1).toString().padStart(2, '0');
    const yearEnd = endDate.getFullYear().toString();
  
    form.Project_date_created = `${yearStart}-${monthStart}-${dayStart}`;
    form.Project_end_date = `${yearEnd}-${monthEnd}-${dayEnd}`;
    
    if(this.projectAddEditModal === 'edit' && form.Project_group.length > 0 ){
      for(let i = 0; form.Project_group.length > i; i++){
        form.Project_group[i] = parseInt(form.Project_group[i])
      }
    }
    return form
  }

  addProject() {
    this.formatDate(this.projectAddForm.value);
    this.service.addProject(this.projectAddForm.value).subscribe(() => {
      if (this.projectAddUrl === 'allProjects') {
        window.location.reload();
      }
      else {
        this.infoSnackBar('Project has been added', 'OK')
      }
    });
  }

  checkSecretariat(form:any){
    if(form.Project_status === 'Completed'){
      form.Project_secretariat = true
    }
    else if(form.Project_status === 'In design'){
      form.Project_secretariat = false
    }
    else if(form.Project_status === 'Suspended'){
      form.Project_secretariat = false
    }
  }

  updateProject() {
    this.formatDate(this.projectUpdateForm.value); 
    this.checkSecretariat(this.projectUpdateForm.value);
    this.service.updateProject(this.projectUpdateForm.value).subscribe(() => {
      window.location.reload();
    })
  }
}
