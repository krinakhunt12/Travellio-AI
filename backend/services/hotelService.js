// services/hotelService.js
function calculateHotelCost(pricePerNight, nights, rooms = 1) {
  return pricePerNight * nights * rooms;
}

module.exports = { calculateHotelCost };
