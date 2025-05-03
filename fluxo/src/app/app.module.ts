import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksPageComponent } from './pages/tasks/tasks-page/tasks-page.component';
import { TaskBoardComponent } from './components/tasks/task-board/task-board.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksPageComponent,
    TaskBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
