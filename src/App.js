// import './App.css';
// import { useState, useEffect, useRef } from 'react';

// export default function App() {
//   const [memoList, setMemoList] = useState([]);
//   const [editingMemo, setEditingMemo] = useState(null);
//   const editingTextRef = useRef("");

//   useEffect(() => {
//     const savedMemo = JSON.parse(localStorage.getItem("memos")) || [];
//     setMemoList(savedMemo);
//   },[])

//   useEffect(() => {
//     if (memoList.length > 0) {
//       localStorage.setItem("memos", JSON.stringify(memoList));
//     }
//   }, [memoList]);

//   function handleAddMemo() {
//     const newMemo = {id: Date.now(), text: "新規メモ"}
//       setMemoList(prev => 
//         [...prev, newMemo]
//       )
//       setEditingMemo(newMemo)
//       editingTextRef.current = newMemo.text; 
//   }

//   function handleTextChange(e) {
//     editingTextRef.current = e.target.value;
//   }

//   function handleUpdateMemo() {
//     setMemoList((prev) => 
//       prev.map((memo) =>
//         memo.id === editingMemo.id ? {...memo, text: editingTextRef.current} : memo
//       )
//     );
  
//     setEditingMemo(null);
//   }

//   function handleDeleteMemo() {
//     setMemoList((prev) => 
//       prev.filter((memo) => editingMemo.id !== memo.id)
//     );

//     setEditingMemo(null);
//   }

//   function startEditingMemo(memo) {
//     setEditingMemo(memo);
//     editingTextRef.current = memo.text;
//   }

//   return (
//     <div className="app-container">
//       <h1>メモ一覧</h1>
//       <ul>
//         {memoList.map(memo =>
//         <li key={memo.id} onClick={() => startEditingMemo(memo)}>
//           <span className={editingMemo?.id === memo.id ? "selected" : ""}>
//             {memo.text.split("\n")[0]}
//           </span>
//         </li>
//         )}
//       </ul>
//       <button onClick={handleAddMemo}>+</button>
//       {editingMemo &&
//         <div className="form-container">
//           <textarea
//             defaultValue={editingMemo.text} 
//             ref={(element) => element && (element.value = editingTextRef.current)}
//             onChange={handleTextChange} 
//           />
//           <button onClick={handleUpdateMemo}>更新</button>
//           <button onClick={handleDeleteMemo}>削除</button>
//         </div>
//       }
//     </div>
//   );
// }
import './App.css';
import { useState, useEffect, useRef } from 'react';
import MemoList from './MemoList';
import MemoForm from './MemoForm';

export default function App() {
  const [memoList, setMemoList] = useState([]);
  const [editingMemo, setEditingMemo] = useState(null);
  const editingTextRef = useRef("");

  useEffect(() => {
    const savedMemo = JSON.parse(localStorage.getItem("memos")) || [];
    setMemoList(savedMemo);
  },[]);

  useEffect(() => {
    if (memoList.length > 0) {
      localStorage.setItem("memos", JSON.stringify(memoList));
    }
  }, [memoList]);

  function handleAddMemo() {
    const newMemo = { id: Date.now(), text: "新規メモ" };
    setMemoList(prev => [...prev, newMemo]);
    setEditingMemo(newMemo);
    editingTextRef.current = newMemo.text;
  }

  function handleTextChange(e) {
    editingTextRef.current = e.target.value;
  }

  function handleUpdateMemo() {
    setMemoList(prev =>
      prev.map(memo =>
        memo.id === editingMemo.id ? { ...memo, text: editingTextRef.current } : memo
      )
    );
    setEditingMemo(null);
  }

  function handleDeleteMemo() {
    setMemoList(prev => prev.filter(memo => editingMemo.id !== memo.id));
    setEditingMemo(null);
  }

  function startEditingMemo(memo) {
    setEditingMemo(memo);
    editingTextRef.current = memo.text;
  }

  return (
    <div className="app-container">
      <MemoList memoList={memoList} startEditingMemo={startEditingMemo} editingMemo={editingMemo} />
      <button onClick={handleAddMemo}>+</button>
      {editingMemo && (
        <MemoForm
          editingMemo={editingMemo}
          editingTextRef={editingTextRef}
          handleTextChange={handleTextChange}
          handleUpdateMemo={handleUpdateMemo}
          handleDeleteMemo={handleDeleteMemo}
        />
      )}
    </div>
  );
}
