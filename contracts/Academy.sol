pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/ownership/Claimable.sol';

contract Academy is Claimable {

    event Enroll(address student);
    event Graduate(address student);
    
    struct Student {
        bool enrolled;
    }
    
    bytes32 public name;
    mapping(address => Student) public students;
    mapping(address => Student) public graduates;
    
    
    function Academy(bytes32 _name) 
        public 
    {
        name = _name;
    }

    function enroll() 
        public 
        onlyOwner 
    {
        require(students[msg.sender].enrolled == false);
        students[msg.sender] = Student({ enrolled: true });

        Enroll(msg.sender);
    }

    function graduate(address _student) 
        public 
        onlyOwner 
    {
        require(students[_student].enrolled == true);
        graduates[msg.sender] = students[_student];
        delete students[_student];

        Graduate(msg.sender);
    }

    function didAttend(address _student) 
        public 
        view 
        returns (Student) 
    {
        require(_student != address(0));
        return students[_student];
    }

    function didGraduate(address _student) 
        public 
        view 
        returns (Student) 
    {
        require(_student != address(0));
        return graduates[_student];
    }

    function close() 
        public 
        onlyOwner 
    {
        selfdestruct(owner);
    }
    // Fallback function in case someone sends ether to the contract so it doesn't get lost.
    function() payable {}
}

