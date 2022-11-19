// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 

contract Symphony is ERC20 {

    uint constant _initial_supply = 10000000 * (10**18);
    address public owner;

    constructor() ERC20("Symphony", "SYM") {
        _mint(msg.sender, _initial_supply);
        owner = msg.sender;
    }   
}