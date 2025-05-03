import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksPageComponent } from './pages/tasks/tasks-page/tasks-page.component';
import { TaskBoardComponent } from './components/tasks/task-board/task-board.component';
import { TaskColumnComponent } from './components/tasks/task-column/task-column.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksPageComponent,
    TaskBoardComponent,
    TaskColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
