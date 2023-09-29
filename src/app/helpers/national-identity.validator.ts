import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

declare const Isikukood: any; // We declare the global variable provided by the third-party JS library

export function nationalIdentityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      // if control is empty, not validating that here
      return null;
    }

    const ik = new Isikukood(control.value);

    if (!ik.validate()) {
      return { invalidNationalIdentity: true };
    }

    return null;
  };
}
