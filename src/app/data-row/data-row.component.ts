import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsModel } from '../Models/News.model';
import { NewsService } from '../Services/news.service';

@Component({
  selector: 'app-data-row',
  templateUrl: './data-row.component.html',
  styleUrls: ['./data-row.component.scss']
})
export class DataRowComponent implements OnInit {

  @Input() newsData: NewsModel;
  @Output() viewInfo = new EventEmitter();

  status: boolean = false;

  constructor(private newsService: NewsService) { 
    
  }

  ngOnInit(): void {
    this.status = (this.newsData.Status === 1);
  }

  onStatusEvent() {
    let statusNumber = (!this.status) ? 1 : 0;
    this.newsService.updateNewsStatus(3, this.newsData.NewsId, statusNumber).subscribe({
      next: (response) => {
        if(response.successful) {
          this.status = !this.status;
          this.newsData.Status = statusNumber;
        }
      }
    });
  }

  onViewInfoClick() {
    this.viewInfo.emit(this.newsData);
  }
}
