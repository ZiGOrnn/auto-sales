import { interestRateCalculator } from "./interestRateCalculator";

/**
 * การคิดดอกเบี้ยในการผ่อนชำระแบบคงที่:
 * @param {number} principal ยอดเงินต้น
 * @param {number} interestRate อัตราดอกเบี้ยร้อยละ
 * @param {number} numInstallments จำนวนงวด
 */
export const installmentAmountPerMonth = (
  principal: number,
  interestRate: number,
  numInstallments: number
) => {
  const interest = principal / numInstallments;
  const installment = interestRateCalculator(principal, interestRate);
  return interest + installment;
};
