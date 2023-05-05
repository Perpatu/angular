import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from "src/app/core/service/shared.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-all-clients",
  templateUrl: "./all-clients.component.html",
  styleUrls: ["./all-clients.component.sass"],
})
export class AllclientComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ["name", 'address', 'email', 'phone', 'date_added', 'color', 'options'];
  clientList: any = [];
  dataSource: any = [];
  dataSourceLength: number;
  titleModal: string;
  projectAddEditModal: string = "";
  clientData: any;

  constructor(
    private service: SharedService,
    private modalService: NgbModal,
    public snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  loadData() {
    this.service.getClients().subscribe((data) => {
      this.clientList = data;
      this.dataSource = new MatTableDataSource(this.clientList);
      this.dataSourceLength = this.dataSource.filteredData.length
      this.dataSource.sort = this.sort;
    });
  }

  FilterFn(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editClient(content: any, client: any) {
    this.clientData = client;
    this.titleModal = 'Edit Client';
    this.modalService.open(content, { centered: true, size: 'lg' });
    this.projectAddEditModal = 'edit';
  }

  addNewClient(content) {
    this.titleModal = 'Add a new Client';
    this.modalService.open(content, { centered: true, size: 'lg' });
    this.projectAddEditModal = 'add';
  }

  deleteClient(client: any) {
    this.service.deleteClient(client.Client_id).subscribe(() => {
      this.loadData();
      this.infoSnackBar('Client deleted successfully ' + client.Client_name, 'OK');
    });
  }
}
