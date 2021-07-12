Feature: Min/ Max price filter

    Background: Navigate to the correct page
        Given I am at the light bulbs category page
        And I change accept lead times update popover
        And I change currency to 'EUR'
        And I store all visible products
        
    Scenario: Filter by both minimum and maximum amount
        When I filter by '100' min and '200' max amount
        Then only products within '100' min and '200' max ranges are visible