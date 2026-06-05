import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'layout',
  templateUrl: './layout.html',
  imports: [RouterOutlet, RouterLink, NgFor],
})
export class Layout {
  items = [
    { title: 'Users', link: 'users' },
    { title: 'Dashboard', link: 'dashboard' },
    { title: 'Inventory', link: 'inventory' },
  ];
}
