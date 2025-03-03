import { useState } from "react";
import { useAuth } from "./hooks/AuthHooks";

export default function MemoForm({
  editingMemo,
  handleUpdateMemo,
  handleDeleteMemo,
}) {
  const [editingText, setEditingText] = useState(editingMemo.text);

  const { isLogin } = useAuth();

  return (
    <div>
      <textarea
        name="memoform"
        defaultValue={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        readOnly={!isLogin}
      />
      {isLogin && (
        <div>
          <button onClick={() => handleUpdateMemo(editingText)}>更新</button>
          <button onClick={handleDeleteMemo}>削除</button>
        </div>
      )}
    </div>
  );
}
