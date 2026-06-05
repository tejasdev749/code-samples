import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'users',
  templateUrl: './users.html',
  imports: [FormsModule],
})
export class Users {
  name = '';
  email = '';
  users: User[] = [];
  submit() {
    console.log('name:' + this.name + ' email:' + this.email);
    this.users.push({ name: this.name, email: this.email });
  }
}
