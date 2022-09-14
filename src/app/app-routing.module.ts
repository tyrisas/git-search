import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { ProjectsComponent } from './projects/projects.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "/projects", pathMatch: "full" },
  { path: "projects", component: ProjectsComponent },
  { path: "projects/:owner/:project", component: DetailsComponent },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: '/not-found' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
