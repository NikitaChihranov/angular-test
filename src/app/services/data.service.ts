import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    if (!localStorage.getItem('mock')) {
      return this.http.get('../assets/exam.json');
    } else {
      return of(JSON.parse(localStorage.getItem('mock')));
    }
  }

  remove(i): Observable<any> {
    let mock = JSON.parse(localStorage.getItem('mock'));
    mock.result.splice(i, 1);
    localStorage.setItem('mock', JSON.stringify(mock));
    return of(true);
  }

  update(i, body): Observable<any> {
    try {
      let mock = JSON.parse(localStorage.getItem('mock'));
      mock.result[i] = body;
      localStorage.setItem('mock', JSON.stringify(mock));
      return of(true);
    } catch (e) {
      return of(new HttpErrorResponse(e));
    }
  }

  addRow(): Observable<any>{
    let mock = JSON.parse(localStorage.getItem('mock'));
    mock.result.push({});
    localStorage.setItem('mock', JSON.stringify(mock));
    return of(true);
  }


}
