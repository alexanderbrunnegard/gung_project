import { Component, ViewChild } from '@angular/core';
import axios, { Axios } from 'axios';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  async backEndTesting(): Promise<void> {
    axios.get('http://localhost:8080/categories');
  }

  sideBarToggled(toggled: boolean) {
    if (toggled) {
      document.getElementById('main')!.style.marginLeft = '160px';
    } else {
      document.getElementById('main')!.style.marginLeft = '0px';
    }
  }
}
