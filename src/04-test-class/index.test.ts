// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';


describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  

  test('should create account with initial balance', () => {
    const newAccount = getBankAccount(150);
    expect(newAccount.getBalance()).toBe(150);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const newAccount = getBankAccount(80);
    expect(() => newAccount.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAccountA = getBankAccount(300);
    const newAccountB = getBankAccount(200);
    expect(() => newAccountA.transfer(350, newAccountB)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const newAccount = getBankAccount(400);
    expect(() => newAccount.transfer(50, newAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newAccount = getBankAccount(500);
    newAccount.deposit(250);
    expect(newAccount.getBalance()).toBe(750);
  });

  test('should withdraw money', () => {
    const newAccount = getBankAccount(600);
    newAccount.withdraw(350);
    expect(newAccount.getBalance()).toBe(250);
  });

  test('should transfer money', () => {
    const newAccountA = getBankAccount(900);
    const newAccountB = getBankAccount(500);
    newAccountA.transfer(400, newAccountB);
    expect(newAccountA.getBalance()).toBe(500);
    expect(newAccountB.getBalance()).toBe(900);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const newAccount = getBankAccount(150);

    jest.spyOn(newAccount, 'fetchBalance').mockResolvedValue(150);      

    const fetchedBalance = await newAccount.fetchBalance();

    expect(fetchedBalance).toBe(150);

    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newAccount = getBankAccount(150);
    jest.spyOn(newAccount, 'fetchBalance').mockResolvedValue(300);
    await newAccount.synchronizeBalance();
    expect(newAccount.getBalance()).toBe(300);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newAccount = getBankAccount(150);
    jest.spyOn(newAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(newAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
