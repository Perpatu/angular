import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { SharedService } from "src/app/core/service/shared.service";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: 'app-comment-file',
  templateUrl: './comment-file.component.html',
  styleUrls: ['./comment-file.component.sass']
})
export class CommentFileComponent implements OnInit {

  @Input() File_id: any;
  @Input() Project_id: any;
  commentForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      User: [this.auth.currentUserValue.id],
      File: [this.File_id],
      Text:['']
    })
  }

  addComment(){
    console.log(this.commentForm.value)
    this.service.addFileComment(this.commentForm.value, this.Project_id).subscribe(() => {
      window.location.reload()
    })
  }
}
