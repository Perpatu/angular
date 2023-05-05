import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { InquiriesRoutingModule } from './inquiries-routing.module';
import { AddInquiriesComponent } from './add-inquiries/add-inquiries.component';
import { AllInquiriesComponent } from './all-inquiries/all-inquiries.component';
import { DetailInquiryComponent } from './detail-inquiry/detail-inquiry.component';
import { AddFileInquiryComponent } from './add-file-inquiry/add-file-inquiry.component';


@NgModule({
  declarations: [
    AddInquiriesComponent,
    AllInquiriesComponent,
    DetailInquiryComponent,
    AddFileInquiryComponent
  ],
  imports: [
    CommonModule,
    InquiriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTabsModule,
    ComponentsModule
  ]
})
export class InquiriesModule { }
