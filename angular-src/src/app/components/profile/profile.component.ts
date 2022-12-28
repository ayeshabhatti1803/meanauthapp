import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ROUTES } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user: any;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {

    if(!this.authService.checkuser())
    {
      this.router.navigate(['login']);
    }

    this.authService.getProfile().subscribe({
      next:(profile:any) =>
       {this.user = profile.user;},
      error:(err:any) =>
      {console.log(err);
        return false;},
      
    });
    
  }

}

