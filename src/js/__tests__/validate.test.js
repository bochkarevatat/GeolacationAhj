import Timeline from '../timeline.js';

const timeline = new Timeline();

test('Valid with a space', () => {
  const received = timeline.checkValidity('51.50851, -0.1257');
  expect(received).toEqual(['51.50851, -0.1257']);
});

test('Valid without spaces', () => {
  const received = timeline.checkValidity('51.50851,0.1257');
  expect(received).toEqual(['51.50851,0.1257']);
});

test('Valid have square brackets', () => {
  const received = timeline.checkValidity('[51.50851, -0.12572]');
  expect(received).toEqual(['[51.50851, -0.12572]']);
});

test('nothing entered', () => {
  const received = timeline.checkValidity('');
  expect(received).toBe(null);
});

test('Wrong format', () => {
  const received = timeline.checkValidity('675667,4883939');
  expect(received).toBe(null);
});

test('Not digital format', () => {
  const received = timeline.checkValidity('dfgdh, 34.99393');
  expect(received).toBe(null);
});
