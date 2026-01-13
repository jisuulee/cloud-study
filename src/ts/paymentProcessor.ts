interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// 추상 클래스
abstract class PaymentProcessor {
  // 공통 인터페이스
  abstract process(amount: number, currency: string): Promise<PaymentResult>;

  // 공통 유틸 (선택)
  protected generateTransactionId(): string {
    return Math.random().toString(36).slice(2);
  }
}

// 신용카드 결제
class CreditCardProcessor extends PaymentProcessor {
  async process(amount: number, currency: string): Promise<PaymentResult> {
    if (amount <= 0) {
      return { success: false, error: "Invalid amount" };
    }

    return {
      success: true,
      transactionId: `cc_${this.generateTransactionId()}`,
    };
  }
}

// PayPal 결제
class PayPalProcessor extends PaymentProcessor {
  async process(amount: number, currency: string): Promise<PaymentResult> {
    if (currency !== "USD") {
      return { success: false, error: "PayPal supports USD only" };
    }

    return {
      success: true,
      transactionId: `pp_${this.generateTransactionId()}`,
    };
  }
}

// 암호화폐 결제
class CryptoProcessor extends PaymentProcessor {
  async process(amount: number, currency: string): Promise<PaymentResult> {
    if (amount < 0.0001) {
      return { success: false, error: "Amount too small for crypto payment" };
    }

    return {
      success: true,
      transactionId: `crypto_${this.generateTransactionId()}`,
    };
  }
}

// 팩토리
class PaymentFactory {
  static create(type: "credit" | "paypal" | "crypto"): PaymentProcessor {
    switch (type) {
      case "credit":
        return new CreditCardProcessor();
      case "paypal":
        return new PayPalProcessor();
      case "crypto":
        return new CryptoProcessor();
      default:
        // exhaustiveness check
        const _exhaustive: never = type;
        throw new Error(`Unsupported payment type: ${_exhaustive}`);
    }
  }
}

// 테스트
const creditProcessor = PaymentFactory.create("credit");
const result = await creditProcessor.process(100, "USD");
console.log(result);

export {};
