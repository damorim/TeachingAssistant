Feature: As a professor
         I want to register students enrollment
         So that I can manage their grades

Scenario: Registering student enrollment with non registered CPF and course
Given I am at the enrollment page
Given I can see the maximum date is set to tomorrow
When I try to register the student "Mateus" with CPF "683" and course "ESS"
Then I can see "Mateus" with CPF "683" and course "ESS" in the students list

Scenario: Deleting student enrollment with registered CPF and course
Given I am at the enrollment page
Given I can see the maximum date is set to tomorrow
Given I can see "Daniel" with CPF "123" and course "Testes" in the students enrollment list
When I try to delete the student enrollment with CPF "123" and Course "Testes" from the list
Then I cannot see enrollment with CPF "123" and course "Testes" in the students enrollment list

Scenario: Updating student enrollment with registered CPF and course
Given I am at the enrollment page
Given I can see the maximum date is set to tomorrow
Given I can see "Pacheco" with CPF "456" and course "GDI" in the students enrollment list
When I try to change the name of the student in the enrollment from "Pacheco" to "Daniel Pacheco" with CPF "456" and Course "GDI" from the list
Then I can see "Daniel Pacheco" with CPF "456" and course "GDI" in the students enrollment list

Scenario: Seting student enrollment maximum date
Given I am at the enrollment page
Given I can see the maximum date is set to today
When I try to change the deadline to tomorrow
Then I can see the maximum date is changed to tomorrow

Scenario: Updating student grades in a registered enrollment
Given I am at the enrollment page
Given I can see the maximum date is set to tomorrow
Given I can see "Vilela" with CPF "789" and course "Front-End" in the students enrollment list, with grades "10", "9" and "4", respectively
When I try to change the grades of the student with CPF "789" and course "Front-End" to "10", "9" and "8"
Then I can see student enrollment with CPF "789" and course "Front-End" with grades "10", "9" and "8", with media "9" in the students enrollment list
