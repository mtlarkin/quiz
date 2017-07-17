import { Component, Input, Output, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ QuizService, UserService ],
  inputs: ['userKey']
})
export class AppComponent {


  public constructor(public quizService: QuizService, public userService: UserService){

  }


}
