import { Component, Input } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { SharedService } from "src/app/core/service/shared.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.sass"],
})
export class AddClientComponent {

  @Input() projectAddEditModal: string = '';
  @Input() clientData: any;
  clientAddForm: UntypedFormGroup;
  clientUpdateForm: UntypedFormGroup;
  Colors:any;
  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService
  ) {
    this.clientAddForm = this.fb.group({
      Client_name: ["", [Validators.required]],
      Phone_number: ["", [Validators.required]],
      Email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      Address: ["", [Validators.required]],
      Color: ['']
    });
  }

  ngOnInit() {
    if(this.projectAddEditModal === 'edit'){
      this.clientUpdateForm = this.fb.group({
        Client_id: [this.clientData.Client_id],
        Client_name: [this.clientData.Client_name],
        Phone_number: [this.clientData.Phone_number],
        Email: [
          this.clientData.Email,
          [Validators.email, Validators.minLength(5)],
        ],
        Address: [this.clientData.Address],
        Color: [this.clientData.Color]
      })
    }

  }


  onSubmit() {
    this.clientAddForm.value.Color = this.Colors
    this.service.addClient(this.clientAddForm.value).subscribe(() => {
      window.location.reload();
    });
  }

  onUpdate() {
    this.clientUpdateForm.value.Color = this.Colors
    this.service.updateClient(this.clientUpdateForm.value).subscribe(() => {
      window.location.reload();
    });
  }

}
