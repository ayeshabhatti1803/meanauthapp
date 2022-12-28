import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
  
     }
  ngOnInit() {
    if(!this.authService.checkuser())
    {
      this.router.navigate(['login']);
    }
  }
}
