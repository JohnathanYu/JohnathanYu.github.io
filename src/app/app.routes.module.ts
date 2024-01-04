import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SnailMailComponent } from './snail-mail/snail-mail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'test', component: AppComponent, title: 'Test Page' },
    { path: 'home', component: AppComponent, title: 'John Yu: Home' },
    { path: 'snail-mail', component: SnailMailComponent, title: 'John Yu: Snail Mail' }
];