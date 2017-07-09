import { Injectable } from '@angular/core';

//Firebase Imports
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//Model imports
import { Quiz } from './models/quiz.model';
import { QuizQuestion } from './models/quiz-question.model';

@Injectable()
export class QuizService {
  auth: firebase.auth.Auth;
  //Access the user table and user list
  userTable: firebase.database.Reference;
  listOfUsers: FirebaseListObservable<any>;
  //access the question table and list of questions
  questionTable: firebase.database.Reference;
  listOfQuestions: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.auth = afAuth.auth;

    this.userTable =firebase.database().ref('users');
    this.listOfUsers = db.list('/users');

    this.questionTable =firebase.database().ref('questions');
    this.listOfQuestions = db.list('/questions');
  }

  generateQuizzes(){
    var userObject = firebase.database().ref('users/' + this.auth.currentUser.uid);

    var questionList = this.listOfQuestions.subscribe( list => {
      return questionList = list;
    });
    //wait for questionList to populate and iterate through each to create objects
    setTimeout(x =>{
      var tempQuiz = new Quiz(false);
      var quizArray: Array<any> = [];
      // quizArray[0] = ["a", tempQuiz];
      var keyArray =[];

      for (var question of questionList) {

        //Create the key to be used to validate whether or not a quiz already exists
        var key = this.createQuizKey(question.week, question.day);


          if ( !keyArray.includes(key) ) {

            keyArray.push(key);

            var newQuiz = new Quiz(false);
            this.addQuestionKey(newQuiz, question.$key);
            var tempArray = this.createTempArray(key, newQuiz);
            quizArray.push(tempArray);





          } else {
            for ( var i = 0; i < quizArray.length; i++) {
              if (quizArray[i][0] === key)
              this.addQuestionKey(quizArray[i][1], question.$key);
            }




          }

      }
      console.log(quizArray);

      for ( var idQuizpair in quizArray) {

        userObject.child(idQuizpair[0]).set(idQuizpair[1]);

      }

    },1500);






  }

  createTempArray(key, newQuiz) {
    var tempArray: (string|Quiz)[] = [key, newQuiz];
    return tempArray;
  }

  createQuizKey(week, day){
    var key = "week-" + week + '-day-' + day;
    return key;
  }

  addQuestionKey(targetQuiz:Quiz, key) {
    var quizQuestionNumber = "question-" + Object.keys(targetQuiz).length;
    var newQuizQuestion = new QuizQuestion(key, undefined, undefined);
    targetQuiz[quizQuestionNumber] = newQuizQuestion;
  }
  shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
