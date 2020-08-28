import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  loading = true;
  entry: Entry;

  constructor(public router: Router, private courseservice: CourseService) {
   }

  ngOnInit(): void {
    console.log(this.router.url);
    this.courseservice.getEntryById(this.router.url).subscribe(
      entry => {
        this.entry = entry;
        this.loading = false;
      }
    );
  }

}
