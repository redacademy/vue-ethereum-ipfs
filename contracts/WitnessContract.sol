pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract WitnessContract is Ownable {

    struct Participant {
        address id;
        bool agree;
    }

    bool public signed;
    string public contract_name;
    string public terms;
    Participant[] participants;

    event ContractStored(address _contract);
    event ParticipantsAdded(Participant p);
    event ParticipantAgreed(address _participant);

    mapping(address => Participant) _participants;
    
    modifier notOwner() {
        require(msg.sender != owner);
        _;
    }
    
    function WitnessContract(string _contract_name, string _terms) 
        public 
    {
        contract_name = _contract_name;
        owner = msg.sender;
        terms = _terms;
    }
    
    function participant1() public view returns (address) {
        return participants[0].id;
    }
    
    function participant2() public view returns (address) {
        return participants[1].id;
    }
    

    function storeParticipant(address _participant) public onlyOwner {
        // Contract creator can't participate
        require(
            _participant != address(0) &&
            _participants[_participant].id == address(0) &&
            _participant != owner && 
            participants.length < 2
        );

        Participant memory p = Participant({id: _participant, agree: false});
        _participants[p.id] = p;
        participants.push(p);
        
        ParticipantsAdded(p);
    }

    function acceptContract() public notOwner {
        // Only participants can accept
        require(msg.sender == _participants[msg.sender].id);

        _participants[msg.sender].agree = true;

        ParticipantAgreed(_participants[msg.sender].id);
    }

    function signContract() public onlyOwner {
        require(
            participants.length == 2 &&
            signed == false
        );

        signed = true;
        ContractStored(address(this));
    }
}

