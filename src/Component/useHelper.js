import {useEffect, useState} from "react";

const useHelper = () => {

  const [name, setName] = useState(() => "Anuj");
  const [data, setData] = useState(() => null);

  const setUserName = (uname) => setName(uname)

  useEffect(() => {
    const result = fetch('https://api.github.com/users')
    setData(() => result);
  }, [name])

  const giveUserName = (name) => {
    return "Hello " + name;
  }

  return {
    name,
    setUserName,
    data,
    giveUserName
  }
}

export default useHelper;