import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DoctorLayoutComponent } from './layout/doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'dash', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                ]
            },
            { path: 'doctor', component: DoctorLayoutComponent, data: { breadcrumb: 'Doctor' },
                children: [
                    { path: 'profil', loadChildren: () => import('./layout/views/doctor/doctor-profile/doctor-profile.module').then(m => m.DoctorProfileModule), data: { breadcrumb: 'Profile' }},
                    { path: 'bilan-preview/:patientId', loadChildren: () => import('./layout/views/doctor/bilan-view/bilan-view.module').then(m => m.BilanViewModule), data: { breadcrumb: 'Bilan Preview' }},
                    { path: 'list-patients', loadChildren: () => import('./layout/views/doctor/list-patients/list-patients.module').then(m => m.ListPatientsModule), data: { breadcrumb: 'List Patients' }},
                    { path: 'create-patient', loadChildren: () => import('./layout/views/doctor/create-patient/create-patient.module').then(m => m.CreatePatientModule), data: { breadcrumb: 'Create Patient' }},
                    { path: 'my-patient', loadChildren: () => import('./layout/views/doctor/my-patients/my-patients.module').then(m => m.MyPatientsModule), data: { breadcrumb: 'My Patients' }},
                    { path: 'list-folders', loadChildren: () => import('./layout/views/doctor/list-folders/list-folders.module').then(m => m.ListFoldersModule), data: { breadcrumb: 'List Folders' }},
                    { path: 'list-forms', loadChildren: () => import('./layout/views/doctor/list-forms/list-forms.module').then(m => m.ListFormsModule), data: { breadcrumb: 'List Forms' }},
                    { path: 'form-preview/:id', loadChildren: () => import('./layout/views/doctor/form-preview/form-preview.module').then(m => m.FormPreviewModule), data: { breadcrumb: 'Form Preview' }},
                    { path: 'response', loadChildren: () => import('./layout/views/doctor/response-view/response-view.module').then(m => m.ResponseViewModule), data: { breadcrumb: 'Response' }},
                    { path: 'patient-list-affect/:formId', loadChildren: () => import('./layout/views/doctor/patient-list-affect/patient-list-affect.module').then(m => m.PatientListAffectModule), data: { breadcrumb: 'Patient List Affect' }},
                    { path: 'folder-preview/:name/:folderId', loadChildren: () => import('./layout/views/doctor/folder-preview/folder-preview.module').then(m => m.FolderPreviewModule), data: { breadcrumb: 'Folder Preview' }},
                    { path: 'patientCreation-form', loadChildren: () => import('./layout/views/doctor/patient-creation-form/patient-creation-form.module').then(m => m.PatientCreationFormModule), data: { breadcrumb: 'Patient Creation' }},
                    { path: 'fich-patient/:patientId', loadChildren: () => import('./layout/views/doctor/fich-patient/fich-patient.module').then(m => m.FichPatientModule), data: { breadcrumb: 'fiche Patient' }},
                    { path: 'response-preview/:idPatient/:idDocter/:idForm/:tryNumber', loadChildren: () => import('./layout/views/doctor/response-view/response-view.module').then(m => m.ResponseViewModule), data: { breadcrumb: 'Response Preview' }},

                ]
            },
            { path: 'patient', component: PatientLayoutComponent, data: { breadcrumb: 'Patient' },
                children: [
                    { path: 'profil', loadChildren: () => import('./layout/views/patient/patient-profile/patient-profile.module').then(m => m.PatientProfileModule), data: { breadcrumb: 'Profile' }},
                    { path: 'list-doctors', loadChildren: () => import('./layout/views/patient/doctors-list/doctors-list.module').then(m => m.DoctorsListModule), data: { breadcrumb: 'List Doctors' }},
                    { path: 'list-invitaions', loadChildren: () => import('./layout/views/patient/invt-list/invt-list.module').then(m => m.InvtListModule), data: { breadcrumb: 'List Invitations' }},
                    { path: 'list-forms', loadChildren: () => import('./layout/views/patient/form-list/form-list.module').then(m => m.FormListModule), data: { breadcrumb: 'List Forms' }},
                    { path: 'form-preview/:id/:iddoctor/:idpatient', loadChildren: () => import('./layout/views/patient/form-preview/form-preview.module').then(m => m.FormPreviewModule), data: { breadcrumb: 'Form Preview' }},
                    { path: 'list-responses/:doctorId/:formId', loadChildren: () => import('./layout/views/patient/response-list/response-list.module').then(m => m.ResponseListModule), data: { breadcrumb: 'List Responses' }},
                    { path: 'response-preview/:idPatient/:idDocter/:idForm/:tryNumber', loadChildren: () => import('./layout/views/patient/response-preview/response-preview.module').then(m => m.ResponsePreviewModule), data: { breadcrumb: 'Response Preview' }},
                    { path: 'response-filled', loadChildren: () => import('./layout/views/patient/response-details/response-details.module').then(m => m.ResponseDetailsModule), data: { breadcrumb: 'Profile' }},

                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule), data: { breadcrumb: 'Authentication' }},
            { path: '', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule), data: { breadcrumb: 'Landing' }},
            { path: 'notfound', component: NotfoundComponent, data: { breadcrumb: 'Not Found' }},
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
