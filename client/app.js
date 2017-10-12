const makeButton = (text, action) => {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.onclick = action;
  return btn;
};

const root = document.getElementById('app');
const output = document.createElement('div');

const withLogResponse = promise => (
  promise.then(res => res.text()).then(body => {
    output.innerHTML += body + '<br/>';
  })
);

[
  makeButton('I want food!', () => withLogResponse(window.api.go.get('food'))),
  makeButton('I want drink!', () => withLogResponse(window.api.go.get.me.a('drink'))),
  makeButton('I want to watch TV!', () => withLogResponse(window.api.get.me('tv'))),
  makeButton('Clean after me!', () => { output.innerHTML = ''; }),
].forEach(button => root.appendChild(button));

root.appendChild(output);
