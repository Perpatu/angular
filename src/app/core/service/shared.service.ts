import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  readonly APIUrlUser = "http://98.71.193.168:8000/user/";
  readonly APIUrlProject = "http://98.71.193.168:8000/project/";
  readonly APIUrlFile = "http://98.71.193.168:8000/file/";
  readonly APIUrlDepartment = "http://98.71.193.168:8000/department/";
  readonly APIUrlComment = "http://98.71.193.168:8000/comment/";
  readonly APIUrlClient = "http://98.71.193.168:8000/client/";
  readonly APIUrlQueue = "http://98.71.193.168:8000/queue/";
  readonly APIUrlInquiry = "http://98.71.193.168:8000/inquiry/";

  readonly APIUrlArchive= "http://192.168.1.119:8080/api/";


  constructor(private http: HttpClient) { }

  authHeaders(){
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('auth')

      })
    };
    return headers;
  }

  authHeadersUploadFile(){
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('auth'),        
        observe: 'events'
      })
    };
    return headers;
  }

  /* USER */
  register(value: any){
    return this.http.post<any>(this.APIUrlUser + 'register/', value, this.authHeaders());
  }

  login(name: string, password: string){
    return this.http.post<any>(this.APIUrlUser + 'login/', {name, password}, {withCredentials: true});
  }

  logout(){
    return this.http.post(this.APIUrlUser + 'logout/', {}, {withCredentials: true})
  }

  authToken(name: string, password: string){
    return this.http.post(this.APIUrlUser + 'api-token-auth/', { username: name, password: password });
  }

  getUserCurrent(){
    return this.http.get(this.APIUrlUser + 'get_current/', { withCredentials: true });
  }

  deleteUser(userId: any){
    return this.http.delete(this.APIUrlUser + 'delete/' + userId + '/', this.authHeaders());
  }

  updateUser(value: any){
    return this.http.put(this.APIUrlUser + 'update/', value, this.authHeaders());
  }

  getUsersNotAdmin(){
    return this.http.get(this.APIUrlUser + 'get_not_admin/', this.authHeaders());
  }

  getUsersAdmin(){
    return this.http.get(this.APIUrlUser + 'get_admin/', this.authHeaders());
  }

  getUsersAll(){
    return this.http.get(this.APIUrlUser + 'get_all/', this.authHeaders());
  }

  getUserDetail(userId: any){
    return this.http.get(this.APIUrlUser + 'get_detail/' + userId + '/', this.authHeaders());
  }

  changeAdminPassword(value: any){
    return this.http.put(this.APIUrlUser + 'change_admin_password/', value, this.authHeaders());
  }

  changeUserPassword(val: any) {
    return this.http.put(this.APIUrlUser + 'change_password/', val, this.authHeaders());
  }
  /* USER */


  /* PROJECT */
  addProject(value: any) {
    return this.http.post(this.APIUrlProject + 'add/', value, this.authHeaders());
  }

  updateProject(value: any) {
    return this.http.put(this.APIUrlProject + 'update/', value, this.authHeaders());
  }

  deleteProject(projectId: any) {
    return this.http.delete(this.APIUrlProject + 'delete/' + projectId + '/', this.authHeaders());
  }

  getProjectDetail(projectId: any){
    return this.http.get(this.APIUrlProject + 'get_detail/' + projectId + '/', this.authHeaders());
  }

  getProjectsActive() {
    return this.http.get(this.APIUrlProject + 'get_all_active/', this.authHeaders());
  }

  getProjectsCompleted(){
    return this.http.get(this.APIUrlProject + 'get_all_completed/', this.authHeaders());
  }

  getProjectsPaused(){
    return this.http.get(this.APIUrlProject + 'get_all_paused/', this.authHeaders());
  }

  getProjectsActiveClient(client: any){
    return this.http.get(this.APIUrlProject + 'get_client_active_projects/' + client +'/', this.authHeaders());
  }

  getProjectsActiveClientSorted(){
    return this.http.get(this.APIUrlProject + 'get_projects_client_sorted/', this.authHeaders());
  }

  getProjectsCompletedClient(client: any){
    return this.http.get(this.APIUrlProject + 'get_client_completed_projects/' + client +'/', this.authHeaders());
  }

  getProjectsActiveUser(userId: any){
    return this.http.get(this.APIUrlProject + 'get_user_active/' + userId +'/', this.authHeaders());
  }

  getProjectsCompletedUser(userId: any){
    return this.http.get(this.APIUrlProject + 'get_user_completed/' + userId +'/', this.authHeaders());
  }

  getProjectActiveSecretariat(){
    return this.http.get(this.APIUrlProject + 'get_secretariat_active/', this.authHeaders());
  }

  getProjectCompletedSecretariat(){
    return this.http.get(this.APIUrlProject + 'get_secretariat_completed/', this.authHeaders());
  }

  getProjectsActiveSecretariatClientSorted(){
    return this.http.get(this.APIUrlProject + 'get_projects_client_sorted_secretariat/', this.authHeaders());
  }

  /* PROJECT */


  /* FILES */
  uploadFile(formData:any, projectId:any){
    return this.http.post(this.APIUrlFile + 'upload/' + projectId + '/', formData, { reportProgress: true, observe: 'events' });
  }

  uploadFileInquiry(formData:any){
    return this.http.post(this.APIUrlFile + 'upload_inquiry/', formData, { reportProgress: true, observe: 'events' });
  }

  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get<Blob>(this.APIUrlFile + 'download/' + fileId + '/', { responseType: 'blob' as 'json' });
  }

  downloadInquiryFile(fileId: number): Observable<Blob> {
    return this.http.get<Blob>(this.APIUrlFile + 'download_inquiry/' + fileId + '/', { responseType: 'blob' as 'json' });
  }

  updateFile(value:any, projectId:any){
    return this.http.put(this.APIUrlFile + 'update/' + projectId + '/' , value, this.authHeaders());
  }

  deleteFile(fileId: any, projectId: any) {
    return this.http.delete(this.APIUrlFile + 'delete/' + fileId + '/' + projectId + '/', this.authHeaders());
  }

  deleteInquiryFile(fileId: any) {
    return this.http.delete(this.APIUrlFile + 'delete_inquiry/' + fileId + '/', this.authHeaders());
  }

  getFileDetail(fileId: any){
    return this.http.get(this.APIUrlFile + 'get_detail/' + fileId + '/', this.authHeaders());
  }

  getFileQueue(fileId: any){
    return this.http.get(this.APIUrlFile + 'get_queue/' + fileId + '/', this.authHeaders());
  }

  getFilesAdmin(projectId: any){
    return this.http.get(this.APIUrlFile + 'get_file_admin/' + projectId + '/', this.authHeaders());
  }

  updateFileQueue(value:any){
    return this.http.put(this.APIUrlFile + 'update_queue/', value, this.authHeaders());
  }

  getFilesProjectProduction(projectId: any){
    return this.http.get(this.APIUrlFile + 'get_files_production/' + projectId + '/', this.authHeaders());
  }

  getFilesDepartment(dep: any){
    return this.http.get(this.APIUrlFile + 'get_department_files/' + dep + '/', this.authHeaders());
  }

  getFilesNumberDepartment(dep: any){   
    return this.http.get(this.APIUrlFile + 'number_department_files/' + dep + '/', this.authHeaders());
  }

  getFilesProjectSecretariat(projectId: any){
    return this.http.get(this.APIUrlFile + 'get_files_project_secretariat/' + projectId + '/', this.authHeaders());
  }

  getFilesProjectShop(projectId: any){
    return this.http.get(this.APIUrlFile + 'get_files_project_shop/' + projectId + '/', this.authHeaders());
  }

  getFileInquiry(inquiryId: any){
    return this.http.get(this.APIUrlFile + 'get_files_inquiry/' + inquiryId + '/', this.authHeaders());
  }
  /* FILES */


  /* DEPARTMENTS */
  addDepartment(value:any){
    return this.http.post(this.APIUrlDepartment + 'add/', value, this.authHeaders());
  }

  getColumnAdmin(){
    return this.http.get(this.APIUrlDepartment + 'get_admin_column/', this.authHeaders());
  }

  getColumnDepartment(dep: any){
    return this.http.get(this.APIUrlDepartment + 'get_department_column/' + dep + '/', this.authHeaders());
  }

  updateDepartment(value:any){
    return this.http.put(this.APIUrlDepartment + 'update/', value, this.authHeaders());
  }

  getDepartmentToColumn(){
    return this.http.get(this.APIUrlDepartment + 'get_to_column/', this.authHeaders());
  }

  getDepartments(){
    return this.http.get(this.APIUrlDepartment + 'get_all/', this.authHeaders());
  }

  getDepartmentsMain(){
    return this.http.get(this.APIUrlDepartment + 'get_main/', this.authHeaders());
  }

  getDepartmentDetail(departmentId: any){
    return this.http.get(this.APIUrlDepartment + 'get_detail/' + departmentId + '/', this.authHeaders());
  }

  deleteDepartment(departmentId: any) {
    return this.http.delete(this.APIUrlDepartment + 'delete/' + departmentId + '/', this.authHeaders());
  }
  /* DEPARTMENTS */



  /* CLIENTS */
  addClient(value:any){
    return this.http.post(this.APIUrlClient + 'add/', value, this.authHeaders());
  }

  getClients(){
    return this.http.get(this.APIUrlClient + 'get_all/', this.authHeaders());
  }

  getClientDetail(clientId: any){
    return this.http.get(this.APIUrlClient + 'get_deatil/' + clientId + '/', this.authHeaders());
  }

  updateClient(value:any){
    return this.http.put(this.APIUrlClient + 'update/', value, this.authHeaders());
  }

  deleteClient(clientId: any) {
    return this.http.delete(this.APIUrlClient + 'delete/' + clientId + '/', this.authHeaders());
  }

  /* CLIENTS */


  /* QUEUE */
  addQueue(value:any, projectId:any){
    return this.http.post(this.APIUrlQueue + 'add/' + projectId + '/', value, this.authHeaders());
  }

  updateQueueLogic(value:any, projectId:any){
    return this.http.put(this.APIUrlQueue + 'update/' + projectId + '/', value, this.authHeaders());
  }

  deleteQueue(queueId:any, projectId:any){
    return this.http.delete(this.APIUrlQueue + 'delete/' + queueId + '/' + projectId + '/', this.authHeaders());
  }
  /* QUEUE */

  /* COMMENTS */

  addFileComment(value:any, projectId: any){
    return this.http.post(this.APIUrlComment + 'add_file/' + projectId + '/', value, this.authHeaders());
  }

  addProjectComment(value:any, projectId: any){
    return this.http.post(this.APIUrlComment + 'add_project/' + projectId + '/', value, this.authHeaders());
  }

  deleteFileComment(commentId:any, projectId: any){
    return this.http.delete(this.APIUrlComment + 'delete_file/' + commentId + '/' + projectId + '/', this.authHeaders());
  }

  deleteProjectComment(commentId:any, projectId: any){
    return this.http.delete(this.APIUrlComment + 'delete_project/' + commentId + '/' + projectId + '/', this.authHeaders());
  }
  /* COMMENTS */

  
  /* INQUIRIES */
  addInquiry(value:any){
    return this.http.post(this.APIUrlInquiry + 'add/', value, this.authHeaders());
  }

  getNewInquiries(){
    return this.http.get(this.APIUrlInquiry + 'get_new/' , this.authHeaders());
  }

  getAcceptedInquiries(){
    return this.http.get(this.APIUrlInquiry + 'get_accepted/' , this.authHeaders());
  }

  getRejectedInquiries(){
    return this.http.get(this.APIUrlInquiry + 'get_rejected/' , this.authHeaders());
  }

  getConsiderationInquiries(){
    return this.http.get(this.APIUrlInquiry + 'get_consideration/' , this.authHeaders());
  }

  getDetailInquiries(inquiryId:any){
    return this.http.get(this.APIUrlInquiry + 'get_detail/' + inquiryId + '/' , this.authHeaders());
  }

  getNewQuantityInquiries(){
    return this.http.get(this.APIUrlInquiry + 'get_new_quantity/' , this.authHeaders());
  }

  deleteInquiry(inquiryId: any) {
    return this.http.delete(this.APIUrlInquiry + 'delete/' + inquiryId + '/', this.authHeaders());
  }

  updateInquiry(value: any) {
    return this.http.put(this.APIUrlInquiry + 'update/', value, this.authHeaders());
  }
  /* INQUIRIES */



  /* ARCHIVE */
  getProjectArchive(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlArchive + 'project_end/');
  }

  getProjectView(id: any): Observable<any[]> {    
    return this.http.get<any[]>(this.APIUrlArchive + 'project/' + id + '/');
  }

  getFilesProject(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlArchive + 'files_project/' + id + '/');
  }
  
  getFilesShopProject(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlArchive + 'files_shop_project/' + id + '/');
  }

  getFilesInvoiceProject(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlArchive + 'files_invoice_project/' + id + '/');
  }
  /* ARCHIVE */
}