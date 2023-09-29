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

            console.log('Gender before set: ', genderControl?.value); // Debugging line
            console.log('Date of Birth before set: ', dateOfBirthControl?.value); // Debugging line

            if (genderControl && dateOfBirthControl) {
                genderControl.setValue(identity.getGender());
                dateOfBirthControl.setValue(identity.getBirthday());

                console.log('Gender after set: ', genderControl.value); // Debugging line
                console.log('Date of Birth after set: ', dateOfBirthControl.value); // Debugging line
            }

            return null;
        }

        return { invalidNationalIdentity: true };
    };
}
