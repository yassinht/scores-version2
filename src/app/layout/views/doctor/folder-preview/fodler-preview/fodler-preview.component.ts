import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { BreadcrumbService } from 'src/app/demo/service/Breadcrumb/breadcrumb.service';
import { FolderService } from 'src/app/demo/service/folders/folder.service';

@Component({
  selector: 'app-fodler-preview',
  templateUrl: './fodler-preview.component.html',
  styleUrls: ['./fodler-preview.component.scss']
})
export class FodlerPreviewComponent {
  breadcrumbItems: any[] = [];  // Add this line to hold breadcrumb items

  folderName: String;
  folderId: String;
  forms: any[] = [];
  filteredForms: any[] = [];
  selectedFormsArray: any[] = [];
  selectedForm: string | null = null; // To store the ID of the form being affected
  displayDialog: boolean = false; // Control dialog visibility
  loading = false;
  searchQuery: string = '';

  paginatorConfig = {
    rows: 9,
    totalRecords: 0,
    currentPage: 0,
  };

  constructor(
    private router: ActivatedRoute,
    private _folderService: FolderService,
    private breadcrumbService: BreadcrumbService // Inject BreadcrumbService
  ) {
    this.folderName = this.router.snapshot.paramMap.get('name');
    this.folderId = this.router.snapshot.paramMap.get('folderId');
  }

  ngOnInit() {
    this.fetchForms();
    this.updateBreadcrumbs(); // Update breadcrumbs when the component is initialized
  }

  fetchForms() {
    this._folderService.GetFolderById(this.folderId).subscribe(
      (response) => {
        console.log('API Response:', response);
        // Assuming 'response' contains a 'forms' field
        this.forms = Array.isArray(response.forms) ? response.forms : [];
        this.filteredForms = [...this.forms];
        this.paginatorConfig.totalRecords = this.forms.length;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  // Update breadcrumbs using BreadcrumbService
  updateBreadcrumbs() {
    const path = ['list-folders', 'folder-preview', this.folderName.toString()];
    const routeParams = { 'name': this.folderName };
    this.breadcrumbService.updateBreadcrumbs(this.router, path);
  }

  filterForms(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredForms = this.forms.filter((form) =>
      form.title.toLowerCase().includes(query)
    );
  }

  openAffectDialog(form: any) {
    this.selectedForm = form; // Set the ID of the selected form
    this.displayDialog = true;    // Show the dialog
  }

  onMultiAffect() {
    const selectedFormIds = this.selectedFormsArray.map((form) => form.id);
    console.log('Forms selected for multi-affect:', selectedFormIds);
  }

  toggleFormSelection(form: any) {
    if (form.selected) {
      this.selectedFormsArray.push(form);
    } else {
      const index = this.selectedFormsArray.findIndex((f) => f.id === form.id);
      if (index !== -1) {
        this.selectedFormsArray.splice(index, 1);
      }
    }
  }

  isMultiAffectEnabled() {
    return this.selectedFormsArray.length > 1;
  }

  clear(dt: any) {
    dt.clear();
    this.searchQuery = '';  // Clear the search query
  }

  onGlobalFilter(dt: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

  
}