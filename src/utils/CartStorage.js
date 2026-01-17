export const getCartKey = (userId) => `@user_cart_${userId}`;

export const getCart = (userId) => {
  const data = localStorage.getItem(getCartKey(userId));
  return data ? JSON.parse(data) : [];
};

export const removeFromCart = (userId, salonId, serviceId) => {
  let cart = getCart(userId);
  const salonIndex = cart.findIndex((item) => item.salonId === salonId);

  if (salonIndex > -1) {
    cart[salonIndex].services = cart[salonIndex].services.filter(
      (s) => s._id !== serviceId
    );
    if (cart[salonIndex].services.length === 0) {
      cart.splice(salonIndex, 1);
    }
  }

  localStorage.setItem(getCartKey(userId), JSON.stringify(cart));
  return cart;
};

export const addToCart = (userId, salon, service) => {
  let cart = getCart(userId);

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

  localStorage.setItem(getCartKey(userId), JSON.stringify(cart));
  return cart;
};
