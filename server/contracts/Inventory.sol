// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0;

contract Inventory {
  uint256 public totalInventory; // Stores the total inventory value

  // Function to update total inventory
  function updateInventory(uint256 newTotalInventory) public {
    totalInventory = newTotalInventory;
  }
}
