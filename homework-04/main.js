'use strict'

const Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const notepad = {
  notes: [],
  getNotes() {
    return this.notes;
  },
  getIndexById(id) { 
    let noteIndex = 0; 
    for (let i = 0; i < this.notes.length; i += 1){
      if(this.notes[i].id === id) {
        noteIndex = i;
      } 
    };
    return noteIndex;
  },
  findNoteById(id) {
    for (const note of this.notes) {
      if(note.id === id) {
        return note;
      } 
    };
    return undefined;
  },
  saveNote(note) {
     this.notes.push(note);
     return note;
  },
  deleteNote(id) {
    const indexOfnote = this.getIndexById(id);
    this.notes.splice(indexOfnote, 1);
  },
  updateNoteContent(id, updatedContent) {
    const indexOfnote = this.getIndexById(id);
    this.notes[indexOfnote] = {...this.notes[indexOfnote], ...updatedContent};
    return this.notes[indexOfnote];
  },
  updateNotePriority(id, priority) {
    const indexOfnote = this.getIndexById(id);  
    this.notes[indexOfnote].priority = priority;
    return this.notes[indexOfnote];
  },
  filterNotesByQuery(query) {
    const filteredNotes = [];
     for (const note of this.notes) {
       const transformedTitle = note.title.toLowerCase();
       const transformedBody = note.body.toLowerCase();
       const isInclude = transformedTitle.includes(query) || transformedBody.includes(query);
       if (isInclude){
        filteredNotes.push(note);
       };
     }    
     return filteredNotes; 
  },
  filterNotesByPriority(priority) {
    const equallyPriority = [];
    for(const note of this.notes) {
      if(note.priority === priority) {
        equallyPriority.push(note);
      };
    };
    return equallyPriority;
  },
};

//===============================================================
/*
 * Добавляю 4 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 'id-1',
  title: 'JavaScript essentials',
  body:
    'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
  priority: Priority.HIGH,
});

notepad.saveNote({
  id: 'id-2',
  title: 'Refresh HTML and CSS',
  body:
    'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
  priority: Priority.NORMAL,
});

notepad.saveNote({
  id: 'id-3',
  title: 'Get comfy with Frontend frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: Priority.NORMAL,
});

notepad.saveNote({
  id: 'id-4',
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: Priority.LOW,
});

console.log('Все текущие заметки: ', notepad.getNotes());

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority('id-4', Priority.NORMAL);

console.log(
  'Заметки после обновления приоритета для id-4: ',
  notepad.getNotes(),
);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority('id-3', Priority.LOW);

console.log(
  'Заметки после обновления приоритета для id-3: ',
  notepad.getNotes(),
);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery('html'),
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery('javascript'),
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  'Отфильтровали заметки по нормальному приоритету: ',
  notepad.filterNotesByPriority(Priority.NORMAL),
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent('id-3', {
  title: 'Get comfy with React.js or Vue.js',
});

console.log(
  'Заметки после обновления контента заметки с id-3: ',
  notepad.getNotes(),
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote('id-2');
console.log('Заметки после удаления с id -2: ', notepad.getNotes());