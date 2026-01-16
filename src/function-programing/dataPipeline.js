const orders = [
  {
    id: 1,
    customer: "Kim",
    items: [
      { name: "Book", price: 15 },
      { name: "Pen", price: 3 },
    ],
    status: "completed",
  },
  {
    id: 2,
    customer: "Lee",
    items: [{ name: "Laptop", price: 1200 }],
    status: "pending",
  },
  {
    id: 3,
    customer: "Park",
    items: [
      { name: "Mouse", price: 25 },
      { name: "Keyboard", price: 75 },
    ],
    status: "completed",
  },
  {
    id: 4,
    customer: "Kim",
    items: [{ name: "Monitor", price: 300 }],
    status: "completed",
  },
  {
    id: 5,
    customer: "Choi",
    items: [{ name: "USB", price: 10 }],
    status: "cancelled",
  },
];

//TODO: 파이프라인 함수들 구현

// 1. 완료된 주문만 필터링
const completedOrders = orders.filter((order) => order.status === "completed");

// 2. 각 주문의 총액 계산
const ordersWithTotal = completedOrders.map((order) => {
  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  return {
    ...order,
    total,
  };
});

// 3. 고객별 총 구매액 계산
const customerTotals = ordersWithTotal.reduce((acc, order) => {
  const customer = order.customer;

  if (!acc[customer]) {
    acc[customer] = 0;
  }

  acc[customer] += order.total;

  return acc;
}, {});

// 4. 가장 많이 구매한 고객 찾기
const topCustomer = Object.entries(customerTotals).reduce(
  (max, [customer, total]) => {
    if (total > max.total) {
      return { customer, total };
    }
    return max;
  },
  { customer: null, total: 0 }
);

// 5. 전체 파이프라인
function getTopCustomer(orders) {
  return Object.entries(
    orders
      .filter((order) => order.status === "completed")
      .map((order) => ({
        ...order,
        total: order.items.reduce((sum, item) => sum + item.price, 0),
      }))
      .reduce((acc, order) => {
        acc[order.customer] = (acc[order.customer] || 0) + order.total;
        return acc;
      }, {})
  ).reduce(
    (max, [customer, total]) => (total > max.total ? { customer, total } : max),
    { customer: null, total: 0 }
  );
}

console.log(getTopCustomer(orders));
// { customer: 'Kim', total: 318 }
