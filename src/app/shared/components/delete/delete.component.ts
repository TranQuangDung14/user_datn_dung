import { Component, OnInit,Inject,Input  } from '@angular/core';
// import { CategoryComponent } from '../../../Admin/dashboard/component/category/category.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {
  // delete:any;
  // click:any;
  @Input() id: number;
  title: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    // private catge :CategoryComponent
    ) { }

  ngOnInit() {
    // this.delete =this.catge.title_delete;
    this.title = this.data.title;
  }



}
