import { Router, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { ROUTES } from "./sidebar-items";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { SharedService } from "src/app/core/service/shared.service";


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})

export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems: any[];
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  departments: any = [];
  routerObj = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private service: SharedService
  ) {
    const body = this.elementRef.nativeElement.closest("body");
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, "overlay-open");
      }
    });
  }
  @HostListener("window:resize", ["$event"])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, "overlay-open");
    }
  }
  callToggleMenu(event: any, length: any) {
    if (length > 0) {
      const parentElement = event.target.closest("li");
      const activeClass = parentElement.classList.contains("active");

      if (activeClass) {
        this.renderer.removeClass(parentElement, "active");
      } else {
        this.renderer.addClass(parentElement, "active");
      }
    }
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      this.userFullName =
        this.authService.currentUserValue.first_name +
        " " +
        this.authService.currentUserValue.last_name;

      this.sidebarItems = ROUTES.filter(
        (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf("All") !== -1
      );
      if (userRole === Role.Admin) {
        this.userType = Role.Admin;
      } else if (userRole === Role.Client) {
        this.userType = Role.Client;
      } else if (userRole === Role.Employee) {
        this.userType = Role.Employee;
      } else {
        this.userType = Role.Admin;
      }      
    }


    this.addDepartments();
    // this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    this.initLeftSidebar();
    
    this.bodyTag = this.document.body;    
    this.quantityInquiries();
    /*setInterval(() => {
      this.quantityInquiries();
    }, 60000)*/
  }

  addDepartments(){
    if(this.authService.currentUserValue.role === "Admin"){
      this.service.getDepartments().subscribe((data:any) => {
        this.departments = data;
        let submenuObj: any = []
        for(let i = 0; this.departments.length > i; i++){
          var obj = {        
            path: "admin/departments/" + this.departments[i].Departments_name + "/",
            title: this.departments[i].Departments_name,
            iconType: "",
            icon: "",        
            class: "",
            groupTitle: false,  
            badge: "",
            badgeClass: "", 
            role: [''],
            submenu: [],       
          }        
          submenuObj.push(obj)
        }
        for(let i = 0; ROUTES.length > i; i++){
          if(ROUTES[i].title === 'Działy'){
            for(let j = 0; submenuObj.length > j; j++){
              ROUTES[i].submenu.push(submenuObj[j])
            }     
          }
        }
      })      
    }
    else {
      this.service.getDepartments().subscribe((data:any) => {
        this.departments = data;
        let submenuObj: any = []
        for(let i = 0; this.departments.length > i; i++){
          var obj = {        
            path: "employee/departments/" + this.departments[i].Departments_name + "/",
            title: this.departments[i].Departments_name,
            iconType: "",
            icon: "",        
            class: "",
            groupTitle: false,  
            badge: "",
            badgeClass: "", 
            role: [''],
            submenu: [],       
          }        
          submenuObj.push(obj)
        }
        for(let i = 0; ROUTES.length > i; i++){
          if(ROUTES[i].title === 'Działy'){
            for(let j = 0; submenuObj.length > j; j++){
              ROUTES[i].submenu.push(submenuObj[j])
            }     
          }
        }
      })
    }
  }


  quantityInquiries() {
    this.service.getNewQuantityInquiries().subscribe((data: any) => {
      if (data > 0){
        for (let i = 0; ROUTES.length > i; i++) {
          if (ROUTES[i].title === 'Zapytania') {          
            ROUTES[i].badge = data
          }
        }
      }
      if (data > 9){
        for (let i = 0; ROUTES.length > i; i++) {
          if (ROUTES[i].title === 'Zapytania') {          
            ROUTES[i].badge = '9+'
          }
        }
      }
    })
  }

  
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + "";
    this.listMaxWidth = "500px";
  }
  isOpen() {
    return this.bodyTag.classList.contains("overlay-open");
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, "ls-closed");
    } else {
      this.renderer.removeClass(this.document.body, "ls-closed");
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("submenu-closed")) {
      this.renderer.addClass(this.document.body, "side-closed-hover");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("side-closed-hover")) {
      this.renderer.removeClass(this.document.body, "side-closed-hover");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    this.authService.logout();
  }
}