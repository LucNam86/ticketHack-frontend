const purchaseDiv = document.getElementById('purchasse')

function createTripDiv(trip, divParent){
    const tripDiv = document.createElement('div')

    tripDiv.classList.add('trips')

    tripDiv.style.backgroundColor = '#ede0df'
    tripDiv.style.display = 'flex'
    tripDiv.style.alignItems = 'center'
    tripDiv.style.justifyContent = 'space-evenly'
    tripDiv.style.gap = '5%'
    tripDiv.style.width = '100%'  
    tripDiv.style.height = '20%' 
    tripDiv.style.borderRadius = '5px'
    tripDiv.style.boxShadow = '1px 1px 1px 1px rgb(0 0 0 / 20%)'

    const spanTravelContent = `${trip.departure} > ${trip.arrival}`
    createSpan('travel', tripDiv, spanTravelContent)
    createSpan('hour', tripDiv, trip.date)
    createSpan('price', tripDiv, `${trip.price}€`)

    createDeleteButton(tripDiv)

    divParent.appendChild(tripDiv)
}

function createSpan(spanClass, div, content){
    const span = document.createElement('span')
    span.classList.add(spanClass)
    span.textContent = content
    div.appendChild(span)
}

function createDeleteButton(div){
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'X' 
    div.appendChild(deleteButton)
}

async function addBasketTrip(){
    const response = await fetch('http://localhost:3000/baskets')
    const jsonResponse = await response.json()

    const tripsDiv = document.getElementById('trips')
    tripsDiv.style.display = 'flex'
    tripsDiv.style.flexDirection = 'column'
    tripsDiv.style.justifyContent = 'center'
    tripsDiv.style.gap = '5px'
    tripsDiv.style.height = '70%'
    tripsDiv.style.padding = '10px'

    for(const response of jsonResponse){   
        const trip =  response.trip 
        createTripDiv(trip, tripsDiv)
    }
}

addBasketTrip()