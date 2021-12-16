let userEmail = JSON.parse(localStorage.getItem('email'));
let myLibrary = JSON.parse(localStorage.getItem(userEmail));
let filterListElement = document.getElementById('categories');

categories = [
    'NotStarted',
    'InProgress',
    'Completed'
]
window.addEventListener("load", () => {
    renderCourseList(myLibrary);
    loadFilter();
});

function courses() {
    window.location.href = 'home.html';
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
    myLibrary = JSON.parse(localStorage.getItem(userEmail));
    let filteredCourses = myLibrary.filter(c => c.status === filterListElement.value);
    if (!filterListElement.value) {
        filteredCourses = myLibrary;
    }
    this.renderCourseList(filteredCourses);
}

function onUpdate(code) {
    debugger;
    myLibrary = JSON.parse(localStorage.getItem(userEmail));
    const course = myLibrary.find(c => c.coupon_code === code);
    const index = myLibrary.indexOf(course);

    var modal = document.getElementById("updateModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var bodyElement = document.getElementById("modal-body");
    bodyElement.innerHTML = "";
    if (course.status == "NotStarted") {
        bodyElement.innerHTML = "<p>Course status updated to In-Progress.</p>"
        course.status = "InProgress";
    }else if(course.status == "InProgress"){
        bodyElement.innerHTML = "<p>Course status  updated to Completed.</p>"
        course.status = "Completed";
    }else {
        bodyElement.innerHTML = "<p class='error'>Course status cannot be updated anymore!!!.</p>"
    }
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        myLibrary[index] = course;
        localStorage.setItem(userEmail, JSON.stringify(myLibrary));
        renderCourseList(myLibrary);
        modal.style.display = "none";
    }

}

function renderCourseList(courses) {
    let element = document.getElementById('course-list');
    element.innerHTML = '';
    courses.forEach((course) => {
        const date = new Date(course.last_updated)
        const itemElement = document.createElement('div');
        itemElement.className = 'card';
        itemElement.innerHTML = `     <div class="card_header">
        <a href=${course.url}>
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
            </a>
          </div>
          <div class="card_info">
            <p><span class="fa fa-users"></span>${course.status}</p>
            <p>last updated : ${date.toDateString()}</p>
          </div>
          <div class="card_footer">
            <span></span>
            <button class="btnAdd" id=${course.coupon_code} onclick="onUpdate('${course.coupon_code}')">Update</button>
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