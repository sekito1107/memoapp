import { useState } from "react";

export default function MemoForm({
  editingMemo,
  handleUpdateMemo,
  handleDeleteMemo,
}) {
  const [editingText, setEditingText] = useState(editingMemo.text);

  return (
    <div>
      <textarea
        defaultValue={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <button onClick={() => handleUpdateMemo(editingText)}>更新</button>
      <button onClick={handleDeleteMemo}>削除</button>
    </div>
  );
}
