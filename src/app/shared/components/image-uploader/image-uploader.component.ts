import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonToolbar,
    IonIcon,
    ImageCropperComponent,
  ],
})
export class ImageUploaderComponent {
  private errorHandler = inject(ErrorHandlerService);

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  @Output() onImageCropped = new EventEmitter<File>();

  selectedImage: File | undefined;

  constructor() {
    addIcons({ add });
  }

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      this.modal.present();
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    try {
      this.imageCropper.crop('blob')?.then((blob) => {
        if (blob?.blob) {
          const imageFile = new File([blob.blob], 'image.jpg', {
            type: blob.blob.type,
            lastModified: Date.now(),
          });
          this.modal.dismiss(imageFile, 'confirm');
        } else {
          this.errorHandler.handleError('blob.blob is null or undefined');
        }
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.onImageCropped.emit(event.detail.data);
    }
  }
}
