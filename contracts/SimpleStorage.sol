// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
  uint storedData;
  uint newValue;

  
  struct card {
      uint256 id;
      uint256 strength;
      uint256 defence;
  }
  mapping(uint256 => card) public cards;
  card[] cardsArray;
  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function setNewValue(uint y) public {
    newValue = y;
  }

  function getNewValue() public view returns (uint) {
    return newValue;
  }

  function getCards() external view returns(card[] memory) {
    return cardsArray;
  }


  function createCard(uint256 id, uint256 strength, uint256 defence) public  returns (uint256) {
    
    card memory newCard = card(
        id,
        strength,
        defence
    );  

    cards[id] = newCard;
    cardsArray.push(newCard);
    return id;
  }
}
