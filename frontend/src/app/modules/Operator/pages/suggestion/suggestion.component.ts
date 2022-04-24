import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  ytlinkexists: boolean = true;
  public video: string = "https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1";
  description: String = "Leírás";

  constructor() { 
  }

  ngOnInit(): void {
  }

}
