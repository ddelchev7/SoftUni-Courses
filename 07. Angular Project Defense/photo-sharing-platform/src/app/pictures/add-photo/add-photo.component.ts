import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PhotoService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css'], // Updated `styleUrls` syntax
})
export class AddPhotoComponent {
  constructor(private photoService: PhotoService, private router: Router) {}

  addPhoto(form: NgForm) {
    if (form.valid) {
      // Extract form values
      const photoData = {
        name: form.value.title,
        location: form.value.location,
        device: form.value.device || '',
        date: form.value.date || '',
        image: form.value.image || '',
        description: form.value.description || ''
      };

      // Call the service to add the photo
      this.photoService.addPhoto(photoData)
        .then(() => {
          form.reset(); // Reset the form after successful submission
          this.router.navigate(['/explore'])
        })
        .catch((error) => {
          console.error('Error adding photo:', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
