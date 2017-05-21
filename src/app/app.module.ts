import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { ClientService } from './app.service';
import { AuthGuard } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// component
import { CategoryModule } from './Category/category.module';
import { CountrysModule } from './country/country.module';
import { BaiVietModule } from './baiviet/baiviet.module';
import { MembersModule } from './member/member.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    LoginModule,
    CategoryModule,
    CountrysModule,
    BaiVietModule,
    MembersModule
  ],
  providers: [ClientService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
