pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import 'zeppelin-solidity/contracts/token/ERC20/PausableToken.sol';

contract REDCoin is MintableToken, PausableToken {

    string public name = "REDCoin";
    string public symbol = "RED";
    uint256 public decimals = 18;

}

