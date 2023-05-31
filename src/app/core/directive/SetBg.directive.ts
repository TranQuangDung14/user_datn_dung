import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[data-setbg]'
})
export class SetBgDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input('data-setbg') backgroundImage: string;

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'background-image', `url(${this.backgroundImage})`);
  }

}
