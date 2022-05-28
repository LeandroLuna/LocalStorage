const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; // fill the items array with local storage items OR its must fallback and create a blank/empty array.
const checkAll = document.querySelector('.check-all');

function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: false,
    };
    items.push(item);
    populeteList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populeteList(plates = [], platesList) {
    platesList.innerHTML = plates
        .map((plate, index) => {
            return `<li>
      <input type="checkbox" data-index=${index} id="item${index}" ${
        plate.done ? 'checked' : ''
      }/>
    <label for="item${index}">${plate.text}</label>
    </li>`;
        })
        .join(''); // Create a extensive string for all the items
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done; // flip-flop the value of .done method between true or false
    localStorage.setItem('items', JSON.stringify(items));
    populeteList(items, itemsList);
}

function handleCheckAll(e) {
    const allCheck = items.every((item) => item.done === true);
    if (allCheck) {
        items.forEach((item) => (item.done = false));
    } else {
        items.forEach((item) => (item.done = true));
    }
    localStorage.setItem('items', JSON.stringify(items));
    populeteList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone); // event delegation: listening to a parent class (higher level) and handling the childs
checkAll.addEventListener('click', handleCheckAll);

populeteList(items, itemsList); // populate the itemsList to be shown on website/html