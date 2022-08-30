import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { EditAboutComponent } from './components/about/edit-about/edit-about.component';
import { EditAchievementComponent } from './components/achievements/edit-achievement/edit-achievement.component';
import { NewAchievementComponent } from './components/achievements/new-achievement/new-achievement.component';
import { NewEducationComponent } from './components/education/new-education/new-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { NewExperienceComponent } from './components/experience/new-experience/new-experience.component';
import { NewSkillComponent } from './components/skills/new-skill/new-skill.component';
import { EditSkillComponent } from './components/skills/edit-skill/edit-skill.component';
import { NewDetailsComponent } from './components/header/new-details/new-details.component';
import { EditDetailsComponent } from './components/header/edit-details/edit-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'



@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    HeaderComponent,
    HeaderNavComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    NotFoundComponent,
    LoginComponent,
    AchievementsComponent,
    EditAboutComponent,
    EditAchievementComponent,
    NewAchievementComponent,
    NewEducationComponent,
    EditEducationComponent,
    EditExperienceComponent,
    NewExperienceComponent,
    NewSkillComponent,
    EditSkillComponent,
    NewDetailsComponent,
    EditDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
