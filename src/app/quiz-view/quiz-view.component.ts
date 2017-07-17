import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { QuizQuestion } from '../models/quiz-question.model';

import { QuizService } from '../quiz.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css'],
  providers: [UserService, QuizService],
  inputs: ['userKey:userFromAppView']
})
export class QuizViewComponent implements OnInit {
  user;
  userKey: string;
  allUserQuizzes: Object;

  selectedQuiz;
  questionObjectArray;

  currentQuestionIndex: number = 0;
  currentQuestionAnswers = [];
  currentQuestion;
  answerArray: Array<QuizQuestion> = [];


  currentUser: FirebaseObjectObservable<any>;
  currentUserQuizzes: FirebaseListObservable<any>;
  currentQuizKey: string;

  constructor(public quizService: QuizService, public userService: UserService) {
  }

  ngOnInit() {
    console.log(this.userKey);
    if (this.userKey) {
      this.quizService.getCurrentUserQuizList(this.userKey).subscribe(list => {
        return this.allUserQuizzes = list;
      });
      console.log(this.allUserQuizzes);
    }

  }

  submitAnswer(answer) {
    var correct: boolean = null;


    if (answer === this.questionObjectArray[this.currentQuestionIndex].correct) {
      correct = true;
    } else {
      correct = false;
    }

    var result = new QuizQuestion(this.questionObjectArray[this.currentQuestionIndex].$key, answer, correct);

    if (this.currentQuestionIndex + 1 === this.questionObjectArray.length) {
      // this.answerArray.push(result);
      console.log("below:");
      console.log(this.currentQuestion);
      console.log("submitting data");
      this.quizService.updateQuestionAnswerAndScore(this.currentQuizKey, this.answerArray);
      console.log(this.currentQuestionIndex);
      this.currentQuestionIndex++;
      this.endQuiz();
    } else {

      this.answerArray.push(result);
      console.log(this.currentQuestionIndex);
      this.currentQuestionIndex++;
      this.currentQuestionAnswers = new Array(0);

      this.startQuiz();

    }


  }

  endQuiz() {
   this.selectedQuiz = undefined;
   this.questionObjectArray = [];

   this.currentQuestionIndex = 0;
   this.currentQuestionAnswers = [];
   this.currentQuestion = undefined;
   this.answerArray = [];
   return;
  }

  startQuiz() {

    this.currentQuestion = this.questionObjectArray[this.currentQuestionIndex];

    this.currentQuestionAnswers.push(this.currentQuestion.correct);
    this.currentQuestionAnswers.push(this.currentQuestion.wrong1);
    this.currentQuestionAnswers.push(this.currentQuestion.wrong2);
    this.currentQuestionAnswers.push(this.currentQuestion.wrong3);

    var temp = new Array(0, 1, 2, 3);
    var shuffledAnswers = [];

    var shuffledOrder = this.quizService.shuffle(temp);

    for (var i = 0; i < shuffledOrder.length; i++) {
      var position = shuffledOrder[i];
      shuffledAnswers.push(this.currentQuestionAnswers[position])
    }
    return this.currentQuestionAnswers = shuffledAnswers;


  }

  test() {

  }
  selectQuiz(quizKey) {
    this.currentQuizKey = quizKey;
    this.selectedQuiz = this.quizService.startSelectedQuiz(this.userKey, quizKey);


    var questions = [];

    for (var questionKey of this.selectedQuiz) {

      this.quizService.getQuestionByKey(questionKey).subscribe(question => {
        questions.push(question);
      });

    }

    return this.questionObjectArray = questions;

  }
}
