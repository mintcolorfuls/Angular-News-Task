import { Component, OnInit, TemplateRef } from '@angular/core';
import { NewsModel } from './Models/News.model';
import { NewsService } from './Services/news.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'press-release';
  newsList: NewsModel[];

  modalRef?: BsModalRef;

  constructor(private newsService: NewsService, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newsService.getNewsList().subscribe({
      next: (response) => {
        this.newsList = response.data;
      }
    });
  }

  newsModal: NewsModel;
  status: boolean;
  viewInfoReq(value: NewsModel, template: TemplateRef<any>) {
    this.newsModal = value;
    this.status = (this.newsModal.Status === 1);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered' 
    });
  }

  onStatusEvent() {
    let statusNumber = (!this.status) ? 1 : 0;
    this.newsService.updateNewsStatus(3, this.newsModal.NewsId, statusNumber).subscribe({
      next: (response) => {
        if(response.successful) {
          this.status = !this.status;
          this.newsModal.Status = statusNumber;
          this.getNews();
        }
      }
    });
  }
}
