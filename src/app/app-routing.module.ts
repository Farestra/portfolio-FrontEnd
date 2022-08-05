import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAboutComponent } from './components/about/edit-about/edit-about.component';
import { EditAchievementComponent } from './components/achievements/edit-achievement/edit-achievement.component';
import { NewAchievementComponent } from './components/achievements/new-achievement/new-achievement.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { NewEducationComponent } from './components/education/new-education/new-education.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { NewExperienceComponent } from './components/experience/new-experience/new-experience.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EditSkillComponent } from './components/skills/edit-skill/edit-skill.component';
import { NewSkillComponent } from './components/skills/new-skill/new-skill.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [

  {path:'portfolio', component:PortfolioComponent, canActivate:[GuardGuard]},

  { path: 'newskill', component: NewSkillComponent, canActivate:[GuardGuard]},
  { path: 'editskill/:id', component: EditSkillComponent, canActivate:[GuardGuard]},

  { path: 'neweducation', component: NewEducationComponent, canActivate:[GuardGuard]},
  { path: 'editeducation/:id', component: EditEducationComponent, canActivate:[GuardGuard]},
  
  { path: 'newexperience', component: NewExperienceComponent, canActivate:[GuardGuard]},
  { path: 'editexperience/:id', component: EditExperienceComponent, canActivate:[GuardGuard]},
  
  { path: 'newachievement', component: NewAchievementComponent, canActivate:[GuardGuard]},
  { path: 'editachievement/:id', component: EditAchievementComponent, canActivate:[GuardGuard]},

  { path: 'editabout/:param', component: EditAboutComponent, canActivate:[GuardGuard]},

  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
