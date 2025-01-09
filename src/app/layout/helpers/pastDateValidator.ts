import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;  // If the date is not provided, do not validate

    // Date parsing assuming the format is 'YYYY-MM-DD' as per HTML input date type
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    // Define the range: 18 years ago to 100 years ago
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 100);

    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() - 18);

    // Check if the selected date is within the valid range
    if (selectedDate > maxDate || selectedDate < minDate) {
      return { pastDate: true };
    }

    return null;
  };
}
