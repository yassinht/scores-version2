import { AbstractControl, ValidatorFn, FormArray, FormGroup } from '@angular/forms';

/**
 * Validator function to check the length of the Social Security Number (SSN).
 * @returns Validator function that validates the SSN length.
 */
export function ssnLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const ssn = control.value;
    if (ssn && ssn.toString().length !== 9) {
      return { ssnLength: true };
    }
    return null;
  };
}

/**
 * Validator function to check the length of the RPPS (Répertoire Partagé des Professionnels de Santé) number.
 * @returns Validator function that validates the RPPS length.
 */
export function rppsLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const rpps = control.value;
    if (rpps && rpps.toString().length !== 12) {
      return { rppsLength: true };
    }
    return null;
  };
}

/**
 * Validator function to check the length of telephone or fax numbers.
 * @returns Validator function that validates the length of telephone or fax numbers.
 */
export function telFaxLengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const tel = control.value;
    if (tel && (tel.toString().length > 12 || tel.toString().length < 8)) {
      return { telLength: true };
    }
    return null;
  };
}

/**
 * Validator function to check if the size is within the specified range (50 to 250).
 * @returns Validator function that validates the size range.
 */
export function sizeRangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const size = control.value;
    if (size && (size < 50 || size > 250)) {
      return { sizeRange: true };
    }
    return null;
  };
}

/**
 * Validator function to check if the weight is within the specified range (20 to 300).
 * @returns Validator function that validates the weight range.
 */
export function weightRangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const weight = control.value;
    if (weight && (weight < 20 || weight > 300)) {
      return { weightRange: true };
    }
    return null;
  };
}

/**
 * Validator function to check if the length of a value is within a specified range.
 * @param minLength Minimum length allowed.
 * @param maxLength Maximum length allowed.
 * @returns Validator function that validates the length range.
 */
export function lengthRangeValidator(minLength: number, maxLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value ? control.value.toString() : '';

    if (value.length < minLength || value.length > maxLength) {
      return { lengthRange: true };
    }
    return null;
  };
}
export function allQuestionsAnsweredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const sections = control.get('sections') as FormArray;
    for (let section of sections.controls) {
      const questions = section.get('questions') as FormArray;
      for (let question of questions.controls) {
        if (!question.valid) {
          return { 'notAllQuestionsAnswered': true };
        }
      }
    }
    return null;
  }}