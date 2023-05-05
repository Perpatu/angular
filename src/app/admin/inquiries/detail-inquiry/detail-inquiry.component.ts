import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { SharedService } from 'src/app/core/service/shared.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detail-inquiry',
  templateUrl: './detail-inquiry.component.html',
  styleUrls: ['./detail-inquiry.component.sass']
})
export class DetailInquiryComponent implements OnInit {

  inquiryDetail:any = [];
  inquiryId: string = this.router.url.split('/')[4];
  Files: any = [];
  downloadingId: any;
  downloading: boolean = false;
  titleModal: string;
  projectInquiryForm: UntypedFormGroup;

  constructor(
    private service: SharedService,
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadInquiryDetail();
    this.loadFile();
    this.projectInquiryForm = this.fb.group({
      Inquiry_id: [this.inquiryId],
      Inquiry_status: [""],
    })
  }

  loadInquiryDetail(){
    this.service.getDetailInquiries(this.inquiryId).subscribe(( data: any ) => {
      this.inquiryDetail = data;
      const formattedText = this.inquiryDetail.Inquiry_content.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');     
      document.getElementById('inquiry-content').innerHTML = formattedText;
    })
  }

  loadFile(){
    this.service.getFileInquiry(this.inquiryId).subscribe(( data: any ) => {
      this.Files = data;
    })
  }

  deleteFile(fileId:any){
    this.service.deleteInquiryFile(fileId).subscribe(() => {
      this.loadFile();
    })
  }

  openAddInquiryFiles(content: any) {
    this.titleModal = "Dodaj Plik do zapytania";
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  openUpdateStatusInquiry(content: any) {
    this.titleModal = "Zmień status zapytania";
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  updateInquiry(){
    var updateInquiry = {
      Inquiry_id: this.inquiryId,
      User: this.auth.currentUserValue.id,
      Inquiry_status: 'under_consideration'
    }
    this.service.updateInquiry(updateInquiry).subscribe(() => {
      this.loadInquiryDetail();
    })
  }

  updateStatusInquiry(){
    this.service.updateInquiry(this.projectInquiryForm.value).subscribe(() => {
      window.location.reload();
    })
  }

  download(fileId: any, fileName: any) {
    this.downloadingId = fileId;
    this.downloading = true;
    this.service.downloadInquiryFile(fileId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      if (blob) this.downloading = false;
    })
    this.updateInquiry();
  }

}
