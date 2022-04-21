import { ref } from 'vue';

export default () => {
  const todos = ref([]);

  const findIndexById = (id) => todos.value.findIndex((todo) => todo.id === id);

  const parse = (data) => {
    return new Promise((resolve, reject) => {
      let parsed;

      try {
        parsed = JSON.parse(data);
      } catch (err) {
        reject('Parsing data failed');
      }

      if (!Array.isArray(parsed)) {
        reject('Data is not array');
      }

      if (parsed.length < 1) {
        reject('Data is empty');
      }

      const validate = parsed.every((item) => {
        return (
          typeof item === 'object' &&
          item.hasOwnProperty('id') &&
          item.hasOwnProperty('name') &&
          item.hasOwnProperty('done')
        );
      });

      if (!validate) {
        reject('Data is invalid');
      }

      resolve(parsed);
    });
  };

  const store = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  };

  const get = () => {
    const data = localStorage.getItem('todos');

    parse(data)
      .then((parsed) => (todos.value = parsed))
      .catch((err) => {
        todos.value = [];
      });
  };

  const create = (name) => {
    const id = todos.value.length
      ? todos.value[todos.value.length - 1].id + 1
      : 1;

    todos.value.push({
      id,
      name,
      done: false,
    });

    store();
  };

  const remove = (id) => {
    const index = findIndexById(id);

    todos.value.splice(index, 1);

    store();
  };

  const update = (val) => {
    const index = findIndexById(val.id);

    todos.value[index].done = val.done;

    store();
  };

  return {
    todos,
    get,
    create,
    remove,
    update,
  };
};
