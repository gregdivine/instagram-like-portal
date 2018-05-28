import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowingComponent } from './following/following.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouteGuard } from './auth/route-guard';


const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'all-posts', component: AllPostsComponent, canActivate: [ RouteGuard ]},
    {path: 'following', component: FollowingComponent, canActivate: [ RouteGuard ]},
    {path: 'favorites', component: FavoritesComponent, canActivate: [ RouteGuard ]},
    {path: 'my-posts', component: MyPostsComponent, canActivate: [ RouteGuard ]},
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
