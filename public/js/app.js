console.log('fetch loaded');

const weatherForm = document.querySelector('form');

let address = '';
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  address = document.getElementById('inp').value;
  if (!address) {
    alert('please enter a value please');
    return;
  }
  fetch(`/weather?address=${address}`).then(resp => {
    resp.json().then(data => {
      document.getElementById('message-1').textContent = '';
      document.getElementById('message-1').textContent = data.temperature1;
      document.getElementById('message-2').textContent = '';
      document.getElementById('message-2').textContent = data.summary;
      console.log('data: ', data);
    });
  });
});
