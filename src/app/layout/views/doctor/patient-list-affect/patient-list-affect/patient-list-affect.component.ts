import { MessageService } from 'primeng/api';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { InvitaionService } from 'src/app/demo/service/invitation/invitaion.service';
import { PatientService } from 'src/app/demo/service/patient/patient.service';

@Component({
  selector: 'app-patient-list-affect',
  templateUrl: './patient-list-affect.component.html',
  styleUrls: ['./patient-list-affect.component.scss'],
  providers: [MessageService],
})
export class PatientListAffectComponent implements OnInit {
  @Input() form: any = ''; // Get form from the parent component
  patients: any[] = [];
  selectedPatient: any = {};
  selectedForms: Set<string> = new Set<string>();
  forms: any;

  constructor(
    private patientService: PatientService,
    private _formService: FormsService,
    private _InvitaionService: InvitaionService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log(this.form);
    this.fetchPatients(this.form);
    if (this.form) {
      console.log(this.form);
      this.fetchPatients(this.form);
    }
  }

  fetchPatients(form) {
    const doctorId = this.authService.getUserId();
    this._InvitaionService.myContactsPatient(doctorId).subscribe({
      next: (data) => {
        this.patients = data.map((patient) => ({
          ...patient,
        }));
        console.log(this.patients);
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
      },
    });
  }

  toggleFormSelection(form: any) {
    if (this.selectedForms.has(form._id)) {
      this.selectedForms.delete(form._id);
    } else {
      this.selectedForms.add(form._id);
    }
  }

  affectForms(patientId: any) {
    const doctorId = this.authService.getUserId();
    const formIds = Array.isArray(this.form) ? this.form.map((f) => f._id) : [this.form._id];

    formIds.forEach((formId) => {
      const affectData = {
        user: patientId,
        doctor: doctorId,
        form: formId,
      };

      this._formService.affectForm(doctorId, affectData).subscribe(
        (response) => {
          console.log(response);
          if (response && response.affected === 1) {
            this.messageService.add({
              key: 'tst',
              severity: 'success',
              summary: this.getTranslation('actions'),
              detail: this.getTranslation('formAffectedSuccessfully'),
            });
          } else if (response && response.affected === 0) {
            const affectedForm = response.affectedForm;
            console.log(response)
            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: this.getTranslation('actions'),
              detail: this.getTranslation('formAlreadyAffected'),
            });
          } else {
            console.log(response)

            this.messageService.add({
              key: 'tst',
              severity: 'error',
              summary: this.getTranslation('actions'),
              detail: this.getTranslation('formAffectationFailed'),
            });
          }
        },
        (error) => {
          this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: this.getTranslation('actions'),
            detail: this.getTranslation('formAffectationFailed'),
          });
        },
        () => {
          if (this.forms) {
            this.toggleFormSelection(this.forms.find((form) => form._id === formId));
          }
        }
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && changes['form'].currentValue) {
      console.log('Received Form ID:', changes['form'].currentValue);
      this.fetchPatients(changes['form'].currentValue); // Fetch data when form changes
    }
  }

  clear(dt: any) {
    dt.clear();
  }

  onGlobalFilter(dt: any, event: Event) {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  // Helper function for translation based on the current language
  getTranslation(key: string, ...args: any[]): string {
    const translations = {
      en: {
        affectation: {
          actions: 'Actions',
          formAffectedSuccessfully: 'Form affected successfully',
          formAffectationFailed: 'Form affection failed',
          formAlreadyAffected: (formTitle: string) => `The form is already affected`,
        },
      },
      fr: {
        affectation: {
          actions: 'Actions',
          formAffectedSuccessfully: 'Formulaire affecté avec succès',
          formAffectationFailed: 'L\'affectation du formulaire a échoué',
          formAlreadyAffected: (formTitle: string) => `Le formulaire est déjà affecté`,
        },
      },
    };

    const language = localStorage.getItem('language') || 'en'; // Default to English
    const translation = translations[language]?.affectation[key];
    return typeof translation === 'function' ? translation(...args) : translation || key;
  }
}
