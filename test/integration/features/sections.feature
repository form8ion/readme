Feature:

  Scenario: Initial Usage Definition
    Given the existing README has no "Usage" heading
    And the existing README uses modern badge zones
    And content is provided for the "Usage" section
    When the project is lifted
    Then there is a "Usage" heading
    And the "Usage" content is populated
