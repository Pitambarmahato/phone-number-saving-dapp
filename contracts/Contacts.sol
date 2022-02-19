// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Contacts{
    uint public count = 0;

    struct Contact{
        uint id;
        string name;
        string number;
    }

    mapping(uint => Contact) public contacts;

    constructor() {
        createContact("Pitambar Mahato", "9861564709");
    }

    function createContact(string memory _name, string memory _number) public{
        count++;
        contacts[count] = Contact(count, _name, _number);
    }

}