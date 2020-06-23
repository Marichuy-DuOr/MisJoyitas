import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joya',
  templateUrl: './joya.component.html',
  styles: []
})
export class JoyaComponent implements OnInit {

  constructor(private router: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  }

}
