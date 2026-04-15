fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
  });

  document.getElementById("btn-search").addEventListener("click", () => {
  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;
  const date = document.getElementById("date").value;

  fetch(`http://localhost:3000/trips?departure=${departure}&arrival=${arrival}&date=${date}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("results");

      container.innerHTML = "";

      if (data.Trips.length === 0) {
        container.innerHTML = `
          <img class="avatar" src="images/notfound.png" />
          <hr />
          <h6>No trips found</h6>
        `;
        return;
      }

      data.Trips.forEach(trip => {
container.innerHTML += `
  <div class="trip" data-id="${trip._id}">
    <div class="trip-left">
      <span>${trip.departure} → ${trip.arrival}</span>
    </div>

    <div class="trip-right">
      <span>${trip.price}€</span>
      <button class="btn-book">Book</button>
    </div>
  </div>
`;
      });
    });
});

  document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-book")) {

    const tripElement = e.target.closest(".trip");
    const tripId = tripElement.dataset.id;

    console.log("Trip ID:", tripId);

    fetch("http://localhost:3000/baskets/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trip: tripId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Added to basket:", data);
      });
  }
});