import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
  outputs: ['userRetrieved']
})
export class LoginComponent implements OnInit {

  userRetrieved = new EventEmitter();
  currentUser: Object;
  activeUserId: string;
  constructor(public userService: UserService, public quizService: QuizService) { }

  ngOnInit() {
    
  }

  signIn(email, password) {
    this.userService.logOut();
    this.userService.logIn(email, password);
    this.currentUser = this.userService.getUserById();

      this.getUser();
      


      console.log("sign in:  " + this.activeUserId);
      this.userRetrieved.emit(this.activeUserId);

  }

  log() {
    this.userService.logOut();
  }

  createAccount(email, password, firstName, lastName) {
    this.userService.logOut();
    var user = this.userService.newAccount(email, password, firstName, lastName);
    this.getUser();

    this.currentUser = this.userService.getUserById();
    setTimeout(x => {

      this.quizService.generateQuizzes(this.activeUserId);
    }, 1000);
  }

  getUser() {
    return this.activeUserId = this.userService.getCurrentUser();
  }
  





}
