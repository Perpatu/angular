import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/service/shared.service';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-all-inquiries',
  templateUrl: './all-inquiries.component.html',
  styleUrls: ['./all-inquiries.component.sass']
})
export class AllInquiriesComponent implements OnInit {

  selectedStatus: string = "new";
  inquiriesNewData: any[]
  inquiriesUnderData: any[]
  inquiriesAcceptedData: any[]
  inquiriesRejectedData: any[]
  dataSource: any = [];
  displayedColumns: string[] = ['Inquiry_name', 'Comapny_name', 'Inquiry_content', 'Status', 'User', 'Options'];
  titleModal: string;
  projectInquiryForm: UntypedFormGroup;
  inquiryId: any;
  inquiryAddModal: any;

  constructor(
    private service: SharedService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadInquiry();
    this.projectInquiryForm = this.fb.group({
      Inquiry_id: [""],
      Inquiry_status: [""],
    })
  }

  loadInquiry(){
    this.service.getNewInquiries().subscribe(( data: any ) => {
      this.inquiriesNewData = data;
      this.dataSource = new MatTableDataSource(this.inquiriesNewData);
    })
  }

  showInquiry() {
    if (this.selectedStatus === 'new') {
      this.service.getNewInquiries().subscribe(( data: any ) => {        
        this.inquiriesNewData = data;
        this.dataSource = new MatTableDataSource(this.inquiriesNewData);
        //this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedStatus === 'under_consideration') {
      this.service.getConsiderationInquiries().subscribe(( data: any ) => {       
        this.inquiriesUnderData = data;
        this.dataSource = new MatTableDataSource(this.inquiriesUnderData);
        //this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedStatus === 'accepted') {
      this.service.getAcceptedInquiries().subscribe(( data: any ) => {       
        this.inquiriesAcceptedData = data;
        this.dataSource = new MatTableDataSource(this.inquiriesAcceptedData);
        //this.dataSource.sort = this.sort;
      });
    }
    else if (this.selectedStatus === 'rejected') {
      this.service.getRejectedInquiries().subscribe(( data: any ) => {       
        this.inquiriesRejectedData = data;
        this.dataSource = new MatTableDataSource(this.inquiriesRejectedData);
        //this.dataSource.sort = this.sort;
      });
    }
  };

  openUpdateStatusInquiry(content: any, inquiryId:any) {
    this.titleModal = "Zmień status zapytania";
    this.inquiryId = inquiryId;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  openAddInquiry(content: any) {
    this.titleModal = "Dodaj zapytanie";
    this.inquiryAddModal = 'add'
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  updateStatusInquiry(){
    this.projectInquiryForm.value.Inquiry_id = this.inquiryId
    this.service.updateInquiry(this.projectInquiryForm.value).subscribe(() => {
      window.location.reload();
    })
  }

  deleteInquiry(inquiryId:any){
    this.service.deleteInquiry(inquiryId).subscribe(() => {
      this.loadInquiry()
    })
  }

}
