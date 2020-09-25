import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'nz-admin-layout-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less'],
})
export class GridComponent implements OnInit {
  @Input() dataSource: Array<any> = [];
  @Input() template: TemplateRef<void> | null = null;

  constructor() {}

  ngOnInit(): void {}
}
