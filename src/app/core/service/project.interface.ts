export interface Project{
    Project_id: number;   
    Project_name: string;
    Project_date_created: string;
    Project_date_modified: string;
    Project_end_date: string;
    Project_progress: string;
    Project_priority: string;
    Project_status: string;   
    Project_number: string; 
    Project_client: string;
    Project_secretariat: boolean;  
    Project_or_order: string;
    Project_order_number: string;
    Project_message: boolean;
    Project_invoice: string;
    Project_copy: string;
    Project_copy_status: boolean;  
    Project_copy_file_status: boolean;
    User_created: string;
    User_id: number;
}