let courseListElement = document.getElementById('course-list');
let filterListElement = document.getElementById('categories');
let addCourseElement = document.getElementsByClassName('btnAdd');
let url = "https://udemy-courses-coupon-code.p.rapidapi.com/api/udemy_course/";
let userEmail = JSON.parse(localStorage.getItem('email'));


courses = [];
categories = [
  'Development',
  'Business',
  'Finance',
  'Software',
  'Design',
  'Marketing',
  'Health',
  'Music'
]

window.addEventListener("load", () => {
  loadCourses(url);
  loadFilter();
});

function myCourses() {
  window.location.href = 'my-courses.html';
}


/****************************************************************************
 * ADD COURSE TO LIBRARY
 * **************************************************************************/
function onAdd(codeElement) {
  let myLibrary = JSON.parse(localStorage.getItem(userEmail));
  if (!myLibrary) {
    myLibrary = []
  };
  let existing = myLibrary.find(c => c.coupon_code === codeElement);
  if (existing) {
    window.alert('Course already exists')
  } else {
    const course = this.courses.find(c => c.coupon_code === codeElement);
    course.status = "NotStarted";
    myLibrary.push(course)
    localStorage.setItem(userEmail, JSON.stringify(myLibrary));
  }
}

/****************************************************
 * ON COURSE LIST LOAD
 * *************************************************** */
function loadCourses(dataSource) {
  fetch(dataSource, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "udemy-courses-coupon-code.p.rapidapi.com",
        "x-rapidapi-key": "38f5965559msh357cb36e4797a9cp17b307jsn2cbc78e79255"
      }
    }).then(response => response.json())
    .then(data => {
      console.log('data', data);
      courses = data;
      renderCourseList(courses, courseListElement);
    })
    .catch(err => {
      console.error(err);
    });
}

function loadFilter() {
  if (filterListElement) {
    const optionElement = document.createElement('option');
    optionElement.value = "";
    optionElement.text = "";
    filterListElement.appendChild(optionElement);
    categories.forEach((category) => {
      const optionElement = document.createElement('option');
      optionElement.value = category;
      optionElement.text = category;
      filterListElement.appendChild(optionElement);
    });
    filterListElement.addEventListener("change", () => {
      filter()
    });
    filterListElement.onselectionchange = filter();
  }
}

function filter() {
  const url = "https://udemy-courses-coupon-code.p.rapidapi.com/api/udemy_course/" + filterListElement.value;
  this.loadCourses(url);
}

function renderCourseList(courses, element) {
  element.innerHTML = '';
  courses.forEach((course) => {
    const date = new Date(course.last_updated)
    const itemElement = document.createElement('div');
    itemElement.className = 'card';
    itemElement.innerHTML = `     <div class="card_header">
          <div class="content">
            <div class="course-image">
              <img
                src=${course.thumbnail}
                alt="course">
            </div>

            <h1>${course.title}</h1>
            <p>
            ${course.description}
            </p>
          </div>
        </div>
        <div class="card_info">
          <p><span class="fa fa-users"></span>Dev Community</p>
          <p>last updated : ${date.toDateString()}</p>
        </div>
        <div class="card_footer">
          <button class="btnView"><a href=${course.url} target="_blank">View</a></button>
          <button class="btnAdd" id=${course.coupon_code} onclick="onAdd('${course.coupon_code}')">Add</button>
        </div>
      </div>`;
    element.appendChild(itemElement);
  });
  if (courses.length === 0) {
    const itemElement = document.createElement('div');
    itemElement.id = 'empty-state';
    itemElement.innerHTML = `No courses found`;
    element.appendChild(itemElement);
  }
}