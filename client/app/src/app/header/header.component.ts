import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
navbarOpen: boolean = false;

constructor(private userService: UserService,
  private router: Router) {}

toggleNavbar(): void {
  this.navbarOpen = !this.navbarOpen
}

get isLogged(): boolean {
  return this.userService.isLogged()
}

logout(): void {
  this.userService.logout();
  this.router.navigate(['/'])
}

}
