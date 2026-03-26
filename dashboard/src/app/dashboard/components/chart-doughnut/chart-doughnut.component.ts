import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-doughnut',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas #chartCanvas></canvas>',
  styleUrl: './chart-doughnut.component.scss'
})
export class ChartDoughnutComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  chart: Chart | null = null;

  ngOnChanges(): void {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart((this as any).elementRef.nativeElement.querySelector('canvas'), {
      type: 'doughnut', data: { labels: this.labels, datasets: [{ data: this.data, backgroundColor: ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6c757d'] }] },
      options: { responsive: true }
    });
  }
}
