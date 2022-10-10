import React, { useState, useCallback, useEffect } from "react";
import Classes from "./index.module.css";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
const key = "home";

const HomePage = (props) => {
  const [searchText, setSearchText] = useState("");
  const [executeDebouncer, setExecuteDebouncer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [change, setChange] = useState(false);

  //   const debounce = (cb, delay) => {
  //     let timer;
  //     return function (...args) {
  //       if (timer) clearTimeout(timer);
  //       timer = setTimeout(() => {
  //         cb(...args);
  //       }, delay);
  //     };
  //   };

  const searchData = {
    isCompleted: false,
  };

  //   useEffect(() => {
  //     if (executeDebouncer) {
  //       setExecuteDebouncer(false);
  //     }
  //   }, [executeDebouncer]);

  //   const debouncedSearch = useCallback(
  //     debounce(() => setExecuteDebouncer(true), 2000),
  //     []
  //   );

  const changeInput = (e) => {
    setSearchText(e.target.value);
    // debouncedSearch(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (searchText) {
      const data = [...props?.state];
      const dataToAdd = { ...searchData, title: searchText };
      if (props?.state?.length > 0) {
        let x = data.filter((ele) => ele.title !== dataToAdd.title);
        if (x.length > 0) {
          x.push(dataToAdd);
          props.addTodo(x);
        } else {
          alert("already found title");
        }
      } else {
        props.addTodo([{ ...searchData, title: searchText }]);
      }
      setSearchText("");
    }
  };

  const taskDone = (index) => {
    const data = [...props?.state];
    data.map((ele, ind) => {
      if (ind === index) {
        ele.isCompleted = !ele.isCompleted;
      }
      return ele;
    });
    props.addTodo(data);
  };

  const deleteId = (id) => {
    console.log(id);
    const data = [...props?.state];
    const removedData = data.filter((ele, index) => index !== id);
    props.addTodo(removedData);
  };

  const edit = (ele, index) => {
    const elem = { data: ele, index: index };
    console.log(elem);
    setSelectedItem(elem);
    setShowModal(true);
  };
  const changeTitle = (e) => {
    const x = { ...selectedItem };
    x.data.title = e.target.value;
    setSelectedItem(x);
    if (!change) setChange(true);
  };

  const submitEdit = () => {
    console.log(selectedItem);
    const data = [...props?.state];
    const newData = data.map((ele, index) => {
      if (index === selectedItem.index) {
        ele = selectedItem.data;
      }
      return ele;
    });
    props.addTodo(newData);
    setShowModal(false);
    setChange(false);
  };

  return (
    <div className={Classes.homeDiv}>
      <h1>Todos</h1>
      <form>
        <input
          type="text"
          onChange={(e) => changeInput(e)}
          value={searchText}
        />
        <button onClick={submitForm}>submit</button>
      </form>
      <hr />
      {props?.state?.map((ele, index) => {
        return (
          <div key={index} className={Classes.todoDiv}>
            <div
              className={
                ele.isCompleted === true
                  ? Classes.done + " " + Classes.innerTodoDiv
                  : Classes.pending + " " + Classes.innerTodoDiv
              }
            >
              <span style={{ flex: "20%" }} onClick={() => taskDone(index)}>
                {ele.isCompleted ? "Done" : "To Do"}
              </span>
              <p style={{ flex: "40%" }}>{ele.title}</p>
              <span style={{ flex: "20%" }} onClick={() => edit(ele, index)}>
                edit
              </span>
              <span style={{ flex: "20%" }} onClick={() => deleteId(index)}>
                delete
              </span>
            </div>
          </div>
        );
      })}
      {/* <button onClick={() => setShowModal(true)}>show Modal</button> */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={"Change To Do Item"}
        dataChange={change}
      >
        <div>
          <h1>Change this item</h1>
          {selectedItem?.data?.title ? (
            <div>
              <input
                type="text"
                value={selectedItem?.data?.title}
                onChange={changeTitle}
              />
              <button onClick={submitEdit}>edit</button>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state[key].todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (val) => {
      dispatch({ type: "ADD_TODO", payload: val });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
