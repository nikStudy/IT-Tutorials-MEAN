import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-recent',
  templateUrl: './course-recent.component.html',
  styleUrls: ['./course-recent.component.css']
})
export class CourseRecentComponent implements OnInit {

  allEntries: [];

  constructor(private courseservice: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEntries();
  }

  getAllEntries() {
    this.courseservice.getEntries().subscribe(data => {
      this.allEntries = data;
    });
  }

  redirect(id: string) {
    this.router.navigateByUrl('/courses/'+id);
    setTimeout(() => {
      window.location.reload();  
    }, 1);
    
  }

}
