import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  min: Date;
  max: Date;

  constructor(protected dateService: NbDateService<Date>) {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
  }

  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  ngOnInit(): void {
  }

}
