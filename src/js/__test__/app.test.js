import { checkPaySystem, checkNumber } from '../app';


test.each([
  ['Visa check', '40131111', 'VISA'],
  ['MasterCard check', '50161111', 'MasterCard'],
  ['AE check', '50121111', 'American Express'],
  ['Diners check', '50191111', 'Diners'],
  ['Discover check', '40221111', 'Discover'],
  ['JCB check', '40211111', 'JCB'],
  ['МИР check', '40181111', 'МИР'],
  ['Не определено', '1111111', 'Платежная система не определена'],
])(('%s'), (_, input, expected) => {
  expect(checkPaySystem(input)).toBe(expected);
});

test('short number', () => {
  const num = '1234567';
  expect(checkNumber(num)).toBe('Incorrect length');
});

test('long number', () => {
  const num = '123456723123123123123123123';
  expect(checkNumber(num)).toBe('Incorrect length');
});

test('correct number', () => {
  const num = '1234 4453 5554 7772';
  expect(checkNumber(num)).toBe(1);
});

test('incorrect luhn', () => {
  const num = '1234 1234 1234 1234';
  expect(checkNumber(num)).toBe('Incorrect luhn');
});

test('correct luhn', () => {
  const num = '1234 1234 1234 1238';
  expect(checkNumber(num)).toBe(1);
});
