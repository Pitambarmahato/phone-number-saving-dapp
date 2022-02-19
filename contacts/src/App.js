import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CONTACT_ADDRESS, CONTACT_ABI } from './config.js';

function App() {
  const [account, setAccount] = useState();
  const [contactList, setContactList] = useState();
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0])
      const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setContactList(contactList);
      // contactList.methods.createContact("Raj", "987899078").send({from:"0xB5EE8DbC32ece52229E3c38e6469f83921b2A995"});
      const counter = await contactList.methods.count().call();
      console.log("This is counter ", counter);

      for(var i = 1; i<=counter; i++){
        const contact = await contactList.methods.contacts(i).call();
        setContacts((contacts)=>[...contacts, contact]);
      }
    }

    load();
  }, [])

  const handleNameInput = (e) => {
    setName(e.target.value)
  }

  const handlePhoneInput = (e) => {
    setPhone(e.target.value)
  }

  const handleSubmit = (e) => {
    contactList.methods.createContact(name, phone).send({from:account});
  }

  console.log(contacts)
  return (
    <div className="container mt-5">
      <div className="text-center">
        <input type="text" onChange={handleNameInput} className="form-control" placeholder="Enter Name"/> <br />
        <input type="text" onChange={handlePhoneInput} className="form-control" placeholder="Enter Phone"/> <br />
        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </div>
      
      {/* Your account is: {account} */}

      <h4>Contact List</h4>
      <ul>
        {
          Object.keys(contacts).map((contact, index)=>{
            return <li><span><p><b>Name: </b>{contacts[index].name} &nbsp;&nbsp;<b>Phone:</b> {contacts[index].number}</p></span></li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
