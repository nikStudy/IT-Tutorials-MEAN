import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  allEntries: Entry[];
  datasaved: boolean = false;
  message: string = "";
  showgrid = true;
  postIdToUpdate = null;
  fileToUpload: File = null;
  postImage: string = "/assets/Images/showimage.jpeg";
  createForm: FormGroup;
  @ViewChild('Image') myInputVariable: ElementRef;

  constructor(private entryservice: EntryService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.showgrid = true;
    this.setFormState();
    this.getAllEntries();
  }

  setFormState():void {
    this.createForm = this.formbuilder.group({
      title: [null, Validators.required],
      short_descrip: [null, Validators.required],
      full_descrip: [null],
      author: [null, Validators.required],
      imageDummy: [null]
    });
  }

  getAllEntries() {
    this.entryservice.getEntries().subscribe(data => {
      this.allEntries = data;
    });
  }

  postdata() {
    let entry = this.createForm.value;
    console.log(entry);

    if (this.postIdToUpdate == null) {
      this.entryservice.createEntry(entry, this.fileToUpload).subscribe(
        data => {
          this.datasaved = true;
          this.message = 'New Post Created';
          this.createForm.reset();
          this.myInputVariable.nativeElement.value = '';
          this.fileToUpload = null;
          this.postImage = "../../../assets/Images/showimage.jpeg";
        }
      );
    } else {
      if (this.fileToUpload != null) {
        console.log(this.fileToUpload.name);
        this.entryservice.updateImage(this.postIdToUpdate, this.fileToUpload).subscribe(
          data => {
            this.fileToUpload = null;
            this.postImage = "../../../assets/Images/showimage.jpeg";
          }
        );
      }

      this.entryservice.updateEntry(entry, this.postIdToUpdate).subscribe(
        data => {
          this.datasaved = true;
          this.message = 'Post Updated';
          this.createForm.reset();
          this.myInputVariable.nativeElement.value = '';
          this.fileToUpload = null;
          this.postImage = "../../../assets/Images/showimage.jpeg";
          this.getAllEntries();
        }
      );
    }
    setTimeout(() => {
      this.showgrid = true;  
    }, 5000);
    
  }

  addEntry() {
    this.showgrid = false;
    this.datasaved = false;
    this.message = "";
    this.postIdToUpdate = null;
    this.fileToUpload = null;
    this.postImage = "../../../assets/Images/showimage.jpeg";
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    //Show image preview here
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.postImage = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  editEntry(EntryId: string) {
    this.showgrid = false;
    this.datasaved = false;
    this.message = "";
    this.postIdToUpdate = EntryId.toString();
    console.log(EntryId);
    // this.fileToUpload = null;
    // this.postImage = "../../../assets/Images/showimage.jpeg";
    this.entryservice.getEntryById(EntryId).subscribe(
      entry => {
        this.postImage = "http://localhost:4000/uploads/" + entry.image;
        this.createForm.controls['title'].setValue(entry.title);
        this.createForm.controls['short_descrip'].setValue(entry.short_descrip);
        this.createForm.controls['full_descrip'].setValue(entry.full_descrip);
        this.createForm.controls['author'].setValue(entry.author);
      }
    );
  }

  cancel() {
    this.datasaved = false;
    this.showgrid = true;
    this.message = '';
    this.createForm.reset();
    this.fileToUpload = null;
    this.postImage = "../../../assets/Images/showimage.jpeg";
    this.getAllEntries();
  }

  deleteEntry(EntryId: string) {
    this.datasaved = true;  
    setTimeout(() => {
      this.datasaved = false;  
    }, 3000);

    this.entryservice.deleteEntry(EntryId).subscribe(
      () => {
        this.message = "Record Deleted Successfully";
        this.getAllEntries();
        this.postIdToUpdate = null;
        this.createForm.reset();
      }
    );
  }  

}
