Feature:  As a driver with registered car and available seats
          I want to register seats for rides and manage those seats accepting or rejecting user requests
          So that I can reduce my monthly gas cost

Scenario: Register ride successfully
Given I am logged in with user apt to register rides "Igor Simoes" with email "igor" and password "123"
And I am at the "Minhas Caronas" page
When I try to register a new ride with properties: Departure time: "13:00", Price: "2.00", Private: "Yes", Seats: "1", Departure place: "UFPE", Arrival place: "Olinda"
Then a confirmation message is shown
And I am still at the "Minhas Caronas" page
And I can see my newly registered ride with properties: Departure time: "13:00", Price: "2.00", Private: "Yes", Seats: "1", Departure place: "UFPE", Arrival place: "Olinda"
And at the page Caronas Disponíveis any user can see the newly registered ride with properties: Departure time: "13:00", Price: "2.00", Private: "Yes", Seats: "1", Departure place: "UFPE", Arrival place: "Olinda"

Scenario: Confirm and reject ride requests
Given I am logged in with user apt to register rides "Igor Simoes" with email "igor" and password "123"
And at the page "Caronas Disponíveis" I can see a notification about pending requests for my ride
And at the page "Minhas Caronas" I can see "2" requests for my ride
And I am at the "Pedidos" page
And I can see pending requests for users "Tiago Carvalho" and "Rafael Pereira"
When I try to confirm the request from user "Tiago Carvalho"
And I try to reject the request from user "Rafael Pereira"
Then I am still at the "Pedidos" page
And I can see only the user "Tiago Carvalho" as a confirmed user
And at the page "Minhas Caronas" I can see "0" requests for my ride
And the user "Tiago Carvalho" can see a notification about the request confirmation
And the user "Rafael Pereira" can see a notification about the request rejection