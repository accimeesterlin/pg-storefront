
export interface GlobalSetting {
    id?: string;
    message?: string;
    isError?: boolean;

    // User
    announcement?: string;
    asanaSecret?: string;
    operatorId?: string;
    cardFees?: number;
    transFerFees?: number;
    cashAppFees?: number;
    dopExchangeRateAmount?: number;
    monCashFees?: number;
    transactionLimitAmount?: number;
    monCashWithdrawFees?: number;
    zelleFees?: number;
    topupFees?: number;
    paypalFees?: number;
    virtualCardFees?: number;
    physicalCardFees?: number;
    bankRewardFees?: number;
    paymeFees?: number;

    operators?: any[];

    // Agents
    agentTopupFees?: number;
    agentTransFerFees?: number;
    agentVirtualCardFees?: number;
    agentCardFees?: number;
    agentPayPalFees?: number;
    agentBankRewardFees?: number;
    agentPhysicalCardFees?: number;

    // Boolean
    isPaymeEnabled?: boolean;
    isInviteEnabled?: boolean;
    isBankWithdrawEnabled?: boolean;
    isVideoTrainingEnabled?: boolean;
    isPlaidEnabled?: boolean;
    isAmazonGiftCardEnabled?: boolean;
    isExpressDeliveryEnabled?: boolean;
    isEbayGiftCardEnabled?: boolean;
    isStripeCreditCardEnabled?: boolean;
    isCryptoEnabled?: boolean;
    isDivvyCardEnabled?: boolean;
    isUberAccountConnected?: boolean;
    isAmazonAccountConnected?: boolean;
    isGiftCardDeliveryFeesEnabled?: boolean;
    isMasterCardGiftCardEnabled?: boolean;
    isBinanceGiftCardEnabled?: boolean;
    isBinanceHTGiftCardEnabled?: boolean;
    isVisaGiftCardEnabled?: boolean;
    isNetflixGiftCardEnabled?: boolean;
    isPGPayEnabled?: boolean;
    isComplyCubeIdentityEnabled?: boolean;
    isCallCenterEnabled?: boolean;
    isEcommerceEnabled?: boolean;
    isAgentPortalEnabled?: boolean;
    isFlutterWaveCreditCardEnabled?: boolean;
    isTPMasterCardEnabled?: boolean;
    isBusinessEnabled?: boolean;
    isUnibankEnabled?: boolean;
    isTicketDisabled?: boolean;
    isBUHEnabled?: boolean;
    isAnnouncementEnabled?: boolean;
    isReloadlyGiftCardEnabled?: boolean;
    isTransferPamEnabled?: boolean;
    isCryptoPaymentEnabled?: boolean;
    isPayPalEnabled?: boolean;
    isWithdrawEnabled?: boolean;
    isMonCashAutomaticWithdrawEnabled?: boolean;
    isRegisterBusinessEnabledUSA?: boolean;
    isVirtualCardEnabled?: boolean;
    isPayPalRewardsEnabled?: boolean;
    isMonCashEnabled?: boolean;
    isNatCashEnabled?: boolean;
    isNewVisaDesign?: boolean;
    isMasterCardUSDEnabled?: boolean;
    isMasterCardCADEnabled?: boolean;
    isTransferEnabled?: boolean;
    isPaymePremiumEnabled?: boolean;
    isZelleEnabled?: boolean;
    isCashAppEnabled?: boolean;
    isCashAppWithdrawEnabled?: boolean;
    isCVCHidden?: boolean;
    isFlutterWavePaymeEnabled?: boolean;
    isUSABankRewardsEnabled?: boolean;
    isPhysicalCardRewardsEnabled?: boolean;
    isBalanceEnabled?: boolean;
    isPartner?: boolean;
    isTopUpEnabled?: boolean;
    isPayPalPayoutEnabled?: boolean;
    isStripeEnabled?: boolean;
    isStripeIssuingEnabled?: boolean;
    isAPIEnabled?: boolean;

    // External values
    reloadlyBalance?: number;
    twillioBalance?: number;
    dingBalance?: number;

    createdAt?: string;
    updatedAt?: string;
}
