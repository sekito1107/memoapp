import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [memoList, setMemoList] = useState([]);
  const [editingMemo, setEditingMemo] = useState(null);
  let editingText = "";

  useEffect(() => {
    const savedMemo = JSON.parse(localStorage.getItem("memos")) || [];
    setMemoList(savedMemo);
  },[])

  useEffect(() => {
    if (memoList.length > 0) {
      localStorage.setItem("memos", JSON.stringify(memoList));
    }
  }, [memoList]);

  function handleAddMemo() {
    const newMemo = {id: Date.now(), text: "新規メモ"}
      setMemoList(prev => 
        [...prev, newMemo]
      )
      setEditingMemo(newMemo)
  }

  function handleEditChange(e) {
    editingText = e.target.value;
  }

  function handleUpdateMemo() {
    setMemoList((prev) => {
      return prev.map((memo) =>
        memo.id === editingMemo.id ? {...memo, text: editingText} : memo
    );
    })
  
    setEditingMemo(null);
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
