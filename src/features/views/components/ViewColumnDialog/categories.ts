import { CHOICES } from './choices';

const enum CATEGORIES {
  BASIC = 'basic',
}

const categories = [
  {
    choices: [CHOICES.FIRST_AND_LAST_NAME, CHOICES.PERSON_FIELDS],
    key: CATEGORIES.BASIC,
  },
];

export default categories;
