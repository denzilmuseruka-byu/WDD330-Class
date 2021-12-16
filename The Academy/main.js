import Courses from './js/courses.js';

const controller = {
  load() {
    this.courses = new Courses();
    let that = this;
    window.addEventListener('load', () => {
      that.courses.loadCourses();
    });    
  }
}

controller.load();