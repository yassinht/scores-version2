import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FolderService } from 'src/app/demo/service/folders/folder.service';

@Component({
  selector: 'app-list-folders',
  templateUrl: './list-folders.component.html',
  styleUrls: ['./list-folders.component.scss'],
  providers: [MessageService],

})
export class ListFoldersComponent {
  folders: any[] = [];
  loading: boolean = true;
  selectedPatient: any;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private _folderService: FolderService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchPatients();
  }

  
  fetchPatients() {
    const doctorId = this.authService.getUserId();
    this._folderService.getMyFolders(doctorId).subscribe({
      next: (data) => {
        this.folders = data.map((folder) => ({
          ...folder,
        }));
        console.log(this.folders)
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching folders:', err);
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch folderq.',
        });
        this.loading = false;
      },
    });
  }

  clear(dt: any) {
    dt.clear();
    this.filter.nativeElement.value = '';  // Clear the input field
  }

  onGlobalFilter(dt: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    dt.filterGlobal(value, 'contains');
  }
  
  
}
