import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { MatDialogRef } from '@angular/material/dialog';


import { debounceTime, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-search-dialog',
  templateUrl: './user-search-dialog.component.html',
  styleUrls: ['./user-search-dialog.component.css']
})
export class UserSearchDialogComponent implements OnInit {
  searchControl = new FormControl();
  users!: User[];

  constructor(private userService: UserService, public dialogRef: MatDialogRef<UserSearchDialogComponent>) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500), // Esperar 500ms después de cada tecla presionada
      switchMap(term => this.userService.searchUsers(term))
    ).subscribe(users => this.users = users);
  }

  selectUser(user: User) {
    this.dialogRef.close(user);
  }

  closeDialog(): void {
    this.searchControl.reset();
    this.dialogRef.close();
  }
}
