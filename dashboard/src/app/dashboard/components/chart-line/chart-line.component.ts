import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-line',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas #chartCanvas></canvas>',
  styleUrl: './chart-line.component.scss'
})
export class ChartLineComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() label = 'Datos';
  chart: Chart | null = null;

  ngOnChanges(): void {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart((this as any).elementRef.nativeElement.querySelector('canvas'), {
      type: 'line', data: { labels: this.labels, datasets: [{ label: this.label, data: this.data, borderColor: '#0d6efd', tension: 0.3 }] },
      options: { responsive: true }
    });
  }
}
