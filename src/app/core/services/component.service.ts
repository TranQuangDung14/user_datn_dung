import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

constructor() { }
private messageSource = new BehaviorSubject<string>("");
currentMessage = this.messageSource.asObservable();

Title_message(title: any) {
  this.messageSource.next(title)
}

// lấy id
// private id: any;
private idSource = new BehaviorSubject<number | null>(null);
currentId = this.idSource.asObservable();
// setData(data: any) {
//   = data;
// }
setData(id: number) {
 this.idSource.next(id);
}
// getData() {
//   return this.id;
// }
}
