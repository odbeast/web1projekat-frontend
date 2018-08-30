import { Injectable } from '@angular/core';
import {User} from './models/user'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddDriverService {

  constructor(private httpClient: HttpClient) { }

  register(user : User) : Observable<any> {
       {
         let headers = new HttpHeaders();
     
         headers = headers.append('Content-type', 'application/json');
     
         return this.httpClient.post("http://localhost:51680/api/Driver/AddDriver", user,  {"headers": headers});
       }
    }
  }
