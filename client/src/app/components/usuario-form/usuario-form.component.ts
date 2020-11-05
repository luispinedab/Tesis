import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})


export class UsuarioFormComponent implements OnInit {
  ngOnInit(): void {
  }

  // ICONS
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
