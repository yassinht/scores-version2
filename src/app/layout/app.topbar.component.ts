import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  languages: SelectItem[] = [];
  selectedLanguage: string = 'fr';

  constructor(
    public layoutService: LayoutService,
    private translateService: TranslateService
  ) {
    this.languages = [
        { label: 'Français', value: 'fr' },
      { label: 'English', value: 'en' }
    ];
  }

  onLanguageChange(event: any) {
    const newLang = event.value;
    this.translateService.use(newLang); // Change language
    localStorage.setItem('selectedLanguage', newLang); // Save language preference
  }
}
