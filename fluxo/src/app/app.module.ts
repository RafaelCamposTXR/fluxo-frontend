import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksPageComponent } from './pages/tasks/tasks-page/tasks-page.component';
import { TaskBoardComponent } from './components/tasks/task-board/task-board.component';
import { TaskColumnComponent } from './components/tasks/task-column/task-column.component';
import { HeaderComponent } from './components/header/header/header.component';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksPageComponent,
    TaskBoardComponent,
    TaskColumnComponent,
    HeaderComponent,
    ToasterComponent,
    LoadingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
