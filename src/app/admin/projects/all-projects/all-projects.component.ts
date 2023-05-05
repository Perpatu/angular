import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { BoardComponent } from "./board/board.component";

@Component({
  selector: "app-all-projects",
  templateUrl: "./all-projects.component.html",
  styleUrls: ["./all-projects.component.sass"],
  providers: [],
})
export class AllprojectsComponent {
 

  @ViewChild(BoardComponent) boardComponent: BoardComponent;
}
