import { GeneralService } from "src/app/services/general.service";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-property",
  templateUrl: "./view-property.component.html",
  styleUrls: ["./view-property.component.scss"],
})
export class ViewPropertyComponent implements OnInit {
  @Input() propertyId: number;
  @Input() data: any;
  loading: boolean;
  propertyType: any;
  constructor(private service: GeneralService, private router: Router) { }

  ngOnInit() {
    this.service.propertytype().subscribe((Res) => {

      this.loading = true;
      this.propertyType = Res.data.find(
        (item) => item.PropertyTypeID === this.data.PropertyTypeID
      );

      this.loading = false;
    });
  }
  GoBack() {
    this.router.navigate(["property"]);
  }
}
