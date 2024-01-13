
export async function fetchAllData(type, typeId, id, set, setAll) {
  const url = `http://localhost:3000/${type}/?${typeId}=${id}`
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    setAll && setAll(await data)
    set(await data)
    return true
  }
  else {
    setAll && setAll([])
    set([])
    return false
  }
}

export async function add(type, typeId, id, newItem, setAll, setAddNew) {
  async function fectchData() {
    const url = `http://localhost:3000/${type}/?${typeId}=${id}`
    const response = await fetch(url)
    const data = await response.json()
    setAll(await data)
  }
  async function postNew() {
    fetch(`http://localhost:3000/${type}`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(setAddNew(false))
      .then(fectchData())
  }
  postNew()
}

export async function deleteItem(type, id, setAll) {
  async function innerDelete() {
    fetch(`http://localhost:3000/${type}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(setAll((prevAll) => [...prevAll].filter(t => t.id != id)))
  }
  innerDelete()
}

export async function updateItem(type, item, setAll) {
  debugger
  fetch(`http://localhost:3000/${type}/${item.id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(setAll((prevAll) => [...prevAll].map(i => i.id == item.id ? item : i)))
}