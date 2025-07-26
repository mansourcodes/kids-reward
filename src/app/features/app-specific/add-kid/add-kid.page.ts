import { Component, inject, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { kidsStore } from '../../../core/store.signal';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
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
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-kid',
  templateUrl: './add-kid.page.html',
  styleUrls: ['./add-kid.page.scss'],
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
    IonIcon,
  ],
})
export class AddKidPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  addKidForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  loading = false;

  constructor() {
    this.addKidForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      this.loading = true; // Show loading for the image preview
      reader.onload = (e) => {
        this.previewUrl = e.target?.result ?? null;
        this.cdr.markForCheck(); // Trigger change detection
        this.loading = false;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onSubmit() {
    if (this.addKidForm.invalid) return;

    this.loading = true;
    try {
      // Pass the selected file to the store
      await kidsStore.addKid({
        name: this.addKidForm.value.name,
        profile_picture_file: this.selectedFile ?? undefined,
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
