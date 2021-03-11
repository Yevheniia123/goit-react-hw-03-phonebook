import React, { Component } from 'react';
import SectionTitle from './SectionTitle/SectionTitle';
import ContactForm from './ContactForm/ContactForm';
import { v4 as uuidv4 } from 'uuid';
import Filter from './Filter/Filter';
import ContactList from './ContactsList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    data = { ...data, id: uuidv4() };

    const sameName = contacts.filter(contact =>
      contact.name.includes(data.name),
    );
    if (sameName.length) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  delete = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== itemId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLocaleLowerCase();
    const filterName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

    return (
      <div>
        <SectionTitle title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHandler} />
        </SectionTitle>

        <SectionTitle title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList filterName={filterName} deleteId={this.delete} />
        </SectionTitle>
      </div>
    );
  }
}

export default App;
