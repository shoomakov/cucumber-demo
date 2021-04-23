@e2e-feature
Feature: "UnFederalReserve"

  Scenario: Configure MetaMask
    Given I am on home page
     When I see wallet name "MetaMask" in modal
     Then I see wallet description is "Connect to your MetaMask Wallet"
      And I unlock my wallet plugin
      And I click on "MetaMask" name
     Then I see part of token in header

  Scenario: Borrow
    When I click on user borrow market
    Then I see base modal
     And I type "0.1" in base modal
     And I submit a value by click on "Borrow"
     And I see base modal with title "Confirm Transaction"
     And I confirm transaction
