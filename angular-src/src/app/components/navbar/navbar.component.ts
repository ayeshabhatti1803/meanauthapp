import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashmessageComponent } from '../flashmessage/flashmessage.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  successMessage: string;
  backgroundColor : string;

  constructor(private authService: AuthService,
    private router: Router,) {
      
   this.successMessage = '';
   this.backgroundColor = '';

    }

  loggedIn()
    {
        return this.authService.checkuser();
    }

  ngOnInit()  {
    
  }

  setMessage(message:string,success : boolean){
      
    if(success)
    {
      this.backgroundColor = 'green';
    }
    else
    {
      this.backgroundColor = 'red';
    }
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
    }

onLogoutClick() {
this.authService.logout();
this.setMessage("You are now logged out",true);
this.router.navigate(['/login']);
return false;
}


  }

