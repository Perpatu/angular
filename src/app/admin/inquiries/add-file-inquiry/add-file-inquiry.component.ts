import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/service/auth.service';
import { SharedService } from 'src/app/core/service/shared.service';

@Component({
  selector: 'app-add-file-inquiry',
  templateUrl: './add-file-inquiry.component.html',
  styleUrls: ['./add-file-inquiry.component.sass']
})
export class AddFileInquiryComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private service: SharedService
  ) { }

  inquiryId: string = this.router.url.split('/')[4];
  upload: boolean = false;
  progress: number = 0;
  myFiles: string[] = [];

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  get f() {
    return this.myForm.controls;
  }
  ngOnInit(): void {
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  clear(id: any) {
    this.myFiles.splice(id, 1);
    this.myForm.reset();
  }

  submit() {
    this.upload = true;
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("file", this.myFiles[i]);
      formData.append("Inquiry", this.inquiryId);
      formData.append("filename", this.myFiles[i]['name']);
    }
    this.service.uploadFileInquiry(formData).subscribe((res:any) =>{
      if(res instanceof HttpResponse){
        window.location.reload();
      }
    })
  }
}
