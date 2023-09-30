import { AbstractControl, ValidationErrors } from '@angular/forms';

declare const Isikukood: any;  // Declare the third-party library

export function nationalIdentityValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        
        const value = control.value;

        const identity = new Isikukood(value);
        if (identity && identity.validate()) {
            // If validated, set gender and age and disable them
            const genderControl = control.parent?.get('gender');
            const dateOfBirthControl = control.parent?.get('dateOfBirth');

            if (genderControl && dateOfBirthControl) {
                if (identity.getGender() === 'male') {
                    genderControl.patchValue('mees');
                } else if (identity.getGender() === 'female') {
                    genderControl.patchValue('naine');
                }
                

                dateOfBirthControl.patchValue(identity.getBirthday());
            }

            return null;
        }

        return { invalidNationalIdentity: true };
    };
}
