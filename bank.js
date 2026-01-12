function createBankAccount(initialBalance) {
  let balance = initialBalance;
  const history = [];

  // 입금
  return {
    deposit: (amount) => {
      if (amount <= 0) return false;

      balance += amount;
      history.push({ type: "deposit", amount });
      return true;
    },

    // 출금
    withdraw: (amount) => {
      if (amount <= 0) return false;
      if (balance < amount) return false;

      balance -= amount;
      history.push({ type: "withdraw", amount });
      return true;
    },

    // 잔액 조회
    getBalance: () => {
      return balance;
    },

    // 거래 내역 조회
    getHistory: () => {
      // 외부에서 history 직접 수정 못 하게 복사본 반환
      return [...history];
    },
  };
}

// 테스트
const account = createBankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
console.log(account.withdraw(2000)); // false
console.log(account.withdraw(300)); // true
console.log(account.getBalance()); // 1200
console.log(account.getHistory());
// [{type: 'deposit', amount: 500}, {type: 'withdraw', amount: 300}]
