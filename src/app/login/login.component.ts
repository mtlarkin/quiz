import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  activeUser;
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

signIn(email, password){
  this.userService.logIn(email, password);
  this.getUser();
}

createAccount(email, password, firstName, lastName) {
  this.userService.newAccount(email, password, firstName, lastName);
  this.getUser();
}

getUser() {
  this.userService.getCurrentUser().subscribe( user => {
    this.activeUser = user;
  });
}
}
