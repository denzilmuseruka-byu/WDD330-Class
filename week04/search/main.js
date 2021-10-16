const form = document.forms['search'];
const input = form['searchInput'];
// input.value = 'Search Here';
input.addEventListener('focus', function(){
    if (input.value==='Search Here') {
        input.value = '' 
    }
}, false);
input.addEventListener('blur', function(){
    if(input.value === '') {
        // input.value = 'Search Here';
    } }, false);
form.addEventListener ('submit', search, false);
function search() {
    alert(`You Searched for: ${input.value}`);
    event.preventDefault();
}