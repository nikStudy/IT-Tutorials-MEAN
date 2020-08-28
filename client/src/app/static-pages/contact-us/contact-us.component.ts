import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  title = 'Contact Us';
  contactForm: FormGroup;
  name: string;
  email: string;
  phone: string;
  message: string;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formbuilder.group({
      name: [null, Validators.required],
      emailid: ['', Validators.compose([Validators.required, Validators.email])],
      phone: [null, Validators.required],
      mssg: [null]
    });
  }

  postdata() {
    this.name = this.contactForm.get('name').value;
    console.log(this.contactForm.value);
  }
  
}
