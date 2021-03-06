Feature: Base Functionality

  Scenario: Blank Documentation
    Given the existing README has no section heading
    And the existing README has no badges
    And the existing README uses modern badge zones
    And the results include badges
    When the project is lifted
    Then the badges from the results are added to the README

  Scenario: Existing Badges
    Given the existing README has no section heading
    And the existing README has existing badges
    And the existing README uses modern badge zones
    And the results include badges
    When the project is lifted
    Then the badges from the results are added to the README

  Scenario: No Badges Produced
    Given the existing README has no section heading
    And the existing README has existing badges
    And the existing README uses modern badge zones
    And the results do not include badges
    When the project is lifted
    Then the badges remain as they were in the README

  Scenario: Legacy Badge Section Markers With No Badges
    Given the existing README has no section heading
    And the existing README has no badges
    And the existing README uses legacy badge section markers
    And the results include badges
    When the project is lifted
    Then the badges from the results are added to the README

  Scenario: Legacy Badge Section Markers With Existing Badges
    Given the existing README has no section heading
    And the existing README has existing badges
    And the existing README uses legacy badge section markers
    And the results include badges
    When the project is lifted
    Then the badges from the results are added to the README
