import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ApiUser, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<ApiUser[]>(this.baseUrl).pipe(
      map((users) =>
        users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
        }))
      )
    );
  }

  getUserById(id: number): Observable<ApiUser> {
    return this.http.get<ApiUser>(`${this.baseUrl}/${id}`);
  }

  addUser(id: number, name: string, email: string) { //addUser(user:User) 
    console.log(id,name, email);
    
  }
}
