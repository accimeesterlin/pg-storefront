interface Balance {
    id: string;
    amount: number;
    userID: string;
    gourdes?: number;
    dailySpendingAmount?: number;
    lastDepositTime?: string;
    pendingAmount?: number;
    totalAmountSpent?: number;
}

export default Balance;