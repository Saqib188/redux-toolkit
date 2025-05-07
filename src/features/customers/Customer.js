
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "./customerSlice";

export default function Customer() {
  console.log(useSelector(store=>store.customer));
  
  const customer = useSelector((store) => store.customer.fullName);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(customer);
  const [iseditingName, setIsEditingName] = useState(false);

  function handleUpdateName() {
    if (!fullName) return;
    dispatch(updateCustomer(fullName));
    setIsEditingName(false)

  }
  
     function handleEditBtn() {
       setIsEditingName(true);
     }
  return (
    <>
      <h2>
        👋 Welcome,{" "}
        {iseditingName ? (
          <div className="inputs">
            <div>
              <label>Update full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <button onClick={handleUpdateName}>Update Name</button>
          </div>
        ) : (
          <span>{fullName}</span>
        )}
      </h2>
      {!iseditingName &&
      (      <button onClick={handleEditBtn}>Edit Name</button>
      )
      }
    </>
  );
}
