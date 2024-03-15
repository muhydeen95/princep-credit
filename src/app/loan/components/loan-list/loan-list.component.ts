import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
  @ViewChild('searchQuery') searchQueryElement!: ElementRef;
  public sub: Subscription = new Subscription();
  public loans: any[] = [];
  isLoading!: boolean;
  searchParam!: {search_text: string, page_size: number, page: number};
  paginationRes: any;

  constructor(
    private _loan: LoanService
  ) {

  }

  ngOnInit() {
    this.getLoans();
  }


  public getLoans(searchQuery?: string, page?: any): void {
    this.isLoading = true;
    const payload = {
      search_text : searchQuery ?? '',
      page_size: this.searchParam?.page_size ?? 10,
      page: page ?? 1
    }
    this.sub.add(
      this._loan.getLoans(payload).subscribe({
        next: (res: any) => {
          console.log(res)
          this.isLoading = false;
          this.loans = res?.loans?.data;
          this.paginationRes = res?.loans;
        },
        error: (error: any) => {
          this.isLoading = false;
        },
      })
    );
  }

  public prevPage() {
    if (this.paginationRes.current_page > 1) {
      const currentPage = this.paginationRes.current_page--;
      this.getLoans('', currentPage);
    }
  }

  public nextPage() {
    if (this.paginationRes.current_page < this.paginationRes.last_page) {
      const currentPage = this.paginationRes.current_page++;
      console.log(this.paginationRes.current_page, currentPage)
      this.getLoans('', this.paginationRes.current_page);
    }
  }

  public getSearchQuery(
    searchQuery: string,
    event: KeyboardEvent | any,
    clear?: boolean
  ): void {
    clear ? (this.searchQueryElement.nativeElement.value = '') : null;
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8 || searchQuery == '') {
      this.getLoans(searchQuery);
    }
  }

  ngOnDestory() {
    this.sub.unsubscribe();
  }

}
