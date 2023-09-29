import { AbstractControl, ValidationErrors } from '@angular/forms';

declare const Isikukood: any;  // Declare the third-party library

export function nationalIdentityValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        const identity = new Isikukood(value);
        if (identity && identity.validate()) {
            // If validated, set gender and age and disable them
            const genderControl = control.parent?.get('gender');
            const ageControl = control.parent?.get('dateOfBirth');

            if (genderControl && ageControl) {
                genderControl.setValue(identity.getGender());
                ageControl.setValue(identity.getBirthday());

                genderControl.disable();  // Disable the gender field
                ageControl.disable();     // Disable the age field
            }

            return null;
        }

        return { invalidNationalIdentity: true };
    };
}
