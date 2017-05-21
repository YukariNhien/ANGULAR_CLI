import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { ClientService } from './app.service';
declare var $: any;
import 'style-loader!../assets/css/menu.css';
import 'style-loader!../assets/css/button.css';
import 'style-loader!../assets/css/content.css';
import 'style-loader!../assets/css/modal.css';
import 'style-loader!../style.scss';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private login: boolean = false;
  constructor(private server: ClientService) { }
  ngOnInit() {
    if (Cookie.check(this.server.key)) {
      this.login = true;
    }
    if ($(window).width() < 676) {
      this.onPushMenu();
    }
  }
  onPushMenu() {
    $(".wrapper").toggleClass("active");
  }
  ngAfterViewInit() {
    $('.preloader').hide();
  }
}
