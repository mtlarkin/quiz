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

  selectedQuiz;
  questionObjectArray;

  currentQuestionIndex:number = 0;
  currentQuestionAnswers = [];
  correctCount:number = 0;



  currentUser: FirebaseObjectObservable<any>;
  currentUserQuizzes: FirebaseListObservable<any>;

  constructor(public quizService: QuizService, public userService: UserService) {
  }

  ngOnInit() {
    if (this.user) {
      this.allUserQuizzes = this.quizService.getCurrentUserQuizList();
    }

  }

  submitAnswer(answer){

  }

  startQuiz() {
    var activeQuestion = this.questionObjectArray[this.currentQuestionIndex];

    this.currentQuestionAnswers.push(activeQuestion.correct);
    this.currentQuestionAnswers.push(activeQuestion.wrong1);
    this.currentQuestionAnswers.push(activeQuestion.wrong2);
    this.currentQuestionAnswers.push(activeQuestion.wrong3);

    var temp = new Array(0, 1, 2, 3);
    var shuffledAnswers = [];

    var shuffledOrder = this.quizService.shuffle(temp);

    for (var i = 0; i<shuffledOrder.length; i++){
      var position = shuffledOrder[i];
      shuffledAnswers.push(this.currentQuestionAnswers[position])
    }
    return this.currentQuestionAnswers = shuffledAnswers;
  }

  selectQuiz(quizKey){

    this.selectedQuiz = this.quizService.startSelectedQuiz(this.user.$key, quizKey);

    var questions = [];

    for (var questionKey of this.selectedQuiz) {

      this.quizService.getQuestionByKey(questionKey).subscribe( question => {
        questions.push(question);
      });

    }

    return this.questionObjectArray = questions;

  }
}
