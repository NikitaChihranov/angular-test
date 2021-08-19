import {Component, OnInit} from '@angular/core';
import {AotCompiler} from "@angular/compiler";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'test-angular';
  b= 'test';

  constructor( private http: HttpClient)
  {
  }




  ngOnInit() {

  }


}
