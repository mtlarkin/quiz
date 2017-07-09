// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Firebase Modules
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { routing } from './app.routing';

// Grab Firebase information from external apiKey file
export var firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { NavComponent } from './nav/nav.component';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { NewQuestionComponent } from './new-question/new-question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuizViewComponent,
    NavComponent,
    AllQuestionsComponent,
    NewQuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
