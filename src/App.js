import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [memoList, setMemoList] = useState([]);

  useEffect(() => {
    const savedMemo = JSON.parse(localStorage.getItem("memos")) || [];
    setMemoList(savedMemo);
  },[])

  function handleAddMemo() {
    const newMemo = {id: Date.now(), text: "新規メモ"}

    setMemoList(prev => {
      const updatedMemos = [...prev, newMemo];
      localStorage.setItem("memos", JSON.stringify(updatedMemos))
      return updatedMemos;
    });
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
    </>
  );
}
