const purchaseDiv = document.getElementById('purchasse')

function createTripDiv(trip){
    const tripDiv = document.createElement('div')

    tripDiv.classList.add('trips')

    tripDiv.style.backgroundColor = '#ede0df'
    tripDiv.style.display = 'flex'
    tripDiv.style.alignItems = 'center'
    tripDiv.style.justifyContent = 'space-evenly'
    tripDiv.style.gap = '5%'   

    const spanTravelContent = `${trip.departure} > ${trip.arrival}`
    createSpan('travel', tripDiv, spanTravelContent)
    createSpan('hour', tripDiv, trip.date)
    createSpan('price', tripDiv, trip.price)

    createDeleteButton(tripDiv)

}

function createSpan(spanClass, div, content){
    const span= document.createElement('span')
    span.classList.add(spanClass)
    spanTravel.textContent = content
    div.appendChild(span)
}

function createDeleteButton(div){
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'X' 
    div.appendChild(deleteButton)
}

async function addBasketTrip(){
    const trips = await fetch('http://localhost:3000/baskets')
    for(const trip of trips){     
        createTripDiv(trip)
    }
}