import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { ComponentsModule } from "../../shared/components/components.module";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DetailDepartmentComponent } from './detail-department/detail-department.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CommentFileComponent } from '../projects/project-details/comment-file/comment-file.component';

@NgModule({
    declarations: [
        AddDepartmentComponent,
        AllDepartmentsComponent,
        DetailDepartmentComponent,
        CommentFileComponent
    ],
    imports: [
        CommonModule,
        DepartmentsRoutingModule,
        ComponentsModule,
        MatTableModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatCheckboxModule,
        NgxExtendedPdfViewerModule
    ]
})
export class DepartmentsModule { }
