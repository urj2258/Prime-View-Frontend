export interface PlotItem {
  size: string;
  tag: string;
  dimensions: string;
  totalPrice: string;
  downPayment: string;
  downPaymentPercent: string;
  monthly: string;
  monthlyCount: number;
  halfYearly: string;
  halfYearlyCount: number;
  possession?: string;
  image: string;
}

export const plots: PlotItem[] = [
  {
    size: "05 Marla",
    tag: "Residential",
    dimensions: "25 x 50",
    totalPrice: "2,500,000",
    downPayment: "625,000",
    downPaymentPercent: "25%",
    monthly: "24,500",
    monthlyCount: 39,
    halfYearly: "90,000",
    halfYearlyCount: 8,
    possession: "200,000",
    image: "/new assests/our plan assests/card 1.png",
  },
  {
    size: "7.5 Marla",
    tag: "Residential",
    dimensions: "30 x 40",
    totalPrice: "3,600,000",
    downPayment: "900,000",
    downPaymentPercent: "25%",
    monthly: "35,000",
    monthlyCount: 39,
    halfYearly: "130,000",
    halfYearlyCount: 8,
    possession: "295,000",
    image: "/new assests/our plan assests/card 2.png",
  },
  {
    size: "10 Marla",
    tag: "Residential",
    dimensions: "35 x 70",
    totalPrice: "4,900,000",
    downPayment: "1,225,000",
    downPaymentPercent: "25%",
    monthly: "48,000",
    monthlyCount: 39,
    halfYearly: "175,000",
    halfYearlyCount: 8,
    possession: "400,000",
    image: "/new assests/our plan assests/card 3.png",
  },
  {
    size: "13 Marla",
    tag: "Residential",
    dimensions: "40 x 80",
    totalPrice: "6,400,000",
    downPayment: "1,600,000",
    downPaymentPercent: "25%",
    monthly: "60,000",
    monthlyCount: 39,
    halfYearly: "230,000",
    halfYearlyCount: 8,
    possession: "620,000",
    image: "/new assests/our plan assests/card 4.png",
  },
  {
    size: "01 Kanal",
    tag: "Residential",
    dimensions: "50 x 100",
    totalPrice: "10,000,000",
    downPayment: "2,500,000",
    downPaymentPercent: "25%",
    monthly: "98,000",
    monthlyCount: 39,
    halfYearly: "360,000",
    halfYearlyCount: 8,
    possession: "800,000",
    image: "/new assests/our plan assests/card 5.png",
  },
  {
    size: "02 Kanal",
    tag: "Residential",
    dimensions: "75 x 120",
    totalPrice: "30,000,000",
    downPayment: "9,000,000",
    downPaymentPercent: "30%",
    monthly: "294,000",
    monthlyCount: 39,
    halfYearly: "1,080,000",
    halfYearlyCount: 8,
    image: "/new assests/our plan assests/card 6.png",
  },
];
