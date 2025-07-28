import {
  Component,
  inject,
  ChangeDetectorRef,
  signal,
  computed,
} from '@angular/core';
import { KidsStore } from '../../state/kids.store';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonSpinner,
  IonImg,
  IonIcon,
} from '@ionic/angular/standalone';
import { ImageUploaderComponent } from 'src/app/shared/components/image-uploader/image-uploader.component';
import { Kid } from '../../services/kids.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-kid-form',
  templateUrl: './kid-form.page.html',
  styleUrls: ['./kid-form.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonSpinner,
    IonImg,
    ImageUploaderComponent,
  ],
})
export class KidFormPage {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private kidsStore = inject(KidsStore);
  private errorHandler = inject(ErrorHandlerService);

  kidId: string | null = null;
  addKidForm: FormGroup;
  currentKid: Kid | undefined = undefined;
  croppedImageFile: File | null = null;
  croppedImageUrl: string | ArrayBuffer | null = null;
  loading = false;

  is_edit_mode = false;

  constructor() {
    this.addKidForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  ionViewWillEnter() {
    this.kidId = this.route.snapshot.paramMap.get('kidId');

    if (this.kidId) {
      this.is_edit_mode = true;

      this.currentKid = this.kidsStore
        .kids()
        .find((kid) => kid.id == this.kidId);

      if (this.currentKid == undefined) {
        this.errorHandler.handleError('Kid not found');
        this.router.navigate(['/tabs/kids-list']);
        return;
      }
      this.addKidForm.patchValue({
        name: this.currentKid.name,
      });
    }
  }
  handleCroppedImage(croppedImageFile: File) {
    this.croppedImageFile = croppedImageFile;

    if (croppedImageFile) {
      const reader = new FileReader();
      this.loading = true; // Show loading for the image preview
      reader.onload = (e) => {
        this.croppedImageUrl = e.target?.result ?? null;
        this.cdr.markForCheck(); // Trigger change detection
        this.loading = false;
      };
      reader.readAsDataURL(croppedImageFile);
    }
  }

  async onSubmit() {
    if (this.addKidForm.invalid) return;

    this.loading = true;
    try {
      // Pass the selected file to the store

      if (this.is_edit_mode) {
        // Update the kid
        await this.kidsStore.updateKid(
          {
            ...this.currentKid,
            name: this.addKidForm.value.name,
          } as Kid,
          this.croppedImageFile ?? undefined
        );
      } else {
        await this.kidsStore.addKid({
          name: this.addKidForm.value.name,
          profile_picture_file: this.croppedImageFile ?? undefined,
        });
      }
      this.router.navigate(['/tabs/kids-list']);
    } catch (error) {
      this.errorHandler.handleError(error);
    } finally {
      this.loading = false;
    }
  }
}
