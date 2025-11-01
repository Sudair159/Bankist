'use strict';

// PROJECT: BANKIST APP

// Data
const account1 = {
  owner: 'Cornell University',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  movForLoan: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  loan: 0,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-05-20T17:01:17.194Z',
    '2023-05-19T23:36:17.929Z',
    '2023-05-22T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'eng-US', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movForLoan: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  loan: 0,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2023-05-20T17:01:17.194Z',
    '2023-05-22T23:36:17.929Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movForLoan: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 2,
  loan: 0,
  pin: 3333,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2023-05-20T17:01:17.194Z',
    '2023-05-22T23:36:17.929Z',
    '2023-05-22T23:36:17.929Z',
  ],
  currency: 'PKR',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sudais Bukhari',
  movements: [100000, -30000, -12500, -500, 100000],
  movForLoan: [100000, -30000, -12500, -500, 100000],
  interestRate: null,
  loan: 0,
  pin: 191267,
  movementsDates: [
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2023-05-20T17:01:17.194Z',
    '2023-06-22T23:36:17.929Z',
    '2023-06-22T23:36:17.929Z',
  ],
  currency: 'PKR',
  locale: 'en-US',
};

const account5 = {
  owner: 'Adan Farhan',
  movements: [100000, 1000, -500],
  movForLoan: [1000, 1000, -500],
  interestRate: null,
  loan: 0,
  pin: 1234,
  movementsDates: [
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2023-05-20T17:01:17.194Z',
    '2023-06-22T23:36:17.929Z',
    '2023-06-22T23:36:17.929Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelInterest = document.querySelector('.summary__label--interest');

const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const hideLogin = document.querySelector('.hideLogin');
const logout = document.querySelector('.logout');

// CURRENT ACCOUNT
let account, timer;

// CREATE USERNAME

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};
createUserName(accounts);

// DISPLAY DATES
const displayDates = function () {
  // INTERNATIONALIZATION
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(account.locale, options).format(new Date());
};

const timerFn = function () {
  let time = 300;
  const tick = function () {
    // Calc Time
    const minutes = Math.floor(time / 60);
    const seconds = String(time % 60);
    // Display Time
    labelTimer.textContent = `${minutes || `00`}:${seconds.padStart(2, 0)}`;
    // Timer hits 0
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Goodbye ${account.owner.split(' ')[0]},`;
      containerApp.style.opacity = 0;
      account = '';
    }
    // Decrease Time
    time--;
  };
  // Call the timer each second
  tick();
  const timerReturn = setInterval(tick, 1000);
  return timerReturn;
};
// Restart Timer
const restartTimer = function () {
  // Restart Timer
  if (timer) clearInterval(timer);
  timer = timerFn();
};

// FORMAT CURRENCY
const formatCur = (value, locale, currency) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

// DISPLAY MONEY

// 1- All Movements + Dates
const displayMovs = function (acc, sort = false) {
  // Sort
  const movements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  // Clear Movements
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    // DATE
    const today = new Date();
    const movDate = new Date(acc.movementsDates[i]);
    let displayDate = new Intl.DateTimeFormat(account.locale).format(movDate);

    const calcDayDiff = (one, two) =>
      Math.round(Math.abs(two - one) / (1000 * 60 * 60 * 24));

    const diff = calcDayDiff(today, movDate);
    if (diff === 0) displayDate = 'Today';
    else if (diff === 1) displayDate = 'Yesterday';
    else if (diff <= 7) displayDate = `${diff} days ago`;

    // MOVEMENT
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type.toUpperCase()}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formatCur(
      mov,
      acc.locale,
      acc.currency
    )}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// 2- Balance
let balance;
const displayBalance = function (movement) {
  balance = movement.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    balance,
    account.locale,
    account.currency
  )}`;
};

// 3- Summary
const displaySummary = function (acc) {
  // Calculate
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const withdraws = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (acc.interestRate / 100))
    .filter(interest => interest > 1)
    .reduce((acc, mov) => acc + mov, 0);

  // Display
  labelSumIn.textContent = `${formatCur(deposits, acc.locale, acc.currency)}`;
  labelSumOut.textContent = `${formatCur(withdraws, acc.locale, acc.currency)}`;
  if (interest)
    labelSumInterest.textContent = ` ${formatCur(
      interest,
      acc.locale,
      acc.currency
    )}`;
  else {
    labelSumInterest.classList.add('reduce');
    labelSumInterest.textContent = `Interest Free`;
  }
};

// 4- Sort Movementa
let sort = false;
const sortFn = function (e) {
  e.preventDefault();
  sort = sort ? false : true;
  displayMovs(account, sort);
};
btnSort.addEventListener('click', sortFn);

// 5- Calc Loan of All Accounts
const calcLoanAll = function () {
  const totalLoan = accounts
    .map(account => account.loan)
    .reduce((acc, loan) => acc + loan, 0);
  // console.clear();
  return console.log(`Total Loan: ${totalLoan}`);
};

// UPDATE UI
const updateUI = function (acc) {
  // Display Movements
  displayMovs(acc);
  // Display Balance
  displayBalance(acc.movements);
  // Display Summary
  displaySummary(acc);
  // Calculate Total Loan
  calcLoanAll();

  // Time
  labelDate.textContent = displayDates();
};

// IMPLEMENTING LOG IN

const login = function (e) {
  // Prevent Form from Submitting
  e.preventDefault();
  // Credentials
  const username = inputLoginUsername.value;
  const pin = +inputLoginPin.value;
  // Select Curr Account
  account = accounts.find(acc => acc.username === username && acc.pin === pin);

  if (account?.pin === pin) {
    // Display UI and Message
    labelWelcome.textContent = `Welome ${account.owner.split(' ')[0]},`;
    containerApp.style.opacity = 100;
    // Update Ui
    updateUI(account);
    // Start Timer
    restartTimer();

    hideLogin.classList.add('hidden');
    logout.classList.remove('hidden');
  } else {
    alert('Incorrect Credentials');
  }
  // Clear Inputs
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
};
btnLogin.addEventListener('click', login);

// LOG OUT

const logoutFn = function () {
  //Update Ui
  labelWelcome.textContent = `Log in to get started,`;
  containerApp.style.opacity = 0;
  restartTimer();

  hideLogin.classList.remove('hidden');
  logout.classList.add('hidden');
};
document.querySelector('.logout').addEventListener('click', logoutFn);

// IMPLEMENTING TRANSFERS

const tranferAmount = function (e) {
  // Prevent Form from Submitting
  e.preventDefault();
  // Selecting Variables
  const amount = Math.floor(inputTransferAmount.value);
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  // Logic
  if (
    amount > 0 &&
    amount <= balance &&
    receiver &&
    receiver?.username !== account.username
  ) {
    restartTimer();
    // Update Senders Array
    account.movements.push(-amount);
    account.movForLoan.push(-amount);
    account.movementsDates.push(new Date().toISOString());
    // Update Receivers Array
    receiver.movements.push(amount);
    receiver.movForLoan.push(amount);
    receiver.movementsDates?.push(new Date().toISOString()) ||
      console.log('Doesnt Exist');

    // Update UI
    updateUI(account);
  } else alert('Transfer Failed');

  // Clear Inputs
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferAmount.blur();
};
btnTransfer.addEventListener('click', tranferAmount);

// IMPLEMENTING LOAN

const loan = function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  const balance = account.movForLoan.reduce((acc, mov) => acc + mov, 0);
  account.loan += amount;

  // Conditions
  if (amount > 0 && account.loan <= 0.1 * balance) {
    restartTimer();
    setTimeout(function () {
      account.movements.push(amount);
      account.movementsDates.push(new Date().toISOString());
      updateUI(account);
      alert('Loan Approved');
    }, 3000);
  } else {
    restartTimer();
    account.loan -= amount;
    alert(
      `Exceeds Loan Limit or Outstanding Loan \n Loan Limit: ${
        balance * 0.1
      } \n Outstanding Loan: ${account.loan}`
    );
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
};
btnLoan.addEventListener('click', loan);

// DELETE ACCOUNT

const deleteAccount = function (e) {
  e.preventDefault();
  // Logic
  // Credentials
  const username = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  // Select Account
  if (account.username === username && account.pin === +pin) {
    const accountDelete = accounts.findIndex(
      acc => acc.username === username && acc.pin === +pin
    );
    //Update Ui
    labelWelcome.textContent = `Log in to get started,`;
    containerApp.style.opacity = 0;
    // Delete Account
    accounts.splice(accountDelete, 1);
    clearInterval(timer);
  } else alert('Incorrect Credentials');

  // Clear Fields
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputClosePin.blur();
};
btnClose.addEventListener('click', deleteAccount);


