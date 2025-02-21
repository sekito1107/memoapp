import React from 'react';

export default function MemoList({ memoList, startEditingMemo, editingMemo }) {
  return (
    <div>
      {memoList.map((memo) => (
        <li
          key={memo.id}
          onClick={() => startEditingMemo(memo)}
          className={memo.id === editingMemo?.id ? "selected" : ""}
        >
          {memo.text.split("\n")[0]}
        </li>
      ))}
    </div>
  );
}
