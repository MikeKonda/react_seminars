// Задание 3. Платежи (20 минут)
//
// 1. Реализуйте describePayment: switch по метке kind.
// 2. Закройте switch проверкой полноты через never.
// 3. Реализуйте total — сумма только наличных платежей.
// 4. Добавьте четвёртый вариант оплаты и посмотрите, где компилятор
//    покажет незакрытые места.

export type Payment =
    | { kind: "card"; last4: string }
    | { kind: "cash"; amount: number }
    | { kind: "transfer"; iban: string };

export function assertNever(value: never): never {
    throw new Error("Необработанный вариант: " + JSON.stringify(value));
}

export function describePayment(payment: Payment): string {
    switch (payment.kind) {
        case "card":
            return `card: ${payment.last4}`;
        case "cash":
            return `cash: ${payment.amount}`;
        case "transfer":
            return `transfer: ${payment.iban}`;
    
        default:
            assertNever(payment);
    }
}

export function total(payments: Payment[]): number {
    let cash_total = 0;

    payments.forEach((el) => {
        if (el.kind == 'cash'){
            cash_total += el.amount;
        }
    });

    return cash_total;
}
