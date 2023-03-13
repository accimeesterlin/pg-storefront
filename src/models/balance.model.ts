interface Balance {
    id: string;
    amount: number;
    gourdes: number;
    dailySpendingAmount: number;
    lastDepositTime: string;
    pendingAmount: number;
    totalAmountSpent: number;
    userID: string;
}

export default Balance;