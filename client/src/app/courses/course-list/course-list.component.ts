import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  title = 'Course List';
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

  sendEntry(entry:Entry) {
    console.log(entry);
  }

}
