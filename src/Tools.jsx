
export async function fetchAllData(type, typeId, id, set, setAll) {
  const url = `http://localhost:3000/${type}/?${typeId}=${id}`
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    setAll && setAll(await data)
    set(await data)
  }
  else {
    setAll && setAll([])
    set([])
    alert("error fetching!").then(setAddNew(false))
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
    const response = await fetch(`http://localhost:3000/${type}`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    setAddNew(false)
    if (response.ok) fectchData()
    else alert("error fetching!")
  }
  postNew()
}

export async function deleteItem(type, id, setAll) {
  const response = await fetch(`http://localhost:3000/${type}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (response.ok) setAll((prevAll) => [...prevAll].filter(t => t.id != id))
  else alert("error fetching!")
}

export async function updateItem(type, item, setAll) {
  const response = await fetch(`http://localhost:3000/${type}/${item.id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (response.ok) setAll((prevAll) => [...prevAll].map(i => i.id == item.id ? item : i))
  else alert("error fetching!")
}