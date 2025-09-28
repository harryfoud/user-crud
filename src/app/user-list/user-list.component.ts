import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private hihi!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.hihi = this.userService.getUsers().subscribe((lala: User[]) => {
      console.log(lala);
      this.users = lala;
    });
  }

  ngOnDestroy(): void {
    if (this.hihi) {
      this.hihi.unsubscribe();
    }
  }
}
