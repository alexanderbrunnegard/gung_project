import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  constructor(private window: Window) {}
}
