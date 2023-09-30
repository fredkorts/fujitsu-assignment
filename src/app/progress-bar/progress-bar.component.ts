import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {

  @Input() currentStep = 1;
  @Input() formStatuses: (boolean | undefined)[] = [];

  @Output() stepClick = new EventEmitter<number>();

  steps = [
    { label: 'Isiklik Informatsioon', status: "pending", icon: 'pi-user', index: 1 },
    { label: 'Kontaktandmed', status: "pending", icon: 'pi-phone', index: 2 },
    { label: 'Panga Konto', status: "pending", icon: 'pi-euro', index: 3 },
    { label: 'Hädaabikontakt', status: "pending", icon: 'pi-heart', index: 4 }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formStatuses'] && this.formStatuses) {
      this.steps.forEach((step, index) => {
        step.status = this.formStatuses[index] ? 'completed' : 'error'; // adjust according to your needs
      });
    }
  }

  onStepClick(step: number): void {
    this.stepClick.emit(step);
  }
}
