import { Injectable } from '@angular/core';

//Firebase Imports
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

//Model imports
import { Quiz } from './models/quiz.model';

@Injectable()
export class QuizService {


  constructor(public db: AngularFireDatabase) {
  }

}
