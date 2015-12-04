var Persons = new Mongo.Collection("Persons");

if (Meteor.isClient) {
  Session.set('searchText', '');
  
  Template.findPerson.helpers({
    persons: function () {
      var searchText = Session.get('searchText')
      return Persons.find({"born.year": parseInt(searchText)});
    }
  });

  Template.findPerson.events({
    'click button': function () {
      Session.set('searchText', document.getElementById('search').value);
    },
    'click .person': function(event) {
      event.preventDefault();
      $("#searchResults").hide();
      
      var personInstance = Persons.findOne(event.target.attributes['data-id'].value);
      console.log(personInstance);
      Blaze.renderWithData(
        Template.personDetails, 
        personInstance,
        $("body")[0]);
        
      var personSelected = document.createEvent('CustomEvent');
      personSelected.initCustomEvent("personSelected", true, true, personInstance._id);
      event.target.dispatchEvent(personSelected);
      window.opener.postMessage(['personSelected', {
        personId: personInstance._id,
        addressId: personInstance._id, // "(pretend that this is a GUID)",
        presentation: personInstance.firstName + " " + personInstance.lastName + ", aged 34 from " + personInstance.location
      }], '*');
    }
  });
  
  Template.personDetails.events({
    'click .accept': function(event) {
      window.opener.postMessage(['accept'], '*');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Persons.insert({ firstName: "Natalie", lastName: "Portman", born: {year: 1981, month: 6, day: 9}, location: "Jerusalem, Israel" });
    Persons.insert({ firstName: "Hayden", lastName: "Christensen", born: {year: 1981, month: 4, day: 19}, location: "Vancouver, Brittish Colombia" });
    Persons.insert({ firstName: "Elijah", lastName: "Wood", born: {year: 1981, month: 1, day: 28}, location: "Cedar Rapids, Iowa" });
  });
}