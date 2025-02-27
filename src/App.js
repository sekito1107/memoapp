import "./App.css";
import { useState, useEffect } from "react";
import MemoList from "./MemoList";
import MemoForm from "./MemoForm";

export default function App() {
  const [memoList, setMemoList] = useState([]);
  const [editingMemo, setEditingMemo] = useState(null);

  useEffect(() => {
    const savedMemo = JSON.parse(localStorage.getItem("memos")) || [];
    setMemoList(savedMemo);
  }, []);

  useEffect(() => {
    if (memoList.length > 0) {
      localStorage.setItem("memos", JSON.stringify(memoList));
    }
  }, [memoList]);

  function handleAddMemo() {
    const newMemo = { id: Date.now(), text: "新規メモ" };
    setMemoList((prev) => [...prev, newMemo]);
    setEditingMemo(newMemo);
  }

  function handleTextChange(e) {
    setEditingMemo((prev) => ({...prev, text: e.target.value}))
  }

  function handleUpdateMemo() {
    setMemoList((prev) =>
      prev.map((memo) => (memo.id === editingMemo.id ? editingMemo : memo))
    );
    setEditingMemo(null);
  }

  function handleDeleteMemo() {
    setMemoList((prev) => prev.filter((memo) => editingMemo.id !== memo.id));
    setEditingMemo(null);
  }

  function startEditingMemo(memo) {
    setEditingMemo(memo);
  }

  return (
    <div className="app-container">
      <MemoList
        memoList={memoList}
        startEditingMemo={startEditingMemo}
        editingMemo={editingMemo}
      />
      <button onClick={handleAddMemo}>+</button>
      {editingMemo && (
        <MemoForm
          editingMemo={editingMemo}
          handleTextChange={handleTextChange}
          handleUpdateMemo={handleUpdateMemo}
          handleDeleteMemo={handleDeleteMemo}
        />
      )}
    </div>
  );
}
