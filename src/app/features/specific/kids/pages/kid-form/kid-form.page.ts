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
  IonIcon,
} from '@ionic/angular/standalone';

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
    IonIcon,
  ],
})
export class KidFormPage {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private kidsStore = inject(KidsStore);

  kidId: string | null = null;
  addKidForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
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
      await this.kidsStore.addKid({
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
