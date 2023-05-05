import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/service/shared.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('comDiv') comDiv!: ElementRef;

  constructor(
    private service: SharedService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private auth: AuthService,
    private fb: UntypedFormBuilder,
  ) { }

  projectId: string = this.router.url.split('/')[4];
  fileDestiny: string;
  User: any = [];
  currentProject: any = [];
  currentProjectUser: any = [];
  currentProjectClient: any = [];
  currentProjectEndDate: string;
  productionFiles: any = [];
  productionFilesAdmin: any = [];
  productionFilesSecretary: any = [];
  shopFiles: any = [];
  secretariatFiles: any = [];
  prj: any;
  ModalTitle: string;
  ActivateAddEditProjectComp: boolean = false
  titleModal: string;
  projectAddEditModal: string = "";
  upload: boolean = false;
  role: any = this.auth.currentUserValue.role;
  userId: any = this.auth.currentUserValue.id;
  showManagement: boolean = false;
  productionFilesModal: boolean = false;
  editProjectModal: boolean = false;
  dataSource: any = []
  dataSourceAdmin: any = [];
  dataSourceSecretary: any = [];
  dataSecretariatProductionFiles: any = []
  File_id: any;
  pathToFile: any;
  departments: any = [];
  productionColumns: string[];
  productionColumnsAdmin: string[];
  productionColumnsSecretary: string[] = ['Delete', 'View', 'Filename', 'Comments'];
  downloading: boolean = false;
  downloadingId: any;
  commentForm: UntypedFormGroup;
  commentProjectForm: UntypedFormGroup;


  ngOnInit(): void {
    this.commentForm = this.fb.group({
      User: [this.auth.currentUserValue.id],
      File: [''],
      Text: ['']
    })

    this.commentProjectForm = this.fb.group({
      User: [this.auth.currentUserValue.id],
      Project: [''],
      Text: ['']
    })
    this.loadDepartments();
    this.loadProjectData();

  }

  scrollToBottom() {
    this.comDiv.nativeElement.scrollTop = this.comDiv.nativeElement.scrollHeight;
  }

  download(fileId: any, fileName: any) {
    this.downloadingId = fileId;
    this.downloading = true;
    this.service.downloadFile(fileId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      if (blob) this.downloading = false;
    })
  }

  openPdfFile(content, fileId: any) {
    this.pathToFile = 'http://98.71.193.168:8000/file/download/' + fileId + '/';
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  loadDepartments() {
    this.service.getDepartmentToColumn().subscribe((depList: any) => {
      let depListWithoutDelete: string[] = depList.Departments_name.slice(1, depList.Departments_name.length);
      this.productionColumns = depListWithoutDelete;
    })

    this.service.getColumnAdmin().subscribe((column: any) => {
      this.productionColumnsAdmin = column.Departments_name;
    })

    this.service.getDepartments().subscribe((data: any) => {
      this.departments = data
    })
  }

  loadProjectDetail() {
    this.service.getProjectDetail(this.projectId).subscribe((projectData: any) => {
      this.currentProjectEndDate = projectData.Project_end_date.split('T')[0];
      this.currentProject = projectData;
      this.currentProjectClient = projectData.Client
      this.currentProjectUser = projectData.User
    });
  }

  loadProjectData() {
    this.service.getFilesAdmin(this.projectId).subscribe((filesData: any) => {
      this.productionFilesAdmin = filesData
      this.dataSourceAdmin = new MatTableDataSource(this.productionFilesAdmin)
    })

    this.service.getFilesProjectProduction(this.projectId).subscribe((filesData: any) => {
      this.productionFiles = filesData
      this.dataSource = new MatTableDataSource(this.productionFiles)
      this.dataSource.sort = this.sort
    })

    this.service.getProjectDetail(this.projectId).subscribe((projectData: any) => {
      this.currentProjectEndDate = projectData.Project_end_date.split('T')[0];
      this.currentProject = projectData;
      this.currentProjectClient = projectData.Client
      this.currentProjectUser = projectData.User
    });

    this.service.getFilesProjectSecretariat(this.projectId).subscribe((fileSecretary: any) => {
      this.productionFilesSecretary = fileSecretary
      this.dataSourceSecretary = new MatTableDataSource(this.productionFilesSecretary)
    })
  }


  refreshData(){
    this.loadDepartments();
    this.loadProjectData();
  }


  addToQueue(File_id: any, Department_id: any, chosen: any) {    
    if (chosen === false) {
      let update = []
      const index = this.productionFilesAdmin.findIndex((item: any) => item.file.File_id === File_id);
      for (let i = 0; Object.keys(this.productionFilesAdmin[index]).length > i; i++) {
        let dep_name = Object.keys(this.productionFilesAdmin[index])[i]
        if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'delete') {          
          this.productionFilesAdmin[index][dep_name].Queue_choice.push(Department_id)          
          update = this.productionFilesAdmin[index][dep_name].Queue_choice
        }
      }      
      this.dataSourceAdmin = new MatTableDataSource(this.productionFilesAdmin)
      
      var updateFile = {
        File_id: File_id,
        Queue: update
      };
      var updateQueue = {
        File: File_id,
        Department: Department_id,
        Admin_allows: true
      };

      this.service.updateFile(updateFile, this.projectId).subscribe(() => {
        this.service.addQueue(updateQueue, this.projectId).subscribe()
      })
    }
  }

  removeFromQueue(File_id: any, Queue_logic: any, chosen: any, Department_id: any) {
    if (chosen === true) {
      let update = []
      const index = this.productionFilesAdmin.findIndex((item: any) => item.file.File_id === File_id);
      for (let i = 0; Object.keys(this.productionFilesAdmin[index]).length > i; i++) {
        let dep_name = Object.keys(this.productionFilesAdmin[index])[i]
        if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'delete') {
          this.productionFilesAdmin[index][dep_name].Queue_choice = this.productionFilesAdmin[index][dep_name].Queue_choice.filter((id: any) => id !== Department_id)
          update = this.productionFilesAdmin[index][dep_name].Queue_choice
        }
      }
      this.dataSourceAdmin = new MatTableDataSource(this.productionFilesAdmin)     

      var updateFile = {
        File_id: File_id,
        Queue: update
      };
      
      this.service.updateFile(updateFile, this.projectId).subscribe(() => {
        this.service.deleteQueue(Queue_logic, this.projectId).subscribe()
      })
    }
  }

  start(File_id: any, Queue_id: any, Department_id: any) {
    const index = this.productionFiles.findIndex((item: any) => item.file === File_id);
    for (let i = 0; Object.keys(this.productionFiles[index]).length > i; i++) {
      let dep_name = Object.keys(this.productionFiles[index])[i]
      if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'comments') {
        if (this.productionFiles[index][dep_name].Queue_logic && this.productionFiles[index][dep_name].Department_id === Department_id){
          this.productionFiles[index][dep_name].Queue_logic.User_start = true           
        }       
      }
    }
    this.dataSource = new MatTableDataSource(this.productionFiles)
    var updateStart = {
      Queue_id: Queue_id,
      User_start: true
    }

    this.service.updateQueueLogic(updateStart, this.projectId).subscribe(() => {      
      this.service.getFilesProjectProduction(this.projectId).subscribe();
    })
  }

  startRemove(File_id: any, Queue_id: any, Department_id: any) {
    const index = this.productionFiles.findIndex((item: any) => item.file === File_id);
    for (let i = 0; Object.keys(this.productionFiles[index]).length > i; i++) {
      let dep_name = Object.keys(this.productionFiles[index])[i]
      if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'comments') {
        if (this.productionFiles[index][dep_name].Queue_logic && this.productionFiles[index][dep_name].Department_id === Department_id){
          this.productionFiles[index][dep_name].Queue_logic.User_start = false        
          this.productionFiles[index][dep_name].permission = true   
          
        }       
      }
    }
    this.dataSource = new MatTableDataSource(this.productionFiles)
    var updateStart = {
      Queue_id: Queue_id,
      User_start: false
    }
    this.service.updateQueueLogic(updateStart, this.projectId).subscribe(() => {      
      this.service.getFilesProjectProduction(this.projectId).subscribe();
    })
  }

  pause(File_id: any, Queue_id: any, Department_id: any) {

    const index = this.productionFiles.findIndex((item: any) => item.file === File_id);
    for (let i = 0; Object.keys(this.productionFiles[index]).length > i; i++) {
      let dep_name = Object.keys(this.productionFiles[index])[i]
      if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'comments') {
        if (this.productionFiles[index][dep_name].Queue_logic && this.productionFiles[index][dep_name].Department_id === Department_id){
          this.productionFiles[index][dep_name].Queue_logic.User_paused = true
        }       
      }
    }
    this.dataSource = new MatTableDataSource(this.productionFiles)

    var updatePause = {
      Queue_id: Queue_id,
      User_paused: true
    }
    this.service.updateQueueLogic(updatePause, this.projectId).subscribe(() => {
      this.service.getFilesProjectProduction(this.projectId).subscribe();
    });
  }

  pauseRemove(File_id: any, Queue_id: any, Department_id: any) {
    const index = this.productionFiles.findIndex((item: any) => item.file === File_id);
    for (let i = 0; Object.keys(this.productionFiles[index]).length > i; i++) {
      let dep_name = Object.keys(this.productionFiles[index])[i]
      if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'comments') {
        if (this.productionFiles[index][dep_name].Queue_logic && this.productionFiles[index][dep_name].Department_id === Department_id){
          this.productionFiles[index][dep_name].Queue_logic.User_paused = false
        }       
      }
    }
    this.dataSource = new MatTableDataSource(this.productionFiles)
    var updatePause = {
      Queue_id: Queue_id,
      User_paused: false
    }
    this.service.updateQueueLogic(updatePause, this.projectId).subscribe(() => {
      this.refreshData();
    })
  }

  end(File_id: any, Queue_id: any, Dep_choice_id: any, Department_id: any, order: any) {
    const index = this.productionFiles.findIndex((item: any) => item.file === File_id);
    for (let i = 0; Object.keys(this.productionFiles[index]).length > i; i++) {
      let dep_name = Object.keys(this.productionFiles[index])[i]
      if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'comments') {
        let updateDepChoiceOrder = this.productionFiles[index][dep_name].Queue_choice.filter((or: any) => or !== order)
        let minOrder = Math.min(...updateDepChoiceOrder);
        this.productionFiles[index][dep_name].Queue_choice = updateDepChoiceOrder

        if (this.productionFiles[index][dep_name].order === minOrder) {
          this.productionFiles[index][dep_name].permission = true
        }
        this.dataSource = new MatTableDataSource(this.productionFiles)
      }
    }
    let updateDepChoiceId = Dep_choice_id.filter((id: any) => id !== Department_id)

    var updateEnd = {
      Queue_id: Queue_id,
      User_end: true,
    }

    var updateFile = {
      File_id: File_id,
      Queue: updateDepChoiceId
    }

    this.service.updateFile(updateFile, this.projectId).subscribe(() => {
      this.service.updateQueueLogic(updateEnd, this.projectId).subscribe(() => {
        this.service.getFilesProjectProduction(this.projectId).subscribe();
      })
    })
  }

  endRemove(File_id: any, Queue_id: any, Dep_choice_id: any, Department_id: any, order: any) {
    const index = this.productionFiles.findIndex((item: any) => item.file === File_id);
    for (let i = 0; Object.keys(this.productionFiles[index]).length > i; i++) {
      let dep_name = Object.keys(this.productionFiles[index])[i]
      if (dep_name != 'file' && dep_name != 'filename' && dep_name != 'comments') {
        this.productionFiles[index][dep_name].Queue_choice.push(order)
        this.productionFiles[index][dep_name].Queue_choice.sort((a: any, b: any) => a - b)
        let secondOrder = this.productionFiles[index][dep_name].Queue_choice[1]

        if (this.productionFiles[index][dep_name].order === secondOrder) {
          this.productionFiles[index][dep_name].permission = false
        }
        this.dataSource = new MatTableDataSource(this.productionFiles)
      }
    }

    if (Dep_choice_id.includes(Department_id) === false) {
      Dep_choice_id.push(Department_id)
    }

    var updateEnd = {
      Queue_id: Queue_id,
      User_end: false
    };

    var updateFile = {
      File_id: File_id,
      Queue: Dep_choice_id
    };

    this.service.updateFile(updateFile, this.projectId).subscribe(() => {
      this.service.updateQueueLogic(updateEnd, this.projectId).subscribe(() => {
        this.service.getFilesProjectProduction(this.projectId).subscribe();
      })
    })
  }


  managementShow() {
    this.showManagement = !this.showManagement;
  }

  modalProductionFiles() {
    this.productionFilesModal = !this.productionFilesModal;
  }

  openEditProject(content) {
    this.titleModal = "Edit Project/Order";
    this.projectAddEditModal = "edit";
    this.prj = this.currentProject;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  openAddProductionFiles(content: any, destiny: string) {
    this.titleModal = "Add Files to production";
    this.fileDestiny = destiny;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  openAddCommentFile(content: any, File_id: any) {
    this.titleModal = "Add comment to file";
    this.File_id = File_id;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }


  deleteFile(File_id: any) {
    this.service.deleteFile(File_id, this.projectId).subscribe(data => {

      this.loadProjectData();
    })
  }

  deleteComment(Comment_id: any) {
    this.service.deleteFileComment(Comment_id, this.projectId).subscribe(() => {
      this.loadProjectData();
    })
  }

  addComment() {
    this.commentForm.value.File = this.File_id
    this.service.addFileComment(this.commentForm.value, this.projectId).subscribe(() => {
      window.location.reload()
    })
  }

  addprojectComment() {
    this.commentProjectForm.value.Project = this.projectId
    this.service.addProjectComment(this.commentProjectForm.value, this.projectId).subscribe(() => {
      this.loadProjectDetail();
    })
  }

  deleteFileComment(Comment_id: any) {
    this.service.deleteProjectComment(Comment_id, this.projectId).subscribe(() => {
      this.loadProjectDetail();
    })
  }

}
