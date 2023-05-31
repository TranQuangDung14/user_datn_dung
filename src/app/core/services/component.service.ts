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

}
