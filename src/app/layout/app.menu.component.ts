import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/service/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit, OnDestroy {
  model: any[] = [];
  isLogoutDialogVisible: boolean = false; // Controls the visibility of the logout dialog
  private langChangeSub!: Subscription; // Subscription for language changes

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    // Initialize menu
    this.buildMenu();

    // Listen to language changes
    this.langChangeSub = this.translateService.onLangChange.subscribe(() => {
      this.buildMenu(); // Rebuild the menu on language change
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  private buildMenu() {
    const role = this.authService.getUserRole();

    if (role === 'Doctor') {
      this.model = [
        {
          label: 'Professionnel ',
          items: [
          ],
        
        },
        {
          label: '',
          items: [
            // { label: this.translateService.instant('menu.home'), icon: this.getIcon('home'), routerLink: ['/'] },
            { label: this.translateService.instant('menu.profile'), icon: this.getIcon('profile'), routerLink: ['/doctor/profil'] },
          ],
        },
        {
          label: this.translateService.instant('menu.patients'),
          items: [
            // { label: this.translateService.instant('menu.patientList'), icon: this.getIcon('patientList'), routerLink: ['/doctor/list-patients'] },
            { label: this.translateService.instant('menu.addPatient'), icon: this.getIcon('addPatient'), routerLink: ['/doctor/create-patient'] },
            { label: this.translateService.instant('menu.myPatients'), icon: this.getIcon('myPatients'), routerLink: ['/doctor/my-patient'] },
          ],
        },
        {
          label: this.translateService.instant('menu.forms'),
          items: [
            { label: this.translateService.instant('menu.formList'), icon: this.getIcon('formList'), routerLink: ['/doctor/list-forms'], badge: 'NEW' },
            // { label: this.translateService.instant('menu.completedForms'), icon: this.getIcon('completedForms'), url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            // { label: this.translateService.instant('menu.reports'), icon: this.getIcon('reports'), url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
          ],
        },
        {
          label: this.translateService.instant('menu.files'),
          items: [
            { label: this.translateService.instant('menu.fileList'), icon: this.getIcon('fileList'), routerLink: ['/doctor/list-folders'] },
          ],
        },
        {
          label: '',
          items: [
            { label: this.translateService.instant('menu.logout'), icon: this.getIcon('logout'), command: () => this.showLogoutDialog() }
          ],
        },
      ];
    } else if (role === 'Patient') {
      this.model = [
        {
          label: '',
          items: [
            // { label: this.translateService.instant('menu.home'), icon: this.getIcon('home'), routerLink: ['/patient/acceuil'] },
            { label: this.translateService.instant('menu.profile'), icon: this.getIcon('profile'), routerLink: ['/patient/profil'] },
          ],
        },
        {
          label: this.translateService.instant('menu.professionals'),
          items: [
            // { label: this.translateService.instant('menu.invitations'), icon: this.getIcon('invitations'), routerLink: ['/patient/list-invitaions'] },
            { label: this.translateService.instant('menu.profList'), icon: this.getIcon('profList'), routerLink: ['/patient/list-doctors'] },
          ],
        },
        {
          label: this.translateService.instant('menu.forms'),
          items: [
            { label: this.translateService.instant('menu.pendingForms'), icon: this.getIcon('pendingForms'), routerLink: ['/patient/list-forms'], badge: 'NEW' },
            // { label: this.translateService.instant('menu.completedForms'), icon: this.getIcon('completedForms'), routerLink: ['/patient/response-filled'] },
          ],
        },
        {
          label: '',
          items: [
            { label: this.translateService.instant('menu.logout'), icon: this.getIcon('logout'), command: () => this.showLogoutDialog() }
          ],
        },
      ];
    }
  }

  private getIcon(label: string): string {
    const iconMap: { [key: string]: string } = {
      'home': 'pi pi-fw pi-home',
      'profile': 'pi pi-fw pi-user',
      'patientList': 'pi pi-fw pi-users',
      'addPatient': 'pi pi-fw pi-user-plus',
      'myPatients': 'pi pi-fw pi-book',
      'formList': 'pi pi-fw pi-list',
      'completedForms': 'pi pi-fw pi-check',
      'reports': 'pi pi-fw pi-chart-bar',
      'fileList': 'pi pi-fw pi-folder',
      'invitations': 'pi pi-fw pi-envelope',
      'profList': 'pi pi-fw pi-briefcase',
      'pendingForms': 'pi pi-fw pi-pencil',
      'logout': 'pi pi-fw pi-sign-out'
    };

    return iconMap[label] || 'pi pi-fw pi-question-circle';
  }

  logout(role: any): void {
    this.authService.logout(role);
    this.router.navigate(['/']); // Redirect to login page after logout
  }
  showLogoutDialog(): void {
    this.isLogoutDialogVisible = true; // Show the logout dialog
  }
  
  confirmLogout(): void {
    this.logout(this.authService.getUserRole());
    this.isLogoutDialogVisible = false; // Close the dialog after logout
  }
  
  cancelLogout(): void {
    this.isLogoutDialogVisible = false; // Close the dialog if cancel is clicked
  }
  
}
