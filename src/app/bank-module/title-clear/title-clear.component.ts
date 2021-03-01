import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-clear',
  templateUrl: './title-clear.component.html',
  styleUrls: ['./title-clear.component.scss']
})
export class TitleClearComponent implements OnInit {
  breadCrumbItems: any;
  data: any;
  edit: boolean;
  constructor(private service: GeneralService, private route: ActivatedRoute, private Router: Router) {
    this.breadCrumbItems = [{ label: 'Dashboard', path: 'loan' }, { label: 'Assignments', path: '/loan/assignment' },
    { label: 'Public Notice', path: '', active: true }];
    this.edit = true;
    this.data = `																	<h5>To, <br />Ramakant Shah</h5>
    <p><b>SBI Branch Manager</b><br /><small>Vasna Branch, Ahmedabad</small><p>
    <p>For Rahul Sharma SBI110<br />
(1) KURESHI MOHAMMEDHUSSAIN MOHAMMEDSAFI<br />
(2) KURESHI MOHAMMEDEHSAAN MOHAMMEDSAFI <br />
All address at - <br />Sundaram Nagar, Gujarat Housing Board,
Nr. Nurani Maszid, Ajit Mill, <br />Bapunagar, Ahmedabad.</p>

<h5>Sub.: LAND</h5>
<p>
Title Clearance Report in respect of Non-
Agricultural land; for industrial purpose;
admeasuring Hector-Aare-Sq.mtrs. 0-62-24 (6224
sq.mtrs.) with superstructure of Industrial Shed
total construction admeasuring 633 sq.mtrs.
thereon of Block No. 833 (Old Revenue
Survey/Block No. 451/2) of Revenue Account
No. 780 of Moje Bahiyal, Taluka Dehgam,
District Gandhinagar.
</p>

<h5>Preface</h5>
<p>
We have been instructed by State Bank of India for Rahul Sharma, Saanvi Nirmaan Homes (hereinafter referred to as the Owner) to investigate its title to the said Land.
</p>
    
<h5>Disclaimers:</h5>
<p>
(a) This Title Certificate is restricted only to the ownership rights to the said Land based upon the revenue records and does not address any other issue.<br />
(b) The accuracy of this Title Certificate necessarily depends on the documents as furnished to us, gathered from the copies of revenue records and the information provided to us during the course of our verification of such records and which we have assumed to be the case. We therefore, disclaim any responsibility for any misinformation or incorrect or incomplete information arising out of the documents, responses and other information furnished to us/ gathered by us.
</p>
    
<h5>Schedule of the said land:</h5>
<p>
All that ptece and parcel of the land bearing Final Plot No. 117/ 2
admeasuring about 3864 sq. mtrs. of Town Planning Scheme No. 2 (Ghuma),
allotted in lieu of the land bearing Block No. 416/ A admeasuring about 6440 sq.
mtrs. situated within the limits of Village: Ghuma, Taluka: Daskroi and District
Ahmedabad or thereabouts, and bounded as follows:<br />
East: 12 mtrs. Wide Road<br />
West: Land bearing Block No. 417<br />
North: 24 mtrs. Wide Road <br />
South : Land bearing Block No. 417
</p>

<h5>Devolution of the Title of the said land:</h5>
<p>
Based on the perusal of revenue records and other documents, the devolution of
Tide of the said Land is as under:</p>
<p>Estwhile Survey No. 333/1:</p>
<p>The revenue records indicate that originally the land bearing Survey No.
333/1 was in the ownership of Patel Veribhai Maganbhai. Subsequendy, he
had orally sold and conveyed the aforementioned land in favour of
Jenabhai Gangadas on 25.4.1942. The said event was entered in the
revenue records on 25.4.1942 vide mutation entry no. 1282.
Note: The aforesaid entry, though not reflected in the latest Village Form
No. 7, it is relevant for this tide.
</p>

<h5>Documents verified:</h5>
<p>
<ol>
<li>Construction Agreement	</li>

<li>RERA Registration No.</li>

<li>Copy of Sales Deed</li>

<li>Latest copy of 7/12 or Property Card</li>

<li>Latest copy of Khata Extract (8/A)</li>

<li>Copy of property tax/land revenue/other statutory dues</li>

<li>Copy of approved plan / building plan</li>

<li>Copy of Government Order for NA</li>

<li>Letter from Builder/Society with their account number and name of Bankers for remittance of installments</li>

<li>Possession Certficate/Allottment Letter (for Flat)</li>

<li>Original Share Certificate (in case of a Society)</li>

<li>NOC (in case of a Society)</li>

<li>Title Search report - 30 years
</ol>
</p>																		
    
<h5>Search in the Revenue Records:</h5>
<lead>Enter the Search and Findings here.</lead>

<h5>Public Notice:</h5>
<p>

</p>

<h5>Final Observations:</h5>
<p>

</p>`;
  }

  ngOnInit() {
  }
  test() {
    console.log(this.edit);
    this.edit = !this.edit;

  }
  save() {
    this.service.changeStatus(this.route.snapshot.params.AppID, 'Title Clear In Progress').subscribe(() => {
      this.Router.navigate(['/loan/titleclearcompleted/' + this.route.snapshot.params.AppID]);
    });
  }
}
