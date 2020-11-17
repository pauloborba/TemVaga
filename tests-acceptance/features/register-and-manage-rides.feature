Feature:  As a driver with registered car and available seats
          I want to register seats for rides and manage those seats accepting or rejecting user requests
          So that I can reduce my monthly gas cost

Scenario: Register ride successfully
Given I am logged in with user apt to register rides "Igor Simoes"
Given I am at the "Minhas Caronas" page
When I try to register a new ride with properties: Departure time: "13:00", Price: "2.00", Private: "Yes", Seats: "1", Departure place: "UFPE", Arrival place: "Olinda"
Then a confirmation message is shown
And I am still at the "Minhas Caronas" page
And I can see my newly registered ride with properties: Departure time: "13:00", Price: "2.00", Private: "Yes", Seats: "1", Departure place: "UFPE", Arrival place: "Olinda"
And at the page Caronas Disponíveis any user can see the newly registered ride with properties: Departure time: "13:00", Price: "2.00", Private: "Yes", Seats: "1", Departure place: "UFPE", Arrival place: "Olinda"
