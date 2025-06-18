import { Component, input, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
  closeErrorEvent = output();

  closeErrorHandler() {
    this.closeErrorEvent.emit();
  }
}
