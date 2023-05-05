import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SharedService } from "src/app/core/service/shared.service";
import { AuthService } from "src/app/core/service/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-inquiries',
  templateUrl: './add-inquiries.component.html',
  styleUrls: ['./add-inquiries.component.sass']
})
export class AddInquiriesComponent implements OnInit {

  @Input() inquiryAddModal: string = '';
  inquiryAddForm: UntypedFormGroup;

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.inquiryAddForm = this.fb.group({
      Inquiry_name: ["", [Validators.required]],      
      Comapny_name: ["", [Validators.required]],
      Inquiry_content: ["", [Validators.required]],
    })
   }

  ngOnInit(): void {
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

  addInquiry() {
    this.service.addInquiry(this.inquiryAddForm.value).subscribe(() => {
      if (this.inquiryAddModal === ''){
        this.infoSnackBar('Zapytanie zostało dodane', 'OK')
      }
      else if (this.inquiryAddModal === 'add'){
        window.location.reload();
      }      
    })
  }
}
