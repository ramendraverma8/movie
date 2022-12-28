import useHelper from "./useHelper";

const Helper = () => {


  const {name, data, setUserName} = useHelper();

  return (
    <>
      <h2>Hello { name }</h2>
      <p>This is a good component</p>
      <button onClick={() => setUserName("Ramu")}>Change Name</button>
    </>
  )
}

export default Helper;