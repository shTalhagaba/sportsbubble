import { Images } from 'src/utils';

export const stageToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2Rldi0zNTM5MjYyLm9rdGEuY29tL29hdXRoMi92MS90b2tlbiIsImlzcyI6IjBvYTlrN2RpYWRqOUxJN0tkNWQ2Iiwic3ViIjoiMG9hOWs3ZGlhZGo5TEk3S2Q1ZDYifQ.sJCxcymR_X_OtWCZxJ5_AfUbWvKkd1ML8JW-Wl91xV8uJ2paw067kEgfR7QYz6dk3-1-egBjyf1Mifm1cTN1S8JPpkd1NN1Aw6uuky3lt5jmjeHwwqL-XHzIkSjLN_t8zdO5OpDqtlbEqyNGtJFCONJ9K-hCjp7u5FWCZ1nKwIK3X1w-FVjRDLbvJrTrh8IJriqPhiWHfkGbz-jm6yStYXMw3uhcKd164RA2l8utz4jnVRn9ebcOiN_BQb3yvtqBc0CsxB6YKQmmW7Rbpg8cRU3B1zfLfMMu2QVPLYr5vDD2mhK1PwixUZ6UnYrYirXWNNTqyZquGZPQWpIlY9sIwA'
export const wrongEventId = '9f25117c-78ed-4af1-a2fb-ed5cef8ed414';

export const sportDummyList = [
  {
    id: 1,
    img: Images.BaseBall,
    name: 'Baseball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 2,
    img: Images.BasketBall,
    name: 'Basketball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 3,
    img: Images.BaseBall,
    name: 'Boxing',
    notifcationFlag: false,
    fvrtFlag: false,
  },
];

// Sample data for the category slider
export const categoryArr = [
  {
    id: 1,
    title: 'all',
    value: 'all',
    selected: true,
  },
  {
    id: 2,
    title: 'pro',
    value: 'pro',
    selected: false
  },
  {
    id: 3,
    title: 'college',
    value: 'college',
    selected: false

  },
  {
    id: 4,
    title: 'esports',
    value: 'esports',
    selected: false

  },
];

// Sample data for the category slider my sports
export const categoryArrMySports = [
  {
    id: 1,
    title: 'pro',
    value: 'pro',
    selected: true, // Default to true for "Pro"
  },
  {
    id: 2,
    title: 'college',
    value: 'college',
    selected: false,
  },
  {
    id: 3,
    title: 'esports',
    value: 'esports',
    selected: false,
  },
  {
    id: 4,
    title: 'other',
    value: 'other',
    selected: false,
  },
];

export const paymentList = [
  { id: 1, name: "Credit", selected: false },
  { id: 2, name: "Debit", selected: false },
  { id: 3, name: "Other Option", selected: false },
]

export const sportStreamingList = [
  {
    id: 1,
    img: Images.BaseBall,
    title: 'Baseball',
    selected: true,
  },
  {
    id: 2,
    img: Images.BasketBall,
    title: 'Basketball',
    selected: false,
  },
  {
    id: 3,
    img: Images.BaseBall,
    title: 'Boxing',
    selected: false,
  },
];

export const optionsList = [
  { id: 1, label: 'he/him', value: 'he/him' },
  { id: 2, label: 'she/her', value: 'she/her' },
  { id: 3, label: 'they/them', value: 'they/them' },
  { id: 4, label: 'Rather not provide', value: 'Rather not provide' },
  { id: 5, label: 'other', value: 'other' }
];