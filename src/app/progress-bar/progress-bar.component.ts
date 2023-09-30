import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges {
  @Input() currentStep = 1;
  @Input() formStatuses: string[] = [];  // Add this line
  @Output() stepClick = new EventEmitter<number>();

  steps = [
    { label: 'Isiklik Informatsioon', status: "pending", icon: 'pi-user', index: 1 },
    { label: 'Kontaktandmed', status: "pending", icon: 'pi-phone', index: 2 },
    { label: 'Panga Konto', status: "pending", icon: 'pi-euro', index: 3 },
    { label: 'Hädaabikontakt', status: "pending", icon: 'pi-heart', index: 4 }
  ];

  ngOnChanges(): void {
    this.steps.forEach((step, index) => {
      if (this.formStatuses[index]) {
        step.status = this.formStatuses[index];
      }
    });
  }

  onStepClick(step: number): void {
    this.stepClick.emit(step);
  }
}
