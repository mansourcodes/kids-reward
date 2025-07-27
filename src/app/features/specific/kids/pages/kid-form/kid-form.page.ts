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

  kidId: string | null = null;
  addKidForm: FormGroup;
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
      console.log(this.kidsStore.kids());

      const currentKid = this.kidsStore
        .kids()
        .find((kid) => kid.id == this.kidId);
      if (currentKid == undefined) {
        console.error('Kid not found');
        this.router.navigate(['/tabs/kids-list']);
        return;
      }
      this.addKidForm.patchValue({
        name: currentKid.name,
      });
    }
  }
  handleCroppedImage(croppedImageFile: File) {
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
      await this.kidsStore.addKid({
        name: this.addKidForm.value.name,
        profile_picture_file: this.croppedImageFile ?? undefined,
      });
      this.router.navigate(['/tabs/kids-list']);
    } catch (error) {
      console.error('Error adding kid:', error as Error);
      this.loading = false;
    } finally {
      this.loading = false;
    }
  }
}
