import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Title ${Date.now()}`,
      url: "http://localhost:3333",
      techs: [],
    });

    if (response.status !== 200) return;

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status !== 204) return;

    setRepositories(repositories.filter((r) => r.id !== id));
  }

  const renderItem = ({ id, title }) => {
    return (
      <li key={id}>
        {title}
        <button onClick={() => handleRemoveRepository(id)}>Remover</button>
      </li>
    );
  };

  const renderList = () =>
    repositories.map((repository) => renderItem(repository));

  return (
    <div>
      <ul data-testid="repository-list">{renderList()}</ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
