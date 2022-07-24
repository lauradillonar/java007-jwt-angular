import { TokenService } from './../service/token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  nombreUsuario!: string | null;

  constructor(private tokenService: TokenService ) { }

  ngOnInit(): void {
    
    this.nombreUsuario = this.tokenService.getUserName();

  }

}
