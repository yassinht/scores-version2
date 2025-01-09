import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService
    ) { 
        // Retrieve the saved language or default to French
        const savedLanguage = localStorage.getItem('selectedLanguage');
        const defaultLanguage = savedLanguage || 'fr';

        // Set default and current language
        translate.setDefaultLang('fr'); // Explicitly set French as default
        translate.use(defaultLanguage);
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    // Optional method to change language globally
    changeLanguage(lang: string) {
        this.translate.use(lang);
        localStorage.setItem('selectedLanguage', lang); // Save preference
    }
}
