let users = {};
let currentUser = null;
let accounts = {};
let balances = {};

// Show Sign Up Form
function showSignUp() {
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
}

// Show Sign In Form
function showSignIn() {
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('signInForm').style.display = 'block';
}

// Sign Up Function
function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const name = document.getElementById('signupName').value;
    const age = document.getElementById('signupAge').value;
    const city = document.getElementById('signupCity').value;

    if (users[username]) {
        alert('Username already exists!');
    } else {
        users[username] = { password, name, age, city };
        accounts[username] = Math.floor(10000000 + Math.random() * 90000000);
        balances[username] = 0;
        alert('Account created! Your account number is ' + accounts[username]);
        document.getElementById('signUpForm').reset();
    }
}

// Sign In Function
function signIn() {
    const username = document.getElementById('signinUsername').value;
    const password = document.getElementById('signinPassword').value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('bankingServices').style.display = 'block';
        document.getElementById('welcomeUser').innerText = `Welcome, ${users[username].name}`;
    } else {
        alert('Invalid credentials, try again.');
    }
}

// Balance Enquiry
function balanceEnquiry() {
    document.getElementById('balanceInfo').innerText = `Your balance is $${balances[currentUser]}`;
}

// Deposit Function
function showDeposit() {
    toggleForms('depositForm');
}

function deposit() {
    const amount = parseInt(document.getElementById('depositAmount').value);
    balances[currentUser] += amount;
    alert('Deposit successful! New balance: $' + balances[currentUser]);
}

// Withdraw Function
function showWithdraw() {
    toggleForms('withdrawForm');
}

function withdraw() {
    const amount = parseInt(document.getElementById('withdrawAmount').value);
    if (amount > balances[currentUser]) {
        alert('Insufficient funds!');
    } else {
        balances[currentUser] -= amount;
        alert('Withdrawal successful! New balance: $' + balances[currentUser]);
    }
}

// Fund Transfer Function
function showFundTransfer() {
    toggleForms('fundTransferForm');
}

function fundTransfer() {
    const receiver = document.getElementById('receiverAccount').value;
    const amount = parseInt(document.getElementById('transferAmount').value);

    if (balances[currentUser] >= amount) {
        const receiverUsername = Object.keys(accounts).find(key => accounts[key] == receiver);
        if (receiverUsername) {
            balances[currentUser] -= amount;
            balances[receiverUsername] += amount;
            alert(`Successfully transferred $${amount} to ${receiverUsername}`);
        } else {
            alert('Receiver account not found!');
        }
    } else {
        alert('Insufficient funds!');
    }
}

// Logout Function
function logout() {
    currentUser = null;
    document.getElementById('auth').style.display = 'block';
    document.getElementById('bankingServices').style.display = 'none';
    document.getElementById('balanceInfo').innerText = '';
}

// Toggle Forms
function toggleForms(formId) {
    const forms = document.querySelectorAll('.bankingForm');
    forms.forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}
