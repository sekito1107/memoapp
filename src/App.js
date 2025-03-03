import "./App.css";
import { useState, useEffect } from "react";
import { AuthProvider } from "./hooks/AuthHooks.js";
import MemoList from "./MemoList";
import MemoForm from "./MemoForm";
import LoginButton from "./LoginButton";

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

  function handleUpdateMemo(editingText) {
    setMemoList((prev) =>
      prev.map((memo) =>
        memo.id === editingMemo.id ? { ...memo, text: editingText } : memo,
      ),
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
    <AuthProvider>
      <div className="app-container">
        <LoginButton />
        <MemoList
          memoList={memoList}
          startEditingMemo={startEditingMemo}
          editingMemo={editingMemo}
        />
        <button onClick={handleAddMemo}>+</button>
        {editingMemo && (
          <MemoForm
            key={editingMemo.id}
            editingMemo={editingMemo}
            handleUpdateMemo={handleUpdateMemo}
            handleDeleteMemo={handleDeleteMemo}
          />
        )}
      </div>
    </AuthProvider>
  );
}
