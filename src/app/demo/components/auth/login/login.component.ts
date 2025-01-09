import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { CountryService } from 'src/app/demo/service/country.service';
import { jobData } from 'src/assets/demo/data/job-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CountryService],  // Add the provider here

})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true; // Toggle between login and registration
  selectedRole: 'Doctor' | 'Patient' = 'Doctor'; // Default role for registration
  form: FormGroup; // Form group for login/registration
  roles = [
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Patient', value: 'Patient' },
  ];
  countries: any[] = [];
  selectedCountry: any; // Change this to an object, not an array
  genders = [
    { label: 'Homme', value: 'homme' },
    { label: 'Femme', value: 'femme' },
  ];
  
  titles = [
    { label: 'Pr', value: 'professionnel' },
    { label: 'Dr', value: 'doctor' },
    { label: 'Mr', value: 'mester' },
    { label: 'Mme', value: 'miss' },
  ];
  jobs = jobData;
  selectedJob: any = null; // Stores the selected object for dropdown

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router ,// For navigation
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().then(countries => {
      this.countries = countries;
  })
    this.initializeForm();
}

  /**
   * Initialize the form with validation rules
   */
  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // At least one uppercase, one lowercase, one number, and one special character
          ),
        ],
      ],
      confirmPassword: [''], // For registration only
      name: [''],
      lastname: [''],
      birthday: [''],
      tel: [''],
      fax: [''],
      adresse: [''],
      job: [''],
      title: [''],
      rpps: [''],
      ssn: [''],
      consentement: [false], // Default is false
      weight: [''],
      size: [''],
      role: [1], // Default value for role: 1 (Doctor), 2 for Patient
      gender: [''], // New field for gender
      mailConfirmation: [true,],

    });
  
    this.updateValidators();
  }
  
  
  updateValidators(): void {
    // Clear all validators to reset before applying new rules
    this.form.get('name')?.clearValidators();
    this.form.get('lastname')?.clearValidators();
    this.form.get('birthday')?.clearValidators();
    this.form.get('tel')?.clearValidators();
    this.form.get('fax')?.clearValidators();
    this.form.get('adresse')?.clearValidators();
    this.form.get('job')?.clearValidators();
    this.form.get('title')?.clearValidators();
    this.form.get('rpps')?.clearValidators();
    this.form.get('ssn')?.clearValidators();
    this.form.get('weight')?.clearValidators();
    this.form.get('size')?.clearValidators();
    this.form.get('gender')?.clearValidators();
    this.form.get('confirmPassword')?.clearValidators();
    this.form.get('consentement')?.clearValidators();
  
    if (!this.isLoginMode) {
      // Apply validators based on role
      if (this.selectedRole === 'Doctor') {
        this.form.get('name')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.get('lastname')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.get('birthday')?.setValidators([Validators.required, this.pastDateValidator()]);
        this.form.get('tel')?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        this.form.get('fax')?.setValidators([Validators.pattern(/^\d+$/)]); // Only for doctors
        this.form.get('adresse')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.get('title')?.setValidators([Validators.required]); // Only for doctors
        this.form.get('job')?.setValidators([Validators.required]);
        this.form.get('rpps')?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(11)]);
      } else if (this.selectedRole === 'Patient') {
        this.form.get('name')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.get('lastname')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.get('birthday')?.setValidators([Validators.required, this.pastDateValidator()]);
        this.form.get('tel')?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        this.form.get('adresse')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.form.get('ssn')?.setValidators([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern(/^\d+$/),
        ]);
        this.form.get('weight')?.setValidators([Validators.required, this.rangeValidator(30, 300)]);
        this.form.get('size')?.setValidators([Validators.required, this.rangeValidator(100, 250)]);
      }
  
      this.form.get('gender')?.setValidators([Validators.required]); // Required for both roles
      this.form.get('confirmPassword')?.setValidators([Validators.required]); // For registration
      this.form.get('consentement')?.setValidators([Validators.requiredTrue]); // Consent required
      this.form.get('mailConfirmation')?.setValidators([Validators.requiredTrue]); // Consent required

    }
  
    this.form.updateValueAndValidity();
  }
  
  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Form is invalid:', this.form.errors);
      return;
    }
  
    let formData = { ...this.form.value };
  
    formData.role = this.selectedRole === 'Doctor' ? "1" : "2"; // Set role based on the selection
    formData.gender = formData.gender; // Directly save the chosen gender value
    
    const phoneNumberWithCode = this.selectedCountry?.phoneCode + formData.tel;
    formData.tel = phoneNumberWithCode;
    if (this.isLoginMode) {
      // Handle Login
   
      if (this.selectedRole === 'Doctor') {
        const doctorData = {
          email: formData.email,
          password: formData.password
        };
        this.authService.loginDoctor(doctorData).subscribe(
          (response) => {
            this.authService.saveDoctorToken(response.token);
            this.router.navigate(['/doctor']); // Navigate to Doctor's dashboard
          },
          (error) => {
            console.error('Login failed:', error);
          }
        );
      } else if (this.selectedRole === 'Patient') {
       
        const patientData = {
          email: formData.email,
          password: formData.password
        };
      
        console.log(patientData)
        this.authService.loginPatient(patientData).subscribe(
          (response) => {
            this.authService.savePatientToken(response.token);
            this.router.navigate(['/patient']); // Navigate to Patient's dashboard
          },
          (error) => {
            console.error('Login failed:', error);
          }
        );
      }
    }
    if (this.selectedRole === 'Doctor') {
      delete formData.ssn;
      delete formData.weight;
      delete formData.size;
      delete formData.confirmPassword;
    } else if (this.selectedRole === 'Patient') {
      delete formData.job;
      delete formData.rpps;
      delete formData.title;
      delete formData.fax;
      delete formData.confirmPassword;
    }
  
    if (!this.isLoginMode) {
      if (this.selectedRole === 'Doctor') {
        this.authService.registerDoctor(formData).subscribe(
          (response) => {
            console.log('Doctor registered successfully:', response);
            this.resetFormAndToggle();
          },
          (error) => {
            console.error('Registration failed:', error);
          }
        );
      } else if (this.selectedRole === 'Patient') {
        this.authService.registerPatient(formData).subscribe(
          (response) => {
            console.log('Patient registered successfully:', response);
            this.resetFormAndToggle();
          },
          (error) => {
            console.error('Registration failed:', error);
          }
        );
      }
    }
  }
  
  
  

  resetFormAndToggle(): void {
    this.form.reset(); // Clear form values and validation states
    this.isLoginMode = true; // Switch back to login mode
    this.updateValidators(); // Update validators for login mode
  }
  



  /**
   * Custom validator to check for past dates
   */
  pastDateValidator() {
    return (control: AbstractControl) => {
      const inputDate = new Date(control.value);
      const today = new Date();
      return inputDate < today ? null : { pastDate: true };
    };
  }

  /**
   * Custom validator for range validation
   */
  rangeValidator(min: number, max: number) {
    return (control: AbstractControl) => {
      const value = parseInt(control.value, 10);
      return value >= min && value <= max ? null : { outOfRange: true };
    };
  }


    /**
   * Toggle between login and registration modes
   */
    toggleMode(event: Event): void {
      event.preventDefault(); // Prevents default anchor behavior
      this.isLoginMode = !this.isLoginMode; // Toggles the mode
    }
    /**
   * Custom validator to check if passwords match
   */
    passwordMatchValidator() {
      return (group: AbstractControl) => {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordsMismatch: true };
      };
    }
    onJobChange(event: any): void {
      // Update the form control with viewValue only
      const selectedViewValue = event.value.viewValue;
      this.form.patchValue({ job: selectedViewValue });
    }
    
}
