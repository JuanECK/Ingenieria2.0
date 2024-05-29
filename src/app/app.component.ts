import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `<div>
  <p>Today is {{today | date}}</p>
  <p>Or if you prefer, {{today | date:'fullDate'}}</p>
  <p>The time is {{today | date:'jmZ'}}</p>
</div>`,
})
export class AppComponent implements OnInit {

  // constructor(private datePipe:DatePipe){}

  // newDate?:Date = new Date();
  // today: number = Date.now();
  hora:any;
  
  title = 'Ingenieria2.0';

  getNowDate() {
    var returnDate = "";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        returnDate += `0${dd}/`;
    } else {
        returnDate += `${dd}/`;
    }
    if (mm < 10) {
        returnDate += `0${mm}/`;
    } else {
        returnDate += `${mm}/`;
    }
    returnDate += yyyy;
    return returnDate;
  }

  getHora(){
    let returnDate = "";
    let hora = new Date
    let h = hora.getHours();
    let m = hora.getMinutes();
    let s = hora.getSeconds();
    let ampm;

    if(h >= 12){
      h = h -12;
      ampm = "P.M.";
    }else{
        ampm = "A.M."
    };

    if(h == 0){
        h = 12;
    }
    returnDate +=h + ":" +m +":" + s + " " +ampm
    return returnDate;
  }
  
  ngOnInit(){
    this.mostrarHora();
  }

  mostrarHora(){
    setInterval(()=>{
      this.getHora();
    })
  }

}


