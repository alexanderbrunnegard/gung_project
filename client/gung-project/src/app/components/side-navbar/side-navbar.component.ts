import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  mini: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    if (this.mini) {
      document.getElementById('sidebar')!.style.width = '250px';
      //document.getElementById('main')!.style.marginLeft = '250px';

      this.mini = false;
    } else {
      document.getElementById('sidebar')!.style.width = '80px';
      //document.getElementById('main')!.style.marginLeft = '80px';

      this.mini = true;
    }
  }
}
