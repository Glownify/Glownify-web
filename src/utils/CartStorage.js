const CART_KEY = "@user_cart";

export const getCart = () => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToCart = (salon, service) => {
  let cart = getCart();

  const salonIndex = cart.findIndex(
    (item) => item.salonId === salon._id
  );

  if (salonIndex > -1) {
    const exists = cart[salonIndex].services.some(
      (s) => s._id === service._id
    );

    if (!exists) {
      cart[salonIndex].services.push(service);
    }
  } else {
    cart.push({
      salonId: salon._id,
      salonName: salon.shopName,
      services: [service],
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};
