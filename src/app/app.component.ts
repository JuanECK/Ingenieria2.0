import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  // newDate?:Date = new Date();
  // today: number = Date.now();
  // hora:any;

  // propiedades del componente
  title = 'Ingenieria2.0';

  // funcion que retorna la fecha
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

  // funcion que retorna la hora
  getHora(){
    let returnDate = "";
    let hora = new Date
    // console.log(new Date)
    // let hora = new Date("Thu May 30 2024 12:16:25 GMT-0600 (GMT-06:00")
    let h = hora.getHours();
    let m = hora.getMinutes();
    let s = hora.getSeconds();
    let ampm;

    if(h >= 12){
      if(h == 12){
        h = 12;
      }else{
        h = h -12;
      }
      if(h < 10){
        returnDate +=`0${h}:`
      }else{
        returnDate +=`${h}:`
      }
      ampm = " P.M.";
    }else{
      if(h < 10){
        if(h == 0){
          returnDate +=`12:`
        }else{
          returnDate +=`0${h}:`
        }
      }else{
        returnDate +=`${h}:`
      }
      ampm = " A.M."
    };


     if(m < 10){
      returnDate += `0${m}:`
     }else{
      returnDate += `${m}:`
     }

     if(s < 10){
      returnDate += `0${s}`
     }else{
      returnDate += `${s}`
     }

    // returnDate +=h + ":" +m +":" + s + " " +ampm
    returnDate += ampm
    return returnDate;
  }
  
  // metodo de inicializacion
  ngOnInit(){
    this.mostrarHora();
  }

  mostrarHora(){
    setInterval(()=>{
      this.getHora();
    })
  }

}


