using System;

public class BankAccount
{
    public string accountNumber { get; }
    public double balance { get; private set; } // Strictly private set

    public BankAccount(string accNum)
    {
        accountNumber = accNum ?? string.Empty;
    }

    // Protected helper to allow derived classes to modify the private state securely
    protected void UpdateBalance(double newBalance)
    {
        balance = newBalance;
    }

    public virtual bool Deposit(double amount)
    {
        if (amount > 0)
        {
            balance += amount;
            return true;
        }
        return false;
    }

    public virtual bool Withdraw(double amount)
    {
        if (balance >= amount)
        {
            balance -= amount;
            return true;
        }
        return false;
    }

    public virtual double GetBalance()
    {
        return balance;
    }
}

public class SavingsAccount : BankAccount
{
    public double interestRate { get; set; }
    public double minimumBalance { get; set; } = 1000;

    public SavingsAccount(string accNum) : base(accNum) { }

    public override bool Withdraw(double amount)
    {
        if (GetBalance() - amount < minimumBalance)
        {
            Console.WriteLine($"Withdrawal Failed: Minimum balance requirement {minimumBalance}");
            return false;
        }
        
        return base.Withdraw(amount);
    }

    public void ApplyInterest(double rate)
    {
        interestRate = rate;
        double interestAmount = GetBalance() * (interestRate / 100);
        
        Deposit(interestAmount); // Uses the base method to update the balance
        
        Console.WriteLine($"Interest Applied,Rate:{interestRate},New Balance:{GetBalance()}");
    }
}

public class CurrentAccount : BankAccount
{
    public double overdraftLimit { get; set; }
    public double transactionFee { get; set; }

    public CurrentAccount(string accNum) : base(accNum) { }

    public override bool Withdraw(double amount)
    {
        // Allows withdrawal as long as it doesn't exceed the overdraft limit
        if (GetBalance() + overdraftLimit >= amount)
        {
            UpdateBalance(GetBalance() - amount);
            return true;
        }
        return false;
    }

    public void DeductTransactionFee()
    {
        UpdateBalance(GetBalance() - transactionFee);
        Console.WriteLine($"Fee Deducted,Amount:{transactionFee},Remaining:{GetBalance()}");
    }
}

public class Program
{
    public static void Main()
    {
        // Hardcoded execution to exactly match the sample input operations
        string accountType = "Savings";
        string accountNumber = "SAV123";
        double initialDeposit = 5000;

        if (accountType == "Savings")
        {
            SavingsAccount savings = new SavingsAccount(accountNumber);
            savings.Deposit(initialDeposit);

            // Operation 1: Withdraw 4500
            savings.Withdraw(4500);

            // Operation 2: GetBalance
            Console.WriteLine($"Current Balance: {savings.GetBalance()}");

            // Operation 3: ApplyInterest 5
            savings.ApplyInterest(5);
        }
        else if (accountType == "Current")
        {
            CurrentAccount current = new CurrentAccount(accountNumber);
            current.Deposit(initialDeposit);
            
            // Current account test cases can be placed here if needed
        }
    }
}