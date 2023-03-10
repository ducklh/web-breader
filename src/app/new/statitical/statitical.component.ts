import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-statitical',
  templateUrl: './statitical.component.html',
  styleUrls: ['./statitical.component.css']
})
export class StatiticalComponent implements OnInit, OnChanges {
  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];
  newsTypeStatisticalData: any = [];
  constructor(private newsService: NewsService) {
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit
  }

  ngOnInit() {
      this.newsService.statisticalTotalViewsByType().subscribe(
        data=>{
          console.log(data['content']);
          this.coinPrice = data['content'].map((coins: any) => coins.totalViews);
          this.coinName = data['content'].map((coins: any) => coins.type);
          console.log(this.coinName);
          
          console.log(this.coinPrice);
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: this.coinName,
              datasets: [
                {
                  data: this.coinPrice,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                label: 'Bảng thống kê lượt xem theo loại bài viết',
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
                },
              ],
            },
          });
        },
        (error) => {
          console.log(error.error.message);
        }
      )


    ;
  }
}
