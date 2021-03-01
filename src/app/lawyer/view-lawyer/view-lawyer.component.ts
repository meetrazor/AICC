import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-view-lawyer',
  templateUrl: './view-lawyer.component.html',
  styleUrls: ['./view-lawyer.component.scss']
})
export class ViewLawyerComponent implements OnInit {
  data: any;
  isLoaded = false;
  Village: string;
  Taluka: string;
  District: string;
  constructor(private route: ActivatedRoute, private router: Router, private service: GeneralService) { }

  ngOnInit() {
    this.service.viewLawyer(this.route.snapshot.params.id).subscribe(Res => {
      this.data = Res.data[0];

      this.service.areabyid( Res.data[0].VillageId).subscribe(Res1 => {
        this.Taluka = Res1.data[0].TalukaName;
        this.Village = Res1.data[0].VillageName;
        this.District = Res1.data[0].DistrictName;
    });
      this.isLoaded = true;

    });
  }

  GoBack(){
    this.router.navigate(['lawyer']);
  }
}
