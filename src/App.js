import './App.css';
import { useState } from 'react';

export default function App() {
  const [memoList, setMemoList] = useState([]);

  function handleAddMemo() {
    const newMemo = {id: Date.new, text: "新規メモ"}
    const updatedMemos = [...memoList, newMemo]

    setMemoList(updatedMemos)
  }

  return (
    <>
      <h1>メモ一覧</h1>
      <ul>
        {memoList.map(memo =>
          <li>{memo.text}</li>
        )}
      </ul>
      <button onClick={handleAddMemo}>+</button>
    </>
  );
}
