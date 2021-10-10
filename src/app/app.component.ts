import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-frontend';
  newData: any;
  listData: any;
  variableData: any;
  error: any;

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };

constructor(){}
  ngOnInit(){
  }

}
