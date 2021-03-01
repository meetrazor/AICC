import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {GeneralService} from '../../services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss'],
})
export class LawyerComponent implements OnInit {

  datasource: null;
  isLoaded = false;
constructor(private service: GeneralService) {
}

ngOnInit() {
  this.service.listLawyers()
  .pipe(first())
  .subscribe(
    data => {
      if (data.error) {
        Swal.fire({
          title: data.error_code,
          text: data.message,
          type: 'error'
        });
        return;
      } else {
          this.datasource = data.data;
          this.isLoaded = true;
      }
    });

}

onDeleteLawyer(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonClass: 'btn btn-success mt-2',
    cancelButtonClass: 'btn btn-danger ml-2 mt-2',
    buttonsStyling: false
  }).then((result) => {
    if (result.value) {
      this.service.deleteLawyer(id).subscribe((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: 'Deleted!',
            text: res.message,
            type: 'success',
            timer: 2000
          }).then(() => {
            location.reload();
          });
        } else {
          Swal.fire({
            title: res.error_code,
            text: res.message,
            type: 'error'
          });
        }
      }, (err) => {
        Swal.fire({
          title: 'Oops Something Wrong while deleting',
          text: err,
          type: 'error'
        });
      });
    } else if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Opration Cancelled by User!',
        type: 'error'
      });
    }
  });
}

}
