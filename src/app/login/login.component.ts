import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  activeUser;
  uid;
  constructor(public userService: UserService, public quizService: QuizService) { }

  ngOnInit() {

  }

  signIn(email, password){
    this.userService.logIn(email, password);
    this.getUser();
  }

  log() {
    this.userService.logOut();
  }

  createAccount(email, password, firstName, lastName) {

    var user = this.userService.newAccount(email, password, firstName, lastName);
    user.then( usr => {
      return this.uid = usr.uid;
    })


    setTimeout(x => {
      this.getUser();
      console.log('login = ' + this.activeUser);

      this.quizService.generateQuizzes(this.uid);
    },1000);
  }

  getUser() {
    this.userService.getCurrentUser().subscribe( user => {
      return this.activeUser = user;
    });
  }





}
