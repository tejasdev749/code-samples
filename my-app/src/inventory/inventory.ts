import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'inventory',
  templateUrl: './inventory.html',
  imports: [ReactiveFormsModule],
})
export class Inventory {
  inventoryForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
}
