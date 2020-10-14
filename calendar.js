let eventId = 0;

let events = [
      {
          "id": 1,
          "name": "Camila",
          "startDate": "2020-10-03T21:00",
          "endDate": "2020-10-03T11:59",
          "reservations": 
          [
            {
              "name": "Jason",
              "number": 2,
              "date": "2020-10-03T21:30"
            },
            {
              "name": "Jennifer",
              "number": 3,
              "date": "2020-10-03T22:00"
            }            
          ]
      },
      {
        "id": 2,
        "name": "Three Amigos",
        "startDate": "2020-10-10T21:00:00",
        "endDate": "2020-10-10T11:59:00",
        "reservations": 
        [
          {
            "name": "Jason",
            "number": 2,
            "date": "2020-10-10T21:30:00"
          },
          {
            "name": "Jennifer",
            "number": 3,
            "date": "2020-10-10T22:00:00"
          }            
        ]
    },
    {
      "id": 1,
      "name": "Mariachi",
      "startDate": "2020-11-07T21:00",
      "endDate": "2020-11-07T11:59",
      "reservations": 
      [
        {
          "name": "Jason",
          "number": 2,
          "date": "2020-10-03T21:30"
        },
        {
          "name": "Jennifer",
          "number": 3,
          "date": "2020-10-03T22:00"
        }            
      ]
    }       
  ];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    tbl.classList.add("col-lg-7")

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                cell.id = `Day${date}`;
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-light");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
    fillEventsOnCalendar();
}

function fillEventsOnCalendar() {
      events.filter((singleEvent) => {
        let eventDate = new Date(singleEvent.startDate);
        
        return eventDate.getFullYear() == selectYear.value && eventDate.getMonth() == selectMonth.value;
      })
      .forEach((singleEvent) => {
          let eventDate = new Date(singleEvent.startDate);

          let day = eventDate.getDate();
          let dayId = `Day${day}`;

          let dayElement = document.getElementById(dayId);
          let paragraph = document.createElement('p');
          paragraph.setAttribute('data-toggle', 'tooltip');
          paragraph.setAttribute('data-placement', 'top');


          let eventLink = document.createElement('a');
        
          // Create the text node for anchor element. 
          let eventLinkText = document.createTextNode(`${singleEvent.name} ${eventDate.getHours()}:${("0" + eventDate.getMinutes()).slice(-2)}`); 

             // Append the text node to anchor element. 
          eventLink.appendChild(eventLinkText);  
          
          eventLink.setAttribute('data-toggle', "modal");
          eventLink.setAttribute('data-target', "#addReservationLong")
          eventLink.setAttribute('id', `Event${singleEvent.id}`)
          eventLink.onclick = function(event)
          {
            eventId= singleEvent.id;
          } 

          // Set the href property. 
          eventLink.href = "#";  
            
          // Append the anchor element to the day.
          paragraph.appendChild(eventLink);

          dayElement.appendChild(paragraph);  
      });
  }

  $('#saveReservationButton').on('click', function(event) {
    
    let eventIndex = events.findIndex((singleEvent) => singleEvent.id == eventId);

    let nameUnder = document.getElementById('nameUnder').value;
    let numberOfGuests = parseInt(document.getElementById('numberOfGuests').value, 10);
    let reservationDate = document.getElementById('reservationDate').value;

    let reservationToAdd = {
      "name": nameUnder,
      "number": numberOfGuests,
      "date": reservationDate
    }

    events[eventIndex].reservations.push(reservationToAdd);
  
    $("#addReservationLong").modal('hide');    
   });

