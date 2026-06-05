import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'layout',
  templateUrl: './layout.html',
  imports: [RouterOutlet, RouterLink],
})
export class Layout {}
