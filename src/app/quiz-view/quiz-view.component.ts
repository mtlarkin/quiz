import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { QuizService } from '../quiz.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css'],
  providers: [ UserService, QuizService],
  inputs: ['user:userFromAppView']
})
export class QuizViewComponent implements OnInit {
  user;
  allUserQuizzes: Object;
  selectedQuiz: Array<any>;



  currentUser: FirebaseObjectObservable<any>;
  currentUserQuizzes: FirebaseListObservable<any>;

  constructor(public quizService: QuizService, public userService: UserService) {
  }

  ngOnInit() {
    if (this.user) {
      this.allUserQuizzes = this.quizService.getCurrentUserQuizList();
    }

  }

  test(quizKey){
    this.selectedQuiz = this.quizService.startSelectedQuiz(this.user.$key, quizKey);
    console.log(this.selectedQuiz);

  }
}
