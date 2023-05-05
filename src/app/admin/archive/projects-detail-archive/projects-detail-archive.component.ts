import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/core/service/shared.service';

@Component({
  selector: 'app-projects-detail-archive',
  templateUrl: './projects-detail-archive.component.html',
  styleUrls: ['./projects-detail-archive.component.scss']
})
export class ProjectsDetailArchiveComponent implements OnInit {

  projectId: string = this.router.url.split('/')[4];
  currentProject: any = [];
  currentProjectEndDate: string;
  invoiceFiles: any = [];
  dataSourceInvoiceFiles: any = [];
  dataSourceShopFiles:any = [];
  shopFiles: any = [];
  dataSourceProductionFiles: any = [];
  productionFiles: any = [];

  displayedColumnsFilesProduction: string[] = ['Delete', 'PDF', 'Name', 'Slicer', 'Ironworks', 'Plastic',
  'Machining', 'Welding', 'Painting', 'Installation', 'Quality', 'Packing'];

  displayedColumnsFilesProductionAll: string[] = ['PDF', 'Name', 'Slicer', 'Ironworks', 'Plastic',
  'Machining', 'Welding', 'Painting', 'Installation', 'Quality', 'Packing'];

  displayedColumnsFilesInvoice: string[] = ['Name'];

  displayedColumnsFilesShop: string[] = ['Name'];

  constructor(
    private service: SharedService,
    private router: Router,
  ) { }  

  ngOnInit(): void {
    this.loadProjectData();
  }

  loadProjectData() {
    this.service.getProjectView(this.projectId).subscribe((projectData: any) => {
      if (projectData.File_id.length > 0) {
        this.service.getFilesProject(this.projectId).subscribe((productionFilesData: any) => {
          this.productionFiles = productionFilesData;
          this.dataSourceProductionFiles = new MatTableDataSource(this.productionFiles);
          //this.dataSourceProductionFiles.sort = this.sort;
        });
        this.service.getFilesShopProject(this.projectId).subscribe((shopFilesData: any) => {
          this.shopFiles = shopFilesData;
          this.dataSourceShopFiles = new MatTableDataSource(this.shopFiles);
        });
        this.service.getFilesInvoiceProject(this.projectId).subscribe((invoiceFilesData: any) => {     
          this.invoiceFiles = invoiceFilesData;
          this.dataSourceInvoiceFiles =  new MatTableDataSource(this.invoiceFiles);
        });
      }
      this.currentProjectEndDate = projectData.Project_end_date.split('T')[0];
      this.currentProject = projectData;
    });
  }

}
