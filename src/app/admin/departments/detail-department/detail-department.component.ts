import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/core/service/shared.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-detail-department',
  templateUrl: './detail-department.component.html',
  styleUrls: ['./detail-department.component.scss']
})
export class DetailDepartmentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  currentDepartment: string;
  filesDepartment: any = [];
  departmentColumns: string[] = [];
  dataSource: any = []
  downloading: boolean = false;
  downloadingId: any;
  pathToFile: any;
  titleModal: string;
  File_id: any;

  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.currentDepartment = params.dep      
      this.loadColumnDepartment(this.currentDepartment);
      this.loadFilesDepartment(this.currentDepartment);
      
    });
  }

  loadFilesDepartment(dep: any) {
    this.service.getFilesDepartment(dep).subscribe((data: any) => { 
      console.log(data) 
      this.filesDepartment = data;
      this.dataSource = new MatTableDataSource(this.filesDepartment)
    })
  }

  loadColumnDepartment(dep: any) {    
    this.service.getColumnDepartment(dep).subscribe((data: any) => {
      this.departmentColumns = data.Departments_name;      
    })
  }

  download(fileId: any, fileName: any){
    this.downloadingId = fileId;
    this.downloading = true;
    this.service.downloadFile(fileId).subscribe(blob => {      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');      
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      if(blob) this.downloading = false;
    })
  }

  openPdfFile(content, fileId: any) {  
    this.pathToFile = 'http://98.71.193.168:8000/file/download/' + fileId + '/';
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  openAddCommentFile(content: any, File_id: any) {
    this.titleModal = "Add comment to file";    
    this.File_id = File_id;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  start(Queue_id: any, Project_id: any) {
    var updateStart = {
      Queue_id: Queue_id,
      User_start: true
    }

    this.service.updateQueueLogic(updateStart, Project_id).subscribe(() => {
      this.loadFilesDepartment(this.currentDepartment);
    })
  }

  startRemove(Queue_id: any, Project_id: any) {
    var updateStart = {
      Queue_id: Queue_id,
      User_start: false
    }
    this.service.updateQueueLogic(updateStart, Project_id).subscribe(() => {
      this.loadFilesDepartment(this.currentDepartment);
    })
  }

  pause(Queue_id: any, Project_id: any) {
    var updatePause = {
      Queue_id: Queue_id,
      User_paused: true
    }
    this.service.updateQueueLogic(updatePause, Project_id).subscribe(() => {
      this.loadFilesDepartment(this.currentDepartment);
    })
  }

  pauseRemove(Queue_id: any, Project_id: any) {
    var updatePause = {
      Queue_id: Queue_id,
      User_paused: false
    }
    this.service.updateQueueLogic(updatePause, Project_id).subscribe(() => {
      this.loadFilesDepartment(this.currentDepartment);
    })
  }

  end(File_id: any, Queue_id: any, Dep_choice_id: any, Department_id: any, Project_id: any) {
    let updateDepChoiceId = Dep_choice_id.filter((id: any) => id !== Department_id)
    var updateEnd = {
      Queue_id: Queue_id,
      User_end: true,
    }

    var updateFile = {
      File_id: File_id,
      Queue: updateDepChoiceId,
      
    };

  
    this.service.updateFile(updateFile, Project_id).subscribe(() => {
      this.service.updateQueueLogic(updateEnd, Project_id).subscribe(() => {
        this.loadFilesDepartment(this.currentDepartment);
      })
    })
  }

  endRemove(File_id: any, Queue_id: any, Dep_choice_id: any, Order: any, Project_id: any) {
    if (Dep_choice_id.includes(Order) === false) {
      Dep_choice_id.push(Order)
    }
    var updateEnd = {
      Queue_id: Queue_id,
      User_end: false
    };
    var updateFile = {
      File_id: File_id,
      Queue: Dep_choice_id,
      
    };
    this.service.updateFile(updateFile, Project_id).subscribe(() => {
      this.service.updateQueueLogic(updateEnd, Project_id).subscribe(() => {
        this.loadFilesDepartment(this.currentDepartment);
      })
    })
  }

  deleteComment(Comment_id: any, Project_id: any){
    this.service.deleteFileComment(Comment_id, Project_id).subscribe(() => {
      this.loadFilesDepartment(this.currentDepartment);
    })
  }

}
