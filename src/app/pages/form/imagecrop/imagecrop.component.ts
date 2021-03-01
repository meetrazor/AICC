import { Component, OnInit, ViewChild } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-imagecrop',
  templateUrl: './imagecrop.component.html',
  styleUrls: ['./imagecrop.component.scss']
})

/**
 * Image-crop component - handling the image-crop with sidebar and content
 */
export class ImagecropComponent implements OnInit {

  constructor() { }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  // tslint:disable-next-line: member-ordering

  imageChangedEvent: any = '';
  croppedImage: any = '';

  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Forms', path: '/' }, { label: 'Image Crop', path: '/', active: true }];
  }

  /**
   * Crop image
   * @param event image passed
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  /**
   * Rotate image left
   */
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }

  /**
   * Rotate image right
   */
  rotateRight() {
    this.imageCropper.rotateRight();
  }

  /**
   * Flip image horizontal
   */
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }

  /**
   * Flip image vertical
   */
  flipVertical() {
    this.imageCropper.flipVertical();
  }
}
