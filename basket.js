fetch('./header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
    });

const purchaseDiv = document.getElementById('purchasse')

function createTripDiv(trip, divParent) {
    const tripDiv = document.createElement('div')

    tripDiv.classList.add('trips')

    tripDiv.style.backgroundColor = '#ede0df'
    tripDiv.style.display = 'flex'
    tripDiv.style.alignItems = 'center'
    tripDiv.style.justifyContent = 'space-evenly'
    tripDiv.style.gap = '5%'
    tripDiv.style.width = '100%'
    tripDiv.style.textAlign = 'center'
    tripDiv.style.height = '30%'
    tripDiv.style.borderRadius = '5px'
    tripDiv.style.boxShadow = '1px 1px 1px 1px rgb(0 0 0 / 20%)'

    const spanTravelContent = `${trip.departure} > ${trip.arrival}`
    createSpan('travel', tripDiv, spanTravelContent)
    createSpan('hour', tripDiv, trip.date)
    createSpan('price', tripDiv, `${trip.price}€`)

    async function handleEvent() {
        await fetch('http://localhost:3000/baskets/delete/trip', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ trip: trip['_id'] })
        })

        tripDiv.remove()
        if(!document.getElementsByClassName('trips').length){
            
        purchaseDiv.appendChild(createDefaultTextDiv())          
        document.getElementById('total').remove()
        document.getElementById('trips').remove()

        }
    }

    createDeleteButton(tripDiv, handleEvent)

    divParent.appendChild(tripDiv)
}

function createSpan(spanClass, div, content) {
    const span = document.createElement('span')
    span.classList.add(spanClass)
    span.style.width = '20%'
    span.textContent = content
    div.appendChild(span)
}

function createDeleteButton(div, handleEvent) {
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteSpanButton')
    deleteButton.textContent = 'X'
    deleteButton.addEventListener('click', handleEvent)
    div.appendChild(deleteButton)
}

async function addBasketTrip() {
    const response = await fetch('http://localhost:3000/baskets')
    const jsonResponse = await response.json()

    purchaseDiv.appendChild(createDefaultTextDiv())

    if(jsonResponse.length){

       const defaultDiv = document.getElementById('default-text')
       defaultDiv.remove()

        const tripsDiv = document.createElement('trips')
        tripsDiv.style.display = 'flex'
        tripsDiv.style.flexDirection = 'column'
        tripsDiv.style.justifyContent = 'center'
        tripsDiv.style.gap = '10px'
        tripsDiv.style.height = '70%'
        tripsDiv.style.padding = '10px'


        for (const response of jsonResponse) {
            const trip = response.trip
            createTripDiv(trip, tripsDiv)
        }

        purchaseDiv.appendChild(tripsDiv)

        purchaseDiv.appendChild(createDivTotal())
    }
}

function createDivTrips(){
    const divTrips = document.createElement('div')
    divTrips.classList.add('trips')
    return divTrips
}

function createDivTotal(){
    const divTotal = document.createElement('div')
    divTotal.id = 'total'
    Object.assign(divTotal.style, {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '50%',
        width: 'auto',
        height: '30%',
        backgroundColor: 'rgb(18, 22, 98)',
      });


      const spanTotal = document.createElement('span')
      spanTotal.textContent = 'Total'
      Object.assign(spanTotal.style, {
        color:'whitesmoke',
        textSshadow: '1px 1px 2px black',  
      });
      divTotal.prepend(spanTotal)

      const purchaseButton = document.createElement('button')
      purchaseButton.id = 'buttonPurchase'
      purchaseButton.textContent = 'Purchasse'
      Object.assign(purchaseButton.style, {
        width: "100px",
        height:"40px",
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.94)",  
      });
    
      divTotal.appendChild(purchaseButton)  
      return divTotal
}

function createDefaultTextDiv(){
  const defaultTextDiv =  document.createElement('div')
  defaultTextDiv.id = 'default-text'

  const span1 = document.createElement('span')
  span1.textContent='No Ticket in your cart'
  const span2 = document.createElement('span')
  span2.textContent = 'Why not plan a trip ?'

  defaultTextDiv.appendChild(span1)
  defaultTextDiv.appendChild(span2)

  return defaultTextDiv
}

addBasketTrip()
