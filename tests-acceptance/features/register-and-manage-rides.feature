Feature:  As a driver with registered car and available seats
          I want to register seats for rides and manage those seats accepting or rejecting user requests
          So that I can reduce my monthly gas cost

Scenario: Register ride successfully
Given I am logged in with user apt to register rides "Igor Simoes"
Given I am at the "Minhas Caronas" page
When I register a new ride with properties: Departure time: "13:00", Seats: "1", Price: "2,00", Private: "Yes", Route: from "UFPE" to "Olinda"
Then a confirmation message is shown
And I am back at the "Minhas Caronas" page
And I can see my newly registered ride with properties: Departure time: "13:00", Seats: "1", Price: "2,00", Private: "Yes", Route: from "UFPE" to "Olinda"
And At the page "Caronas Disponiveis" any user can see the newly registered ride with properties: Departure time: "13:00", Seats: "1", Price: "2,00", Private: "Yes", Route: from "UFPE" to "Olinda"
