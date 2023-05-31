import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartDataset, ChartType, ChartOptions, registerables } from 'chart.js';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
// import { SlicePipe } from '@angular/common';

// import { ChartDataSets, ChartOptions } from 'chart.js';
interface OrderData {
  orders_are_pending: number;
  orders_wait_for_output: number;
  order_delivering: number;
  orders_success: number;
  orders_cancel: number;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  name_task: any = 'Bảng điều khiên';
  title = 'Bảng điều khiển';
  product: any;
  order: any;
  customer: any;
  revenu: any;
  growth:any;
  growth_customer:any;
  growth_product:any;
  growth_revenue:any;
  constructor(
    private data_service: ComponentService,
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute
  ) { }
  // @ViewChild('barChart_all') barChart_all!: ElementRef;
  // chartData: any[] = [];
  //  đưa biểu đồ ra view
  // @ViewChild('lineChart') lineChart!: ElementRef;
  // @ViewChild('revenueChart') revenueChart!: ElementRef;
  // @ViewChild('stackedChart') stackedChart!: ElementRef;
  // @ViewChild('test') test!: ElementRef;
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('barChart_month') barChart_month!: ElementRef;
  @ViewChild('barChart_year') barChart_year!: ElementRef;
  // @ViewChild('chartData') chartData!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  ngOnInit() {
    this.get_statistical();
    // this.name_task
    this.send_title();
    console.log(this.name_task);
    Chart.register(...registerables);
    this.drawPieChart();
    this.get_growth();
    // this.getData();
    // biểu đồ theo ngày
    this.admin.get_dashboard_daily().subscribe((data: any[]) => {
      const chartData = {
        labels: data.map(item => item.date),
        datasets: [
          {
            label: 'Doanh thu hằng ngày',
            data: data.map(item => item.revenue),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
      console.log('data daily', data);
      // Gọi hàm vẽ biểu đồ cột với dữ liệu chartData
      this.drawBarChart_day(chartData);
    })
    // biểu đồ theo tháng
    this.admin.get_dashboard_monthly().subscribe((data: any[]) => {
      const chartData_month = {
        // labels: [`${data[0].year}-${data[0].month}`],
        labels: data.map(item => `${item.month}-${item.year}`),
        datasets: [
          {
            label: 'Doanh thu hằng tháng',
            // data: [data[0].revenue],
            data: data.map(item => item.revenue),
            // backgroundColor: 'rgba(75, 192, 192, 0.2)',
            backgroundColor: 'rgba(238, 203, 173 , 0.2 )',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };

      // Gọi hàm vẽ biểu đồ cột với dữ liệu chartData
      this.drawBarChart_month(chartData_month);
    })
    // biểu đồ theo năm
    this.admin.get_dashboard_yearly().subscribe((data: any[]) => {
      const chartData_year = {
        // labels: [`${data[0].year}`],
        labels: data.map(item => `${item.year}`),
        datasets: [
          {
            label: 'Doanh thu hằng năm',
            // data: [data[0].revenue],
            data: data.map(item => item.revenue),
            backgroundColor: 'rgba(84, 255, 159, 0.2 )',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };

      // Gọi hàm vẽ biểu đồ cột với dữ liệu chartData
      this.drawBarChart_year(chartData_year);
    })
  }
  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }
  // getData() {
  //   this.admin.get_dashboard_daily().subscribe((dailyData: any[]) => {
  //     dailyData.forEach((item: any) => {
  //       const dataPoint = {
  //         label: item.date,
  //         data: [item.revenue],
  //         // data: data.map(item => item.revenue),
  //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //         borderColor: 'rgba(75, 192, 192, 1)',
  //         borderWidth: 1
  //       };
  //       console.log('irrr',item.revenue)
  //       this.chartData.push(dataPoint);
  //     });

  //     this.admin.get_dashboard_monthly().subscribe((monthlyData: any[]) => {
  //       const monthlyDataPoint = {
  //         label: `${monthlyData[0].year}-${monthlyData[0].month}`,
  //         data: [monthlyData[0].revenue],
  //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //         borderColor: 'rgba(255, 99, 132, 1)',
  //         borderWidth: 1
  //       };
  //       this.chartData.push(monthlyDataPoint);

  //       this.admin.get_dashboard_yearly().subscribe((yearlyData: any[]) => {
  //         const yearlyDataPoint = {
  //           label: `${yearlyData[0].year}`,
  //           data: [yearlyData[0].revenue],
  //           backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //           borderColor: 'rgba(54, 162, 235, 1)',
  //           borderWidth: 1
  //         };
  //         this.chartData.push(yearlyDataPoint);

  //         this.drawBarChart();
  //       });
  //     });
  //   });
  // }
  // drawBarChart() {
  //   const canvas = this.barChart_all.nativeElement.getContext('2d');
  //   new Chart(canvas, {
  //     type: 'bar',
  //     data: {
  //       datasets: this.chartData
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         x: {
  //           stacked: true
  //         },
  //         y: {
  //           stacked: true
  //         }
  //       }
  //     }
  //   });
  // }
  get_statistical() {
    this.admin.get_dashboard().subscribe(
      (data: any) => {
        this.product = data.product;
        this.order = data.order;
        this.customer = data.customer;
        this.revenu = data.revenue.revenue;
        console.log('111', this.revenu);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // ngAfterViewInit() {
  //
  // }
  // biểu đồ cột ngày
  drawBarChart_day(chartData: any) {

    const canvas = this.barChart.nativeElement.getContext('2d');
    new Chart(canvas, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true
      }
    });
  }
  // biểu đồ cột tháng
  drawBarChart_month(chartData_month: any) {

    const canvas = this.barChart_month.nativeElement.getContext('2d');
    new Chart(canvas, {
      type: 'bar',
      data: chartData_month,
      options: {
        responsive: true
      }
    });
  }
  // biểu đồ cột năm
  drawBarChart_year(chartData_year: any) {

    const canvas = this.barChart_year.nativeElement.getContext('2d');
    new Chart(canvas, {
      type: 'bar',
      data: chartData_year,
      options: {
        responsive: true
      }
    });
  }

  drawPieChart() {
    this.admin.get_dashboard_order_statistics().subscribe((data: OrderData) => {
      const labels = ['Đơn hàng mới', 'Đã xác nhận', 'Đang giao', 'Thành công', 'Hủy đơn'];
      const values = [
        data.orders_are_pending,
        data.orders_wait_for_output,
        data.order_delivering,
        data.orders_success,
        data.orders_cancel,
      ];

      const chartData = {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(139, 105, 105, 0.2)',
            'rgba(255, 236, 139, 0.2)',
            'rgba(178, 223, 238, 0.2)',
            'rgba(0, 238, 0, 0.2)',
            'rgba(255, 48, 48, 0.2)'
          ],
          borderColor: [
            'rgba(139, 105, 105, 1)',
            'rgba(255, 236, 139, 1)',
            'rgba(178, 223, 238, 1)',
            'rgba(0, 238, 0, 1)',
            'rgba(255, 48, 48, 1)'
          ],
          borderWidth: 1
        }]
      };

      const canvas = this.pieChart.nativeElement.getContext('2d');
      new Chart(canvas, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true
        }
      });
    });
  }
  // backgroundColor: [
  //   'rgba(255, 99, 132, 0.2)',
  //   'rgba(54, 162, 235, 0.2)',
  //   'rgba(255, 206, 86, 0.2)',
  //   'rgba(75, 192, 192, 0.2)',
  //   'rgba(153, 102, 255, 0.2)'
  // ],
  // borderColor: [
  //   'rgba(255, 99, 132, 1)',
  //   'rgba(54, 162, 235, 1)',
  //   'rgba(255, 206, 86, 1)',
  //   'rgba(75, 192, 192, 1)',
  //   'rgba(153, 102, 255, 1)'
  // ],
  ngAfterViewInit() {
    // const lineCtx = this.lineChart.nativeElement.getContext('2d');
    // new Chart(lineCtx, {
    //   type: 'line',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //       { label: 'Series A', data: [65, 59, 80, 81, 56, 55, 40] },
    //       { label: 'Series B', data: [28, 48, 40, 19, 86, 27, 90] }
    //     ]
    //   },
    //   options: {
    //     responsive: true
    //   }
    // });
    // const revenueCtx = this.revenueChart.nativeElement.getContext('2d');
    // new Chart(revenueCtx, {
    //   type: 'line',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //       {
    //         label: 'Revenue',
    //         data: [1000, 1500, 1200, 2000, 1800, 2500, 2100],
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         borderColor: 'rgba(75, 192, 192, 1)',
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       x: {
    //         display: true,
    //         title: {
    //           display: true,
    //           text: 'Date'
    //         }
    //       },
    //       y: {
    //         display: true,
    //         title: {
    //           display: true,
    //           text: 'Revenue'
    //         }
    //       }
    //     }
    //   }
    // });
    // const ctx = this.stackedChart.nativeElement.getContext('2d');
    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],// tháng
    //     datasets: [
    //       {
    //         label: 'Series A',
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         borderColor: 'rgba(75, 192, 192, 1)',
    //         borderWidth: 1
    //       },
    //       {
    //         label: 'Series B',
    //         data: [28, 48, 40, 19, 86, 27, 90],
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //         borderColor: 'rgba(255, 99, 132, 1)',
    //         borderWidth: 1
    //       },
    //       {
    //         label: 'Series C',
    //         data: [45, 25, 67, 32, 70, 50, 75],
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //         borderColor: 'rgba(54, 162, 235, 1)',
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       x: {
    //         stacked: true,
    //       },
    //       y: {
    //         stacked: true,
    //       }
    //     }
    //   }
    // });

    // const ctx2 = this.test.nativeElement.getContext('2d');
    // new Chart(ctx2, {
    //   type: 'scatter',
    //   data: {
    //     labels: [
    //       'January',
    //       'February',
    //       'March',
    //       'April'
    //     ],
    //     datasets: [{
    //       type: 'bar',
    //       label: 'Bar Dataset',
    //       data: [10, 20, 30, 40],
    //       borderColor: 'rgb(255, 99, 132)',
    //       backgroundColor: 'rgba(255, 99, 132, 0.2)'
    //     }, {
    //       type: 'line',
    //       label: 'Line Dataset',
    //       data: [50, 50, 50, 50],
    //       fill: false,
    //       borderColor: 'rgb(54, 162, 235)'
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // })
    // const chart = this.barChart.nativeElement.getContext('2d');
    // new Chart(chart, {
    //   type: 'bar',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //       {
    //         label: 'Series A',
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         borderColor: 'rgba(75, 192, 192, 1)',
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true
    //   }
    // });

  }



  get_growth(){
    this.admin.get_dashboard_order_growth().subscribe((data: any) => {
        this.growth = data.growth
        console.log('tăng trưởng doanh số',this.growth);
    })
    this.admin.get_dashboard_customer_growth().subscribe((data: any) => {
        this.growth_customer = data.growth
    })
    this.admin.get_dashboard_product_growth().subscribe((data: any) => {
        this.growth_product= data.growth
    })
    this.admin.get_dashboard_revenue_growth().subscribe((data: any) => {
        this.growth_revenue = data.growth
    })
  }
}
