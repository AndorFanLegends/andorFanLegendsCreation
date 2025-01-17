// sortFunctions.js
export const sorter = (card1, card2) => {
    let newCard1 = { ...card1 };
    let newCard2 = { ...card2 };
  
    if (newCard1.type === 'end') {
      newCard1.type = 'letter';
    }
  
    if (newCard2.type === 'end') {
      newCard2.type = 'letter';
    }
  
    if (newCard2.type !== newCard1.type) {
      return (newCard2.type === 'letter') ? 1 : -1;
    }
    return newCard1.name.localeCompare(newCard2.name);
  };
  
  export const sorterInstruction = (card1, card2) => {
    let newCard1 = { ...card1 };
    let newCard2 = { ...card2 };
  
    if (newCard1.type === 'end') {
      newCard1.type = 'letter';
    }
  
    if (newCard2.type === 'end') {
      newCard2.type = 'letter';
    }
  
    if (newCard2.type !== newCard1.type) {
      return (newCard2.type === 'instruction') ? 1 : -1;
    }
  };
  