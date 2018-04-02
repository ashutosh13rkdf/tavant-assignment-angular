import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../services/crud';

@Component({
  selector: 'app-test',
  templateUrl:'./test.component.html',
  
  styles: [`
  
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
 }
 `],
  providers:[ConfigService]
})
export class TestComponent implements OnInit {
  public loanData = new Array<any>();
  status: any;
  loans:any;

  constructor(private confService:ConfigService) { }

 
ngOnInit() {
  this.getLoansData();
}

  getLoansData() {
   this.confService.getConfig().subscribe(
      data => { 
        this.loans = data
        console.log(this.loans)
      },
      err => console.error(err),
      () => console.log('done loading loans')
    );
  }

  updateLoanStatus(status){
    //alert("status :"+status+">>"+loans);
    if(status === "C")
    for(var i=0; i < this.loanData.length; i++){
      if(status === "C" && this.loanData[i].loanStatus === "A"){
        alert("Approved Loans can't be cancelled!!");
        return false;
      }
    }
    this.confService.postConfig(status,this.loanData).subscribe(
      data => { 
        this.loans = data
        console.log(this.loans)
      },
      err => console.error(err),
      () => console.log('done saving loans')
    );
    location.reload();
  }

  onStatusChange(eventObj: any, event: any){
    if(event.target.checked) {
      this.loanData.push(eventObj);
    } else  {
      for (var i = 0; i < this.loanData.length; i++){
        if (this.loanData[i].loanNumber && this.loanData[i].loanNumber === eventObj.loanNumber) { 
          this.loanData.splice(i, 1);
            break;
        }
        }
    }
    console.log(eventObj);
    console.log(this.loanData);
  }

}
