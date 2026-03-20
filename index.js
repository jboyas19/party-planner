const state = {
  parties: [],
  selectedParty: null,
};

const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/";
const COHORT = "2601-FTB-CT-WEB-PT";
const API = `${BASE_URL}${COHORT}`;

const app = document.querySelector("#app");

const pageHeader = document.createElement("h1");
pageHeader.textContent = "Party Planner";
app.append(pageHeader);

const mainContainer = document.createElement("div");
mainContainer.classList.add("main_container");
app.append(mainContainer);

const fetchParties = async () => {
  const response = await fetch(`${API}/events`);
  const json = await response.json();
  return json.data;
};

const fetchPartyDetails = async (id) => {
  const response = await fetch(`${API}/events/${id}`);
  const json = await response.json();
  return json.data;
};

const createPartyListItem = (party) => {
  const partyListItem = document.createElement("li");
  partyListItem.classList.add("party_list_item");

  if (state.selectedParty && state.selectedParty.id === party.id) {
    partyListItem.classList.add("selected");
  }

  const partyListItemName = document.createElement("span");
  partyListItemName.textContent = party.name;

  partyListItem.addEventListener("click", async () => {
    const partyDetails = await fetchPartyDetails(party.id);
    state.selectedParty = partyDetails;
    render();
  });

  partyListItem.append(partyListItemName);
  return partyListItem;
};

const createPartyList = (parties) => {
  const container = document.createElement("div");

  const header = document.createElement("h2");
  header.textContent = "Upcoming Parties";

  const list = document.createElement("ul");

  const items = parties.map(createPartyListItem);
  list.replaceChildren(...items);

  container.append(header, list);
  return container;
};

const createPartyDetails = (party) => {
  const container = document.createElement("div");

  const header = document.createElement("h2");
  header.textContent = "Party Details";
  container.append(header);

  if (!party) {
    const msg = document.createElement("p");
    msg.textContent = "Select a party to see details";
    container.append(msg);
    return container;
  }

  const title = document.createElement("h4");
  title.textContent = `${party.name} #${party.id}`;

  const date = document.createElement("p");
  date.textContent = new Date(party.date).toLocaleString();

  const location = document.createElement("p");
  location.textContent = party.location;

  const description = document.createElement("p");
  description.textContent = party.description;

  container.append(title, date, location, description);

  return container;
};

function render() {
  const list = createPartyList(state.parties);
  const details = createPartyDetails(state.selectedParty);
  mainContainer.replaceChildren(list, details);
}

const startApp = async () => {
  const parties = await fetchParties();
  state.parties = parties;
  render();
};

startApp();




