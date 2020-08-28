import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-featured',
  templateUrl: './course-featured.component.html',
  styleUrls: ['./course-featured.component.css']
})
export class CourseFeaturedComponent implements OnInit {

  allEntries: [];

  constructor(private courseservice: CourseService) { }

  ngOnInit(): void {
    this.getAllEntries();
  }

  getAllEntries() {
    this.courseservice.getEntries().subscribe(data => {
      this.allEntries = data;
    });
  }

}
