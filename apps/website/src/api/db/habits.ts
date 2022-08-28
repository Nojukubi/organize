import { connect } from './connect';

async function getHabitStore(type: IDBTransactionMode = 'readonly') {
  return (await connect()).transaction('habits', type).objectStore('habits');
}

export async function getHabits() {
  const store = await getHabitStore();
  return new Promise((resolve) => {
    const op = store.getAll();

    op.onsuccess = () => resolve(op.result);
  });
}

export async function createHabit(habit) {
  (await getHabitStore('readwrite')).add(habit);
}
