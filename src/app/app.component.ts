import {Component, OnInit, ViewChild} from '@angular/core';
import {parseString} from 'xml2js';
import {FeedReaderService} from './feed-reader.service';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ItemViewComponent} from './item-view/item-view.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rss-citacka';

  data = false;
  loading = false;

  xml;

  urlForm = new FormControl('');

  displayedColumns: string[] = ['pubDate', 'title'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, {static: true}) tableSort: MatSort;

  constructor(private feedService: FeedReaderService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource.sort = this.tableSort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'pubDate': return new Date(item.pubDate);
        default: return item[property];
      }
    };
  }

  getDate(date: string): Date {
    return new Date(date);
  }

  loadFeed() {
    this.loading = true;
    this.dataSource.data = [];
    this.data = true;

    this.feedService.readFeed(this.urlForm.value)
      .subscribe(res => {
        parseString(res, (err, result) => {
          this.xml = result;
        });
      }, error => {},
        () => {
          this.dataSource.data = this.xml.rss.channel[0].item;
          console.log(this.dataSource.data);
          this.loading = false;
        });

  }

  read(element) {
    console.log(element);

    const dialogRef = this.dialog.open(ItemViewComponent, {
      maxHeight: '95vh',
      maxWidth: '90vw',
      data: element
    });
  }
}
