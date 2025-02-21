import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [memoList, setMemoList] = useState([]);
  const [editingMemo, setEditingMemo] = useState();
  let editingText = "";

  useEffect(() => {
    const savedMemo = JSON.parse(localStorage.getItem("memos")) || [];
    setMemoList(savedMemo);
  },[])

  function handleAddMemo() {
    const newMemo = {id: Date.now(), text: "新規メモ"}

    setMemoList(prev => {
      const updatedMemos = [...prev, newMemo];
      localStorage.setItem("memos", JSON.stringify(updatedMemos));
      setEditingMemo(updatedMemos.find(memo => memo.id === newMemo.id));
      return updatedMemos;
    });
  }

  function handleEditChange(e) {
    editingText = e.target.value;
  }

  function handleUpdateMemo() {
    setMemoList((prev) => {
      const updatedMemos = prev.map((memo) =>
        memo.id === editingMemo.id ? { ...memo, text: editingText } : memo
      );
  
      localStorage.setItem("memos", JSON.stringify(updatedMemos));
      return updatedMemos;
    });
  
    setEditingMemo(false);
  }
  return (
    <>
      <h1>メモ一覧</h1>
      <ul>
        {memoList.map(memo =>
          <li key={memo.id}>{memo.text}</li>
        )}
      </ul>
      <button onClick={handleAddMemo}>+</button>
      {editingMemo &&
        <>
          <textarea onChange={handleEditChange}>{editingMemo.text}</textarea>
          <button onClick={handleUpdateMemo}>更新</button>
        </>
      }
    </>
  );
}
