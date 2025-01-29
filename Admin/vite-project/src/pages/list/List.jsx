import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setList([...response.data.data]); // Spread to trigger state change
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removefood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list after removing an item
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error("Remove Error:", error);
      toast.error("Failed to remove food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  console.log("List state:", list); // Debugging

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={item.id || index} className="list-table-form">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name || "Food Image"}
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <p>{item.name || "No Name"}</p>
              <p>{item.category || "Uncategorized"}</p>
              <p>${item.price || "0.00"}</p>
              <p onClick={() => removefood(item._id)} className="cursor">X</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default List;

