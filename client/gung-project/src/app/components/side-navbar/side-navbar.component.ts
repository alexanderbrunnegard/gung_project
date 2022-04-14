import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
})
export class SideNavbarComponent implements OnInit {
  toggled: boolean = true;
  constructor() {}

  ngOnInit(): void {}
  @Output() onSideBarToggled: EventEmitter<any> = new EventEmitter<any>();
  toggleSidebar(): void {
    this.onSideBarToggled.emit(this.toggled);
    if (this.toggled) {
      document.getElementById('sidebar')!.style.width = '250px';
      this.toggled = false;
    } else {
      document.getElementById('sidebar')!.style.width = '80px';
      this.toggled = true;
    }
  }
}
