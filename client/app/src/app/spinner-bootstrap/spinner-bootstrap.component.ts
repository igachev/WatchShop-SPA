import { Component} from '@angular/core';
import { SpinnerService } from '../services/spinner.service';


@Component({
  selector: 'app-spinner-bootstrap',
  templateUrl: './spinner-bootstrap.component.html',
  styleUrls: ['./spinner-bootstrap.component.scss']
})
export class SpinnerBootstrapComponent {
  
  constructor(public spinnerService: SpinnerService) {}

  isLoading$ = this.spinnerService.loading$;
}
