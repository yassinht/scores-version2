import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { InvitaionService } from 'src/app/demo/service/invitation/invitaion.service';

@Component({
  selector: 'app-list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.scss']
})
export class ListFormsComponent {
  forms: any[] = [];
  filteredForms: any[] = [];
  selectedFormsArray: any[] = [];
  selectedForm: string | null = null; // To store the ID of the form being affected
  displayDialog: boolean = false; // Control dialog visibility
  loading = false;
  searchQuery: string = '';
  @ViewChild('globalFilter') globalFilter: ElementRef;
  doctorId:any

  paginatorConfig = {
    rows: 9,
    totalRecords: 0,
    currentPage: 0,
  };

  constructor(
    private authService: AuthService,
    private formsService: FormsService,
    private invservice: InvitaionService
  ) {}

  ngOnInit() {
    this.doctorId = this.authService.getUserId();

    this.fetchForms();
  }

  fetchForms() {
    this.formsService.getMyForms().subscribe(
      (response) => {
        console.log(response)
        this.forms = response;
        this.filteredForms = response;
        this.paginatorConfig.totalRecords = response.length;
      },
      () => {
        console.error('Error fetching forms');
      }
    );
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
    this.globalFilter.nativeElement.value = '';  // Clear the input field
  }

  onGlobalFilter(dt: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

}
