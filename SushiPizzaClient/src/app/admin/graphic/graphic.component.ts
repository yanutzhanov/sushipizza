import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { HttpClient } from '@angular/common/http';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { cwd } from 'process';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

  public sums: number[];
  public dates: string[];

  constructor(private http: RepositoryService) { }

  ngOnInit(): void {
    this.sums = [];
    this.dates = [];

    this.http.getData('api/DataPoints')
    .subscribe(res => {
      this.sums = (res as DataPoint[]).map(x => x.sum);
      this.dates = (res as DataPoint[]).map(x => x.dateString);
      console.log(this.dates);
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['Доход', ...this.sums],
          ],
          types: {
            Доход: 'bar',
          },
        },
        axis: {
          x: {
            type: 'category',
            categories: [...this.dates]
          }
        }
      });
    });
  }

}

interface DataPoint {
  sum: number;
  date: Date;
  dateString: string;
}
