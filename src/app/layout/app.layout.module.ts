import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { DoctorLayoutComponent } from './doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { PatientListAffectModule } from './views/doctor/patient-list-affect/patient-list-affect.module';
import { ListFormsModule } from './views/doctor/list-forms/list-forms.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ComplitProfileComponent } from './views/patient/complit-profile/complit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'; // Correct import for DynamicDialogModule
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Import the ProgressSpinner module
import { ProgressBarModule } from 'primeng/progressbar';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Factory function for creating the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json'); // Adjust path to your translation files
  }
  
@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        DoctorLayoutComponent,
        PatientLayoutComponent,
        ComplitProfileComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,ReactiveFormsModule,
        BadgeModule,CalendarModule,
        RadioButtonModule,DialogModule,
        InputSwitchModule,ButtonModule,
        RippleModule,ProgressBarModule,
        RouterModule,DropdownModule,
        AppConfigModule,   ProgressSpinnerModule,
        PatientListAffectModule,  // Import PatientListAffectModule to use PatientListAffectComponent
        ListFormsModule,DynamicDialogModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
