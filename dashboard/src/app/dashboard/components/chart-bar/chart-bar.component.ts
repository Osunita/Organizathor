import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-bar',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas #chartCanvas></canvas>',
  styleUrl: './chart-bar.component.scss'
})
export class ChartBarComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() label = 'Datos';
  chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart((this as any).elementRef.nativeElement.querySelector('canvas'), {
      type: 'bar', data: { labels: this.labels, datasets: [{ label: this.label, data: this.data, backgroundColor: '#0d6efd' }] },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
}
