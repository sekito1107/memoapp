export default function MemoForm({
  editingMemo,
  handleTextChange,
  handleUpdateMemo,
  handleDeleteMemo,
}) {
  return (
    <div>
      <textarea
        defaultValue={editingMemo.text}
        ref={(element) => element && (element.value = editingMemo.text)}
        onChange={handleTextChange}
      />
      <button onClick={handleUpdateMemo}>更新</button>
      <button onClick={handleDeleteMemo}>削除</button>
    </div>
  );
}
