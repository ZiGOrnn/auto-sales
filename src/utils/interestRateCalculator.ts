/**
 * การจำนวนอัตราดอกเบี้ยของยอดเงินต้น:
 * @param {number} principal ยอดเงินต้น
 * @param {number} interestRate อัตราดอกเบี้ยร้อยละ
 */
export const interestRateCalculator = (
  principal: number,
  interestRate: number
) => {
  return (principal / 100) * interestRate;
};
